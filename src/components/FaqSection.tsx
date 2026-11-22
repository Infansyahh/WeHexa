"use client";

import { useState } from "react";
import { useChat } from "@/components/providers/ChatProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FaqSection() {
  const { t } = useLanguage();
  const { openChat } = useChat();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1140px] px-2 py-12 sm:px-6 sm:py-20 lg:px-10"
    >
      <div data-reveal className="mb-10 text-center">
        <span className="font-mono text-xs text-gray-500">
          {t.faq.eyebrow}
        </span>
        <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-obsidian sm:text-4xl">
          {t.faq.title}
        </h2>
      </div>

      <div
        data-reveal
        style={{ transitionDelay: "80ms" }}
        className="grid grid-cols-1 items-start gap-3.5 sm:gap-4 md:grid-cols-2"
      >
        {t.faq.items.map((item, index) => {
          const open = openIndex === index;

          return (
            <div
              key={item.question}
              data-open={open}
              className="faq-item rounded-2xl border border-gray-200/90 bg-subtle transition-colors hover:border-gray-300"
            >
              <h3>
                <button
                  type="button"
                  id={`faq-trigger-${index}`}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  className="faq-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-semibold text-obsidian sm:text-[15px]">
                    {item.question}
                  </span>
                  <span
                    className="faq-plus flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-base font-semibold text-obsidian"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                aria-hidden={!open}
                className="faq-content"
              >
                <div className="faq-inner">
                  <p className="px-5 pb-5 text-xs leading-relaxed text-gray-600 sm:px-6 sm:text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        data-reveal
        style={{ transitionDelay: "140ms" }}
        className="mt-9 text-center sm:mt-11"
      >
        <p className="mb-3.5 text-xs text-gray-500 sm:text-[13px]">
          {t.faq.prompt}
        </p>
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-obsidian shadow-xs transition-colors hover:bg-gray-50"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t.faq.quickChat}</span>
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-obsidian shadow-xs transition-colors hover:bg-gray-50"
          >
            <span>{t.faq.scheduleCall}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
