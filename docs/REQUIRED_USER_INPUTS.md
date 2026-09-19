# Required and Optional User Inputs

This document tracks all personal information, assets, links, and credentials needed for the AI-Native Agentic Portfolio.

---

## 1. Information Already Extracted from Local Files

We automatically discovered and extracted the following factual information from your local files (`/home/afsarai/Downloads/Mohd_Afsar_Resume.pdf`, `RedactVision-Agent` repository, and `Civic Services Platform` documentation). **You do not need to provide these again:**

* **Full Name:** Mohd Afsar (Preferred display name: **Mohd Afsar** / **Afsar**)
* **Title:** AI & Full Stack Engineer | Data Science Undergraduate @ IIT Madras
* **Primary Email:** `23f2002023@ds.study.iitm.ac.in` / `mohammadafsar786921@gmail.com`
* **Phone:** `+91 8604766241`
* **GitHub Profile:** `https://github.com/AfsarAI`
* **Education:**
  * **Indian Institute of Technology Madras (IIT Madras)**: B.S. in Data Science and Applications (May 2023 – Jan 2027), CGPA: 8.05/10. Coursework: Data Structures & Algorithms, DBMS, Object-Oriented Programming, Machine Learning, Deep Learning.
  * **Jawahar Navodaya Vidyalaya, Ambedkar Nagar**: Senior Secondary (PCM) (Aug 2015 – May 2022).
* **Work Experience:**
  * **Full Stack Developer Intern** (17 Nov 2025 – 16 May 2026), **Sudha Gopalakrishnan Brain Centre (SGBC), IIT Madras**:
    * Features for OpenAtlas Editor (Angular, Django, PostgreSQL).
    * Developed **Stroke2D**, a research visualization tool for mapping histology and MRI images to analyze stroke regions.
    * Image-alignment & stroke annotation using Vanilla JavaScript, HTML, CSS.
  * **Group Leader** (Sep 2023 – Aug 2024), **Kaziranga House, IITM BS Program**:
    * Mentored 100+ students in coding and machine learning study circles.
* **Featured Projects:**
  * **RedactVision Agent**: Privacy-preserving, on-device browser agent for ISRO (Smart India Hackathon SIH 26171, Team ByteForce). Intercepts DOM text, tokenizes PII locally before sending sanitized context to server-side LLM planner.
  * **Stroke2D (SGBC IIT Madras)**: Brain histology & MRI image alignment and stroke-annotation platform for clinical research.
  * **Civic Services Platform**: Pothole reporting and municipal resolution tracking system with citizen photo/geo-location submission and admin workflow.
  * **QuizMaster**: Role-based full-stack quiz platform with automated evaluation, Django REST/Flask, PostgreSQL/SQLite, Vue.js.
* **Technical Skills:**
  * **Languages:** Java, Python, JavaScript, TypeScript, SQL
  * **Frameworks:** React, Next.js, Angular, Vue.js, Django, Flask, FastAPI, Tailwind CSS
  * **Databases:** PostgreSQL, SQLite
  * **AI/ML & Core CS:** PyTorch, Scikit-Learn, Pandas, NumPy, Prompt Engineering, DSA, DBMS, OOP, System Design
  * **Tools:** Git, GitHub, Linux, VS Code, IntelliJ IDEA
* **Achievements:**
  * 300+ Data Structures & Algorithms problems solved across LeetCode and competitive programming platforms.

---

## 2. Optional / Recommended Inputs

If you would like to provide any of the following to further customize your portfolio, place them in the specified paths. All items below have safe fallbacks if not provided:

| Item | Status | Purpose | Where to Provide |
| :--- | :--- | :--- | :--- |
| **Profile Photo** | Recommended | Displayed in Hero & About sections | Place an image at `public/images/profile.png` (or `.jpg`) |
| **LinkedIn URL** | Recommended | External link in header & contact | Update `content/links/links.md` (e.g. `https://linkedin.com/in/your-username`) |
| **LeetCode Profile URL**| Recommended | External link in header & achievements | Update `content/links/links.md` (e.g. `https://leetcode.com/u/your-username`) |
| **Project Demo Video / Links** | Optional | Interactive demos for RedactVision, Stroke2D, QuizMaster | Add live URLs to `content/projects/*.md` |
| **Custom Domain** | Optional | Custom production domain | Configure in Vercel/Cloudflare when deploying |

---

## 3. Required Credentials & API Keys

The portfolio includes an **LLM Provider Abstraction** supporting Groq, Google Gemini, and OpenRouter, plus a deterministic **Mock Provider** for zero-key local testing.

To enable live AI chat:

1. **Groq API Key (Recommended for high speed & free tier)**:
   - **Why needed:** Powers ultra-fast grounded AI chat using `qwen/qwen3.8-27b`.
   - **Cost:** Free tier ($0/month, generous rate limits).
   - **Where to store:** Add `GROQ_API_KEY=gsk_...` in `.env.local`.
   - **Notice:** Never commit `.env.local` to Git.

2. **Google Gemini API Key (Alternative)**:
   - **Why needed:** Powers Google Gemini 2.5 Flash / 2.0 Flash chat and embeddings.
   - **Cost:** Free tier ($0/month).
   - **Where to store:** Add `GEMINI_API_KEY=...` in `.env.local`.

3. **OpenRouter API Key (Alternative)**:
   - **Where to store:** Add `OPENROUTER_API_KEY=...` in `.env.local`.

If no key is configured, the application automatically activates the **Mock Provider** so you can develop, test, and browse the site completely offline without errors.
