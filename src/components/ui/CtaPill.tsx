import type { ReactNode } from "react";

type Variant = "lime" | "white" | "dark";

const shell: Record<Variant, string> = {
  lime: "magnetic-btn bg-lime-pulse text-obsidian shadow-sm hover:bg-lime-pulse-hover active:bg-lime-soft",
  white:
    "magnetic-btn border border-white/80 bg-white/95 text-obsidian shadow-lg shadow-black/15 hover:bg-white active:bg-gray-100",
  dark: "bg-obsidian text-white hover:bg-obsidian-surface active:bg-black",
};

const badge: Record<Variant, string> = {
  lime: "bg-obsidian text-white",
  white: "border border-gray-200 bg-gray-50 text-obsidian",
  dark: "bg-lime-pulse text-obsidian",
};

type CtaPillProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export default function CtaPill({
  children,
  href,
  onClick,
  type = "button",
  variant = "lime",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}: CtaPillProps) {
  const classes = [
    "cta-pill inline-flex items-center gap-2.5 rounded-full py-2 pl-4 pr-1.5 text-xs font-semibold transition-colors sm:text-[13px]",
    shell[variant],
    disabled ? "pointer-events-none opacity-60" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:rounded-lg ${badge[variant]}`}
        aria-hidden="true"
      >
        <svg
          className="arrow-icon h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H8M17 7V16"
          />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
