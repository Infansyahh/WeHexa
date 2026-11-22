"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/**
 * One client-side motion engine for the whole page: scroll progress,
 * direction variable, bidirectional reveal, parallax, kinetic scrub,
 * magnetic CTAs and the back-to-top pill.
 */
export default function ScrollUtilities() {
  const progressRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.classList.add("js");

    const progress = progressRef.current;
    const top = topRef.current;
    const parallax = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const kinetic = Array.from(
      document.querySelectorAll<HTMLElement>("[data-kinetic]"),
    );

    let lastY = window.scrollY;
    let direction = 1;
    let frame = 0;
    const cleanups: (() => void)[] = [];

    const setTopVisible = (visible: boolean) => {
      if (!top) return;
      top.style.opacity = visible ? "1" : "0";
      top.style.transform = visible
        ? "translate3d(0, 0, 0)"
        : "translate3d(0, 20px, 0)";
      top.style.pointerEvents = visible ? "auto" : "none";
      top.tabIndex = visible ? 0 : -1;
    };

    const paint = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      if (progress) progress.style.transform = `scaleX(${ratio})`;

      const delta = y - lastY;
      if (Math.abs(delta) > 3) {
        direction = delta > 0 ? 1 : -1;
        root.style.setProperty("--scroll-dir", String(direction));
        root.dataset.scrollDir = direction === 1 ? "down" : "up";
        document.body.classList.toggle("scrolling-up", direction === -1);
      }

      if (!reduced) {
        for (const el of parallax) {
          const parent = el.parentElement;
          if (!parent) continue;
          const rect = parent.getBoundingClientRect();
          if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
            const speed = Number(el.dataset.parallax) || 0;
            el.style.transform = `translate3d(0, ${(rect.top * speed).toFixed(1)}px, 0)`;
          }
        }

        for (const el of kinetic) {
          const parent = el.parentElement;
          if (!parent) continue;
          const rect = parent.getBoundingClientRect();
          const shift = (rect.top - window.innerHeight * 0.5) * 0.28;
          el.style.transform = `translate3d(${shift.toFixed(1)}px, 0, 0)`;
        }
      }

      setTopVisible(y > 550 && direction === -1);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (reduced || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            entry.target.classList.toggle(
              "is-visible",
              entry.isIntersecting,
            );
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
      );
      revealEls.forEach((el) => observer.observe(el));
      cleanups.push(() => observer.disconnect());
    }

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!reduced && finePointer) {
      document
        .querySelectorAll<HTMLElement>(".magnetic-btn")
        .forEach((btn) => {
          const move = (event: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
            btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          };
          const reset = () => {
            btn.style.transform = "translate3d(0, 0, 0)";
          };
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", reset);
          btn.addEventListener("blur", reset);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", reset);
            btn.removeEventListener("blur", reset);
          });
        });
    }

    const onTopClick = () => {
      window.scrollTo({
        top: 0,
        behavior: reduced ? "auto" : "smooth",
      });
    };

    top?.addEventListener("click", onTopClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    paint();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      top?.removeEventListener("click", onTopClick);
      cleanups.forEach((fn) => fn());
      document.body.classList.remove("scrolling-up");
      root.style.removeProperty("--scroll-dir");
      delete root.dataset.scrollDir;
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          ref={progressRef}
          className="progress-glow h-full w-full origin-left scale-x-0 bg-lime-pulse"
        />
      </div>

      <button
        ref={topRef}
        type="button"
        tabIndex={-1}
        aria-label={t.common.backToTop}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2.5 text-xs font-semibold text-white opacity-0 shadow-xl transition-[transform,opacity] duration-300 hover:bg-obsidian-surface"
        style={{ transform: "translate3d(0, 20px, 0)", pointerEvents: "none" }}
      >
        <span>{t.common.backToTop}</span>
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-pulse font-bold text-obsidian"
          aria-hidden="true"
        >
          ↑
        </span>
      </button>
    </>
  );
}
