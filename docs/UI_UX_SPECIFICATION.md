# UI / UX Specification & Design System

## 1. Product & UX Philosophy

The product is an **AI-Native Portfolio Assistant**:
- **Primary Experience**: A ChatGPT/Gemini-like conversational interface designed specifically to answer questions about Mohd Afsar and assist visitors in exploring his portfolio.
- **Secondary Experience**: A rich, traditional developer portfolio accessible via navigation or AI agentic tool calls.
- **Above-the-Fold Principle**: Generous whitespace, centered AI interaction, zero clutter. The first viewport contains only the brand header, greeting, prominent chat input, and 5 verified suggestion chips.

---

## 2. Visual Design System

### 2.1 Color Palette
- **Canvas / Background**: `#0b0d11` (Refined, deep charcoal; calm and distraction-free)
- **Surface Elevation 1 (Panels & Message Bubbles)**: `#13161c`
- **Surface Elevation 2 (Inputs & Cards)**: `#1a1e26`
- **Surface Elevation 3 (Hover States & Active Pills)**: `#242934`
- **Borders & Dividers**: Subtle slate `#222733`, hover `#323846`
- **Primary Accent (Indigo/Blue-Violet)**: `#6366f1` / `#818cf8` (Restrained, modern AI accent; replaces saturated cyan/green neon)
- **Text Primary**: `#f3f4f6` (Crisp, high-contrast off-white)
- **Text Muted**: `#949ca8` (Slate gray for comfortable reading)

### 2.2 Typography
- **Headings & Body**: `Inter`, system-ui, sans-serif
- **Code & Metadata**: `JetBrains Mono`, monospace
- **Typographic Scale**: Restrained heading sizes, generous line-heights (`1.6`–`1.7`), balanced hierarchy.

---

## 3. Interaction Modes & Views

### 3.1 Mode 1: ASK AI (Primary)
- **Initial Landing View**:
  - Greeting Badge: `Afsar AI · Interactive Portfolio Assistant`
  - Heading: `Hi, I'm Afsar 👋`
  - Subtitle: `Ask anything about my projects, engineering background, skills, or portfolio.`
  - Central Input: Auto-resizing textarea with clean send button, Enter to send, Shift+Enter for newline.
  - Suggestion Chips:
    - `[ Who is Afsar? ]`
    - `[ What projects has he built? ]`
    - `[ What technologies does he use? ]`
    - `[ Tell me about RedactVision Agent ]`
    - `[ What is his education? ]`
  - Discrete Explore Link: `Prefer browsing normally? Explore Portfolio ↓`
- **Active Chat View**:
  - Expands smoothly into full viewport chat stream.
  - Assistant message formatting: streaming pulse cursor, markdown lists/code, copy action.
  - Tool execution badges: `✦ Opened Projects Section`, `✦ Opened Project: RedactVision Agent`.
  - Source citations: Clickable cards linking to the corresponding section.
  - Follow-up chips: Quick continuation options after answers.

### 3.2 Mode 2: EXPLORE PORTFOLIO (Secondary)
- **Header Banner**: Explains manual mode with 1-click `Return to AI Chat` button.
- **Featured Projects**: Interactive category filters (`All`, `AI & Agents`, `Neuroimaging`, `Full Stack`), project cards, and deep-dive architecture modal.
- **About**: Engineering background and key technical pillars.
- **Experience**: Timeline detailing SGBC IIT Madras internship and student leadership.
- **Education**: IIT Madras B.S. in Data Science (CGPA 8.05) and JNV.
- **Skills**: Categorized technology pills with clean border hover states.
- **Contact**: Verified academic email with 1-click copy, GitHub, LinkedIn, LeetCode, and phone.
- **Floating Button**: Bottom-right `Ask Afsar AI` button to return to chat anytime without losing session state.
