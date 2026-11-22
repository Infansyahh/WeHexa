export const site = {
  name: "WeHexa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wehexa.io",
  email: "hello@wehexa.io",
  phone: "+44 20 7946 0821",
  phoneHref: "tel:+442079460821",
  addressLines: ["WeHexa HQ", "71–75 Shelton Street, London"],
  legal: "© 2026 WeHexa. All rights reserved.",
} as const;

export const navSections = ["work", "services", "faq", "blog"] as const;
export type NavSection = (typeof navSections)[number];

const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const images = {
  hero: {
    src: unsplash("photo-1472214103451-9374bd1c798e", 1920),
    fallback: unsplash("photo-1501854140801-50d01698950b", 1920),
  },
  contact: {
    src: unsplash("photo-1501854140801-50d01698950b", 1920),
    fallback: unsplash("photo-1472214103451-9374bd1c798e", 1920),
  },
  portraits: [
    {
      src: unsplash("photo-1534528741775-53994a69daeb", 120),
      fallback: unsplash("photo-1573496359142-b8d87734a5a2", 120),
    },
    {
      src: unsplash("photo-1507003211169-0a1dd7228f2d", 120),
      fallback: unsplash("photo-1560250097-0b93528c311a", 120),
    },
    {
      src: unsplash("photo-1573496359142-b8d87734a5a2", 120),
      fallback: unsplash("photo-1534528741775-53994a69daeb", 120),
    },
  ],
  founder: {
    src: unsplash("photo-1560250097-0b93528c311a", 400),
    fallback: unsplash("photo-1507003211169-0a1dd7228f2d", 400),
  },
  blog: [
    {
      src: unsplash("photo-1498050108023-c5249f4df085", 900),
      fallback: unsplash("photo-1516321318423-f06f85e504b3", 900),
    },
    {
      src: unsplash("photo-1551288049-bebda4e38f71", 900),
      fallback: unsplash("photo-1460925895917-afdab827c52f", 900),
    },
    {
      src: unsplash("photo-1522071820081-009f0129c71c", 900),
      fallback: unsplash("photo-1553877522-43269d4ea984", 900),
    },
  ],
} as const;

export const serviceIds = ["web", "ai", "design", "consulting"] as const;
export type ServiceId = (typeof serviceIds)[number];

export const serviceMeta: { id: ServiceId; number: string }[] = [
  { id: "web", number: "01" },
  { id: "ai", number: "02" },
  { id: "design", number: "03" },
  { id: "consulting", number: "04" },
];

export const budgetIds = ["5-10", "10-25", "25-50", "50+"] as const;
export type BudgetId = (typeof budgetIds)[number];

export const defaultService: ServiceId = "ai";
export const defaultBudget: BudgetId = "10-25";

export const socialLinks = [
  { id: "x", label: "X / Twitter", href: "#contact" },
  { id: "instagram", label: "Instagram", href: "#contact" },
  { id: "linkedin", label: "LinkedIn", href: "#contact" },
  { id: "dribbble", label: "Dribbble", href: "#contact" },
] as const;

export const footerPages = ["#top", "#work", "#services", "#faq", "#blog"] as const;
