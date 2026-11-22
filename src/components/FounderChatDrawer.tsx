"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useChat } from "@/components/providers/ChatProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

export default function FounderChatDrawer() {
  const { isOpen, closeChat } = useChat();
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeChat();
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
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
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [isOpen, closeChat]);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, typing, isOpen]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;

    setError("");
    setInput("");
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text },
    ]);
    setTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang }),
      });
      const data = (await response.json().catch(() => null)) as
        | { reply?: string }
        | null;

      if (!response.ok || !data?.reply) throw new Error("Chat failed");

      await new Promise((resolve) => window.setTimeout(resolve, 550));
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: "assistant", text: data.reply as string },
      ]);
    } catch {
      setError(t.chat.error);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(input);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-4 backdrop-blur-xs sm:items-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeChat();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
        className="modal-panel w-full max-w-md overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between bg-obsidian px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-lime-pulse text-xs font-extrabold text-obsidian">
              WH
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-obsidian" />
            </div>
            <div>
              <h3 id="chat-title" className="text-sm font-bold">
                {t.chat.title}
              </h3>
              <p className="text-[11px] text-gray-400">{t.chat.status}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeChat}
            aria-label={t.chat.close}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
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

        <div
          ref={feedRef}
          className="max-h-72 space-y-3 overflow-y-auto bg-subtle p-5 text-xs"
          aria-live="polite"
        >
          <div className="max-w-[85%] rounded-2xl rounded-tl-xs border border-gray-200/80 bg-white p-3.5 text-gray-700 shadow-2xs">
            {t.chat.greeting}
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-auto max-w-[82%] rounded-2xl rounded-tr-xs bg-obsidian p-3.5 text-white shadow-2xs"
                  : "max-w-[85%] rounded-2xl rounded-tl-xs border border-gray-200/80 bg-white p-3.5 text-gray-700 shadow-2xs"
              }
            >
              {message.text}
            </div>
          ))}

          {typing && (
            <div className="flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tl-xs border border-gray-200/80 bg-white p-3.5 text-gray-500 shadow-2xs">
              <span className="sr-only">{t.chat.typing}</span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 [animation-delay:120ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-400 [animation-delay:240ms]" />
            </div>
          )}

          {error && (
            <p role="alert" className="text-[11px] font-semibold text-rose-600">
              {error}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 bg-white px-4 py-2.5">
          {t.chat.chips.map((chip, index) => (
            <button
              key={chip}
              type="button"
              onClick={() => void send(t.chat.presets[index])}
              className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-obsidian transition-colors hover:bg-lime-pulse"
            >
              {chip}
            </button>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            maxLength={1000}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t.chat.inputPlaceholder}
            aria-label={t.chat.inputPlaceholder}
            className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-xs text-obsidian placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-obsidian/20"
          />
          <button
            type="submit"
            disabled={typing || input.trim().length === 0}
            className="rounded-full bg-lime-pulse px-4 py-2 text-xs font-bold text-obsidian transition-colors hover:bg-lime-pulse-hover disabled:opacity-50"
          >
            {t.chat.send}
          </button>
        </form>
      </div>
    </div>
  );
}
