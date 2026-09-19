---
id: "quizmaster"
title: "QuizMaster — Full-Stack Evaluation Platform"
subtitle: "Role-Based Quiz Engine with Real-Time Scoring & Automated Workflows"
category: "project"
tags: ["vue.js", "flask", "django rest", "sqlite", "postgresql", "rbac", "rest apis"]
featured: false
github: "https://github.com/AfsarAI"
demo: ""
video: ""
startDate: "2025-02-01"
endDate: "2025-04-30"
role: "Full Stack Developer"
updatedAt: "2026-09-19"
---

# QuizMaster — Full-Stack Evaluation Platform

## Overview
QuizMaster is a full-stack educational assessment platform designed to deliver timed, anti-cheating digital examinations and quizzes with instant automated scoring, deep analytical reporting, and role-based access control.

## Key Architecture & Features
- **Role-Based Access Control (RBAC)**: Segregated interfaces and security boundaries for Platform Administrators, Quiz Creators/Instructors, and Candidates.
- **Dynamic Assessment Engine**: Supports multiple question types (single-choice, multiple-choice, numerical, descriptive), randomized question shuffling, and client-side countdown timers with automated submission on expiry.
- **Real-Time Score Computation**: Backend evaluation microservices calculate score breakdowns, percentile rankings, and question-level difficulty metrics immediately upon test finalization.
- **Secure Authentication & Session Handling**: JWT-based stateless authentication preventing unauthorized session duplication.

## Tech Stack
- **Frontend**: Vue.js, Vue Router, Pinia/Vuex, Tailwind CSS
- **Backend**: Python, Flask / Django REST Framework
- **Databases**: SQLite (local testing), PostgreSQL (production target)
- **API Architecture**: Clean RESTful endpoints with structured payload validation
