"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { useChat } from "@/components/providers/ChatProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import LiquidGlassOptics from "@/components/ui/LiquidGlassOptics";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<NavSection | null>(null);
  const [hoveredId, setHoveredId] = useState<NavSection | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const pillVisibleRef = useRef(false);
  const linkRefs = useRef<Partial<Record<NavSection, HTMLAnchorElement | null>>>({});
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
      setScrolled(lastY > 36);

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 36);
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
  const pillTarget = hoveredId ?? active;

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

  useGSAP(
    () => {
      const pill = pillRef.current;
      if (!pill) return;

      const syncPill = (immediate = false) => {
        const targetEl = pillTarget ? linkRefs.current[pillTarget] : null;
        if (!targetEl) {
          pillVisibleRef.current = false;
          gsap.to(pill, {
            autoAlpha: 0,
            scale: 0.94,
            duration: immediate ? 0 : 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
          return;
        }

        const reduce =
          immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const x = targetEl.offsetLeft;
        const width = targetEl.offsetWidth;

        if (!pillVisibleRef.current) {
          pillVisibleRef.current = true;
          gsap.set(pill, { x, width, scale: 0.94 });
          gsap.to(pill, {
            autoAlpha: 1,
            scale: 1,
            duration: reduce ? 0 : 0.24,
            ease: "power3.out",
            overwrite: "auto",
          });
          return;
        }

        gsap.to(pill, {
          x,
          width,
          autoAlpha: 1,
          scale: 1,
          duration: reduce ? 0 : 0.36,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      syncPill(false);

      const list = listRef.current;
      if (!list) return;
      const observer = new ResizeObserver(() => syncPill(true));
      observer.observe(list);
      return () => observer.disconnect();
    },
    { dependencies: [pillTarget, lang], scope: headerRef },
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const nav = navRef.current;
    if (!nav || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = nav.getBoundingClientRect();
    nav.style.setProperty("--glass-mx", `${event.clientX - rect.left}px`);
    nav.style.setProperty("--glass-my", `${event.clientY - rect.top}px`);
    nav.style.setProperty("--glass-sheen-opacity", "1");
  };

  const handlePointerLeave = () => {
    const nav = navRef.current;
    if (!nav) return;
    nav.style.setProperty("--glass-sheen-opacity", "0");
  };

  return (
    <header
      ref={headerRef}
      className="fixed left-1/2 top-5 z-50 w-[calc(100%-2.25rem)] max-w-[1220px] md:top-7"
      style={{ transform: "translate3d(-50%, 0%, 0)" }}
    >
      <nav
        ref={navRef}
        data-scrolled={scrolled ? "true" : "false"}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Primary Navigation"
        className="liquid-glass flex items-center justify-between rounded-full px-4 py-2 sm:px-5 sm:py-2.5"
      >
        <LiquidGlassOptics targetRef={navRef} />
        <span aria-hidden="true" className="liquid-glass-sheen" />

        <a
          href="#top"
          className="group flex items-center gap-2 pl-1 focus:outline-none"
        >
          <span className="text-lg font-extrabold tracking-[-0.04em] text-obsidian transition-opacity group-hover:opacity-80 sm:text-xl">
            WeHexa
          </span>
        </a>

        <ul
          ref={listRef}
          onMouseLeave={() => setHoveredId(null)}
          className="relative hidden items-center gap-1 text-[13.5px] font-semibold text-obsidian/75 md:flex lg:gap-1.5"
        >
          <span
            ref={pillRef}
            aria-hidden="true"
            className="glass-pill-indicator pointer-events-none invisible absolute left-0 top-0 -z-10 h-full rounded-full opacity-0"
          />
          {links.map((link) => {
            const isHighlighted = pillTarget === link.id;
            return (
              <li key={link.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[link.id] = el;
                  }}
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  onMouseEnter={() => setHoveredId(link.id)}
                  onFocus={() => setHoveredId(link.id)}
                  onBlur={() => setHoveredId(null)}
                  className={`relative block rounded-full px-3.5 py-1.5 transition-colors duration-200 active:scale-[0.98] ${
                    isHighlighted
                      ? "text-obsidian"
                      : "text-obsidian/70 hover:text-obsidian"
                  }`}
                >
                  {t.nav[link.key]}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-expanded={langOpen}
              aria-haspopup="true"
              aria-label={t.nav.language}
              onClick={() => setLangOpen((open) => !open)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                langOpen
                  ? "glass-chip text-obsidian"
                  : "text-obsidian/75 hover:bg-white/55 hover:text-obsidian"
              }`}
            >
              <span>{lang === "en" ? "ENG" : "IDN"}</span>
              <svg
                className={`h-3.5 w-3.5 text-obsidian/55 transition-transform duration-200 ${
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
              <div className="liquid-glass-panel modal-panel absolute right-0 z-50 mt-2.5 w-40 rounded-2xl p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                    lang === "en"
                      ? "glass-chip font-semibold text-obsidian"
                      : "font-semibold text-obsidian/70 hover:bg-white/55 hover:text-obsidian"
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
                  className={`mt-0.5 flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors ${
                    lang === "id"
                      ? "glass-chip font-semibold text-obsidian"
                      : "font-semibold text-obsidian/70 hover:bg-white/55 hover:text-obsidian"
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
            className="glass-chip inline-flex h-9 w-9 items-center justify-center rounded-full text-obsidian transition-colors hover:bg-white/80 md:hidden"
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
          className="liquid-glass-panel modal-panel mt-2.5 rounded-3xl p-3.5 md:hidden"
        >
          <div className="flex flex-col space-y-1">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold text-obsidian transition-colors ${
                  active === link.id
                    ? "glass-chip"
                    : "hover:bg-white/60"
                }`}
              >
                {t.nav[link.key]}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-obsidian/10 px-2 pt-3">
            <span className="text-xs text-obsidian/65">{t.nav.readyToScale}</span>
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
