# AI Architecture & Provider Abstraction

## 1. Core Principles
1. **Domain-Specific Persona**: The assistant represents **Afsar AI**, an assistant dedicated strictly to navigating and explaining Mohd Afsar's portfolio.
2. **Deterministic Fallbacks & Refusals**: General world knowledge is intentionally suppressed for queries about Afsar. If context is missing, the response defaults strictly to: *"I don't have that information in Afsar's portfolio."*
3. **Multi-Provider Resilience**: Vendor decoupling prevents outages or rate limit exhausts from taking the site offline.

---

## 2. Multi-Provider Architecture

```
                       ┌──────────────────────────────┐
                       │    AIProviderFactory         │
                       │    (src/lib/ai/factory.ts)   │
                       └──────────────┬───────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
   ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
   │  GroqProvider   │       │ GeminiProvider  │       │  MockProvider   │
   │ (Llama 3.3 70B) │       │ (Gemini 2.5 Fl.)│       │ (Deterministic) │
   └─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 2.1 Provider Implementations
- **Groq Provider (`src/lib/ai/groq-provider.ts`)**:
  - Model: `llama-3.3-70b-versatile` or `llama-3.1-8b-instant`.
  - Protocol: OpenAI-compatible streaming API.
  - Characteristics: Sub-150ms time-to-first-token, generous free tier.
- **Google Gemini Provider (`src/lib/ai/gemini-provider.ts`)**:
  - Model: `gemini-2.5-flash` or `gemini-2.0-flash`.
  - Protocol: Native REST / `@google/genai` streaming with tool calling.
  - Characteristics: Large context window, zero-cost free tier.
- **Mock Provider (`src/lib/ai/mock-provider.ts`)**:
  - Deterministic keyword and intent-based stream generator.
  - Enables zero-key local testing, automated unit tests, and offline demonstrations.

---

## 3. Grounded Prompt Engineering
The system prompt explicitly commands:
- You are Afsar AI, an intelligent agent designed exclusively to help visitors explore Mohd Afsar's portfolio.
- You must strictly base all statements on the supplied `<portfolio_context>` chunks.
- If a user asks a question about Afsar whose answer is not present in the context, state: *"I don't have that information in Afsar's portfolio."*
- Never fabricate dates, metrics, degrees, projects, or achievements.
- If the user asks general questions outside Afsar's portfolio (e.g. writing arbitrary code, history, math, weather, other people), decline politely and suggest portfolio topics.
- When appropriate, invoke available tools to navigate sections or open project modals.
