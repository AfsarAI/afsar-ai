# Security Architecture & Policies

## 1. Secrets Management
- **Zero Client-Side Exposure**: No API keys (Groq, Gemini, OpenRouter) are ever bundled into client JavaScript. All AI interactions pass through the server-side route handler `/api/chat`.
- **Environment Isolation**: Production secrets are loaded strictly from server environment variables via `process.env`.
- **Repository Safety**: `.env*` files are strictly gitignored. Only `.env.example` is committed with placeholder values.

---

## 2. Rate Limiting & Denial-of-Service Protection
- **In-Memory Sliding Window Rate Limiter**:
  - Implemented in `src/lib/security/rate-limiter.ts`.
  - Configurable limits (default: **20 requests per minute** per client IP).
  - Returns `429 Too Many Requests` with a human-friendly JSON error payload when exceeded.
  - Protects free-tier LLM API quotas from malicious exhaustion.

---

## 3. Input Validation & Sanitization
- **Message Length Cap**: Maximum 500 characters per user prompt. Queries exceeding this length are rejected with a 400 Bad Request.
- **History Depth Cap**: Maximum 6 conversation turns sent to the LLM to prevent token-stuffing attacks and control inference latency.
- **Payload Schema Validation**: Handled via Zod on all incoming API requests.
- **Error Masking**: Stack traces and raw vendor API error messages are never returned to clients. Internal errors are logged server-side and replaced with generic user-friendly messages.

---

## 4. Privacy Policy
- No user chat history is stored permanently in any database.
- Chat state is strictly held in local client React state / sessionStorage during the active visit.
- No third-party tracking or advertising scripts.
