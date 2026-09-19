import { AIProvider, ChatMessage, GenerateStreamOptions } from './provider-interface';
import { PORTFOLIO_TOOLS } from '../agent/tools';
import { validateToolCall } from '../agent/tool-validator';

export class GeminiProvider implements AIProvider {
  public readonly name = 'gemini';
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
    this.model = model || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  }

  public async generateStream(
    messages: ChatMessage[],
    options?: GenerateStreamOptions
  ): Promise<ReadableStream<Uint8Array>> {
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const systemMessage = messages.find((m) => m.role === 'system')?.content || '';
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    const contents = conversationMessages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const functionDeclarations = (options?.tools || PORTFOLIO_TOOLS).map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:streamGenerateContent?key=${this.apiKey}&alt=sse`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        system_instruction: systemMessage ? { parts: [{ text: systemMessage }] } : undefined,
        tools: [{ function_declarations: functionDeclarations }],
        generationConfig: {
          temperature: options?.temperature ?? 0.1,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get readable stream from Gemini response');
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

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
              if (trimmed.startsWith('data: ')) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const candidate = json.candidates?.[0];
                  const parts = candidate?.content?.parts || [];

                  for (const part of parts) {
                    if (part.text) {
                      const payload = JSON.stringify({ type: 'text', content: part.text });
                      controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
                    }
                    if (part.functionCall) {
                      const validated = validateToolCall(part.functionCall.name, part.functionCall.args);
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
                } catch {
                  // Ignore JSON parse error on incomplete chunks
                }
              }
            }
          }

          // Emit source citations if provided
          if (options?.sources && options.sources.length > 0) {
            const sourcePayload = JSON.stringify({ type: 'sources', sources: options.sources });
            controller.enqueue(encoder.encode(`data: ${sourcePayload}\n\n`));
          }

          // Emit done
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });
  }
}
