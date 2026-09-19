# Low-Level Design (LLD)

## 1. Data Structures & Interfaces

### 1.1 Content Schemas (`src/lib/content/schema.ts`)
```typescript
export interface BaseContentItem {
  id: string;
  title: string;
  category: 'profile' | 'project' | 'links' | 'resume';
  tags?: string[];
  updatedAt: string;
  content: string; // Markdown body
}

export interface ProjectContentItem extends BaseContentItem {
  category: 'project';
  subtitle?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
  video?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
}
```

### 1.2 Knowledge Chunk & Index (`src/lib/rag/types.ts`)
```typescript
export interface KnowledgeChunk {
  id: string;          // e.g. "redactvision-agent#architecture"
  docId: string;       // e.g. "redactvision-agent"
  title: string;       // e.g. "RedactVision Agent"
  section: string;     // e.g. "Architecture & Solution"
  category: string;    // e.g. "project"
  content: string;     // Raw text of the section
  tags: string[];
  sourceUrl: string;   // e.g. "#projects?id=redactvision-agent"
  tokens: string[];    // Tokenized terms for BM25
  embedding?: number[];// Pre-computed vector
}

export interface KnowledgeIndex {
  version: string;
  builtAt: string;
  chunks: KnowledgeChunk[];
}
```

### 1.3 AI Provider Interface (`src/lib/ai/provider-interface.ts`)
```typescript
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface StreamChunk {
  type: 'text' | 'tool_call' | 'sources';
  content?: string;
  toolCall?: ToolCall;
  sources?: Array<{ title: string; url: string; section: string }>;
}

export interface AIProvider {
  name: string;
  generateStream(
    messages: ChatMessage[],
    options?: {
      temperature?: number;
      tools?: unknown[];
    }
  ): Promise<ReadableStream<Uint8Array>>;
}
```

---

## 2. Request Lifecycle for `/api/chat`

```
1. Client POSTs { message, history } to /api/chat
2. Security Check:
   - RateLimiter.isAllowed(clientIp) -> if false, returns 429 Too Many Requests
   - InputValidation: message length <= 500 chars, history depth <= 6
3. Guardrail Evaluation:
   - Guardrails.checkScope(message)
     - If query is out-of-scope (general coding, trivia, politics):
       return immediate Refusal Stream with portfolio redirect
4. RAG Retrieval:
   - HybridRetriever.search(message, topK = 4)
   - Extract relevant KnowledgeChunks
   - Generate Citation Sources
5. Prompt Assembly:
   - System Prompt (Persona, Grounding Constraint, Tool Instructions)
   - Injected Portfolio Context
   - Conversation History + Current User Message
6. LLM Stream Dispatch:
   - AIProvider.generateStream(...)
   - Stream text deltas, tool call markers, and sources JSON block to client
7. Client UI:
   - Progressively renders markdown
   - Detects tool call event -> triggers UI action (e.g. openSection)
   - Displays clickable source citation badges
```
