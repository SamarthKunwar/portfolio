/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — English + German.
 *  Locale-independent facts live in `siteMeta` / `socials` /
 *  `projectMeta`. Everything language-specific lives in `dict`.
 * ─────────────────────────────────────────────────────────────
 */

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/* ── Locale-independent ──────────────────────────────────────── */

/**
 * Canonical site origin, used for <title>, OpenGraph, canonical/alternate
 * links and the sitemap. Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL   — set this in Vercel once you have a custom domain
 *   2. VERCEL_PROJECT_PRODUCTION_URL — auto-set by Vercel (your-app.vercel.app)
 *   3. localhost              — local dev fallback
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteMeta = {
  name: "Samarth Kunwar",
  url: siteUrl,
  email: "samarthkunwar2002@gmail.com",
  /**
   * Path (in /public) to a headshot. Drop e.g. `public/photo.jpg` and set
   * this to "/photo.jpg" — it shows in the hero. Any aspect ratio works
   * (it's cropped square). Leave "" to hide it.
   */
  photo: "",
  /**
   * Path (in /public) to a résumé PDF. Left empty on purpose — the CV PDF
   * has a home address, phone number and date of birth on it. Make a
   * web-safe version first, then set this to "/resume.pdf".
   */
  resumeUrl: "",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: "Github" | "Linkedin" | "Mail";
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/SamarthKunwar", icon: "Github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samarth-kunwar-a58666190",
    icon: "Linkedin",
  },
  { label: "Email", href: `mailto:${siteMeta.email}`, icon: "Mail" },
];

/** Section anchors, in page order. Labels come from the dictionary. */
export const navItems = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;
export type NavId = (typeof navItems)[number];

export type ProjectCoverVariant = "rag" | "cloud" | "map" | "neural";

export type ProjectMeta = {
  slug: string;
  tech: string[];
  repo?: string;
  demo?: string;
  cover?: ProjectCoverVariant;
  /** Real screenshot in /public — takes priority over `cover`. */
  image?: string;
  featured?: boolean;
};

export const projectMeta: ProjectMeta[] = [
  {
    slug: "vehicle-connect-rag",
    tech: [
      "Python",
      "FAISS",
      "Sentence-Transformers",
      "Ollama",
      "SQLite",
      "Streamlit",
    ],
    repo: "https://github.com/SamarthKunwar/vehicle-connect-rag",
    cover: "rag",
    featured: true,
  },
  {
    slug: "cloud-native-reselling-platform",
    tech: [
      "Java 17",
      "Spring Boot",
      "React",
      "MySQL",
      "Docker",
      "Kubernetes (GKE)",
      "Cloud Build",
      "Google Cloud Storage",
    ],
    repo: "https://github.com/SamarthKunwar/ReselingPlatform",
    cover: "cloud",
    featured: true,
  },
  {
    slug: "rateme",
    tech: ["Java 21", "Spring Boot", "MySQL", "Leaflet", "Docker", "OpenAPI"],
    repo: "https://github.com/SamarthKunwar/Rate-me",
    cover: "map",
  },
  {
    slug: "neural-network-from-scratch",
    tech: ["Python", "NumPy"],
    cover: "neural",
  },
];

/* ── Dictionary types ────────────────────────────────────────── */

type Fact = { label: string; value: string };
type TimelineItem = {
  title: string;
  subtitle: string;
  meta: string;
  location?: string;
  points: string[];
};
type SkillGroup = { category: string; items: string[] };
type ProjectText = {
  name: string;
  description: string;
  detail: string;
  challenge: string[];
  process: string[];
  outcomes: string[];
};

export type Dict = {
  localeName: string;
  location: string;
  meta: { title: string; description: string };
  nav: Record<NavId, string>;
  ui: {
    resume: string;
    email: string;
    basedIn: string;
    copyEmail: string;
    copied: string;
    viewWork: string;
    scrollHint: string;
    caseStudy: string;
    challenge: string;
    process: string;
    outcomes: string;
    nextProject: string;
    allProjects: string;
    source: string;
    liveDemo: string;
    readCaseStudy: string;
    footerBuilt: string;
  };
  hero: { status: string; role: string; paragraphs: string[] };
  about: { heading: string; paragraphs: string[]; facts: Fact[] };
  experience: { heading: string; lead: string; items: TimelineItem[] };
  education: { heading: string; lead: string; items: TimelineItem[] };
  skills: { heading: string; lead: string; groups: SkillGroup[] };
  projects: {
    heading: string;
    lead: string;
    items: Record<string, ProjectText>;
  };
  contact: { heading: string; blurb: string };
};

/* ── English ─────────────────────────────────────────────────── */

const en: Dict = {
  localeName: "English",
  location: "Saarbrücken, Germany",
  meta: {
    title: "Samarth Kunwar · CS Student, Backend & AI Developer",
    description:
      "Fifth-semester Computer Science student in Saarbrücken. I build AI applications and cloud-native backends, from RAG prototypes to Kubernetes deployments.",
  },
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  ui: {
    resume: "Résumé",
    email: "Email",
    basedIn: "Based in",
    copyEmail: "Copy email",
    copied: "Copied",
    viewWork: "View work",
    scrollHint: "Scroll to explore",
    caseStudy: "Case study",
    challenge: "The challenge",
    process: "The process",
    outcomes: "Outcomes",
    nextProject: "Next project",
    allProjects: "All projects",
    source: "Source",
    liveDemo: "Live demo",
    readCaseStudy: "Read the case study",
    footerBuilt: "Built with Next.js & Tailwind CSS.",
  },
  hero: {
    status: "Open to working-student roles & internships",
    role: "CS student & software developer",
    paragraphs: [
      "I'm a Computer Science student in my fifth semester, and I like building the whole thing: the database, the backend, the interface, and getting it deployed.",
      "Right now most of my curiosity goes into AI. I build small LLM and RAG tools and use them to get from an idea to something running, fast.",
    ],
  },
  about: {
    heading: "About",
    paragraphs: [
      "I study Computer Science at Hochschule Kaiserslautern, currently in my fifth semester. Two things pull at me about equally: building full-stack applications, and building AI tools. My favourite projects are the ones where both show up.",
      "I've been writing code for about five years. The theory (algorithms, systems, the maths underneath) I picked up at Universität des Saarlandes. The habit of actually finishing and shipping things came after I moved to Kaiserslautern and started building projects from end to end.",
      "On the software side, I've taken a Java / Spring Boot and React marketplace all the way to a Kubernetes cluster with a real CI/CD pipeline, and built a handful of smaller REST APIs from scratch. On the AI side, I work with LLMs, RAG and semantic search (FAISS, Sentence-Transformers, local models through Ollama), wiring them into things that hold up outside a notebook.",
      "I lean on AI coding tools and agents (Claude Code, Copilot, ChatGPT) every day to get from an idea to a working prototype quickly. I work best on my own with a clear goal, and I pick up new tech fast.",
    ],
    facts: [
      { label: "Based in", value: "Saarbrücken, Germany" },
      { label: "Experience", value: "~5 years programming" },
      { label: "Focus", value: "Full-stack apps · AI & LLM tools" },
      { label: "Currently", value: "B.Sc. Applied CS · 5th semester" },
      { label: "Languages", value: "German C1 · English & Hindi native" },
    ],
  },
  experience: {
    heading: "Experience",
    lead: "Where I've worked so far.",
    items: [
      {
        title: "Software Intern",
        subtitle: "I-Konnenct (Remote)",
        meta: "Mar 2025 to Jun 2025",
        points: [
          "Built an internal analysis and visualisation tool (Flask) as a prototype, taking it from first concept to a working application within the team.",
          "Integrated external data APIs and prepared and filtered raw data for backend logic and frontend visualisation.",
          "Worked independently in an agile, distributed team with daily scrum meetings and sprint planning.",
          "Documented the concept, implementation and solution approaches for the team and future development.",
        ],
      },
    ],
  },
  education: {
    heading: "Education",
    lead: "Where I've studied and what I've focused on.",
    items: [
      {
        title: "Hochschule Kaiserslautern",
        subtitle: "B.Sc. Applied Computer Science (Angewandte Informatik)",
        meta: "Oct 2025 to Present",
        location: "Kaiserslautern, Germany",
        points: [
          "Currently in the 5th semester; ~125 ECTS so far, transferred in with about 60 recognised ECTS from prior study.",
          "Coursework and projects focused on backend development, cloud infrastructure and machine learning.",
        ],
      },
      {
        title: "Universität des Saarlandes",
        subtitle: "Bachelor Plus MINT",
        meta: "Mar 2022 to Sep 2025",
        location: "Saarbrücken, Germany",
        points: [
          "MINT study programme with a focus on Data Science and Computer Science.",
          "Earned 90 ECTS, roughly 60 of which are credited toward the current degree.",
        ],
      },
      {
        title: "St. Thomas School, Dwarka",
        subtitle: "Abitur / higher secondary (grade 1.7)",
        meta: "Apr 2018 to Jun 2020",
        location: "New Delhi, India",
        points: [],
      },
    ],
  },
  skills: {
    heading: "Skills",
    lead: "Tools I reach for, and a few I'm still getting comfortable with.",
    groups: [
      {
        category: "Prototyping & integration",
        items: [
          "FastAPI",
          "Flask",
          "REST APIs",
          "Java",
          "Spring Boot",
          "React",
          "Process automation",
        ],
      },
      {
        category: "Data & analytics",
        items: [
          "Python",
          "SQL / SQLite",
          "pandas",
          "NumPy",
          "Matplotlib",
          "R",
          "Feature engineering",
        ],
      },
      {
        category: "AI & LLMs",
        items: [
          "LLMs",
          "RAG",
          "Semantic search",
          "FAISS",
          "Sentence-Transformers",
          "Ollama",
          "LangChain",
          "PyTorch",
          "scikit-learn",
        ],
      },
      {
        category: "Frontend",
        items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Cloud & methods",
        items: ["Docker", "Kubernetes (GKE)", "CI/CD", "Git", "Agile / Scrum"],
      },
      {
        category: "AI dev tools",
        items: [
          "Claude Code",
          "GitHub Copilot",
          "ChatGPT",
          "Prompt engineering",
        ],
      },
    ],
  },
  projects: {
    heading: "Projects",
    lead: "A few things I've built. Click any project for the full story.",
    items: {
      "vehicle-connect-rag": {
        name: "Vehicle Connect RAG",
        description:
          "Hybrid RAG prototype for vehicle diagnostics: structured log queries plus semantic search over technical docs.",
        detail:
          "Combines indexed SQLite queries over structured event logs with FAISS cosine-similarity search over documentation, linked by error-code correlation. Python pipeline: metadata-aware chunking, Sentence-Transformer embeddings, FAISS indexing, and local LLM inference via Ollama for evidence-based answers. A 15-question evaluation harness reached 93.3% accuracy.",
        challenge: [
          "RAG is usually taught as one recipe: embed every document, search by similarity, hand the top matches to a language model. That recipe breaks down on systems and trace data. A log line is an exact record of a real event at a real timestamp, not something you find by “semantic nearness.”",
          "I wanted a diagnostics assistant for a connected-vehicle infotainment platform that could answer questions like “what happened between 14:02 and 14:05, and why?”, which needs both the precise event history and the documentation that explains it.",
        ],
        process: [
          "Split retrieval by data type: event logs go into an indexed SQLite store queried with SQL, and troubleshooting docs go through embedding-based search. The two are joined on the error code.",
          "Chunked the docs by their existing markdown headings, so each error code's cause and fix stays together as one retrievable unit.",
          "Ran embeddings locally (all-MiniLM-L6-v2) with FAISS for search and a local LLM via Ollama for answer synthesis: no API keys, free to re-run while debugging.",
          "Built a 15-question evaluation harness to measure retrieval accuracy and catch routing bugs.",
        ],
        outcomes: [
          "93.3% retrieval accuracy (14/15) on the evaluation suite. The single failure is documented, not hidden: a paraphrased query resolves to error code E-BT-104 instead of E-BT-207 because the E-BT-207 doc section explicitly contrasts itself with E-BT-104.",
          "Found and fixed a subtle metadata bug. Deriving the error code from “all codes mentioned in a chunk” instead of “the code the chunk is about” sent vague queries to the wrong error entirely: a concrete lesson in field semantics.",
          "The groundedness experiment surfaced a real ceiling: an 8B local judge model can't reliably do the arithmetic (10.699 vs. 09.692 computed as 0.007), so trustworthy automated faithfulness scoring would need a stronger judge or a human-calibrated sample.",
          "End-to-end pipeline complete with a Streamlit UI. Natural next steps: add a genuinely unstructured source with semantic chunking, or bring in real public CAN-bus datasets (HCRL Car-Hacking, ROAD).",
        ],
      },
      "cloud-native-reselling-platform": {
        name: "Cloud-Native Reselling Platform",
        description:
          "A scalable reselling marketplace taken from prototype to production on Google Kubernetes Engine.",
        detail:
          "3-node GKE cluster with Workload Identity, Artifact Registry and Secrets. CI/CD via Google Cloud Build builds and pushes Docker images, updates the GKE deployment and verifies the rollout on every push to main. Java 17 / Spring Boot / Spring Security / Hibernate backend, MySQL 8, React (Vite) frontend, JWT auth with role-based access, fully containerised on 12-factor principles.",
        challenge: [
          "I wanted to take a project past “runs on my machine”: to design a marketplace app that actually deploys to a managed Kubernetes cluster, with a real CI/CD pipeline, secret management and rolling updates, following twelve-factor principles rather than just talking about them.",
        ],
        process: [
          "Built the marketplace: JWT auth, item listings, a cart, image uploads to Google Cloud Storage and an admin dashboard. Java 17 / Spring Boot backend, React (Vite) frontend, MySQL 8.",
          "Containerised everything with two deployment paths: Docker Compose for local, Google Kubernetes Engine for production (Workload Identity, Artifact Registry, Secrets).",
          "Set up CI/CD with Google Cloud Build so every push to main builds the images, deploys to GKE and verifies the rollout.",
        ],
        outcomes: [
          "A working marketplace running on a 3-node GKE cluster, deployed automatically on every commit to main.",
          "Hands-on experience with the parts of cloud-native work that don't show up in a tutorial: Workload Identity, rollout verification, secret handling, and the build / runtime separation twelve-factor actually asks for.",
          "One codebase, two deployment targets (Compose and GKE) from the same set of containers.",
        ],
      },
      rateme: {
        name: "RateMe",
        description:
          "A location-based web app for rating restaurants, cafés and pubs around Zweibrücken.",
        detail:
          "Spring Boot REST API (Java 21, JPA) with MySQL and a Leaflet / OpenStreetMap frontend for picking locations. Star ratings with comments and photo uploads, user auth, Swagger docs, and single-origin deployment via Docker Compose.",
        challenge: [
          "I had used APIs and frameworks in coursework, but I had never built a full-stack application end to end on my own. I wanted a project that would force me to understand how the pieces actually fit together: how REST endpoints are designed, how a backend talks to a database, and how a frontend consumes that API on every request.",
          "RateMe was the vehicle: a small but complete product (a location-based review app for restaurants, cafés and pubs around Zweibrücken) where I owned every layer, from the data model to the map in the browser.",
        ],
        process: [
          "Built a Spring Boot (Java 21) REST API over MySQL with five-star ratings, comments, photo uploads and user accounts.",
          "Added map-based venue selection with Leaflet and OpenStreetMap.",
          "Served the frontend from the backend itself so UI and API share one origin, and packaged the whole thing as a single docker compose up.",
        ],
        outcomes: [
          "A working, end-to-end understanding of the full request path: routing, controller, persistence and the frontend fetch that ties it together.",
          "A complete small product I can run with a single command: two containers, no manual database setup, Swagger docs included.",
          "Comfort designing and documenting REST endpoints and reasoning about where backend and frontend responsibilities should sit.",
        ],
      },
      "neural-network-from-scratch": {
        name: "Neural Network from Scratch",
        description:
          "A feed-forward neural network built in pure NumPy, with no deep-learning frameworks.",
        detail:
          "Matrix initialisation, forward propagation with non-linear activations, and chain-rule backpropagation all implemented by hand to understand the mechanics end to end.",
        challenge: [
          "My university courses covered the theory of how neural networks learn and how to train them with high-level libraries, but calling .fit() keeps the interesting part hidden. I wanted to close the gap between knowing the theory and actually understanding it.",
          "So I rebuilt a feed-forward network with nothing but NumPy, implementing the forward pass, the activations and backpropagation by hand, so the maths behind each layer was something I had derived and coded myself, not just imported.",
        ],
        process: [
          "Implemented weight initialisation and forward propagation with non-linear activations.",
          "Wrote backpropagation by hand: chain-rule gradients and weight updates, no autograd.",
          "Tuned the training loop until the predictions converged.",
        ],
        outcomes: [
          "A network that trains and generalises using only hand-written matrix maths: initialisation, forward pass, backward pass and weight updates.",
          "A concrete, mechanical understanding of what a framework's training step is actually doing under the hood.",
        ],
      },
    },
  },
  contact: {
    heading: "Get in touch",
    blurb:
      "Have a working-student role, an internship, or a project in mind? Email me and I'll usually reply within a couple of days.",
  },
};

/* ── German ──────────────────────────────────────────────────── */

const de: Dict = {
  localeName: "Deutsch",
  location: "Saarbrücken, Deutschland",
  meta: {
    title: "Samarth Kunwar · Informatikstudent, Backend & KI-Entwickler",
    description:
      "Informatikstudent im fünften Semester in Saarbrücken. Ich entwickle KI-Anwendungen und cloud-native Backends, von RAG-Prototypen bis zu Kubernetes-Deployments.",
  },
  nav: {
    about: "Über mich",
    experience: "Erfahrung",
    projects: "Projekte",
    skills: "Kenntnisse",
    education: "Ausbildung",
    contact: "Kontakt",
  },
  ui: {
    resume: "Lebenslauf",
    email: "E-Mail",
    basedIn: "Standort",
    copyEmail: "E-Mail kopieren",
    copied: "Kopiert",
    viewWork: "Projekte ansehen",
    scrollHint: "Zum Entdecken scrollen",
    caseStudy: "Fallstudie",
    challenge: "Die Herausforderung",
    process: "Das Vorgehen",
    outcomes: "Ergebnisse",
    nextProject: "Nächstes Projekt",
    allProjects: "Alle Projekte",
    source: "Quellcode",
    liveDemo: "Live-Demo",
    readCaseStudy: "Fallstudie lesen",
    footerBuilt: "Erstellt mit Next.js & Tailwind CSS.",
  },
  hero: {
    status: "Offen für Werkstudentenstellen & Praktika",
    role: "Informatikstudent & Softwareentwickler",
    paragraphs: [
      "Ich studiere Informatik im fünften Semester und baue am liebsten das ganze Ding: Datenbank, Backend, Oberfläche, und am Ende steht es online.",
      "Im Moment dreht sich meine Neugier vor allem um KI. Ich baue kleine LLM- und RAG-Tools und nutze sie, um aus einer Idee schnell etwas Lauffähiges zu machen.",
    ],
  },
  about: {
    heading: "Über mich",
    paragraphs: [
      "Ich studiere Informatik an der Hochschule Kaiserslautern, aktuell im fünften Semester. Zwei Dinge reizen mich ungefähr gleich stark: Full-Stack-Anwendungen zu bauen und KI-Tools zu bauen. Meine liebsten Projekte sind die, in denen beides vorkommt.",
      "Ich programmiere seit etwa fünf Jahren. Die Theorie (Algorithmen, Systeme, die Mathematik darunter) habe ich an der Universität des Saarlandes gelernt. Die Angewohnheit, Dinge wirklich fertigzustellen und auszuliefern, kam, nachdem ich nach Kaiserslautern gewechselt bin und angefangen habe, Projekte von Anfang bis Ende zu bauen.",
      "Auf der Softwareseite habe ich einen Marktplatz mit Java / Spring Boot und React bis auf einen Kubernetes-Cluster mit echter CI/CD-Pipeline gebracht und einige kleinere REST-APIs von Grund auf gebaut. Auf der KI-Seite arbeite ich mit LLMs, RAG und semantischer Suche (FAISS, Sentence-Transformers, lokale Modelle über Ollama) und verbinde sie zu Dingen, die auch außerhalb eines Notebooks funktionieren.",
      "Ich nutze täglich KI-Entwicklungstools und Coding-Agents (Claude Code, Copilot, ChatGPT), um schnell von einer Idee zu einem lauffähigen Prototyp zu kommen. Am besten arbeite ich selbstständig mit einem klaren Ziel, und ich eigne mir neue Technik schnell an.",
    ],
    facts: [
      { label: "Standort", value: "Saarbrücken, Deutschland" },
      { label: "Erfahrung", value: "~5 Jahre Programmieren" },
      { label: "Schwerpunkt", value: "Full-Stack-Apps · KI- & LLM-Tools" },
      { label: "Aktuell", value: "B.Sc. Angewandte Informatik · 5. Semester" },
      { label: "Sprachen", value: "Deutsch C1 · Englisch & Hindi Muttersprache" },
    ],
  },
  experience: {
    heading: "Erfahrung",
    lead: "Wo ich bisher gearbeitet habe.",
    items: [
      {
        title: "Praktikant Softwareentwicklung",
        subtitle: "I-Konnenct (Remote)",
        meta: "März 2025 bis Juni 2025",
        points: [
          "Prototypische Entwicklung eines internen Analyse- und Visualisierungstools (Flask), vom ersten Konzept bis zur lauffähigen Anwendung im Team.",
          "Integration externer Daten-APIs sowie Aufbereitung und Filterung der Rohdaten für Backend-Logik und Frontend-Visualisierung.",
          "Eigenständige Mitarbeit in einem agilen, verteilten Team mit täglichen Scrum-Meetings und Sprint-Planungen.",
          "Dokumentation von Konzept, Umsetzung und Lösungswegen für das Team und die Weiterentwicklung.",
        ],
      },
    ],
  },
  education: {
    heading: "Ausbildung",
    lead: "Wo ich studiert habe und worauf ich mich konzentriert habe.",
    items: [
      {
        title: "Hochschule Kaiserslautern",
        subtitle: "B.Sc. Angewandte Informatik",
        meta: "Okt. 2025 bis heute",
        location: "Kaiserslautern, Deutschland",
        points: [
          "Aktuell im 5. Semester; bisher rund 125 ECTS, mit etwa 60 anerkannten ECTS aus dem Vorstudium.",
          "Schwerpunkte in Backend-Entwicklung, Cloud-Infrastruktur und maschinellem Lernen.",
        ],
      },
      {
        title: "Universität des Saarlandes",
        subtitle: "Bachelor Plus MINT",
        meta: "März 2022 bis Sept. 2025",
        location: "Saarbrücken, Deutschland",
        points: [
          "MINT-Studienprogramm mit Fokus auf Data Science und Informatik.",
          "90 ECTS erworben, davon rund 60 auf den aktuellen Studiengang angerechnet.",
        ],
      },
      {
        title: "St. Thomas School, Dwarka",
        subtitle: "Abitur (Note 1,7)",
        meta: "Apr. 2018 bis Juni 2020",
        location: "New Delhi, Indien",
        points: [],
      },
    ],
  },
  skills: {
    heading: "Kenntnisse",
    lead: "Werkzeuge, zu denen ich greife, und ein paar, mit denen ich noch warm werde.",
    groups: [
      {
        category: "Prototyping & Integration",
        items: [
          "FastAPI",
          "Flask",
          "REST APIs",
          "Java",
          "Spring Boot",
          "React",
          "Prozessautomatisierung",
        ],
      },
      {
        category: "Daten & Analytics",
        items: [
          "Python",
          "SQL / SQLite",
          "pandas",
          "NumPy",
          "Matplotlib",
          "R",
          "Feature Engineering",
        ],
      },
      {
        category: "KI & LLMs",
        items: [
          "LLMs",
          "RAG",
          "Semantische Suche",
          "FAISS",
          "Sentence-Transformers",
          "Ollama",
          "LangChain",
          "PyTorch",
          "scikit-learn",
        ],
      },
      {
        category: "Frontend",
        items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Cloud & Methoden",
        items: ["Docker", "Kubernetes (GKE)", "CI/CD", "Git", "Agile / Scrum"],
      },
      {
        category: "KI-Entwicklungstools",
        items: [
          "Claude Code",
          "GitHub Copilot",
          "ChatGPT",
          "Prompt Engineering",
        ],
      },
    ],
  },
  projects: {
    heading: "Projekte",
    lead: "Ein paar Dinge, die ich gebaut habe. Für die ganze Geschichte auf ein Projekt klicken.",
    items: {
      "vehicle-connect-rag": {
        name: "Vehicle Connect RAG",
        description:
          "Hybrider RAG-Prototyp für die Fahrzeugdiagnose: strukturierte Log-Abfragen plus semantische Suche über technische Dokumentation.",
        detail:
          "Kombiniert indizierte SQLite-Abfragen über strukturierte Ereignisprotokolle mit FAISS-Suche (Cosine-Similarity) über die Dokumentation, verknüpft über Fehlercode-Korrelation. Python-Pipeline: metadatenbewusstes Chunking, Sentence-Transformer-Embeddings, FAISS-Indexierung und lokale LLM-Inferenz über Ollama für belegbasierte Antworten. Ein Evaluationsharness mit 15 Fragen erreichte 93,3 % Genauigkeit.",
        challenge: [
          "RAG wird meist als ein Rezept gelehrt: alle Dokumente einbetten, per Ähnlichkeit suchen, die besten Treffer an ein Sprachmodell geben. Bei System- und Trace-Daten funktioniert das nicht. Eine Log-Zeile ist ein exakter Datensatz eines realen Ereignisses zu einem realen Zeitstempel, nichts, das man über „semantische Nähe“ findet.",
          "Ich wollte einen Diagnose-Assistenten für eine Connected-Vehicle-Infotainmentplattform, der Fragen wie „Was ist zwischen 14:02 und 14:05 passiert, und warum?“ beantworten kann. Dafür braucht es sowohl die genaue Ereignishistorie als auch die erklärende Dokumentation.",
        ],
        process: [
          "Retrieval nach Datentyp getrennt: Ereignisprotokolle landen in einem indizierten SQLite-Speicher mit SQL-Abfragen, die Fehlerdokumentation läuft über eine Embedding-Suche. Beide werden über den Fehlercode verknüpft.",
          "Die Dokumentation anhand ihrer vorhandenen Markdown-Überschriften in Chunks zerlegt, sodass Ursache und Lösung jedes Fehlercodes als eine abrufbare Einheit zusammenbleiben.",
          "Embeddings lokal berechnet (all-MiniLM-L6-v2), FAISS für die Suche und ein lokales LLM über Ollama für die Antwortsynthese: keine API-Keys, beliebig oft wiederholbar beim Debuggen.",
          "Ein Evaluationsharness mit 15 Fragen aufgebaut, um die Retrieval-Genauigkeit zu messen und Routing-Fehler zu finden.",
        ],
        outcomes: [
          "93,3 % Retrieval-Genauigkeit (14/15) in der Evaluations-Suite. Der eine Fehlschlag ist dokumentiert, nicht versteckt: Eine umformulierte Anfrage landet bei Fehlercode E-BT-104 statt E-BT-207, weil sich der E-BT-207-Abschnitt ausdrücklich von E-BT-104 abgrenzt.",
          "Einen subtilen Metadaten-Bug gefunden und behoben. Den Fehlercode aus „allen im Chunk erwähnten Codes“ statt „dem Code, um den es im Chunk geht“ abzuleiten, schickte vage Anfragen zum völlig falschen Fehler: eine konkrete Lektion über Feldsemantik.",
          "Das Groundedness-Experiment zeigte eine echte Grenze: Ein lokales 8B-Judge-Modell rechnet nicht zuverlässig (10,699 vs. 09,692 ergibt bei ihm 0,007), verlässliches automatisches Faithfulness-Scoring bräuchte also ein stärkeres Judge-Modell oder eine menschlich kalibrierte Stichprobe.",
          "Durchgängige Pipeline inklusive Streamlit-UI. Naheliegende nächste Schritte: eine echte unstrukturierte Quelle mit semantischem Chunking ergänzen oder reale öffentliche CAN-Bus-Datensätze (HCRL Car-Hacking, ROAD) einbinden.",
        ],
      },
      "cloud-native-reselling-platform": {
        name: "Cloud-Native Reselling Platform",
        description:
          "Ein skalierbarer Wiederverkaufs-Marktplatz, vom Prototyp bis zum Produktivbetrieb auf der Google Kubernetes Engine.",
        detail:
          "3-Node-GKE-Cluster mit Workload Identity, Artifact Registry und Secrets. CI/CD über Google Cloud Build baut und pusht die Docker-Images, aktualisiert das GKE-Deployment und verifiziert den Rollout bei jedem Push auf main. Backend mit Java 17 / Spring Boot / Spring Security / Hibernate, MySQL 8, Frontend mit React (Vite), JWT-Auth mit rollenbasierter Zugriffskontrolle, vollständig containerisiert nach 12-Factor-Prinzipien.",
        challenge: [
          "Ich wollte ein Projekt über „läuft auf meinem Rechner“ hinausbringen: eine Marktplatz-App entwerfen, die tatsächlich auf einem verwalteten Kubernetes-Cluster deployt wird, mit echter CI/CD-Pipeline, Secret-Management und Rolling Updates, und die 12-Factor-Prinzipien wirklich anwendet statt nur darüber zu reden.",
        ],
        process: [
          "Den Marktplatz gebaut: JWT-Auth, Artikel-Inserate, Warenkorb, Bild-Uploads zu Google Cloud Storage und ein Admin-Dashboard. Backend mit Java 17 / Spring Boot, Frontend mit React (Vite), MySQL 8.",
          "Alles containerisiert mit zwei Deployment-Wegen: Docker Compose für lokal, Google Kubernetes Engine für die Produktion (Workload Identity, Artifact Registry, Secrets).",
          "CI/CD mit Google Cloud Build eingerichtet, sodass jeder Push auf main die Images baut, auf GKE deployt und den Rollout verifiziert.",
        ],
        outcomes: [
          "Ein funktionierender Marktplatz auf einem 3-Node-GKE-Cluster, der bei jedem Commit auf main automatisch deployt wird.",
          "Praktische Erfahrung mit den Teilen von Cloud-Native-Arbeit, die in keinem Tutorial stehen: Workload Identity, Rollout-Verifikation, Umgang mit Secrets und die Trennung von Build und Runtime, die 12-Factor tatsächlich verlangt.",
          "Eine Codebasis, zwei Deployment-Ziele (Compose und GKE) aus denselben Containern.",
        ],
      },
      rateme: {
        name: "RateMe",
        description:
          "Eine standortbasierte Web-App zum Bewerten von Restaurants, Cafés und Kneipen rund um Zweibrücken.",
        detail:
          "Spring-Boot-REST-API (Java 21, JPA) mit MySQL und einem Leaflet-/OpenStreetMap-Frontend zur Standortauswahl. Sterne-Bewertungen mit Kommentaren und Foto-Uploads, Nutzer-Authentifizierung, Swagger-Doku und Single-Origin-Deployment über Docker Compose.",
        challenge: [
          "Ich hatte im Studium APIs und Frameworks verwendet, aber noch nie eine Full-Stack-Anwendung komplett selbst gebaut. Ich wollte ein Projekt, das mich zwingt zu verstehen, wie die Teile wirklich zusammenspielen: wie REST-Endpunkte entworfen werden, wie ein Backend mit einer Datenbank spricht und wie ein Frontend diese API bei jeder Anfrage nutzt.",
          "RateMe war das Mittel dazu: ein kleines, aber vollständiges Produkt (eine standortbasierte Bewertungs-App für Restaurants, Cafés und Kneipen rund um Zweibrücken), bei dem ich jede Schicht selbst verantwortet habe, vom Datenmodell bis zur Karte im Browser.",
        ],
        process: [
          "Eine Spring-Boot-REST-API (Java 21) über MySQL gebaut, mit Fünf-Sterne-Bewertungen, Kommentaren, Foto-Uploads und Nutzerkonten.",
          "Kartenbasierte Standortauswahl mit Leaflet und OpenStreetMap ergänzt.",
          "Das Frontend direkt aus dem Backend ausgeliefert, sodass UI und API einen Origin teilen, und das Ganze als ein einziges docker compose up verpackt.",
        ],
        outcomes: [
          "Ein funktionierendes, durchgängiges Verständnis des gesamten Request-Wegs: Routing, Controller, Persistenz und der Frontend-Fetch, der alles verbindet.",
          "Ein vollständiges kleines Produkt, das ich mit einem Befehl starten kann: zwei Container, keine manuelle Datenbank-Einrichtung, Swagger-Doku inklusive.",
          "Sicherheit darin, REST-Endpunkte zu entwerfen und zu dokumentieren und abzuwägen, wo die Verantwortung von Backend und Frontend liegen sollte.",
        ],
      },
      "neural-network-from-scratch": {
        name: "Neuronales Netz von Grund auf",
        description:
          "Ein Feed-Forward-Netz, komplett in NumPy gebaut, ohne Deep-Learning-Frameworks.",
        detail:
          "Matrix-Initialisierung, Forward Propagation mit nichtlinearen Aktivierungen und Backpropagation über die Kettenregel, alles von Hand implementiert, um die Mechanik von Grund auf zu verstehen.",
        challenge: [
          "Meine Uni-Vorlesungen behandelten die Theorie, wie neuronale Netze lernen, und wie man sie mit High-Level-Bibliotheken trainiert, aber ein Aufruf von .fit() lässt den interessanten Teil im Verborgenen. Ich wollte die Lücke zwischen „die Theorie kennen“ und „sie wirklich verstehen“ schließen.",
          "Also habe ich ein Feed-Forward-Netz allein mit NumPy nachgebaut und Forward Pass, Aktivierungen und Backpropagation alles von Hand implementiert, sodass die Mathematik hinter jeder Schicht etwas war, das ich selbst hergeleitet und programmiert hatte, nicht nur importiert.",
        ],
        process: [
          "Gewichts-Initialisierung und Forward Propagation mit nichtlinearen Aktivierungen implementiert.",
          "Backpropagation von Hand geschrieben: Gradienten über die Kettenregel und Gewichts-Updates, ohne Autograd.",
          "Die Trainingsschleife so lange angepasst, bis die Vorhersagen konvergierten.",
        ],
        outcomes: [
          "Ein Netz, das nur mit selbst geschriebener Matrix-Mathematik trainiert und generalisiert: Initialisierung, Forward Pass, Backward Pass und Gewichts-Updates.",
          "Ein konkretes, mechanisches Verständnis dessen, was ein Framework-Trainingsschritt unter der Haube tatsächlich tut.",
        ],
      },
    },
  },
  contact: {
    heading: "Kontakt aufnehmen",
    blurb:
      "Werkstudentenstelle, Praktikum oder ein Projekt im Kopf? Schreib mir eine E-Mail; ich antworte meist innerhalb von ein paar Tagen.",
  },
};

/* ── Access helpers ──────────────────────────────────────────── */

const dictionaries: Record<Locale, Dict> = { en, de };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type Project = ProjectMeta & ProjectText;

export function getProjects(locale: Locale): Project[] {
  const text = dictionaries[locale].projects.items;
  return projectMeta.map((meta) => ({ ...meta, ...text[meta.slug] }));
}

export function getProject(
  locale: Locale,
  slug: string,
): Project | undefined {
  const meta = projectMeta.find((p) => p.slug === slug);
  if (!meta) return undefined;
  return { ...meta, ...dictionaries[locale].projects.items[slug] };
}
