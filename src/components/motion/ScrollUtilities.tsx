"use client";

import { useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "./gsap";

/**
 * One client-side motion engine for the whole page, powered by GSAP:
 * scroll progress, scroll direction, bidirectional reveal, parallax,
 * kinetic scrub, magnetic CTAs and the back-to-top pill.
 */
export default function ScrollUtilities() {
  const progressRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    const root = document.documentElement;
    const progress = progressRef.current;
    const top = topRef.current;

    root.classList.add("js");

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = prefersReduced
      ? null
      : ScrollSmoother.create({
          smooth: 1.2,
          smoothTouch: 0.1,
          effects: false,
          ignoreMobileResize: true,
        });

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    const kinetic = gsap.utils.toArray<HTMLElement>("[data-kinetic]");

    const setProgress = progress ? gsap.quickSetter(progress, "scaleX") : null;

    let reduceMotion = prefersReduced;
    let lastY = window.scrollY;
    let direction = 1;
    let topVisible = false;

    const setTopVisible = (visible: boolean) => {
      if (!top || visible === topVisible) return;
      topVisible = visible;
      top.style.pointerEvents = visible ? "auto" : "none";
      top.tabIndex = visible ? 0 : -1;
      gsap.to(top, {
        autoAlpha: visible ? 1 : 0,
        y: visible ? 0 : 20,
        duration: reduceMotion ? 0 : 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onTopClick = () => {
      if (smoother) smoother.scrollTo(0, true);
      else window.scrollTo({ top: 0, behavior: "auto" });
    };
    top?.addEventListener("click", onTopClick);

    // Progress + scroll direction drive every other reactive element.
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setProgress?.(self.progress);

        if (Math.abs(y - lastY) > 3) {
          direction = y > lastY ? 1 : -1;
          root.style.setProperty("--scroll-dir", String(direction));
          root.dataset.scrollDir = direction === 1 ? "down" : "up";
          document.body.classList.toggle("scrolling-up", direction === -1);
        }
        lastY = y;

        setTopVisible(y > 550 && direction === -1);
      },
      onRefresh: (self) => {
        setProgress?.(self.progress);
      },
    });

    const getDelay = (el: HTMLElement) => {
      const value = el.style.transitionDelay;
      if (!value) return 0;
      const n = parseFloat(value);
      if (!Number.isFinite(n)) return 0;
      return value.endsWith("ms") ? n / 1000 : n;
    };

    const hideReveal = (el: HTMLElement) => {
      const dir = root.dataset.scrollDir === "up" ? -1 : 1;
      gsap.set(el, { autoAlpha: 0, y: 28 * dir, scale: 0.985 });
    };

    const showReveal = (el: HTMLElement, delay: number) => {
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduceMotion ? 0 : 0.72,
        delay: reduceMotion ? 0 : delay,
        ease: "expo.out",
        overwrite: "auto",
      });
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce, fine } = context.conditions as Record<string, boolean>;
        reduceMotion = reduce;

        if (reduce) {
          gsap.set(reveals, { autoAlpha: 1, y: 0, scale: 1 });
          gsap.set(parallax, { clearProps: "transform" });
          gsap.set(kinetic, { clearProps: "transform" });
          return;
        }

        reveals.forEach((el) => {
          hideReveal(el);
          const delay = getDelay(el);
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            end: "bottom top",
            onEnter: () => showReveal(el, delay),
            onEnterBack: () => showReveal(el, delay),
            onLeave: () => hideReveal(el),
            onLeaveBack: () => hideReveal(el),
          });
        });

        for (const el of parallax) {
          const parent = el.parentElement;
          const speed = Number(el.dataset.parallax) || 0;
          if (!parent || !speed) continue;

          gsap.fromTo(
            el,
            { y: () => window.innerHeight * speed },
            {
              y: () => -parent.offsetHeight * speed,
              ease: "none",
              scrollTrigger: {
                trigger: parent,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        for (const el of kinetic) {
          const parent = el.parentElement;
          if (!parent) continue;
          const shift = 0.28;

          gsap.fromTo(
            el,
            { x: () => window.innerHeight * (1 - 0.5) * shift },
            {
              x: () => (-parent.offsetHeight - window.innerHeight * 0.5) * shift,
              ease: "none",
              scrollTrigger: {
                trigger: parent,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (!fine) return;

        const cleanups: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>(".magnetic-btn").forEach((btn) => {
          const setX = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
          const setY = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

          const move = (event: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            setX((event.clientX - rect.left - rect.width / 2) * 0.16);
            setY((event.clientY - rect.top - rect.height / 2) * 0.22);
          };
          const reset = () => {
            setX(0);
            setY(0);
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

        return () => cleanups.forEach((fn) => fn());
      },
    );

    return () => {
      smoother?.kill();
      mm.revert();
      top?.removeEventListener("click", onTopClick);
      document.body.classList.remove("scrolling-up");
      root.style.removeProperty("--scroll-dir");
      delete root.dataset.scrollDir;
    };
  });

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
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2.5 text-xs font-semibold text-white opacity-0 shadow-xl hover:bg-obsidian-surface"
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
