"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

function Line({ text }: { text: string }) {
  const parts = text.split("•");

  return (
    <span className="text-[3.25rem] font-extrabold leading-none tracking-[-0.04em] text-obsidian sm:text-[5rem] lg:text-[6.5rem]">
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <span className="text-lime-pulse text-shadow-kinetic">
              •
            </span>
          )}
        </Fragment>
      ))}
    </span>
  );
}

export default function KineticBanner() {
  const { t } = useLanguage();

  return (
    <section aria-hidden="true" className="select-none overflow-hidden py-12 sm:py-20">
      <div
        data-kinetic
        className="flex items-center whitespace-nowrap"
      >
        <Line text={t.kinetic} />
        <Line text={t.kinetic} />
      </div>
    </section>
  );
}
