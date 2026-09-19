# AI-Native Agentic Portfolio — Mohd Afsar

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Cost](https://img.shields.io/badge/Infrastructure_Cost-%E2%82%B90%2Fmonth-emerald?style=flat-square)](#cost-analysis)

A production-grade, AI-native interactive personal portfolio for **Mohd Afsar** (Data Science undergraduate at **IIT Madras**, Full Stack Intern at **SGBC Brain Centre**, and Lead AI Engineer for ISRO SIH Browser Agent **RedactVision**).

Unlike conventional portfolios that slap a generic chatbot onto a static website, this platform fuses **grounded retrieval-augmented generation (RAG)**, **deterministic guardrails**, and an **agentic UI tool controller** with a modern, high-performance manual exploration interface.

---

## 🌟 Key Highlights

- **🤖 Grounded AI Assistant ("Afsar AI")**: Exclusively answers questions using verified portfolio knowledge. Refuses out-of-domain requests, resists prompt injections, and gracefully explains when information is unavailable without hallucinating.
- **⚡ Bidirectional Agentic UI Control**: The AI is not just a text generator—it actively navigates the interface (`openSection`, `openProject`, `openResume`, `openExternalLink`) upon user prompt.
- **🔍 Zero-Cost Hybrid RAG**: Runs an in-memory search combining **BM25 lexical ranking** with **dense vector cosine similarity** directly within serverless Next.js. Requires zero external database subscriptions ($0/month).
- **🛡️ Multi-Tier Guardrails**: Pre-execution regex scope classifier, grounded system prompts, parameter allowlists, and IP sliding-window rate limiting.
- **🎨 Premium AI Engineer HUD**: Obsidian aesthetic (`#090a0f`), glassmorphic panels, dynamic suggestion chips, and responsive mobile-first layouts.
- **📄 Single Canonical Source of Truth**: All facts originate from structured markdown files in `content/` with strict Zod validation schemas.

---

## 🏗️ Architecture Overview

```
                      ┌──────────────────────────────────────┐
                      │     Canonical Portfolio Content      │
                      │  (content/{profile,projects,links}) │
                      └──────────────────┬───────────────────┘
                                         │
                  ┌──────────────────────┴──────────────────────┐
                  ▼                                             ▼
   ┌───────────────────────────────┐             ┌───────────────────────────────┐
   │   Static Site Generation &    │             │   Build-time Knowledge Index  │
   │   Next.js React Server Pages  │             │   (scripts/index-knowledge)   │
   └──────────────┬────────────────┘             └──────────────┬────────────────┘
                  │                                             │
                  │                                             ▼
                  │                              ┌───────────────────────────────┐
                  │                              │ data/knowledge-index.json     │
                  │                              │ (Chunks + BM25 + Embeddings)  │
                  │                              └──────────────┬────────────────┘
                  │                                             │
                  ▼                                             ▼
      ┌──────────────────────────────────────────────────────────────────┐
      │                     Next.js 15 App Router                        │
      │  ┌───────────────────────┐          ┌─────────────────────────┐  │
      │  │ UI Component Layer    │          │ Server API Layer        │  │
      │  │ - Hero / Command HUD  │ ◄──────► │ - /api/chat (Streaming) │  │
      │  │ - Interactive Sections│          │ - /api/search           │  │
      │  │ - Chat Dialog & Tools │          │ - In-Memory Hybrid RAG  │  │
      │  └───────────────────────┘          │ - Guardrails & Limiter  │  │
      │                                     └───────────┬─────────────┘  │
      └─────────────────────────────────────────────────┼────────────────┘
                                                        │
                                                        ▼
                                      ┌───────────────────────────────────┐
                                      │     LLM Provider Abstraction     │
                                      │  (Groq / Gemini / OpenRouter /    │
                                      │   Deterministic Mock)             │
                                      └───────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, clsx, tailwind-merge |
| **AI & LLM** | Groq Cloud (`llama-3.3-70b-versatile`), Google Gemini (`gemini-2.5-flash`), OpenRouter, MockProvider |
| **RAG & Search** | Semantic Markdown Chunker, BM25 Lexical Index, Dense Vector Similarity, Reciprocal Rank Fusion |
| **Validation & Schema** | Zod, Gray-Matter |
| **Security** | In-Memory Sliding-Window Rate Limiter, Prompt Injection Filter, Tool Parameter Allowlists |
| **Testing** | Vitest, AI Evaluation Benchmark Suite (21 automated test cases) |

---

## 🤖 Agent Tools

The AI assistant can execute allowlisted actions directly inside the visitor's browser:

| Tool | Parameters | Description |
| :--- | :--- | :--- |
| `openSection` | `section: 'about' \| 'projects' \| 'experience' \| 'education' \| 'skills' \| 'achievements' \| 'contact'` | Smooth-scrolls to and highlights a portfolio section |
| `openProject` | `projectId: 'redactvision-agent' \| 'stroke2d' \| 'civic-services-platform' \| 'quizmaster'` | Opens the architectural deep-dive modal for the project |
| `openResume` | *(None)* | Opens/downloads the verified PDF resume |
| `openExternalLink` | `platform: 'github' \| 'linkedin' \| 'leetcode' \| 'email'` | Navigates to verified external profiles |

---

## 🚀 Quickstart (Local Development)

### 1. Clone & Install
```bash
git clone https://github.com/AfsarAI/AfsarPortfolio.git
cd AfsarPortfolio
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```
*(Optional: Add your free `GROQ_API_KEY` from [console.groq.com](https://console.groq.com). If left blank, the app runs on the built-in deterministic `MockProvider` without requiring any API keys).*

### 3. Validate & Index Content
```bash
npm run knowledge:validate
npm run knowledge:index
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

```bash
# Run unit tests (Vitest)
npm run test

# Run AI Evaluation Suite (tests in-scope, out-of-scope, hallucinations, injection, tools)
npm run test:ai

# Run complete production build check
npm run build
```

---

## 💰 Cost Analysis (100% Free Tier)

| Service | Provider | Free Allowance | Estimated Monthly Cost |
| :--- | :--- | :--- | :--- |
| **Frontend Hosting** | Vercel (Hobby) / Netlify | 100 GB bandwidth, unlimited functions | **₹0 ($0.00)** |
| **LLM Inference** | Groq Cloud | 30 RPM, 14,400 RPD | **₹0 ($0.00)** |
| **Fallback LLM** | Google Gemini API | 15 RPM, 1,500 RPD | **₹0 ($0.00)** |
| **Vector Storage** | Embedded In-Memory (Next.js) | Local RAM (zero external hosting) | **₹0 ($0.00)** |
| **TOTAL** | | | **₹0 ($0.00 / month)** |

---

## 📚 Documentation Index

Detailed engineering documentation is located in the [`docs/`](docs/) directory:
- [PRD.md](docs/PRD.md) — Product Requirements Document
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — System Architecture & ADRs
- [HLD.md](docs/HLD.md) & [LLD.md](docs/LLD.md) — High & Low-Level Design
- [AI_ARCHITECTURE.md](docs/AI_ARCHITECTURE.md) — AI Provider Abstraction
- [RAG_ARCHITECTURE.md](docs/RAG_ARCHITECTURE.md) — In-Memory Hybrid Search
- [AGENT_TOOLS.md](docs/AGENT_TOOLS.md) — Agentic Tool Specifications
- [GUARDRAILS.md](docs/GUARDRAILS.md) & [SECURITY.md](docs/SECURITY.md) — Hallucination & Injection Defenses
- [DATA_MODEL.md](docs/DATA_MODEL.md) & [API.md](docs/API.md) — Entity & Endpoint Specifications
- [UI_UX_SPECIFICATION.md](docs/UI_UX_SPECIFICATION.md) — Design System & HUD Specs
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Step-by-Step Vercel Deployment
- [COST_ANALYSIS.md](docs/COST_ANALYSIS.md) — Free-Tier Blueprint
- [REQUIRED_USER_INPUTS.md](docs/REQUIRED_USER_INPUTS.md) — Personal Assets Checklist
- [IMPLEMENTATION_REPORT.md](docs/IMPLEMENTATION_REPORT.md) — Delivery Report

---

## 👤 Author

**Mohd Afsar**  
- **Email**: [23f2002023@ds.study.iitm.ac.in](mailto:23f2002023@ds.study.iitm.ac.in) | [mohammadafsar786921@gmail.com](mailto:mohammadafsar786921@gmail.com)  
- **GitHub**: [@AfsarAI](https://github.com/AfsarAI)  
- **Education**: Indian Institute of Technology Madras (B.S. in Data Science and Applications)  
- **Experience**: Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras
