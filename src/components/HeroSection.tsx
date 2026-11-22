"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import SafeImage from "@/components/ui/SafeImage";
import { images } from "@/data/content";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="work"
      aria-label="Hero"
      className="scenic-backdrop relative flex min-h-[620px] flex-col justify-between overflow-hidden rounded-[24px] shadow-card sm:min-h-[680px] sm:rounded-[28px] lg:min-h-[750px]"
    >
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <SafeImage
          src={images.hero.src}
          fallbackSrc={images.hero.fallback}
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="scale-[1.12] select-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hero-top/70 via-hero-mid/50 to-black/20" />
        <div className="hero-scrim absolute inset-0" />
      </div>

      <div className="relative z-20 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-32 pt-28 text-center sm:px-8 sm:pb-40 sm:pt-32">
        <div
          data-reveal
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/95 py-1.5 pl-2 pr-4 shadow-lg backdrop-blur-md sm:mb-7"
        >
          <div className="flex -space-x-2">
            {images.portraits.map((portrait, index) => (
              <SafeImage
                key={portrait.src}
                src={portrait.src}
                fallbackSrc={portrait.fallback}
                alt={t.hero.portraitAlts[index] ?? ""}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
          <span className="font-mono text-[11px] font-semibold text-obsidian sm:text-[12px]">
            {t.hero.badge}
          </span>
        </div>

        <h1
          data-reveal
          style={{ transitionDelay: "80ms" }}
          className="text-shadow-hero whitespace-pre-line text-[2.25rem] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[3.35rem] lg:text-[4.15rem]"
        >
          {t.hero.title}
        </h1>

        <p
          data-reveal
          style={{ transitionDelay: "150ms" }}
          className="text-shadow-hero-soft mt-5 max-w-[610px] text-sm font-normal leading-relaxed text-white sm:mt-6 sm:text-base lg:text-[17px]"
        >
          {t.hero.subtitle}
        </p>

        <div
          data-reveal
          style={{ transitionDelay: "220ms" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-9 sm:gap-4"
        >
          <CtaPill href="#contact" variant="lime" className="text-sm">
            {t.hero.primaryCta}
          </CtaPill>
          <CtaPill href="#services" variant="white" className="text-sm">
            {t.hero.secondaryCta}
          </CtaPill>
        </div>
      </div>
    </section>
  );
}
