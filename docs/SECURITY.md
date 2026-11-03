# Security Architecture & Policies

This document describes the security controls, privacy practices, and known limitations of the Afsar AI portfolio application.

The application is designed to minimize unnecessary data collection, protect server-side credentials, validate incoming requests, and restrict AI assistant functionality to predefined operations.

## 1. Secrets Management

### Server-Side Credential Protection

- **No Client-Side API Keys:** Private API credentials for Groq, Google Gemini, and OpenRouter are not intended to be exposed in client-side JavaScript.
- **Server-Side Environment Variables:** Provider credentials are accessed through server-side environment variables using `process.env`.
- **API Request Routing:** AI interactions are routed through the server-side `/api/chat` endpoint rather than calling LLM providers directly from the browser.
- **Environment File Protection:** Local environment files, including `.env` and `.env.local`, are excluded through `.gitignore`.
- **Example Configuration:** Only placeholder environment configuration files, such as `.env.example`, should be committed to the repository.

### Credential Handling Guidelines

- Never commit real API keys, access tokens, passwords, or private credentials.
- Do not expose secret environment variables through `NEXT_PUBLIC_` variables.
- Rotate credentials immediately if they are accidentally exposed.
- Review repository history if a secret has ever been committed.

## 2. Rate Limiting & Denial-of-Service Protection

### In-Memory Sliding-Window Rate Limiter

The application implements an IP-based sliding-window rate limiter.

**Implementation location:**

`src/lib/security/rate-limiter.ts`

**Default configured limit:**

- 20 requests per minute per client IP.

**Expected behavior:**

- Requests exceeding the configured limit are rejected.
- The API returns HTTP `429 Too Many Requests`.
- A user-friendly JSON error response is returned.

### Important Deployment Limitation

The current rate limiter uses in-memory application state.

Consequently:

- Rate-limit counters may be independent across serverless instances.
- Counters may reset when an instance restarts.
- The implementation does not provide globally shared rate-limit state across all deployment instances.

Therefore, this mechanism provides an application-level safeguard but should not be considered a complete distributed denial-of-service protection system.

For stronger production protection, consider a shared rate-limit store, such as Redis, and appropriate infrastructure-level abuse protection.

## 3. Input Validation & Request Sanitization

The application applies validation and request-size controls before processing AI requests.

### Message Length Restriction

- Maximum user message length: 500 characters.
- Requests exceeding the configured limit are rejected with HTTP `400 Bad Request`.

### Conversation History Restriction

- Maximum conversation history: 6 turns.
- Limits the amount of conversation context passed to the LLM.

### Schema Validation

- Incoming API request payloads are validated using Zod.
- Invalid payloads are rejected before further processing.

### Error Handling

- Internal stack traces are not intended to be exposed to visitors.
- Raw provider errors are replaced with generic user-friendly error messages.
- Internal errors are logged server-side for debugging.

## 4. AI Safety & Agent Tool Restrictions

The AI assistant is designed to answer questions exclusively about the portfolio owner's professional profile.

### Knowledge Grounding

- Portfolio information is retrieved from structured, verified project content.
- Retrieval uses a hybrid search approach combining BM25 and dense-vector similarity.
- The assistant is instructed to communicate when relevant information is unavailable instead of inventing unsupported facts.

### Scope Restrictions

- Out-of-domain questions are handled through the application's scope-control mechanisms.
- Prompt-injection attempts are addressed through input filtering and grounded system instructions.
- These mechanisms reduce risk but do not guarantee protection against every prompt-injection or model failure scenario.

### Agent Tool Allowlisting

The assistant can invoke only predefined application actions.

Examples include:

- `openSection`
- `openProject`
- `openResume`
- `openExternalLink`

Tool parameters are restricted through allowlists and application-side validation.

The assistant is not intended to execute arbitrary operating-system commands or unrestricted browser actions.

## 5. Privacy Policy & Data Handling

### Application-Level Chat Storage

- The application does not permanently store visitor chat history in its own database.
- Chat state is maintained in client-side React state and/or `sessionStorage` during the browser session.
- The application does not intentionally maintain a permanent database of visitor conversations.

### Third-Party LLM Processing

To generate AI responses, the application may transmit a visitor's message and relevant retrieved portfolio context to the selected LLM provider.

Depending on the configured provider, this may include:

- Groq Cloud
- Google Gemini
- OpenRouter

The data handling, retention, and privacy practices of the selected provider are governed by that provider's applicable terms and privacy policy.

The application's lack of permanent chat-history storage does not mean that requests are never transmitted to or processed by external providers.

### Tracking & Analytics

- The application is not designed to use third-party advertising or tracking scripts.
- No permanent visitor chat-history database is maintained by the application.

## 6. Deployment & Repository Security

The following practices are used to reduce accidental exposure of sensitive configuration:

- Environment files are excluded from Git through `.gitignore`.
- `.env.example` contains placeholder configuration rather than real secrets.
- Local development and AI-agent configuration directories are excluded from version control.
- Production API credentials are configured through deployment environment variables.
- Server-side routes are responsible for communicating with external LLM providers.

Repository maintainers should periodically review dependency updates, environment configuration, and exposed deployment settings.

## 7. Known Security Limitations

Security controls are not guarantees of complete protection.

The current architecture has the following limitations:

1. The in-memory rate limiter is not a globally synchronized distributed rate limiter.
2. Prompt-injection filters and system instructions cannot guarantee that every malicious input will be blocked.
3. External LLM providers process submitted requests according to their respective policies.
4. Client-side session storage is accessible to JavaScript executing within the same browser origin.
5. Application-level rate limiting does not replace infrastructure-level DDoS protection.

These limitations should be considered when extending the application or deploying it at a larger scale.

## 8. Reporting a Security Vulnerability

If you discover a security vulnerability or an unintended exposure of sensitive information, please contact me directly.

**Security Contact:**  
Mohd Afsar

**Email:** [23f2002023@ds.study.iitm.ac.in](mailto:23f2002023@ds.study.iitm.ac.in)
**Personal Email:** [mohammadafsar786921@gmail.com](mailto:mohammadafsar786921@gmail.com)

Please include:

- A description of the vulnerability.
- Steps to reproduce the issue.
- Relevant screenshots or technical evidence, if available.
- The potential impact of the vulnerability.

Please avoid publicly disclosing an unpatched security vulnerability before providing an opportunity to investigate and address it.

---

*This document describes the intended application architecture and configured controls. Actual security behavior should be verified against the current source code and deployment configuration.*
