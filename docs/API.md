# API Specification

## 1. Endpoints

### 1.1 `POST /api/chat`
Streams assistant responses, client tool calls, and retrieved sources.

- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "message": "Tell me about RedactVision Agent",
    "history": [
      { "role": "user", "content": "Who is Afsar?" },
      { "role": "assistant", "content": "Afsar is a software & AI engineer..." }
    ]
  }
  ```
- **Validation Rules**:
  - `message`: Required string, 1 to 500 characters.
  - `history`: Optional array, max 6 items. Each item must have `role` (`user` | `assistant`) and `content` (string <= 500 chars).
- **Responses**:
  - `200 OK`: `Transfer-Encoding: chunked`, `Content-Type: text/event-stream` or `application/x-ndjson`.
    - Streams progressive text tokens.
    - Emits structured tool calls: `__TOOL_CALL__:{"name":"openProject","arguments":{"projectId":"redactvision-agent"}}`
    - Emits source references: `__SOURCES__:[{"title":"RedactVision Agent","url":"#projects?id=redactvision-agent","section":"Overview"}]`
  - `400 Bad Request`: When payload violates validation limits.
  - `429 Too Many Requests`: When client exceeds IP rate limit (20 req/min).
  - `500 Internal Server Error`: Masked generic error response.

---

### 1.2 `GET /api/search`
Fast client-side lexical search over portfolio knowledge chunks.

- **Query Parameters**:
  - `q` (string, required): Search query.
  - `limit` (number, optional, default: 5): Maximum results.
- **Response**:
  ```json
  {
    "results": [
      {
        "id": "stroke2d#overview",
        "title": "Stroke2D",
        "section": "Overview",
        "contentSnippet": "At the Sudha Gopalakrishnan Brain Centre...",
        "sourceUrl": "#projects?id=stroke2d"
      }
    ]
  }
  ```
