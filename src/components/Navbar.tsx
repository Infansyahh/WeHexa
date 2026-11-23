"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { useChat } from "@/components/providers/ChatProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import { navSections, type NavSection } from "@/data/content";

const links = [
  { id: "work", key: "portfolio" },
  { id: "services", key: "services" },
  { id: "faq", key: "about" },
  { id: "blog", key: "blog" },
] as const;

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { openChat } = useChat();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<NavSection | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      gsap.set(header, { xPercent: -50, yPercent: 0 });

      let lastY = window.scrollY;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (y <= 120) {
            setHidden(false);
          } else if (y > lastY + 6) {
            if (!menuOpenRef.current) setHidden(true);
          } else if (y < lastY - 6) {
            setHidden(false);
          }
          lastY = y;
        },
      });
    },
    { scope: headerRef },
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as NavSection);
          }
        }
      },
      { threshold: 0.35 },
    );

    for (const id of navSections) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isHidden = hidden && !menuOpen;

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(header, {
        yPercent: isHidden ? -145 : 0,
        duration: reduce ? 0 : 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { dependencies: [isHidden], scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 top-5 z-50 w-[calc(100%-2.25rem)] max-w-[1220px] md:top-7"
      style={{ transform: "translate3d(-50%, 0%, 0)" }}
    >
      <nav
        aria-label="Primary Navigation"
        className="liquid-glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6"
      >
        <a
          href="#top"
          className="group flex items-center gap-2 focus:outline-none"
        >
          <span className="text-lg font-extrabold tracking-[-0.04em] text-obsidian transition-opacity group-hover:opacity-80 sm:text-xl">
            WeHexa
          </span>
        </a>

        <ul className="hidden items-center gap-1 text-[13.5px] font-semibold text-gray-600 md:flex lg:gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-1.5 transition-colors hover:bg-white/40 hover:text-obsidian active:bg-white/60 ${
                  active === link.id
                    ? "glass-chip font-semibold text-obsidian"
                    : ""
                }`}
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-expanded={langOpen}
              aria-haspopup="true"
              aria-label={t.nav.language}
              onClick={() => setLangOpen((open) => !open)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-wide text-gray-700 transition-colors hover:bg-white/40"
            >
              <span>{lang === "en" ? "ENG" : "IDN"}</span>
              <svg
                className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {langOpen && (
              <div className="liquid-glass-panel absolute right-0 z-50 mt-2 w-40 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs ${
                    lang === "en"
                      ? "glass-chip font-semibold text-obsidian"
                      : "font-semibold text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <span>{t.nav.english}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      lang === "en" ? "bg-obsidian" : "bg-transparent"
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang("id");
                    setLangOpen(false);
                  }}
                  className={`mt-0.5 flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs ${
                    lang === "id"
                      ? "glass-chip font-semibold text-obsidian"
                      : "font-semibold text-gray-600 hover:bg-white/50"
                  }`}
                >
                  <span>{t.nav.indonesian}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      lang === "id" ? "bg-obsidian" : "bg-transparent"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          <CtaPill href="#contact">{t.nav.contact}</CtaPill>

          <button
            type="button"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-obsidian transition-colors hover:bg-white/85 md:hidden"
          >
            {menuOpen ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-drawer"
          className="liquid-glass-panel mt-2 rounded-3xl p-4 md:hidden"
        >
          <div className="flex flex-col space-y-1">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-white/55"
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 px-2 pt-3">
            <span className="text-xs text-gray-500">{t.nav.readyToScale}</span>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openChat();
              }}
              className="text-xs font-semibold text-obsidian underline underline-offset-4"
            >
              {t.nav.quickChat}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
