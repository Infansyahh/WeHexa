"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type BlogReaderModalProps = {
  index: number | null;
  onClose: () => void;
};

export default function BlogReaderModal({
  index,
  onClose,
}: BlogReaderModalProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const post = index === null ? null : t.blog.items[index];

  useEffect(() => {
    if (index === null) return;

    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [index, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-modal-title"
        className="modal-panel flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <span className="rounded-full bg-lime-pulse px-2.5 py-1 font-mono text-[11px] font-semibold text-obsidian">
            {post.tag}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.blog.close}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-obsidian transition-colors hover:bg-gray-200"
          >
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
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-6 sm:p-8">
          <h3
            id="article-modal-title"
            className="text-xl font-bold leading-snug text-obsidian sm:text-2xl"
          >
            {post.title}
          </h3>
          <div className="flex items-center gap-3 font-mono text-xs text-gray-500">
            <span>{t.blog.author}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">{post.body}</p>
          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-gray-500">{t.blog.modalWant}</span>
            <a
              href="#contact"
              onClick={onClose}
              className="rounded-full bg-obsidian px-4 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-obsidian-surface"
            >
              {t.blog.modalCta} ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
