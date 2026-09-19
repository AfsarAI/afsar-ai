# Testing Guide

## 1. Test Strategy Overview

The testing pyramid consists of:
1. **Content Schema Tests**: Ensures all canonical markdown files meet strict Zod schemas with valid dates and unique IDs.
2. **Unit Tests (Vitest)**: Tests individual units: markdown chunking, BM25 tokenizer, cosine similarity calculation, tool argument validation, and injection sanitization.
3. **Integration Tests**: Tests the `/api/chat` and `/api/search` route handlers, streaming responses, and rate limiters.
4. **AI Evaluation Benchmark (`npm run test:ai`)**: Tests the LLM assistant against 5 strict evaluation datasets.

---

## 2. Test Commands

```bash
# Run all unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run knowledge base validation
npm run knowledge:validate

# Run AI evaluation suite
npm run test:ai
```

---

## 3. Coverage Targets
- **Unit & Integration**: >= 85% statement coverage across core libraries (`src/lib/rag/`, `src/lib/ai/`, `src/lib/agent/`, `src/lib/security/`).
- **AI Evaluation**: 100% pass rate on prompt injection rejection and out-of-scope refusals.
