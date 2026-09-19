---
id: "civic-services-platform"
title: "Civic Services Platform"
subtitle: "Pothole Reporting, Dispatch & Resolution Lifecycle Platform"
category: "project"
tags: ["civic tech", "workflow automation", "full stack", "gis", "mobile-first", "rest apis"]
featured: true
github: "https://github.com/AfsarAI"
demo: ""
video: ""
startDate: "2024-08-01"
endDate: "2024-11-30"
role: "Full Stack Architect & Developer"
updatedAt: "2026-09-19"
---

# Civic Services Platform — Pothole Reporting & Resolution System

## Overview
Municipal road maintenance often suffers from fragmented reporting channels (untracked phone calls, WhatsApp messages, paper grievances), leading to delayed repairs, duplicate submissions, zero citizen transparency, and poor administrative accountability.

The **Civic Services Platform** provides a structured, verifiable lifecycle management system for public infrastructure repairs.

## System Workflow & Perspectives
1. **Citizen Portal (Reporter)**:
   - Captures road defects on mobile with geo-tagged photographic evidence, automatic GPS coordinate tagging, and descriptive notes.
   - Provides real-time status tracking (`Submitted` → `Assigned` → `In Progress` → `Resolved` → `Closed`).
2. **Municipal Admin Dashboard (Triage & Dispatch)**:
   - Aggregates incoming reports onto an interactive GIS map.
   - Detects duplicate complaints within configurable spatial radiuses.
   - Dispatches work orders directly to designated field engineers with SLA deadlines.
3. **Field Engineer / Crew View**:
   - Receives prioritized work tickets with location navigation.
   - Updates status to `In Progress` upon site arrival and uploads verified after-repair photo proof to transition to `Resolved`.
4. **Citizen Verification & Closure**:
   - The reporting citizen inspects the resolution evidence, approves the work or requests re-inspection, and leaves rating feedback.

## Key Features & Architecture
- **Role-Based Access Control (RBAC)**: Distinct authorization boundaries for Citizens, Municipal Officials, and Field Technicians.
- **Deduplication Engine**: Geospatial proximity clustering prevents multiple submissions for the same pothole from creating redundant dispatch tickets.
- **Evidence Verification**: Mandatory photographic before-and-after proof ensures transparent audit trails.
