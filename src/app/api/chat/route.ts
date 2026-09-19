import { NextRequest, NextResponse } from 'next/server';
import { getRateLimiter } from '@/lib/security/rate-limiter';
import { validateAndSanitizeMessage, validateHistory } from '@/lib/security/sanitization';
import { checkQueryScope } from '@/lib/ai/guardrails';
import { getRetriever } from '@/lib/rag/hybrid-retriever';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import { getAIProvider } from '@/lib/ai/provider-factory';
import { PORTFOLIO_TOOLS } from '@/lib/agent/tools';
import { ChatMessage } from '@/lib/ai/provider-interface';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP & Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const limiter = getRateLimiter();
    const rateCheck = limiter.isAllowed(clientIp);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
          retryAfterMs: rateCheck.resetMs,
        },
        { status: 429 }
      );
    }

    // 2. Request Payload Validation
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { valid, sanitizedMessage, error: validationError } = validateAndSanitizeMessage(body.message);
    if (!valid || !sanitizedMessage) {
      return NextResponse.json({ error: validationError || 'Invalid message' }, { status: 400 });
    }

    const cleanHistory = validateHistory(body.history);

    // 3. Early Scope & Guardrail Check
    const scope = checkQueryScope(sanitizedMessage);
    if (!scope.isAllowed) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const payload = JSON.stringify({
            type: 'text',
            content: scope.refusalMessage || "I am Afsar's portfolio assistant. I can only assist with questions regarding Afsar and his portfolio.",
          });
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
        },
      });
    }

    // 4. Hybrid RAG Retrieval
    const retriever = getRetriever();
    const searchResults = retriever.search(sanitizedMessage, 4);
    const retrievedChunks = searchResults.map((r) => r.chunk);

    const sources = retrievedChunks.map((c) => ({
      title: c.title,
      section: c.section,
      url: c.sourceUrl,
    }));

    // 5. System Prompt & Context Construction
    const systemPrompt = buildSystemPrompt(retrievedChunks);

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...cleanHistory,
      { role: 'user', content: sanitizedMessage },
    ];

    // 6. Provider Dispatch & Streaming
    const provider = getAIProvider();
    const stream = await provider.generateStream(messages, {
      temperature: 0.1,
      tools: PORTFOLIO_TOOLS,
      sources,
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('API /api/chat error:', err);
    return NextResponse.json(
      { error: 'An error occurred while contacting the portfolio assistant. Please try again.' },
      { status: 500 }
    );
  }
}
