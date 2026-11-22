"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  serviceIds,
  serviceMeta,
  type ServiceId,
} from "@/data/content";

function Preview({ id, active }: { id: ServiceId; active: boolean }) {
  const muted = active ? "text-gray-400" : "text-gray-500";

  if (id === "web") {
    return (
      <div
        className={`mt-6 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
          active
            ? "border-white/10 bg-obsidian-surface"
            : "border-gray-100 bg-subtle"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-400" />
            <span
              className={`h-2 w-2 rounded-full ${active ? "bg-white/25" : "bg-gray-300"}`}
            />
            <span
              className={`h-2 w-2 rounded-full ${active ? "bg-white/25" : "bg-gray-300"}`}
            />
          </div>
          <span className={`font-mono text-[11px] ${muted}`}>next.config.ts</span>
        </div>
        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${active ? "text-lime-pulse" : "text-lime-ink"}`}>const</span>
            <span className={muted}>edgeRuntime = true;</span>
          </div>
          <div
            className={`h-1.5 w-4/5 rounded ${active ? "bg-white/10" : "bg-gray-200/80"}`}
          />
          <div
            className={`h-1.5 w-3/5 rounded ${active ? "bg-white/10" : "bg-gray-200/80"}`}
          />
          <div className={`flex items-center justify-between pt-2 text-[11px] font-semibold ${active ? "text-emerald-400" : "text-emerald-700"}`}>
            <span>● 99.99% Uptime</span>
            <span>14ms Latency</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "ai") {
    return (
      <div
        className={`mt-6 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
          active
            ? "border-white/10 bg-obsidian-surface"
            : "border-gray-100 bg-subtle"
        }`}
      >
        <div className={`flex items-center justify-between font-mono text-[11px] ${muted}`}>
          <span>AGENT PIPELINE</span>
          <span className={`font-semibold ${active ? "text-lime-pulse" : "text-lime-ink"}`}>ACTIVE</span>
        </div>
        <div className="my-auto flex items-center justify-between gap-2">
          <div
            className={`rounded-xl border px-2.5 py-2 font-mono text-[11px] ${
              active
                ? "border-white/15 bg-white/5 text-gray-300"
                : "border-gray-300/60 bg-white text-gray-500"
            }`}
          >
            Input
          </div>
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-gray-400/50 via-lime-pulse to-gray-400/50" />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime-pulse/70 bg-obsidian text-lime-pulse">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-gray-400/50 via-lime-pulse to-gray-400/50" />
          <div
            className={`rounded-xl border px-2.5 py-2 font-mono text-[11px] ${
              active
                ? "border-white/15 bg-white/5 text-gray-300"
                : "border-gray-300/60 bg-white text-gray-500"
            }`}
          >
            Action
          </div>
        </div>
        <div className={`flex items-center justify-between font-mono text-[11px] ${muted}`}>
          <span>Latency: 180ms</span>
          <span>RAG v4.2</span>
        </div>
      </div>
    );
  }

  if (id === "design") {
    return (
      <div
        className={`relative mt-6 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
          active
            ? "border-white/10 bg-obsidian-surface"
            : "border-gray-100 bg-subtle"
        }`}
      >
        <div className={`flex items-center justify-between font-mono text-[11px] ${muted}`}>
          <span>DESIGN SYSTEM</span>
          <span className={active ? "text-lime-pulse" : "text-lime-ink"}>v3.0</span>
        </div>
        <div
          className={`mx-auto my-auto flex h-14 w-14 items-center justify-center rounded-2xl border ${
            active
              ? "border-white/15 bg-white/5 text-white"
              : "border-gray-200 bg-white text-obsidian"
          }`}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19l7-7 3 3-7 7-3-3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 2l7.586 7.586"
            />
            <circle cx="11" cy="11" r="2" />
          </svg>
        </div>
        <div className={`flex items-center justify-between font-mono text-[11px] ${muted}`}>
          <span>Figma Tokens</span>
          <span>Interactive UI</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mt-6 flex h-44 flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
        active
          ? "border-white/10 bg-obsidian-surface"
          : "border-gray-100 bg-subtle"
      }`}
    >
      <div className={`flex items-center justify-between font-mono text-[11px] ${muted}`}>
        <span>SYSTEM HEALTH</span>
        <span className={`font-semibold ${active ? "text-emerald-400" : "text-emerald-700"}`}>OPTIMAL</span>
      </div>
      <div className="grid h-16 grid-cols-4 items-end gap-2 px-1">
        <div
          className={`h-7 rounded-md ${active ? "bg-white/10" : "bg-gray-300/60"}`}
        />
        <div
          className={`h-10 rounded-md ${active ? "bg-white/20" : "bg-gray-300/80"}`}
        />
        <div className="h-12 rounded-md bg-lime-pulse/70" />
        <div className="h-16 rounded-md bg-lime-pulse" />
      </div>
      <div className={`flex items-center justify-between text-[11px] font-semibold ${muted}`}>
        <span>Throughput</span>
        <span className="font-mono font-semibold">+312% YoY</span>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(
    serviceIds.indexOf("design"),
  );

  return (
    <section
      id="services"
      className="mx-auto max-w-[1320px] px-2 py-16 sm:px-6 sm:py-24 lg:px-10"
    >
      <div
        data-reveal
        className="mb-5 flex items-center justify-between font-mono text-xs text-gray-500"
      >
        <span className="font-semibold tracking-tight text-obsidian/80">
          {t.services.eyebrow}
        </span>
        <span className="font-semibold text-gray-500">
          {String(activeIndex + 1).padStart(2, "0")} / 04
        </span>
      </div>

      <h2
        data-reveal
        style={{ transitionDelay: "60ms" }}
        className="mb-10 max-w-lg text-3xl font-bold leading-[1.12] tracking-[-0.03em] text-obsidian sm:mb-12 sm:text-4xl lg:text-[2.75rem]"
      >
        {t.services.title}
      </h2>

      <div
        data-reveal
        style={{ transitionDelay: "120ms" }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
      >
        {serviceMeta.map((service, index) => {
          const active = index === activeIndex;
          const item = t.services.items[index];

          return (
            <article
              key={service.id}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              aria-label={item.title.replace("\n", " ")}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className={`service-card group flex min-h-[370px] cursor-pointer flex-col justify-between rounded-[22px] border p-6 text-left transition-[background-color,color,border-color,box-shadow] duration-[450ms] ease-spring sm:min-h-[410px] sm:p-7 ${
                active
                  ? "border-white/15 bg-obsidian-card text-white shadow-obsidian"
                  : "border-gray-200/90 bg-white text-obsidian"
              }`}
            >
              <div>
                <h3
                  className={`whitespace-pre-line text-lg font-bold leading-snug tracking-tight sm:text-[19px] ${
                    active ? "text-white" : "text-obsidian"
                  }`}
                >
                  {item.title}
                </h3>
                <div
                  aria-hidden={!active}
                  className={`mt-3 grid text-xs leading-relaxed transition-[grid-template-rows,opacity,visibility] duration-300 sm:text-[13.5px] ${
                    active
                      ? "visible grid-rows-[1fr] text-gray-400 opacity-100"
                      : "invisible grid-rows-[0fr] text-gray-500 opacity-0"
                  }`}
                >
                  <p className="overflow-hidden">{item.description}</p>
                </div>
              </div>

              <Preview id={service.id} active={active} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
