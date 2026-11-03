# AI-Native Agentic Portfolio — Mohd Afsar

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue.svg?style=flat-square)](LICENSE)
[![Cost](https://img.shields.io/badge/Infrastructure_Cost-Usage--Dependent-emerald?style=flat-square)](#cost-analysis)

> 🚀 **Live Portfolio:** [https://afsar-ai.vercel.app/](https://afsar-ai.vercel.app/)
>
> 📦 **GitHub Repository:** [https://github.com/AfsarAI/afsar-ai](https://github.com/AfsarAI/afsar-ai)

An AI-native, interactive personal portfolio for **Mohd Afsar**, a Data Science undergraduate at **IIT Madras**, a Full Stack Intern at the **Sudha Gopalakrishnan Brain Centre (SGBC)**, and Lead AI Engineer for the **RedactVision** SIH browser-agent project.

The portfolio combines a modern web interface, Retrieval-Augmented Generation (RAG), LLM integration, and agentic UI interactions to provide an interactive way for visitors to explore my professional profile.

---

## 🌐 Live Deployment & Community Feedback

### 🚀 Production Deployment

- **Live URL:** [https://afsar-ai.vercel.app/](https://afsar-ai.vercel.app/)
- **Hosting Platform:** Vercel (Hobby Plan).
- **Deployment Workflow:** Automated deployment through the connected Git repository.
- **AI Agent Integration:** Configured with the official [Vercel Plugin](https://github.com/vercel/vercel-plugin) for development assistance and Next.js/Vercel architecture validation.

### ⚠️ Reporting Deployment Issues

If the deployed website becomes unavailable, fails to load, or experiences any unexpected issues, please contact me so I can investigate and resolve them.

- **Academic Email:** [23f2002023@ds.study.iitm.ac.in](mailto:23f2002023@ds.study.iitm.ac.in)
- **Personal Email:** [mohammadafsar786921@gmail.com](mailto:mohammadafsar786921@gmail.com)
- **WhatsApp:** [+91 8604766241](https://wa.me/918604766241)

### 💬 Feedback, Bug Reports & Collaboration

I welcome feedback, bug reports, UI/UX suggestions, and collaboration ideas.

You can reach me through either of the following channels:

1. **Website Feedback Form:** Visit the [Contact & Feedback Section](https://afsar-ai.vercel.app/#contact). Select a feedback category and send your message through WhatsApp or email.
2. **Direct Contact:** Reach out using the email addresses or WhatsApp link provided above.

### 🔒 Security & Secrets Management

- Private credentials and environment files, including `.env` and `.env.local`, are excluded through `.gitignore`.
- Only placeholder environment configuration files are intended to be committed.
- Vercel configuration caches and local AI-agent configuration directories are excluded from version control.
- API credentials are handled through server-side environment variables rather than exposed in client-side JavaScript.

For additional details, see [SECURITY.md](SECURITY.md).

---

## 🌟 Key Features

- **🤖 Grounded AI Assistant — Afsar AI:** An AI assistant designed exclusively to answer questions about my professional profile using verified portfolio information. It handles out-of-scope questions, attempts to resist prompt injection, and communicates when relevant information is unavailable.

- **⚡ Agentic UI Navigation:** The assistant can interact with the portfolio interface through allowlisted actions such as `openSection`, `openProject`, `openResume`, and `openExternalLink`.

- **🔍 Hybrid Retrieval-Augmented Generation (RAG):** Combines BM25 lexical ranking with dense-vector cosine similarity and Reciprocal Rank Fusion to retrieve relevant portfolio information.

- **🛡️ Multi-Layer Guardrails:** Includes input validation, scope classification, grounded system instructions, tool-parameter allowlists, and IP-based sliding-window rate limiting.

- **🎨 Interactive Developer Interface:** Features a dark visual theme, glassmorphism-inspired panels, interactive suggestion chips, and responsive layouts.

- **📄 Structured Knowledge Source:** Portfolio information is maintained in structured Markdown files under `content/`, with Zod-based schema validation.

---

## 🏗️ Architecture Overview

```text
                  ┌──────────────────────────────────┐
                  │     Canonical Portfolio Content  │
                  │  content/{profile,projects,links}│
                  └────────────────┬─────────────────┘
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
       ┌─────────────────────┐            ┌──────────────────────┐
       │ Static Site         │            │ Knowledge Index      │
       │ Generation          │            │ Build Script         │
       │ Next.js Server      │            │ index-knowledge      │
       └──────────┬──────────┘            └──────────┬───────────┘
                  │                                  │
                  │                                  ▼
                  │                       ┌──────────────────────┐
                  │                       │ knowledge-index.json │
                  │                       │ Chunks + BM25        │
                  │                       │ + Embeddings         │
                  │                       └──────────┬───────────┘
                  │                                  │
                  ▼                                  ▼
       ┌──────────────────────────────────────────────────────┐
       │                 Next.js 15 App Router                 │
       │                                                      │
       │  ┌────────────────────┐  ┌────────────────────────┐  │
       │  │ UI Component Layer │  │ Server API Layer       │  │
       │  │                    │  │                        │  │
       │  │ Hero / Command HUD │◄►│ /api/chat (Streaming)  │  │
       │  │ Portfolio Sections │  │ /api/search            │  │
       │  │ Chat Dialog        │  │ Hybrid RAG              │  │
       │  │ Agent Tools        │  │ Guardrails / Limiter    │  │
       │  └────────────────────┘  └───────────┬────────────┘  │
       └─────────────────────────────────────┼────────────────┘
                                             │
                                             ▼
                                ┌───────────────────────────┐
                                │ LLM Provider Abstraction  │
                                │                           │
                                │ Groq / Gemini /           │
                                │ OpenRouter / MockProvider │
                                └───────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Lucide React, clsx, tailwind-merge |
| **AI & LLM** | Groq Cloud (`llama-3.3-70b-versatile`), Google Gemini (`gemini-2.5-flash`), OpenRouter, MockProvider |
| **RAG & Search** | Semantic Markdown Chunking, BM25 Lexical Ranking, Dense Vector Similarity, Reciprocal Rank Fusion |
| **Validation & Schema** | Zod, Gray-Matter |
| **Security** | In-Memory Sliding-Window Rate Limiter, Prompt Injection Filtering, Tool Parameter Allowlists |
| **Testing** | Vitest, AI Evaluation Benchmark Suite (21 automated test cases) |
| **Deployment** | Vercel |

---

## 🤖 Agent Tools

The AI assistant can invoke predefined, allowlisted actions to interact with the portfolio interface.

| Tool | Parameters | Description |
|---|---|---|
| `openSection` | `section: 'about' \| 'projects' \| 'experience' \| 'education' \| 'skills' \| 'achievements' \| 'contact'` | Scrolls to and highlights a portfolio section. |
| `openProject` | `projectId: 'redactvision-agent' \| 'stroke2d' \| 'civic-services-platform' \| 'quizmaster'` | Opens the architectural details modal for a project. |
| `openResume` | None | Opens or downloads the verified PDF resume. |
| `openExternalLink` | `platform: 'github' \| 'linkedin' \| 'leetcode' \| 'email'` | Navigates to a verified external profile or contact destination. |

---

## 🚀 Quickstart — Local Development

### Prerequisites

- Node.js (compatible with the project's Next.js version).
- npm.
- Git.

### 1. Clone the Repository

```bash
git clone https://github.com/AfsarAI/afsar-ai.git
cd afsar-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Optionally, configure a Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
```

You can obtain an API key from [Groq Console](https://console.groq.com/).

If the API key is not configured, the application is intended to use its built-in deterministic `MockProvider`, subject to the application's current provider configuration.

Never commit real API keys or private credentials.

### 4. Validate and Build the Knowledge Index

```bash
npm run knowledge:validate
npm run knowledge:index
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the following URL in your browser:

[http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing & Verification

Run the following commands to verify the application.

### Unit Tests

```bash
npm run test
```

### AI Evaluation Suite

```bash
npm run test:ai
```

The AI evaluation suite covers in-scope and out-of-scope questions, hallucination handling, prompt injection scenarios, and agent-tool behavior.

### Production Build

```bash
npm run build
```

---

## 💰 Cost Analysis

The project is designed to minimize infrastructure costs by using server-side retrieval and avoiding a separately hosted vector database.

The actual monthly cost depends on hosting usage, LLM provider selection, API consumption, and the applicable free-tier or paid-plan limits.

| Component | Provider / Approach | Cost Consideration |
|---|---|---|
| **Frontend Hosting** | Vercel | Depends on the applicable plan and usage. |
| **LLM Inference** | Groq Cloud | Depends on API limits and usage. |
| **Fallback LLM** | Google Gemini API | Depends on API limits and usage. |
| **Alternative Provider** | OpenRouter | Depends on the selected model and usage. |
| **Vector Retrieval** | In-memory application-side retrieval | No separate vector database subscription is required by this architecture. |
| **Total** | Usage-dependent | Can be ₹0 within applicable free allowances; not guaranteed. |

---

## 📚 Documentation Index

Detailed technical documentation is available in the [`docs/`](docs/) directory.

| Document | Description |
|---|---|
| [PRD.md](docs/PRD.md) | Product Requirements Document |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | System Architecture and Architecture Decision Records |
| [HLD.md](docs/HLD.md) | High-Level Design |
| [LLD.md](docs/LLD.md) | Low-Level Design |
| [AI_ARCHITECTURE.md](docs/AI_ARCHITECTURE.md) | AI Provider Abstraction |
| [RAG_ARCHITECTURE.md](docs/RAG_ARCHITECTURE.md) | In-Memory Hybrid Retrieval Architecture |
| [AGENT_TOOLS.md](docs/AGENT_TOOLS.md) | Agent Tool Specifications |
| [GUARDRAILS.md](docs/GUARDRAILS.md) | AI Guardrails and Safety Controls |
| [SECURITY.md](SECURITY.md) | Security Architecture and Policies |
| [DATA_MODEL.md](docs/DATA_MODEL.md) | Data Model |
| [API.md](docs/API.md) | API Specifications |
| [UI_UX_SPECIFICATION.md](docs/UI_UX_SPECIFICATION.md) | UI/UX Design System |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment Guide |
| [COST_ANALYSIS.md](docs/COST_ANALYSIS.md) | Infrastructure Cost Analysis |
| [REQUIRED_USER_INPUTS.md](docs/REQUIRED_USER_INPUTS.md) | Personal Assets Checklist |
| [IMPLEMENTATION_REPORT.md](docs/IMPLEMENTATION_REPORT.md) | Implementation Report |

---

## 📜 License & Attribution

This project is licensed under the **Apache License, Version 2.0**.

You may use, reproduce, modify, distribute, and deploy this project, including for commercial purposes, subject to the terms and conditions of the license.

Please:

- Preserve the original copyright and applicable attribution notices.
- Include the original `LICENSE` file when redistributing the project.
- Preserve the attribution notices in the `NOTICE` file as required by the license.
- Clearly identify modified files and distinguish your changes from the original implementation.

If you use this project as a reference or build a derivative project, I would appreciate an additional visible acknowledgement in your README, including:

**Original Author:** Mohd Afsar  
**Original Repository:** [https://github.com/AfsarAI/afsar-ai](https://github.com/AfsarAI/afsar-ai)

The README acknowledgement is a request for attribution; the binding requirements are those specified in the Apache License 2.0.

See [LICENSE](LICENSE) and [NOTICE](NOTICE) for details.

---

## 👤 Author

**Mohd Afsar**

- **Academic Email:** [23f2002023@ds.study.iitm.ac.in](mailto:23f2002023@ds.study.iitm.ac.in)
- **Personal Email:** [mohammadafsar786921@gmail.com](mailto:mohammadafsar786921@gmail.com)
- **GitHub:** [@AfsarAI](https://github.com/AfsarAI)
- **Education:** Indian Institute of Technology Madras — B.S. in Data Science and Applications
- **Experience:** Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras

---

*This is an experimental personal portfolio project and its first published version. It was developed with substantial AI assistance. Further improvements and enhancements are planned as time permits.*

