# Local Development Guide

## 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22.23)
- **Package Manager**: npm or pnpm
- **Git**: v2.40+

---

## 2. Quickstart Setup

### Step 1: Clone or Navigate to Directory
```bash
cd /home/afsarai/AfsarPortfolio
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(Optional: Add your `GROQ_API_KEY` or `GEMINI_API_KEY`. If left empty, the application runs on the deterministic `MockProvider` automatically).*

### Step 4: Validate and Index Canonical Knowledge
```bash
npm run knowledge:validate
npm run knowledge:index
```

### Step 5: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Available Scripts
- `npm run dev`: Starts Next.js development server with Fast Refresh.
- `npm run build`: Builds production bundle with static page generation and type checking.
- `npm run start`: Runs production server locally.
- `npm run lint`: Runs ESLint checks.
- `npm run test`: Runs unit and integration test suites.
- `npm run test:ai`: Runs AI evaluation benchmark across 5 test categories.
- `npm run knowledge:validate`: Validates markdown content files against Zod schemas.
- `npm run knowledge:index`: Generates pre-computed RAG search index in `data/knowledge-index.json`.
