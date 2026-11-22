"use client";

import { useCallback, useState } from "react";
import BlogReaderModal from "@/components/BlogReaderModal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import CtaPill from "@/components/ui/CtaPill";
import SafeImage from "@/components/ui/SafeImage";
import { images } from "@/data/content";

const cardBackgrounds = ["bg-gray-100", "bg-blog-amber", "bg-obsidian-card"];

export default function BlogInsights() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="blog"
      className="mx-auto max-w-[1320px] px-2 py-16 sm:px-6 sm:py-24 lg:px-10"
    >
      <div
        data-reveal
        className="mb-4 flex items-center justify-between font-mono text-xs text-gray-500"
      >
        <span className="font-semibold text-obsidian/80">{t.blog.eyebrow}</span>
      </div>

      <div
        data-reveal
        style={{ transitionDelay: "60ms" }}
        className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end"
      >
        <h2 className="max-w-md text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-obsidian sm:text-4xl lg:text-[2.6rem]">
          {t.blog.title}
        </h2>

        <CtaPill
          onClick={() => setOpenIndex(0)}
          className="self-start sm:self-auto"
        >
          {t.blog.explore}
        </CtaPill>
      </div>

      <div
        data-reveal
        style={{ transitionDelay: "120ms" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-7"
      >
        {t.blog.items.map((item, index) => {
          const image = images.blog[index];

          return (
            <article key={item.title} className="blog-card group relative rounded-[22px] bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={item.title}
                className="absolute inset-0 z-10 rounded-[22px]"
              />

              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-100 ${cardBackgrounds[index]}`}
              >
                {item.overlay && (
                  <span className="absolute left-3.5 top-3.5 z-10 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {item.overlay}
                  </span>
                )}
                <SafeImage
                  src={image.src}
                  fallbackSrc={image.fallback}
                  alt={item.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mt-3 text-base font-bold leading-snug text-obsidian sm:text-[17px]">
                {item.title}
              </h3>
            </article>
          );
        })}
      </div>

      <BlogReaderModal index={openIndex} onClose={close} />
    </section>
  );
}
