import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import FounderChatDrawer from "@/components/FounderChatDrawer";
import Navbar from "@/components/Navbar";
import ScrollUtilities from "@/components/motion/ScrollUtilities";
import { ChatProvider } from "@/components/providers/ChatProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { images, site } from "@/data/content";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "We build the software and AI automations that fuel your growth. From sleek web applications to autonomous AI workflows, engineered for production.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "WeHexa — Creative & AI Software Agency",
    template: "%s · WeHexa",
  },
  description,
  applicationName: "WeHexa",
  keywords: [
    "AI automation agency",
    "software development agency",
    "Next.js development",
    "SaaS MVP sprint",
    "LLM integration",
    "RAG systems",
    "UI UX design",
    "WeHexa",
  ],
  authors: [{ name: "WeHexa", url: site.url }],
  creator: "WeHexa",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "WeHexa",
    title: "WeHexa — Creative & AI Software Agency",
    description,
    locale: "en_GB",
    alternateLocale: ["id_ID"],
    images: [
      {
        url: images.hero.src,
        width: 1920,
        height: 1280,
        alt: "Sunlit blue sky above a lush green hillside",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WeHexa — Creative & AI Software Agency",
    description,
    images: [images.hero.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0F12",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-obsidian focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content / Lewati ke konten
        </a>
        <LanguageProvider>
          <ChatProvider>
            <Navbar />
            {children}
            <FounderChatDrawer />
            <ScrollUtilities />
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
