export type Language = "en" | "id";

const en = {
  meta: {
    title: "WeHexa — Creative & AI Software Agency",
    description:
      "We build the software and AI automations that fuel your growth. From sleek web applications to autonomous AI workflows, engineered for production.",
  },
  nav: {
    portfolio: "Portfolio",
    services: "Services",
    about: "About Us",
    blog: "Blog",
    contact: "Contact Us",
    quickChat: "Quick Chat",
    readyToScale: "Ready to scale?",
    language: "Language",
    english: "English (EN)",
    indonesian: "Bahasa (ID)",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
  },
  hero: {
    badge: "500+ business scaled their intelligent tech",
    title: "We build the Software\nand AI Automations that\nfuel your growth",
    subtitle:
      "From sleek web applications to autonomous AI workflows. We bridge the gap between complex engineering and seamless user experience.",
    primaryCta: "Book a Call",
    secondaryCta: "View Our Work",
    imageAlt: "Sunlit blue sky with soft clouds above a lush green hillside",
    portraitAlts: [
      "Client founder portrait, smiling",
      "Client founder portrait, studio light",
      "Client founder portrait, natural light",
    ],
  },
  services: {
    eyebrow: "/Our Service",
    title: "AI-powered solutions for tomorrow's world.",
    items: [
      {
        title: "Web & Software\nDevelopment",
        description:
          "Full-stack cloud platforms, high-velocity SaaS architectures, and resilient APIs engineered for scale.",
      },
      {
        title: "AI & Automations",
        description:
          "Autonomous multi-agent LLM pipelines, RAG knowledge systems, and bespoke workflow intelligence.",
      },
      {
        title: "Design & Branding",
        description:
          "Our team of designers, developers, and thinkers driven by one purpose.",
      },
      {
        title: "Maintenance &\nConsulting",
        description:
          "Continuous security audits, performance tuning, and CTO-level architectural advisory as you scale.",
      },
    ],
  },
  faq: {
    eyebrow: "/FAQ",
    title: "Clear answers before we build.",
    items: [
      {
        question: "Do you offer MVP or phased development?",
        answer:
          "Yes. We specialize in rapid 4–6 week MVP sprints so you can validate with real users and investors quickly, followed by modular phases to scale infrastructure, AI workflows, and enterprise integrations.",
      },
      {
        question: "What technologies do you specialize in?",
        answer:
          "Our core stack includes Next.js, React, TypeScript, Node.js, Python (FastAPI), PostgreSQL, and vector databases paired with OpenAI, Anthropic Claude, LangGraph, and custom fine-tuned models.",
      },
      {
        question: "How fast can we launch an AI automation workflow?",
        answer:
          "Most custom AI automation pipelines—such as autonomous customer triage, CRM enrichment, or internal RAG knowledge assistants—go from architecture blueprint to production within 10 to 21 business days.",
      },
      {
        question: "Do we get direct access to senior engineers?",
        answer:
          "Absolutely. You collaborate directly in Slack and weekly architecture reviews with our founding engineers and senior product designers—zero middle-management layers or handoff delays.",
      },
    ],
    prompt: "Have a question that's not answered here?",
    quickChat: "Quick Chat",
    scheduleCall: "Schedule a Call",
  },
  blog: {
    eyebrow: "/Recent Blog",
    title: "Strategic insights on AI, Tech, and Growth.",
    explore: "Explore our Insights",
    author: "By WeHexa Research Team",
    modalWant: "Want us to implement this for your team?",
    modalCta: "Book a Call",
    close: "Close article",
    items: [
      {
        tag: "Automation · AI Strategy",
        tags: ["Automation", "AI Strategy", "Tech Trends"],
        title:
          "How to integrate LLMs into your existing customer support workflow.",
        body:
          "Modern support teams reduce first-response times by 78% by pairing Retrieval-Augmented Generation (RAG) with deterministic tool-calling guardrails. Instead of replacing human empathy, autonomous triage agents resolve repetitive tier-1 tickets and prepare rich context briefs for complex escalations.",
        readTime: "5 min read",
      },
      {
        tag: "Research · LLM · Workflows",
        tags: ["Research", "LLM", "Workflows"],
        title:
          "Why Next.js is the superior choice for high-performance SaaS platforms.",
        body:
          "With React Server Components, streaming SSR, and edge middleware, Next.js eliminates client-side waterfall latency while keeping AI token streaming smooth at 60fps. Combined with strict TypeScript contracts, teams ship features twice as fast with zero bundle bloat.",
        readTime: "6 min read",
      },
      {
        tag: "Product · Design Ops · Figma",
        tags: ["Product", "Research", "Figma"],
        overlay: "Design Ops",
        title:
          "The psychology of UI: How micro-interactions boost user retention.",
        body:
          "Tactile feedback—from spring-loaded button states to directional scroll cues—builds immediate trust in software quality. When interfaces respond naturally to user intent, cognitive friction drops and daily active retention climbs measurably.",
        readTime: "4 min read",
      },
    ],
  },
  kinetic: "Solutions built for tomorrow • AI-first engineering •",
  contact: {
    title: "Let's Talk",
    subtitle: "Tell us about your project. We reply within 24 hours.",
    features: [
      {
        title: "Production-Ready",
        body: "CI/CD, hardening, and edge latency — launch-ready.",
      },
      {
        title: "Scalable Architecture",
        body: "Modular code that scales from 100 to 10M+ users.",
      },
    ],
    form: {
      fullName: "Enter your full name",
      fullNamePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+1 (555) 234-5678",
      serviceType: "Service type",
      serviceOptions: {
        web: "Web & Software Development",
        ai: "AI & Automations",
        design: "Design & Branding",
        consulting: "Maintenance & Consulting",
      },
      budget: "Project budget",
      budgetOptions: {
        "5-10": "$5k – $10k",
        "10-25": "$10k – $25k",
        "25-50": "$25k – $50k",
        "50+": "$50k+",
      },
      details: "Project details",
      detailsPlaceholder:
        "We want a custom AI & web platform with predictive analytics, automated workflows, and a seamless user experience...",
      privacyPrefix: "We never share your data. Read our",
      privacyLink: "Privacy Policy",
      submit: "Schedule a Strategy Call",
      submitting: "Sending your brief...",
      errorName: "Please enter your full name.",
      errorEmail: "Please enter a valid email address.",
      errorDetails: "Tell us a little about the project (at least 20 characters).",
      errorGeneric:
        "Something went wrong while sending your brief. Please try again or email hello@wehexa.io.",
    },
    successTitle: "Strategy Call Requested!",
    successBody:
      "Thank you, {name}. Our technical founders received your {service} ({budget}) brief and will reply to {email} within 24 hours.",
    reset: "Send another inquiry",
    founder: {
      title: "Direct Founder Access",
      body: "Direct line to the engineers building your product — no account managers.",
      quickChat: "Quick Chat",
      scheduleCall: "Schedule a Call",
      imageAlt: "WeHexa technical founder studio portrait",
    },
  },
  chat: {
    title: "Direct Founder Chat",
    status: "Usually replies in under 3 mins",
    greeting:
      "Hey there. I'm Alex, Co-Founder & Technical Lead at WeHexa. What are you looking to build or automate?",
    chips: ["AI Support Agent", "SaaS MVP Sprint", "UI/UX Redesign"],
    presets: [
      "We need an AI customer support agent",
      "Looking to build a SaaS MVP",
      "Full product redesign & brand identity",
    ],
    inputPlaceholder: "Ask a technical question...",
    send: "Send",
    typing: "Alex is typing...",
    error:
      "The chat is unavailable right now. Email hello@wehexa.io and we'll reply within 24 hours.",
    close: "Close chat",
  },
  footer: {
    tagline:
      "Rigorous engineering followed by a seamless transition to production.",
    cta: "Schedule a Strategy Call",
    pagesTitle: "Pages",
    pages: ["Home", "Portfolio", "Services", "About Us", "Blog"],
    socialTitle: "Social",
    contactTitle: "Contact",
    cookie: "Cookie Policy",
    privacy: "Privacy Policy",
    rights: "© 2026 WeHexa. All rights reserved.",
  },
  common: {
    close: "Close",
    backToTop: "Back to Top",
  },
};

const id: typeof en = {
  meta: {
    title: "WeHexa — Agensi Software Kreatif & AI",
    description:
      "Kami membangun software dan otomasi AI yang mendorong pertumbuhan Anda. Dari aplikasi web modern hingga alur kerja AI otonom, dirancang untuk produksi.",
  },
  nav: {
    portfolio: "Portofolio",
    services: "Layanan",
    about: "Tentang Kami",
    blog: "Blog",
    contact: "Hubungi Kami",
    quickChat: "Obrolan Cepat",
    readyToScale: "Siap berkembang?",
    language: "Bahasa",
    english: "English (EN)",
    indonesian: "Bahasa (ID)",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    skip: "Lewati ke konten",
  },
  hero: {
    badge: "500+ bisnis meningkatkan skala teknologi cerdas mereka",
    title:
      "Kami membangun Software\ndan AI Automation yang\nmendorong pertumbuhan Anda",
    subtitle:
      "Dari aplikasi web yang mulus hingga alur kerja AI otonom. Kami menjembatani rekayasa kompleks dengan pengalaman pengguna yang sederhana.",
    primaryCta: "Jadwalkan Call",
    secondaryCta: "Lihat Karya Kami",
    imageAlt:
      "Langit biru cerah dengan awan lembut di atas perbukitan hijau yang subur",
    portraitAlts: [
      "Potret founder klien, tersenyum",
      "Potret founder klien, cahaya studio",
      "Potret founder klien, cahaya alami",
    ],
  },
  services: {
    eyebrow: "/Layanan Kami",
    title: "Solusi bertenaga AI untuk dunia esok.",
    items: [
      {
        title: "Web & Software\nDevelopment",
        description:
          "Platform cloud full-stack, arsitektur SaaS berkecepatan tinggi, dan API tangguh yang dirancang untuk skala.",
      },
      {
        title: "AI & Automation",
        description:
          "Pipeline LLM multi-agent otonom, sistem pengetahuan RAG, dan kecerdasan alur kerja yang dibuat khusus.",
      },
      {
        title: "Design & Branding",
        description:
          "Tim desainer, developer, dan pemikir kami digerakkan oleh satu tujuan.",
      },
      {
        title: "Maintenance &\nConsulting",
        description:
          "Audit keamanan berkelanjutan, tuning performa, dan advis arsitektur tingkat CTO saat Anda berkembang.",
      },
    ],
  },
  faq: {
    eyebrow: "/FAQ",
    title: "Jawaban jelas sebelum kami membangun.",
    items: [
      {
        question: "Apakah Anda menawarkan MVP atau pengembangan bertahap?",
        answer:
          "Ya. Kami mengkhususkan diri pada sprint MVP cepat 4–6 minggu agar Anda bisa memvalidasi ke pengguna dan investor lebih cepat, lalu dilanjutkan fase modular untuk skala infrastruktur, alur kerja AI, dan integrasi enterprise.",
      },
      {
        question: "Teknologi apa yang Anda kuasai?",
        answer:
          "Stack inti kami mencakup Next.js, React, TypeScript, Node.js, Python (FastAPI), PostgreSQL, dan vector database yang dipadukan dengan OpenAI, Anthropic Claude, LangGraph, serta model fine-tuned khusus.",
      },
      {
        question: "Seberapa cepat alur otomasi AI bisa diluncurkan?",
        answer:
          "Sebagian besar pipeline otomasi AI khusus—seperti triage pelanggan otonom, pengayaan CRM, atau asisten pengetahuan RAG internal—berjalan dari blueprint arsitektur ke produksi dalam 10 hingga 21 hari kerja.",
      },
      {
        question: "Apakah kami mendapat akses langsung ke senior engineer?",
        answer:
          "Tentu. Anda berkolaborasi langsung di Slack dan review arsitektur mingguan bersama founding engineer dan senior product designer kami—tanpa lapisan middle-management atau jeda serah terima.",
      },
    ],
    prompt: "Punya pertanyaan yang belum terjawab di sini?",
    quickChat: "Obrolan Cepat",
    scheduleCall: "Jadwalkan Call",
  },
  blog: {
    eyebrow: "/Blog Terbaru",
    title: "Insight strategis tentang AI, Teknologi, dan Pertumbuhan.",
    explore: "Jelajahi Insight Kami",
    author: "Oleh Tim Riset WeHexa",
    modalWant: "Ingin kami mengimplementasikannya untuk tim Anda?",
    modalCta: "Jadwalkan Call",
    close: "Tutup artikel",
    items: [
      {
        tag: "Automation · AI Strategy",
        tags: ["Automation", "AI Strategy", "Tech Trends"],
        title:
          "Cara mengintegrasikan LLM ke alur dukungan pelanggan yang sudah berjalan.",
        body:
          "Tim dukungan modern memangkas waktu respons pertama hingga 78% dengan memadukan Retrieval-Augmented Generation (RAG) dan guardrail tool-calling deterministik. Alih-alih menggantikan empati manusia, agen triage otonom menyelesaikan tiket tier-1 berulang dan menyiapkan ringkasan konteks untuk eskalasi kompleks.",
        readTime: "5 menit baca",
      },
      {
        tag: "Research · LLM · Workflows",
        tags: ["Research", "LLM", "Workflows"],
        title:
          "Mengapa Next.js pilihan unggul untuk platform SaaS berperforma tinggi.",
        body:
          "Dengan React Server Components, streaming SSR, dan edge middleware, Next.js menghapus latensi waterfall di sisi klien sekaligus menjaga streaming token AI tetap mulus di 60fps. Dipadukan dengan kontrak TypeScript yang ketat, tim merilis fitur dua kali lebih cepat tanpa membengkakkan bundle.",
        readTime: "6 menit baca",
      },
      {
        tag: "Product · Design Ops · Figma",
        tags: ["Product", "Research", "Figma"],
        overlay: "Design Ops",
        title:
          "Psikologi UI: bagaimana micro-interaction meningkatkan retensi pengguna.",
        body:
          "Umpan balik taktil—dari state tombol berpegas hingga petunjuk arah scroll—membangun kepercayaan langsung terhadap kualitas software. Ketika antarmuka merespons niat pengguna secara alami, friksi kognitif turun dan retensi aktif harian naik secara terukur.",
        readTime: "4 menit baca",
      },
    ],
  },
  kinetic: "Solusi dibangun untuk esok • Rekayasa AI-first •",
  contact: {
    title: "Mari Bicara",
    subtitle: "Ceritakan proyek Anda. Kami balas dalam 24 jam.",
    features: [
      {
        title: "Siap Produksi",
        body: "CI/CD, hardening, dan latensi edge — siap diluncurkan.",
      },
      {
        title: "Arsitektur Skalabel",
        body: "Kode modular yang tumbuh dari 100 hingga 10M+ pengguna.",
      },
    ],
    form: {
      fullName: "Masukkan nama lengkap Anda",
      fullNamePlaceholder: "Nama lengkap Anda",
      email: "Email",
      emailPlaceholder: "anda@perusahaan.com",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+62 812 3456 7890",
      serviceType: "Jenis layanan",
      serviceOptions: {
        web: "Web & Software Development",
        ai: "AI & Automation",
        design: "Design & Branding",
        consulting: "Maintenance & Consulting",
      },
      budget: "Budget proyek",
      budgetOptions: {
        "5-10": "$5k – $10k",
        "10-25": "$10k – $25k",
        "25-50": "$25k – $50k",
        "50+": "$50k+",
      },
      details: "Detail proyek",
      detailsPlaceholder:
        "Kami ingin platform AI & web khusus dengan predictive analytics, alur kerja otomatis, dan pengalaman pengguna yang mulus...",
      privacyPrefix: "Kami tidak pernah membagikan data Anda. Baca",
      privacyLink: "Kebijakan Privasi",
      submit: "Jadwalkan Strategy Call",
      submitting: "Mengirim brief Anda...",
      errorName: "Silakan masukkan nama lengkap Anda.",
      errorEmail: "Silakan masukkan alamat email yang valid.",
      errorDetails:
        "Ceritakan sedikit tentang proyek Anda (minimal 20 karakter).",
      errorGeneric:
        "Terjadi kesalahan saat mengirim brief. Coba lagi atau email hello@wehexa.io.",
    },
    successTitle: "Strategy Call Diminta!",
    successBody:
      "Terima kasih, {name}. Founding engineer kami telah menerima brief {service} ({budget}) Anda dan akan membalas ke {email} dalam 24 jam.",
    reset: "Kirim pertanyaan lain",
    founder: {
      title: "Akses Langsung ke Founder",
      body: "Jalur langsung ke engineer yang membangun produk Anda — tanpa account manager.",
      quickChat: "Obrolan Cepat",
      scheduleCall: "Jadwalkan Call",
      imageAlt: "Potret studio founder teknis WeHexa",
    },
  },
  chat: {
    title: "Obrolan Langsung Founder",
    status: "Biasanya membalas di bawah 3 menit",
    greeting:
      "Hai. Saya Alex, Co-Founder & Technical Lead di WeHexa. Apa yang ingin Anda bangun atau otomatiskan?",
    chips: ["Agen Dukungan AI", "Sprint MVP SaaS", "Redesign UI/UX"],
    presets: [
      "Kami butuh agen dukungan pelanggan AI",
      "Ingin membangun MVP SaaS",
      "Redesign produk & identitas brand menyeluruh",
    ],
    inputPlaceholder: "Tanyakan hal teknis...",
    send: "Kirim",
    typing: "Alex sedang mengetik...",
    error:
      "Obrolan sedang tidak tersedia. Email hello@wehexa.io dan kami akan membalas dalam 24 jam.",
    close: "Tutup obrolan",
  },
  footer: {
    tagline:
      "Rekayasa yang teliti, lalu transisi mulus menuju produksi.",
    cta: "Jadwalkan Strategy Call",
    pagesTitle: "Halaman",
    pages: ["Beranda", "Portofolio", "Layanan", "Tentang Kami", "Blog"],
    socialTitle: "Sosial",
    contactTitle: "Kontak",
    cookie: "Kebijakan Cookie",
    privacy: "Kebijakan Privasi",
    rights: "© 2026 WeHexa. Seluruh hak cipta dilindungi.",
  },
  common: {
    close: "Tutup",
    backToTop: "Kembali ke Atas",
  },
};

export const dictionaries: Record<Language, typeof en> = { en, id };

export type Dictionary = typeof en;
