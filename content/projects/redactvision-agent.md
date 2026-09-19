---
id: "redactvision-agent"
title: "RedactVision Agent"
subtitle: "Privacy-Preserving On-Device Browser Agent for ISRO (SIH 26171)"
category: "project"
tags: ["ai agent", "browser extension", "privacy", "typescript", "fastapi", "isro", "sih", "llm"]
featured: true
github: "https://github.com/AfsarAI/RedactVision-Agent"
demo: ""
video: ""
startDate: "2025-08-01"
endDate: "2025-10-01"
role: "Lead Systems & AI Engineer (Team ByteForce)"
updatedAt: "2026-09-19"
---

# RedactVision Agent

> **SIH 26171 — On-device Visual Perception for Light-weight Browser Agents**  
> **Client / Organization**: Indian Space Research Organisation (ISRO)  
> **Team**: ByteForce | **Category**: Software & AI Systems

## Problem
Traditional cloud-based browser automation and autonomous web agents transmit complete DOM snapshots, screenshots, and page text to remote LLM servers. This routinely leaks sensitive Personal Identifiable Information (PII)—including login credentials, session tokens, financial records, medical details, and contact information—across third-party network boundaries.

## Architecture & Solution
RedactVision Agent enforces a strict **zero-leakage privacy boundary** directly inside the user's browser:

1. **Local DOM Extraction**: Browser content script extracts the active DOM and visual metadata on-device.
2. **Local Privacy Firewall**: On-device algorithms identify and tokenize sensitive entities into anonymous semantic placeholders (e.g., `[EMAIL_01]`, `[PERSON_01]`, `[PHONE_01]`).
3. **Sanitized Remote Reasoning**: Only sanitized, anonymous tokens and safe structural metadata are transmitted to the server reasoning engine (FastAPI `/llm/plan`).
4. **Structured Action Planning**: The server LLM reasons over anonymous tokens and returns structured JSON actions (`click`, `type`, `scroll`, `wait`, `navigate`).
5. **Local Validation & Token De-anonymization**: The browser extension validates action safety, maps synthetic tokens back to real local values on-device, and executes the action natively in the page. Raw PII never crosses the wire.

## Tech Stack
- **Frontend / Extension**: TypeScript, Manifest V3 Browser Extension, Vanilla DOM APIs
- **Backend Service**: Python, FastAPI, Pydantic
- **AI & Reasoning**: Groq Llama 3 / LLM Function Calling, Structured JSON output schemas
- **Privacy & Security**: On-device regex & heuristic entity tokenizers, strict action allowlisting

## Key Features & Highlights
- **Zero Raw PII Exposure**: Sanitizes DOM on-device before any external network request.
- **Bi-directional Token Mapping**: Reconstructs localized input actions on the client without exposing credentials.
- **Resilient Action Executor**: Safe execution pipeline prevents malicious prompt injections from triggering unauthorized browser behaviors.
- **Built for ISRO Specification**: Designed specifically for mission-critical, high-compliance enterprise environments.
