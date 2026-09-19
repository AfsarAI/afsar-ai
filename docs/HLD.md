# High-Level Design (HLD)

## 1. System Overview

Afsar AI is an AI-first developer portfolio application. The high-level architecture separates concerns into five primary subsystems:

```
                    ┌─────────────────────────┐
                    │      Content Layer      │
                    │       (content/)        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Knowledge Index     │
                    │ (data/knowledge-index)  │
                    └────────────┬────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application Layer                    │
│                                                                 │
│  ┌─────────────────────────────┐   ┌─────────────────────────┐  │
│  │     Client Interface        │   │    Server API Route     │  │
│  │  - Primary: ASK AI          │   │      (/api/chat)        │  │
│  │  - Secondary: EXPLORE       │◄─►│  - Rate Limiter         │  │
│  │  - Agentic Tool Dispatcher  │   │  - Scope Guardrails     │  │
│  │  - Grounded Source Chips    │   │  - Hybrid RAG Retriever │  │
│  └─────────────────────────────┘   │  - Prompt Engine        │  │
│                                    │  - Zod Tool Validator   │  │
│                                    └────────────┬────────────┘  │
└─────────────────────────────────────────────────┼───────────────┘
                                                  │
                                                  ▼
                                     ┌─────────────────────────┐
                                     │  AI Provider Interface  │
                                     │  - Groq (Qwen 2.5 27B)  │
                                     │  - Google Gemini        │
                                     │  - Mock (Deterministic) │
                                     └─────────────────────────┘
```

---

## 2. Subsystems Detail

### 2.1 Content Subsystem
- **Canonical Markdown Files**: Reside in `content/` with Zod-validated YAML frontmatter.
- **Content Validator (`scripts/validate-knowledge.ts`)**: Ensures all documents adhere to schemas, IDs are unique, and required fields exist.
- **Knowledge Indexer (`scripts/index-knowledge.ts`)**: Deconstructs markdown into semantic sections, produces token sets for BM25 search, and generates chunk embeddings saved to `data/knowledge-index.json`.

### 2.2 Retrieval-Augmented Generation (RAG) Subsystem
- **Hybrid Retriever (`src/lib/rag/hybrid-retriever.ts`)**: Evaluates queries against the knowledge base combining BM25 inverted index ranking and cosine similarity scores.
- **Context Assembler**: Formats the top-k relevant chunks (with document title, section, category, and source link) to inject into the LLM system context.

### 2.3 AI Assistant Subsystem ("Afsar AI")
- **Guardrails Engine (`src/lib/ai/guardrails.ts`)**:
  - Checks query scope (flags general programming queries, general trivia, math, politics).
  - Sanitizes user input and detects prompt injection attempts.
- **System Prompt Engine (`src/lib/ai/system-prompt.ts`)**: Enforces the grounded persona, boundary restrictions, missing-information handling, and tool execution protocol.
- **Provider Layer (`src/lib/ai/groq-provider.ts`, `gemini-provider.ts`, `mock-provider.ts`)**: Dispatches streaming chat requests to Groq (Qwen 2.5 27B), Gemini, or Mock.

### 2.4 Agentic Tool Subsystem
- **Tool Definitions (`src/lib/agent/tools.ts`)**: Declares `openSection`, `openProject`, `openResume`, and `openExternalLink`.
- **Tool Validator (`src/lib/agent/tool-validator.ts`)**: Strict allowlist check ensuring only valid arguments can be dispatched to the browser.
- **Client Action Dispatcher**: Executes visual navigation, switches modes from `ASK` to `EXPLORE`, highlights sections, or triggers modals.

### 2.5 Web Client Subsystem
- **Next.js App Router**:
  - `/` (Home): Dual-mode interface. Defaults to minimal AI conversational landing (`ASK`), with seamless transition to manual portfolio (`EXPLORE`).
  - `/projects/[slug]`: Dedicated static pages for search engine indexing.
  - `/api/chat`: Edge/Node streaming route handler.
  - `/api/search`: Fast client-side portfolio search endpoint.
