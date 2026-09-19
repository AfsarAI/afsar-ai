# Troubleshooting Guide

## 1. Local Development Issues

### Issue: `npm run dev` fails with module errors
- **Cause**: Node modules missing or out of sync.
- **Fix**:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Issue: AI Chat returns *"Something went wrong while contacting the portfolio assistant"*
- **Cause 1**: The active AI provider API key is invalid or missing.
  - **Check**: Open `.env.local` and ensure `GROQ_API_KEY` or `GEMINI_API_KEY` is present.
  - **Fallback**: Set `AI_PROVIDER=mock` to run in local deterministic mode without external network calls.
- **Cause 2**: Rate limit exceeded on free tier.
  - **Fix**: Wait 60 seconds or switch `AI_PROVIDER` from `groq` to `gemini` in `.env.local`.

### Issue: Tool call actions don't navigate the page
- **Cause**: The client event listener was mounted before DOM ready or smooth-scrolling was blocked by CSS overflow.
- **Fix**: Check that the section target ID exists in the DOM and that the browser supports standard smooth scrolling.

---

## 2. Build & Indexing Issues

### Issue: `npm run knowledge:validate` reports schema errors
- **Cause**: A markdown file in `content/` has invalid YAML frontmatter (e.g. missing `updatedAt` or unrecognized `category`).
- **Fix**: Check the error output specifying the exact file and line, and fix the field according to `src/lib/content/schema.ts`.

### Issue: `npm run build` fails on pre-rendering
- **Cause**: Missing static params for `/projects/[slug]`.
- **Fix**: Ensure `generateStaticParams` in `src/app/projects/[slug]/page.tsx` reads directly from the canonical projects directory.
