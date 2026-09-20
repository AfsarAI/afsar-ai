# Production Deployment Guide ($0/Month)

Follow this step-by-step guide to deploy the AI-Native Agentic Portfolio to **Vercel** on the 100% free Hobby tier.

---

## 1. Create Required Accounts
1. **GitHub Account**: If not already logged in, sign in to [GitHub](https://github.com).
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub credentials.
3. **Groq Cloud Account**: Register for free at [console.groq.com](https://console.groq.com) and create an API Key (named e.g. `Portfolio-Agent`).

---

## 2. Push Code to GitHub
Initialize and push the repository to GitHub:
```bash
git init
git add .
git commit -m "feat: complete AI-native agentic portfolio for Mohd Afsar"
gh repo create AfsarAI/AfsarPortfolio --public --source=. --remote=origin --push
```

---

## 3. Deploy on Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New Project"** and select your repository: `AfsarAI/AfsarPortfolio`.
3. In **Build & Development Settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Expand **Environment Variables** and add:
   - `GROQ_API_KEY`: Your Groq API key (`gsk_...`)
   - `AI_PROVIDER`: `groq`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-portfolio.vercel.app` (update after deployment)
5. Click **"Deploy"**.

---

## 4. Configure Database & Vector Store
- **None Required!** The hybrid vector and BM25 index is generated at build time (`npm run knowledge:index`) and bundled in-memory into the serverless deployment. There is zero external database to configure, maintain, or pay for.

---

## 5. Verify Deployment
Once the build completes:
1. Visit your live `.vercel.app` URL.
2. Verify the AI Chat:
   - Ask: *"Who is Afsar?"* -> Check that grounded response streams back with citations.
   - Ask: *"Open his projects"* -> Check that the UI scrolls/navigates to projects.
   - Ask: *"Who is the president of France?"* -> Check that the out-of-scope refusal triggers.
3. Check mobile view on your smartphone to ensure zero horizontal overflow and responsive chat HUD.

---

## 6. Configure Custom Domain (Optional)
1. Go to Project Settings > **Domains** in Vercel.
2. Enter your domain (e.g. `mohadafsar.dev` or `afsar.ai`).
3. Follow the DNS instructions (add CNAME `cname.vercel-dns.com` or A record `76.76.21.21`).
4. Update `NEXT_PUBLIC_SITE_URL` in your Vercel Environment Variables.

---

## 7. Future Content Updates
Whenever you want to add a project, skill, or achievement:
1. Edit the relevant file in `content/projects/` or `content/profile/`.
2. Commit and push to GitHub:
   ```bash
   git add content/
   git commit -m "content: update project details"
   git push origin main
   ```
3. Vercel automatically re-runs `npm run build` (which re-validates and re-indexes the knowledge base) and deploys within 60 seconds!

---

## 8. Troubleshooting Common Deployment Failures
- **Build fails on type check**: Run `npm run build` locally first to catch any TypeScript errors.
- **AI returns "Something went wrong"**: Verify that `GROQ_API_KEY` is set in Vercel Environment Variables and that the key is valid on [console.groq.com](https://console.groq.com).
- **Tool calls not firing**: Verify that the browser console has no JavaScript errors and that the active model supports structured outputs.

---

## 9. Live Production Status & Monitoring

- **Live URL**: [https://afsar-ai.vercel.app/](https://afsar-ai.vercel.app/)
- **Vercel Project Dashboard**: [afsar-ai on Vercel](https://vercel.com/afsarais-projects/afsar-ai)
- **Vercel Agent Plugin**: Integrated via `npx plugins add vercel/vercel-plugin` to enable 36 development skills, deployment diagnostic agents, and real-time guardrails for AI coding agents.

### ⚠️ Public URL Downtime & Feedback Policy
Agar deployed link kabhi down ho, DNS resolve na ho, ya technical issue aaye:
- Email: `23f2002023@ds.study.iitm.ac.in` / `mohammadafsar786921@gmail.com`
- WhatsApp: `+91 8604766241` (Direct link: https://wa.me/918604766241)
- Interactive Feedback: Available directly on the portfolio [Contact Section](https://afsar-ai.vercel.app/#contact) with instant dispatch to WhatsApp and Email.

### 🔒 Secrets & Security Hygiene
- Local environment files (`.env`, `.env.local`), Vercel cache (`.vercel/`), and AI agent configs (`.claude/`, `.codex/`, `.grok/`, `.copilot/`) are strictly listed in `.gitignore`. They must **NEVER** be committed or pushed to GitHub.
