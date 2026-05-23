// ============================================================
//  PERSONAL CONFIG  –  edit this file, keep it private
// ============================================================

const CONFIG = {
    // ----------------------------------------------------------
    // 1. Gemini API key
    //    Only used when opening index.html directly as a file://.
    //    When running via `node server.js`, put your key in .env instead.
    //    Get a free key at https://aistudio.google.com/app/apikey
    // ----------------------------------------------------------
    apiKey: "AIzaSy_YOUR_API_KEY_HERE",

    // ----------------------------------------------------------
    // 2. Model
    //    gemini-2.5-flash  – fast and capable (recommended)
    //    gemini-2.5-pro    – slower, stronger reasoning
    // ----------------------------------------------------------
    model: "gemini-2.5-flash",

    // ----------------------------------------------------------
    // 3. Your resume / context
    //    The AI will use this when crafting every answer.
    // ----------------------------------------------------------
    context: `
Professional Overview
Reuben Roy Kochukudiyil is a Software Engineer based in Phoenix, AZ, with over 3 years of professional experience. He specializes in full-stack development, cloud architecture, and data interoperability. His background highlights strong expertise in building high-scale microservices to manage large datasets (64TB+) and optimizing system performance across both Azure and GCP environments.

Technical Skills
Languages & Core: Anthropic, Azure, CI/CD, Claude Code, D3.js, Docker, Fastify, Firebase, FullCalendar, Gemini, GitHub Actions, GitHub Copilot, Go, Google Cloud, Gradle, GraphQL, Java, JavaScript, Kotlin, LLMs, Lucide, MySQL, Next.js, Node.js, OAuth, OpenAI, OpenCV, PostHog, PostgreSQL, Prisma, Python, RAG, REST, React, React Native, SQL, SQLite, Spring, Spring Boot, Swift, Tailwind CSS, Three.js, TypeScript, Vercel, Vite, WordPress
Frameworks & Libraries: ReactJS, Next.js, React Native, Spring Boot, GraphQL, D3.js, Three.js, Node.js
Cloud & DevOps: GCP, Azure, Docker, GitHub Actions, CI/CD, Git, Vercel
Databases: PostgreSQL, MySQL, SQLite, Redis
Methodologies & Tools: Microservices, Agile, Test-Driven Development (TDD), Claude Code, Gemini-CLI, GitHub Copilot

Professional Experience
Full-Stack Developer (Contract) | Trubridge | Dec 2022 – Jul 2024
- Engineered .NET microservices on Azure to manage large-scale healthcare datasets exceeding 64TB.
- Built PostgreSQL-based ETL pipelines to support a FHIR protocol transition engine, facilitating data interoperability between healthcare providers.
- Achieved a 90% reduction in query execution time by implementing multi-level table partitioning and indexing strategies alongside Entity Framework.
- Successfully architected complex database migrations in production while avoiding significant downtime and maintaining strict HIPAA compliance.

Full-Stack Developer (Contract) | IKEA | Jun 2021 – Oct 2022
- Developed and scaled Java Spring Boot microservices within a GCP ecosystem to automate customer quoting pipelines, which included integrating PDF generation and notification services.
- Reduced API latency by 70% by implementing Redis caching optimizations.
- Refactored ReactJS components for the checkout workflow, saving the sales team an average of 1.5 minutes per transaction.
- Maintained over 80% code coverage using JUnit and automated security scanning workflows with GitHub Actions.

Education
MS in Computer Software Engineering — Arizona State University, Phoenix, AZ (Aug 2024 – May 2026) | CGPA: 3.71/4.00
BS (B.Tech) — National Institute of Technology, Calicut, Kerala, India (Jun 2017 – May 2021) | CGPA: 7.51/10.00

Key Projects
- blistering-barnacles: [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/) [Tech: Anthropic, D3.js, Docker, FullCalendar, GitHub Actions, GitHub Copilot]
- Window-Extension: A Chrome extension that transforms your browser into an intelligent productivity co-pilot — connecting to Google Calendar, blocking distractions during focus sessions, and running an OpenClaw-powered  [Tech: Fastify, FullCalendar, Go, Node.js, OAuth, PostgreSQL]
- Window: An Android app that watches your screen — tracking app usage, scraping visible UI text, and running on-device Gemini Nano AI to summarize your digital activity. [Tech: Gemini, Go, Gradle, Kotlin, RAG, SQL]
- Switch-Market: A lightweight, vanilla-JS shopping demo with D3-powered visualizations, real-time search, and CSV sales data integration — hosted on Firebase. [Tech: D3.js, Firebase, Go, Java, JavaScript, Python]
- lofty-demo-scaffold: A leaner hackathon scaffold for a real-estate SaaS dashboard — CRM, help hub, settings, and a command palette, built with Next.js and Tailwind CSS. [Tech: FullCalendar, GitHub Copilot, Go, Lucide, Next.js, RAG]
- Kali-Platform: The mobile engine for Kali — a React Native fitness app that treats physical progression like a tech tree, with muscle-specific fatigue tracking and local-first data. [Tech: Go, Lucide, REST, React, React Native, SQL]
- Kali: Landing page and waitlist for Kali — a fitness platform that treats physical progression like version control. [Tech: Go, Lucide, Next.js, PostgreSQL, React, SQL]
- Gamer: A placeholder repository for future gaming-related projects. [Tech: ]
`,

    // ----------------------------------------------------------
    // 4. Example answers  (optional – helps the AI match your voice)
    //    Paste real answers you have written and liked before.
    // ----------------------------------------------------------
    exampleAnswers: ``,

    // ----------------------------------------------------------
    // 5. Writing rules  –  tell the AI exactly how to write
    // ----------------------------------------------------------
    rules: [
        "Write in first person.",
        "Use simple, clear language. Avoid jargon.",
        "Do not use bullet points or long dashes.",
        "Keep the tone professional but warm and human.",
        "Do not start sentences with 'I' too often – vary the sentence structure.",
        "Aim for 150–200 words unless the question clearly needs more.",
        "Do not use filler phrases like 'I am passionate about' or 'I am excited to'.",
        "Avoid clichés. Be specific and concrete.",
    ],

};
