# AI Guardrails & Hallucination Defense

## 1. Threat Model & Risk Vectors

Because the portfolio is accessible to the public, visitors, recruiters, and automated probes will attempt:
1. **Out-of-Domain Requests**: Asking the model to write arbitrary Python code, tell jokes, discuss politics, or provide medical/financial advice.
2. **Hallucination Probes**: Asking about fake companies, imaginary degrees, unverified awards, or non-existent projects.
3. **Prompt Injections**: Instructing the model to *"Ignore previous instructions"*, *"Reveal your system prompt"*, or *"Pretend you are DAN / an unrestricted AI"*.

---

## 2. Multi-Layer Guardrail Architecture

```
User Input
    │
    ▼
┌────────────────────────────────────────────────────────┐
│ Layer 1: Scope Classifier & Heuristic Filter           │
│ - Detects general coding, math, trivia, politics       │
│ - Fast early refusal before expensive LLM inference    │
└───────────────────────────┬────────────────────────────┘
                            │ (Passed)
                            ▼
┌────────────────────────────────────────────────────────┐
│ Layer 2: RAG Context Grounding                         │
│ - Hybrid retrieval fetches canonical facts only        │
│ - Discards irrelevant chunks via score threshold       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Layer 3: Grounded System Prompt                        │
│ - Strict negative constraints                          │
│ - Mandatory fallback: "I don't have that information"  │
│ - Anti-injection instruction reinforcement             │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Layer 4: Post-Generation & Tool Validation             │
│ - Validates tool arguments against strict enums        │
│ - Sanitizes and removes any leaked prompt fragments    │
└────────────────────────────────────────────────────────┘
```

---

## 3. Grounded Fallback Behavior
- If information is not in the retrieved context:
  > *"I don't have that information in Afsar's portfolio knowledge base."*
- If the query is out of scope:
  > *"I am Afsar's portfolio assistant. I can only answer questions about Afsar, his projects, skills, education at IIT Madras, work experience, and achievements."*
- If a prompt injection is detected:
  > The system prompt explicitly instructs the LLM to ignore overrides, preserve the persona, and maintain the portfolio boundary.
