# Agent Tools Specification

## 1. Overview
A core differentiator of the AI-Native Agentic Portfolio is the assistant's ability to **act as an interactive interface controller**. Rather than merely generating static text, the AI invokes allowlisted client tools that manipulate the portfolio UI in real time.

---

## 2. Tool Definitions & Schemas

### 2.1 `openSection`
Navigates or smooth-scrolls the browser viewport to a specified portfolio section.

- **Parameters**:
  - `section` (string, enum):
    - `"about"`: About Afsar
    - `"projects"`: Featured & all projects grid
    - `"experience"`: SGBC internship & leadership timeline
    - `"education"`: IIT Madras & JNV education history
    - `"skills"`: Technical skills matrix
    - `"achievements"`: Competitive programming & milestones
    - `"contact"`: Contact card & socials
- **Client Execution**:
  - Highlights the section in the UI.
  - Smooth-scrolls the section into focus.
  - Renders an action badge: *[Navigated to {Section}]*.

### 2.2 `openProject`
Opens the deep-dive modal for a specific project.

- **Parameters**:
  - `projectId` (string, enum):
    - `"redactvision-agent"`: ISRO SIH Browser Agent
    - `"stroke2d"`: SGBC Histology & MRI alignment tool
    - `"civic-services-platform"`: Pothole reporting & resolution platform
    - `"quizmaster"`: Role-based evaluation platform
- **Client Execution**:
  - Triggers the dialog modal for the given project ID with architectural breakdown, diagrams, and links.
  - Renders an action badge: *[Opened Project Modal: {Title}]*.

### 2.3 `openResume`
Triggers the download or opens the verified resume PDF in a new tab.

- **Parameters**: None.
- **Client Execution**:
  - Opens `/resume.pdf` in a browser window or downloads.
  - Renders an action badge: *[Opened Resume]*

### 2.4 `openExternalLink`
Navigates to verified external profiles.

- **Parameters**:
  - `platform` (string, enum):
    - `"github"`: Opens `https://github.com/AfsarAI`
    - `"linkedin"`: Opens LinkedIn profile
    - `"leetcode"`: Opens LeetCode profile
    - `"email"`: Launches mailto composer

---

## 3. Tool Safety & Guardrails
- **Strict Allowlists**: Every tool parameter is verified against a strict Zod enum. Any unrecognized parameter (e.g. `openSection("deleteEverything")` or `executeScript(...)`) is immediately rejected server-side.
- **No Arbitrary Execution**: The assistant has zero capability to execute arbitrary code, shell commands, or unverified URLs.
