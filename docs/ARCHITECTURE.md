# System Architecture: Afsar AI Portfolio Assistant

## 1. Executive Summary & Core Paradigm

The **Afsar AI Portfolio** is an **AI-first developer portfolio application** designed around a dual-mode experience:

1. **Primary Experience (`ASK AI`)**: A ChatGPT/Gemini-inspired conversational assistant whose sole domain is Mohd Afsar's engineering projects, academic background at IIT Madras, work experience at SGBC, technical skills, and portfolio navigation.
2. **Secondary Experience (`EXPLORE PORTFOLIO`)**: A rich, traditional developer portfolio containing deep-dive architecture breakdowns, research experience, education details, and contact profiles.

Users can move fluidly between these modes manually via the lightweight floating header or agentically via AI tool calls (e.g. asking the AI *"Show me your projects"* immediately opens the Projects section).

```
                 ┌──────────────────────────────────────────────┐
                 │           VISITOR / USER INTERACTION         │
                 └──────────────────────┬───────────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
            ┌─────────────────────────┐   ┌─────────────────────────┐
            │   Primary: ASK AI       │   │  Secondary: EXPLORE     │
            │   - Minimal landing     │   │  - Featured Projects    │
            │   - Centered input      │   │  - About & Pillars      │
            │   - Conversational flow │   │  - SGBC & Leadership    │
            │   - Grounded citations  │   │  - IIT Madras Education │
            │   - Follow-up chips     │   │  - Skills & Contacts    │
            └────────────┬────────────┘   └────────────▲────────────┘
                         │                             │
                         │      ✦ Agentic Tool Calls   │
                         │    (openSection/openProject)│
                         └─────────────────────────────┘
                                        │
                                        ▼
                 ┌──────────────────────────────────────────────┐
                 │       Next.js App Router Server Layer        │
                 │              (/api/chat route)               │
                 │                                              │
                 │  - Client IP Token Bucket Rate Limiter       │
                 │  - Zod Request Sanitization & Depth Trimmer  │
                 │  - Deterministic Query Scope Guardrails      │
                 │  - Prompt Injection Defense Filters          │
                 │  - Embedded BM25 Hybrid RAG Retriever        │
                 │  - Grounded System Prompt Assembly           │
                 │  - Zod Tool Call Arguments Validator         │
                 └──────────────────────┬───────────────────────┘
                                        │
                                        ▼
                 ┌──────────────────────────────────────────────┐
                 │          AI Provider Abstraction             │
                 │                                              │
                 │  - GroqProvider (Qwen 2.5 72B / 27B)         │
                 │  - GeminiProvider (Gemini 2.5 Flash)         │
                 │  - MockProvider (Deterministic Offline/CI)   │
                 └──────────────────────────────────────────────┘
```

---

## 2. Architectural Audit: Next.js Server Layer vs FastAPI

A critical architectural question was whether to introduce a separate Python FastAPI microservice or use Next.js App Router API routes (`/api/chat`).

### Selected Approach: Next.js App Router Server Service Layer
- **Unified TypeScript Codebase**: Both frontend components, data schemas, and server routes share the exact same types (`ChatMessage`, `ProjectItem`, `KnowledgeChunk`, `ValidatedToolCall`).
- **Free-First Deployment ($0/month)**: Next.js deploys as a single serverless bundle to Vercel, Netlify, or as a single lightweight Docker container. Running a separate FastAPI backend would require two independent hosting platforms, double the environment configuration, and require cross-origin CORS negotiation.
- **Zero Cold-Start Network Latency**: With Next.js server routes, RAG retrieval occurs in-process with memory-mapped JSON, executing in under **3ms**. A separate FastAPI microservice would introduce a cross-service network roundtrip on every user query.
- **API Key Security**: Private credentials (`GROQ_API_KEY`, `GEMINI_API_KEY`) reside exclusively in Node.js server environment variables and are never prefixed with `NEXT_PUBLIC_*`.

### Why Not FastAPI?
FastAPI is excellent for heavy Python machine learning pipelines (e.g. PyTorch GPU training or custom CUDA kernels). However, for an inference-orchestration and RAG-retrieval layer in a personal portfolio, running Python adds unnecessary resource overhead, latency, and hosting maintenance without providing any functional benefit.

---

## 3. Grounded RAG & Security Pipeline

```
User Query
   │
   ▼
[1] Rate Limiter (Token Bucket: 10 requests / minute / IP)
   │
   ▼
[2] Sanitization (Strip control chars, max 500 characters)
   │
   ▼
[3] Scope Guard (Regex classification: refuses general knowledge/coding requests)
   │
   ▼
[4] Hybrid Retriever (BM25 token scoring + Title/Tag precision boosts)
   │
   ▼
[5] System Prompt Builder (Injects retrieved chunks + strict zero-hallucination rules)
   │
   ▼
[6] AI Provider Stream (Groq / Gemini / Mock)
   │
   ├── Text Token Stream ─────────► Server-Sent Events (SSE) ──► Chat UI
   ├── Tool Calls ────────────────► Zod Validator ─────────────► Portfolio Navigation
   └── Grounded Source Citations ─► Deduplicated Source Chips ─► Click-to-Explore
```

### Hallucination & Scope Policies
- **Out of Scope**: If a user asks *"Write a Python script"* or *"Who is Elon Musk?"*, the system responds immediately with a polite refusal: *"I am Afsar's portfolio assistant. I can only answer questions about Afsar, his projects, skills, education, and portfolio."*
- **Missing Information**: If a user asks about unrecorded details (e.g. *"What is Afsar's salary?"*), the assistant strictly adheres to: *"I don't have that information in Afsar's portfolio."* It never guesses or fabricates metrics.

---

## 4. Design System & Visual Direction

The visual aesthetic was overhauled from a cyberpunk emerald/cyan glow to a **modern, calm, spacious deep neutral system**:
- **Canvas**: `#0b0d11` (rich dark charcoal)
- **Surfaces**: `#13161c` (panels), `#1a1e26` (inputs/cards), `#242934` (hover/active)
- **Borders**: `#222733` (subtle dividers), `#323846` (interactive hover)
- **Typography**: Clean sans-serif with high contrast (`#f3f4f6` text, `#949ca8` muted)
- **Accent**: Soft indigo/violet `#6366f1` / `#818cf8` used with restraint for badges, active states, and focus rings.
