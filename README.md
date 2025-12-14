VerSel

VerSel is an AI assistant coach that provides customized tutoring by adapting to each student’s thinking style, level, and misconceptions.
Instead of passively consuming content, students must predict, practice, and prove understanding before progressing.

VerSel is built to make learning active, visual, and impossible to fake.

What VerSel Does

Starts every lesson by asking the student to predict first

Explains concepts using short, simple visual explanations

Forces students to practice immediately

Blocks progress until real understanding is demonstrated

Adapts explanations based on how the student struggles

VerSel is not a chatbot.
VerSel is not a video platform.
VerSel is a learning engine.

Current Status

This repository contains an early prototype (V1) focused on validating the core learning loop:

Predict → Explain → Prove → Unlock

At this stage, the priority is learning effectiveness and user feedback, not polish.

Tech Stack

Built with React + Vite for a fast and minimal development setup.

This setup provides:

Fast Hot Module Replacement (HMR)

Modern React tooling

ESLint for basic code quality

Plugins Used

@vitejs/plugin-react — React Fast Refresh using Babel (or oxc)

@vitejs/plugin-react-swc — React Fast Refresh using SWC

React Compiler

The React Compiler is not enabled by default due to its impact on development and build performance.
To enable it, follow the official documentation:
https://react.dev/learn/react-compiler/installation

Linting & Type Safety

For production-ready development, using TypeScript with type-aware linting is recommended.
You can start from the official React + TypeScript Vite template:
https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts

Vision

VerSel aims to become a personalized AI learning coach that:

Adapts to how each student thinks

Measures mastery instead of engagement

Supports teachers and existing education systems

Scales globally with fairness and discipline

License

MIT (or replace with your preferred license)
