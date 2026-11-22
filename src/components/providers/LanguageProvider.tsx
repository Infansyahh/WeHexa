"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  type Dictionary,
  type Language,
} from "@/data/translations";

type LanguageContextValue = {
  lang: Language;
  setLang: (language: Language) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "wehexa-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: dictionaries[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
