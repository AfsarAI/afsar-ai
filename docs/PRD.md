# Product Requirements Document (PRD): AI-Native Agentic Portfolio

## 1. Executive Summary
The **AI-Native Agentic Portfolio** is a next-generation personal portfolio for **Mohd Afsar**, an AI and software engineer studying Data Science at IIT Madras. Unlike standard portfolios that bolt on an untrusted, general-purpose chatbot, this application delivers a deeply integrated, dual-mode experience:
1. **A Grounded AI Assistant ("Afsar AI")**: Exclusively knowledgeable about Afsar's verified academic background, projects, internship at SGBC IIT Madras, leadership, and technical skills. It refuses out-of-domain queries, resists prompt injection, and executes safe UI actions.
2. **Interactive Manual Portfolio**: A modern, responsive, accessible, dark-mode first interface showcasing rich project deep-dives, interactive skill matrices, work timelines, and verified links.
3. **Agentic Interface Bridge**: The AI can manipulate the UI (scrolling to sections, opening project modals, launching the resume) upon user request.

---

## 2. Target Personas
1. **Technical Recruiters & Hiring Managers**: Seeking rapid verification of education (IIT Madras), skills (Python, TypeScript, React, Django), and experience (SGBC internship).
2. **Engineering Leads & Senior Engineers**: Evaluating architectural depth, code quality, agentic reasoning implementations (RedactVision Agent), and problem-solving capability.
3. **Research Collaborators & Academics**: Reviewing neuroimaging alignment tools (Stroke2D), scientific software contributions, and ML proficiency.

---

## 3. Core Functional Requirements

### 3.1 AI Chat & Grounding
- **Strict Domain Boundary**: Answers ONLY questions concerning Afsar and his portfolio. Politeness refusal for out-of-scope prompts (e.g. general coding, trivia, current events).
- **Zero-Hallucination Mandate**: For unknown personal facts, the assistant must state: *"I don't have that information in Afsar's portfolio."*
- **Streaming Responses**: Real-time token streaming with sub-200ms TTFT (Time-to-First-Token).
- **Source Attribution**: Explicit citations referencing canonical content documents with clickable navigation badges.

### 3.2 Agentic UI Control (Tools)
- Allowlisted client-action execution:
  - `openSection(section)`: Navigates to About, Projects, Experience, Education, Skills, Achievements, Contact.
  - `openProject(projectId)`: Opens detailed modal for RedactVision Agent, Stroke2D, Civic Services Platform, or QuizMaster.
  - `openResume()`: Downloads/views the verified resume PDF.
  - `openExternalLink(platform)`: Opens verified GitHub, LinkedIn, LeetCode, or email.

### 3.3 Manual Exploration Interface
- **Hero & Command HUD**: Interactive input with suggested prompt pills and seamless toggle between Chat view and Manual Portfolio view.
- **Project Deep-Dives**: Filterable grid with architecture breakdowns, problem/solution narratives, technology tags, and repository links.
- **Experience Timeline**: Detailed breakdown of SGBC IIT Madras internship (OpenAtlas & Stroke2D) and student leadership.
- **Education & Skills Matrix**: Verified IIT Madras B.S. Data Science degree details (CGPA 8.05) and grouped skill taxonomy.

---

## 4. Non-Functional Requirements
- **Cost**: ₹0 / $0 per month infrastructure cost utilizing free-tier providers (Groq/Gemini, Vercel/Netlify, embedded serverless RAG).
- **Performance**: Lighthouse score >= 95 in Performance, Accessibility, Best Practices, and SEO.
- **Security**: Zero client-side API keys, in-memory IP-based rate limiting, input size limits (max 500 characters), and prompt injection resistance.
- **Accessibility**: WCAG 2.1 AA compliance, semantic HTML5, keyboard navigability, high contrast ratios, screen reader compatibility.
