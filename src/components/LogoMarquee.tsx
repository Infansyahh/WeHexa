"use client";

import { useEffect, useRef } from "react";

const SynaptechIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v3m0 12v3M3 12h3m12 0h3m-2.6-6.4l-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0l-2.1-2.1M7.7 7.7L5.6 5.6"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DatrixIcon = () => (
  <svg
    className="h-5 w-6"
    viewBox="0 0 28 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <polygon points="2,20 8,4 12,4 6,20" />
    <polygon points="9,20 15,4 19,4 13,20" opacity="0.75" />
    <polygon points="16,20 22,4 26,4 20,20" opacity="0.5" />
  </svg>
);

const DeepOrbitIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
  </svg>
);

const DataStackIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
    <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
  </svg>
);

const logos = [
  { name: "Synaptech AI", Icon: SynaptechIcon, weight: "font-semibold" },
  { name: "Datrix", Icon: DatrixIcon, weight: "font-bold" },
  { name: "DeepOrbit", Icon: DeepOrbitIcon, weight: "font-semibold" },
  { name: "DataStack", Icon: DataStackIcon, weight: "font-semibold" },
];

export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let position = 0;
    let paused = false;
    let frame = 0;

    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    viewport.addEventListener("mouseenter", pause);
    viewport.addEventListener("mouseleave", resume);

    const animate = () => {
      if (!paused) {
        const singleSet = track.scrollWidth / 3;
        const direction =
          document.documentElement.dataset.scrollDir === "up" ? -1 : 1;
        position -= 0.65 * direction;

        if (singleSet > 0) {
          if (position <= -singleSet) position += singleSet;
          else if (position >= 0) position -= singleSet;
        }

        track.style.transform = `translate3d(${position.toFixed(2)}px, 0, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("mouseenter", pause);
      viewport.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      aria-label="Trusted Partners"
      className="relative mt-16 select-none overflow-hidden border-b border-gray-100 py-7 sm:mt-24 sm:py-9"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

      <div ref={viewportRef} className="flex overflow-hidden">
        <div
          ref={trackRef}
          data-marquee-track
          className="flex items-center gap-12 whitespace-nowrap sm:gap-20"
        >
          {[0, 1, 2].map((set) => (
            <div
              key={set}
              aria-hidden={set > 0 ? "true" : undefined}
              className="flex shrink-0 items-center gap-12 text-gray-500 sm:gap-20"
            >
              {logos.map(({ name, Icon, weight }) => (
                <div
                  key={`${set}-${name}`}
                  className="flex items-center gap-2.5 transition-colors duration-300 hover:text-obsidian"
                >
                  <Icon />
                  <span
                    className={`text-base tracking-tight sm:text-lg ${weight}`}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
