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
Languages: Java, Python, C++, SQL, HTML, CSS, Javascript, and Typescript.
Frameworks & Libraries: ReactJS, Next.js, React Native, Spring Boot, GraphQL, D3.js, and Three.js.
Cloud & DevOps: GCP, Azure, Docker, GitHub Actions, CI/CD, and Git.
Databases: PostgreSQL, MySQL, and SQLite.
Methodologies & Tools: Microservices, Agile, Test-Driven Development (TDD), Claude Code, Gemini-CLI, and GitHub CoPilot.

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
MS in Computer Software Engineering: Arizona State University, Phoenix, AZ (Aug 2024 – May 2026) | CGPA: 3.71/4.00.
BS (B.Tech) Degree: National Institute of Technology, Calicut, Kerala, India (Jun 2017 – May 2021) | CGPA: 7.51/10.00.

Key Projects
SideTrack (Lead Developer, Dec 2025 – Jan 2026): Built a React Native weight training iOS app featuring a custom recovery engine that models muscle-specific fatigue. Reduced cloud costs by 50% via predictive polling and implemented an offline-first experience using SQLite.

Interactive Media & Content Engine (Lead Developer, Dec 2022 – Jan 2024): Architected a Next.js platform using hybrid SSG/ISR and client-side caching, cutting hosting costs by 90%. The project included an interactive 3D visualization system built with Three.js.

Arxiv Research Bot (Software Engineer, Mar 2022 – May 2022): Deployed a Python Telegram bot to fetch and summarize research papers daily. Used Redis caching to cut redundant API calls by 90%.
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
