# Changelog

All notable changes to the AI-Native Agentic Portfolio project are documented here.

## [1.0.0] - 2026-09-19

### Added
- **Canonical Content Knowledge Base**:
  - `content/profile/`: Structured files for about, education, experience, skills, achievements, contact.
  - `content/projects/`: Verified files for RedactVision Agent, Stroke2D, Civic Services Platform, and QuizMaster.
  - `content/links/` and `content/resume/`: Canonical source for external profiles and resume text.
- **AI Engine & Provider Abstraction**:
  - `AIProvider` interface with unified streaming.
  - High-speed `GroqProvider` (`llama-3.3-70b-versatile`).
  - Native `GeminiProvider` (`gemini-2.5-flash`).
  - Deterministic `MockProvider` for zero-key local tests and offline dev.
  - Strict grounded system instructions with hallucination fallbacks.
- **Embedded Hybrid RAG Retrieval**:
  - Section-level semantic chunker preserving document context and anchor links.
  - In-memory hybrid ranker combining BM25 lexical token matching with dense vector cosine similarity.
  - Automated build-time indexer generating `data/knowledge-index.json`.
- **Agentic Safe Tool Calling**:
  - `openSection`, `openProject`, `openResume`, and `openExternalLink` tools with strict Zod validation.
  - Client-side navigation, modal management, and UI action badges.
- **Modern Web Frontend**:
  - Dark-mode first design system (Obsidian `#090a0f`, emerald `#10b981`, cyan `#06b6d4`).
  - Dual-mode hero HUD with interactive command prompt and prompt suggestions.
  - Filterable project grid with interactive architecture modals.
  - SGBC IIT Madras internship timeline and education cards.
  - Real-time streaming chat with markdown, code highlights, and source citation badges.
- **Security & Quality**:
  - Sliding window IP rate limiter (20 req/min).
  - Input length and history depth protection.
  - Zero client-side secrets.
  - Complete Vitest test suite and AI evaluation benchmark dataset (`tests/ai/`).
- **Comprehensive Documentation**:
  - Full suite of 20 specification and operational documents in `docs/`.
