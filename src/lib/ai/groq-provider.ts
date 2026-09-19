import { AIProvider, ChatMessage, GenerateStreamOptions } from './provider-interface';
import { PORTFOLIO_TOOLS } from '../agent/tools';
import { validateToolCall } from '../agent/tool-validator';

export class GroqProvider implements AIProvider {
  public readonly name = 'groq';
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';
    this.model = model || process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
  }

  public async generateStream(
    messages: ChatMessage[],
    options?: GenerateStreamOptions
  ): Promise<ReadableStream<Uint8Array>> {
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY is not configured');
    }

    const formattedTools = (options?.tools || PORTFOLIO_TOOLS).map((t) => ({
      type: 'function',
      function: {
        name: t.name,
        description: t.description,
        parameters: t.parameters,
      },
    }));

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
        temperature: options?.temperature ?? 0.1,
        tools: formattedTools,
        tool_choice: 'auto',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq API error (${response.status}): ${errText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get readable stream from Groq response');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let accumulatedToolCalls: Array<{ name: string; argsString: string }> = [];

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = '';

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === 'data: [DONE]') continue;

              if (trimmed.startsWith('data: ')) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const delta = json.choices?.[0]?.delta;

                  if (delta?.content) {
                    const payload = JSON.stringify({ type: 'text', content: delta.content });
                    controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
                  }

                  if (delta?.tool_calls) {
                    for (const tc of delta.tool_calls) {
                      const idx = tc.index ?? 0;
                      if (!accumulatedToolCalls[idx]) {
                        accumulatedToolCalls[idx] = {
                          name: tc.function?.name || '',
                          argsString: tc.function?.arguments || '',
                        };
                      } else {
                        if (tc.function?.name) accumulatedToolCalls[idx].name += tc.function.name;
                        if (tc.function?.arguments) accumulatedToolCalls[idx].argsString += tc.function.arguments;
                      }
                    }
                  }
                } catch {
                  // Ignore JSON parse errors for fragmented lines
                }
              }
            }
          }

          // Process and dispatch valid tool calls
          for (const tc of accumulatedToolCalls) {
            if (tc && tc.name) {
              const validated = validateToolCall(tc.name, tc.argsString);
              if (validated.valid && validated.call) {
                const toolPayload = JSON.stringify({
                  type: 'tool_call',
                  toolCall: {
                    name: validated.call.name,
                    arguments: validated.call.arguments,
                  },
                });
                controller.enqueue(encoder.encode(`data: ${toolPayload}\n\n`));
              }
            }
          }

          // Emit source citations if provided
          if (options?.sources && options.sources.length > 0) {
            const sourcePayload = JSON.stringify({ type: 'sources', sources: options.sources });
            controller.enqueue(encoder.encode(`data: ${sourcePayload}\n\n`));
          }

          // Signal completion
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });
  }
}
