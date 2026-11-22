import { NextResponse } from "next/server";
import { z } from "zod";

const chatSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  lang: z.enum(["en", "id"]).default("en"),
});

type Intent = "pricing" | "timeline" | "ai" | "mvp" | "design" | "call";

const rules: { intent: Intent; keywords: string[] }[] = [
  {
    intent: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "budget",
      "quote",
      "harga",
      "biaya",
      "budget",
      "estimasi",
    ],
  },
  {
    intent: "timeline",
    keywords: [
      "timeline",
      "how long",
      "duration",
      "deadline",
      "launch",
      "berapa lama",
      "durasi",
      "kapan",
      "target",
    ],
  },
  {
    intent: "ai",
    keywords: [
      "ai",
      "agent",
      "automation",
      "rag",
      "llm",
      "chatbot",
      "support",
      "workflow",
      "otomasi",
      "agen",
      "dokumen",
    ],
  },
  {
    intent: "mvp",
    keywords: [
      "mvp",
      "saas",
      "app",
      "platform",
      "next.js",
      "nextjs",
      "react",
      "startup",
      "aplikasi",
      "produk",
    ],
  },
  {
    intent: "design",
    keywords: [
      "design",
      "ui",
      "ux",
      "brand",
      "branding",
      "figma",
      "redesign",
      "desain",
      "identitas",
    ],
  },
  {
    intent: "call",
    keywords: [
      "call",
      "meeting",
      "founder",
      "talk",
      "schedule",
      "book",
      "zoom",
      "diskusi",
      "rapat",
      "jadwal",
    ],
  },
];

const replies: Record<"en" | "id", Record<Intent | "fallback", string>> = {
  en: {
    pricing:
      "Typical engagements: SaaS MVP $10k–$25k, AI automation $5k–$25k, product design $8k–$20k. Final scope depends on integrations and timeline. The Let's Talk form gets you a written estimate within 24 hours.",
    timeline:
      "Most MVPs ship in 4–6 weeks and AI automations in 10–21 business days. Discovery takes 2–3 days, then weekly demos until launch.",
    ai: "For AI support and automations we start with a 20-minute technical scoping call, then ship a production RAG or agent pipeline in 10–21 business days. Share your current stack and the workflow you want to remove.",
    mvp: "A SaaS MVP sprint runs 4–6 weeks: architecture, design system, auth, billing, and one core workflow in production. Send your product idea and target launch date and I'll reply with a scoped plan.",
    design:
      "We handle product and brand together: UX research, design tokens, high-fidelity UI, and a Figma handoff developers can ship from. Share two references you like and I'll tell you what we'd change.",
    call: "Happy to talk. Book a strategy call in the Let's Talk form, or email hello@wehexa.io with two time windows and I'll confirm directly.",
    fallback:
      "Got it. To give you a useful answer I need two things: what the product does and which workflow is slowest today. You can also book a 20-minute founder call from the Let's Talk section.",
  },
  id: {
    pricing:
      "Rentang umum: MVP SaaS $10k–$25k, otomasi AI $5k–$25k, desain produk $8k–$20k. Scope final bergantung pada integrasi dan timeline. Form Mari Bicara memberi Anda estimasi tertulis dalam 24 jam.",
    timeline:
      "Sebagian besar MVP selesai dalam 4–6 minggu dan otomasi AI dalam 10–21 hari kerja. Discovery 2–3 hari, lalu demo mingguan sampai peluncuran.",
    ai: "Untuk dukungan dan otomasi AI, kami mulai dengan sesi scoping teknis 20 menit, lalu mengirim pipeline RAG atau agent ke produksi dalam 10–21 hari kerja. Ceritakan stack Anda dan alur kerja yang ingin dihapus.",
    mvp: "Sprint MVP SaaS berjalan 4–6 minggu: arsitektur, design system, auth, billing, dan satu alur kerja inti di produksi. Kirim ide produk dan target peluncuran, saya balas dengan rencana berscope.",
    design:
      "Kami menangani produk dan brand sekaligus: riset UX, design token, UI high-fidelity, dan handoff Figma yang bisa langsung dirilis developer. Kirim dua referensi favorit Anda dan saya akan bilang apa yang kami ubah.",
    call: "Siap diskusi. Jadwalkan strategy call lewat form Mari Bicara, atau email hello@wehexa.io dengan dua pilihan waktu dan saya konfirmasi langsung.",
    fallback:
      "Baik. Agar jawaban saya berguna, saya perlu dua hal: produk ini melakukan apa dan alur kerja mana yang paling lambat saat ini. Anda juga bisa menjadwalkan call founder 20 menit dari bagian Mari Bicara.",
  },
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Message is required." },
      { status: 422 },
    );
  }

  const { message, lang } = parsed.data;
  const normalized = message.toLowerCase();
  const intent =
    rules.find((rule) =>
      rule.keywords.some((keyword) => normalized.includes(keyword)),
    )?.intent ?? "fallback";

  return NextResponse.json({ ok: true, reply: replies[lang][intent] });
}
