// ============================================================
//  PERSONAL CONFIG  –  edit this file, keep it private
// ============================================================

const CONFIG = {
    // ----------------------------------------------------------
    // 1. API keys (ONLY used in file:// mode)
    //    When running via `node server.js` or Vercel, put keys in env vars instead.
    //
    //    OpenRouter: https://openrouter.ai/keys
    //    Gemini:     https://aistudio.google.com/app/apikey
    // ----------------------------------------------------------
    openRouterApiKey: "sk-or-v1_YOUR_API_KEY_HERE",
    geminiApiKey: "AIzaSy_YOUR_API_KEY_HERE",

    // ----------------------------------------------------------
    // 2. Provider + model presets
    // ----------------------------------------------------------
    provider: "openrouter", // "openrouter" | "gemini"
    models: {
        openrouter: "openrouter/free",
        gemini: "gemini-2.5-flash",
    },

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
- Auto-Explosion: Interactive portfolio and blog built with Next.js, using D3.js and Three.js for rich data visualizations. Features a 3D landing scene, interactive data pages (bird migration, solar system), and AI-powered tools like YouTube Scholar and Goal Alignment. Built with a WordPress CMS backend for easy content management. [Tech: D3.js, Firebase, Go, GraphQL, Next.js, PostHog, React, Three.js]
- explosion.fun: A developer portfolio site that doubles as an interactive sandbox — featuring D3/Three.js visualizations, a tech blog, and productivity tools like YouTube Scholar and Goal Alignment. Designed to showcase projects in an engaging, visual way rather than a traditional list. [Tech: Claude Code, D3.js, Firebase, GitHub Actions, Go, GraphQL, Java, JavaScript]
- Kali-Platform: The React Native mobile app for Kali — a fitness platform that treats physical progression like version control. Features a DAG-based progression system, muscle-specific fatigue tracking, local-first architecture with SQLite, and a custom training plan engine. [Tech: Go, Lucide, REST, React, React Native, SQL, SQLite, Tailwind CSS]
- Kali: Landing page and waitlist for Kali — a fitness platform concept that gamifies physical progression. Built with Next.js and PostgreSQL backend. Showcases the product vision before the mobile app launch. [Tech: Go, Lucide, Next.js, PostgreSQL, React, SQL, Tailwind CSS, TypeScript]
- Side-Track: A React Native iOS weight-training app with a custom fatigue engine that models muscle-specific recovery. Uses SQLite for offline-first data and predictive polling to reduce cloud costs. Features Apple Health sync and a progressive overload calculator. [Tech: Go, PostgreSQL, RAG, React, React Native, SQL, SQLite, TypeScript]
- Clackinator: A macOS menu bar app that plays mechanical keyboard sound effects while you type — adding satisfying auditory feedback to any keyboard. Built with Swift, it is lightweight and unobtrusive, designed for developers who love mechanical keyboards. [Tech: Swift, Three.js]
- Ranker: A career exploration web app with skill matching and dynamic hierarchy visualization. Helps users discover career paths based on their existing skills and interests, with an interactive D3.js skill tree visualization. [Tech: Go, Lucide, OAuth, PostgreSQL, RAG, REST, React, React Native]
- Window: An Android app that watches your screen — tracking app usage, scraping visible UI text, and running on-device Gemini Nano AI to summarize your digital activity. Built with Kotlin and focused on privacy (all processing and inference happens on-device). [Tech: Gemini, Go, Gradle, Kotlin, RAG, SQL, SQLite]
- Window-Extension: A Chrome extension that transforms your browser into an intelligent productivity co-pilot — connecting to Google Calendar, blocking distractions during focus sessions, and running an OpenClaw-powered AI agent for task management and summarization. [Tech: Fastify, FullCalendar, Go, Node.js, OAuth, PostgreSQL, Prisma, RAG]
- Switch-Market: A Nintendo Switch game price tracker and shopping demo with D3-powered data visualizations, real-time search filtering, and CSV sales data integration. Hosted on Firebase for quick zero-config deployment. [Tech: D3.js, Firebase, Go, Java, JavaScript, Python]
- blistering-barnacles: A hackathon project for automated stock tracking and cross-store sales suggestions. If a product isn't selling in one store but another nearby store is out of stock, the system facilitates inter-store transfers. Built with D3.js data visualization and real-time search. [Tech: Anthropic, D3.js, Docker, FullCalendar, GitHub Actions, GitHub Copilot, Go, LLMs]
- lofty-demo-scaffold: A hackathon scaffold for a real-estate SaaS dashboard — featuring CRM functionality, a help hub, settings panel, and a command palette. Built with Next.js 15 and Tailwind CSS as a rapid prototype for demo purposes. [Tech: FullCalendar, GitHub Copilot, Go, Lucide, Next.js, RAG, React, Tailwind CSS]
- Gamer: A placeholder repo for a life gamification tool concept — a framework for turning daily productivity into a game-like experience with quests, XP, and achievements. [Tech: ]
- job-answer-app: A personal productivity tool that uses Gemini AI to generate polished answers to job application questions. Reads a config file with resume context, skills, and writing rules to produce tailored, human-sounding responses for cover letters and applications. [Tech: Java, JavaScript, LLMs, Node.js, Vercel]
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
