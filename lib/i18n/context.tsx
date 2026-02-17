"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";

export type Locale = "en" | "ml";

type Messages = Record<string, unknown>;

const LOCALE_KEY = "white-army-locale";

const loadMessages = async (locale: Locale): Promise<Messages> => {
  const data = await import(`@/messages/${locale}.json`);
  return data.default as Messages;
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  messages: Messages | null;
  isLoading: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

function interpolate(
  str: string,
  params?: Record<string, string | number>
): string {
  if (!params) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    return val != null ? String(val) : `{${key}}`;
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [messages, setMessages] = useState<Messages | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored === "en" || stored === "ml") {
      setLocaleState(stored);
      if (typeof document !== "undefined") {
        document.documentElement.lang = stored === "ml" ? "ml" : "en";
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadMessages(locale).then((msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_KEY, newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLocale === "ml" ? "ml" : "en";
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      if (!messages) return key;
      const value = getNested(messages as Record<string, unknown>, key);
      if (!value) return key;
      return interpolate(value, params);
    },
    [messages]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, messages, isLoading }),
    [locale, setLocale, t, messages, isLoading]
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}
