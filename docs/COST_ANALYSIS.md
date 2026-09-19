# Infrastructure Cost Analysis & Free-Tier Blueprint

## 1. Executive Cost Summary

| Subsystem | Primary Provider | Free Tier Allowance | Expected Monthly Usage | Overage Policy | Estimated Monthly Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Frontend & Serverless API** | Vercel (Hobby) / Netlify | 100 GB bandwidth, unlimited serverless functions | ~2-5 GB bandwidth, ~5,000 invocations | Soft warning / halts until next cycle | **₹0 ($0.00)** |
| **AI LLM Inference** | Groq Cloud | Free Tier: 30 requests/min, 14,400 requests/day | ~50-200 requests/day | HTTP 429 rate limit (zero surprise billing) | **₹0 ($0.00)** |
| **Fallback AI LLM** | Google Gemini API | 15 RPM, 1,500 RPD on free tier | Fallback traffic | HTTP 429 rate limit | **₹0 ($0.00)** |
| **Vector Storage & RAG** | In-Memory Embedded (Next.js) | Local RAM (zero external hosting) | ~50 KB JSON payload | None | **₹0 ($0.00)** |
| **Source Code & CI/CD** | GitHub | Unlimited public repos & GitHub Actions | Build & test workflows | None | **₹0 ($0.00)** |
| **Domain (Optional)** | Vercel subdomain (`.vercel.app`) | Free wildcard SSL & DNS | 100% covered | None | **₹0 ($0.00)** |
| **TOTAL ESTIMATED MONTHLY COST** | | | | | **₹0 ($0.00 / month)** |

---

## 2. Risk Mitigation & Surprise Bill Prevention
- **No Credit Card Requirement for Local Dev & Testing**: The system runs out-of-the-box using the deterministic `MockProvider` without requiring any API keys.
- **Hard Rate Limiting**: The server route handler enforces a sliding-window rate limit (20 req/min per IP) to prevent any single visitor or automated crawler from consuming daily free-tier quotas.
- **Zero Paid Add-ons**: We deliberately avoided paid vector databases (Pinecone, external Redis) in favor of the high-speed in-memory hybrid search index.
