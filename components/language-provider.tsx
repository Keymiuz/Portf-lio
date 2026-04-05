'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SiteLocale = 'pt' | 'en';

type LanguageContextValue = {
  locale: SiteLocale;
  toggleLocale: () => void;
  setLocale: (locale: SiteLocale) => void;
};

const STORAGE_KEY = 'site-locale';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<SiteLocale>('pt');

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (storedLocale === 'pt' || storedLocale === 'en') {
      setLocaleState(storedLocale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en-US';
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      toggleLocale: () => setLocaleState((current) => (current === 'pt' ? 'en' : 'pt')),
      setLocale: (nextLocale) => setLocaleState(nextLocale)
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}
