# VerSel

**VerSel** is an AI-powered learning engine that provides personalized tutoring to each student worldwide by adapting to their level, thinking style, and misconceptions.

Instead of passive learning, VerSel forces active understanding through prediction, step-by-step reasoning, visualization, and questioning.

**Learning is not consumed — it is earned.**

## What Is VerSel?

VerSel starts assessing the student from the very beginning, not only during Q&A.
It observes where students hesitate, misunderstand, or guess correctly, and continuously adapts the explanations to their level as they progress.

The system improves the learner as they learn, not after they fail.

## How It Works

Each concept follows a strict learning loop: the student is first asked to predict, then shown a short and clear explanation, guided through the logic step by step, visualized abstractly, and finally challenged with questions. Progress is unlocked only when understanding is demonstrated.

This prevents memorization without comprehension.

## Current Status

This repository contains an early MVP focused on validating the core learning flow:

> Concept → Logic → Visual → Q&A

The goal at this stage is learning effectiveness, not feature completeness.

## Tech Stack

Built with React + Vite for speed and simplicity.

- **Fast Hot Module Replacement (HMR)**
- **Modern React setup**
- **ESLint for basic code quality**

### React Plugins

- `@vitejs/plugin-react` — React Fast Refresh using Babel (or oxc)
- `@vitejs/plugin-react-swc` — React Fast Refresh using SWC

### React Compiler

The React Compiler is not enabled by default due to its impact on development and build performance.

To enable it, see the official documentation:
[https://react.dev/learn/react-compiler/installation](https://react.dev/learn/react-compiler/installation)

## Linting & Type Safety

For production use, TypeScript with type-aware linting is recommended.

You can start from the official Vite React + TypeScript template:
[https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## Vision

VerSel aims to become a global AI learning coach that:

- Adapts to how each student thinks
- Measures real understanding, not engagement
- Works alongside teachers and institutions
- Scales high-quality education worldwide

## License

MIT License

---

**Copy & Paste Note:** This README is written in Markdown. You can copy the entire content above and paste it directly into the `README.md` file in your VerSel GitHub repository. The formatting (headers, lists, blockquotes) will render correctly on GitHub.
