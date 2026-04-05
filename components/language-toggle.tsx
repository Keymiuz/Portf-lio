'use client';

import { useLanguage } from '@/components/language-provider';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();
  const isPortuguese = locale === 'pt';

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
      aria-label={isPortuguese ? 'Switch site to English' : 'Voltar o site para português'}
      title={isPortuguese ? 'Switch to English' : 'Voltar para português'}
    >
      <span className="text-base" aria-hidden="true">
        {isPortuguese ? '🇺🇸' : '🇧🇷'}
      </span>
      <span>{isPortuguese ? 'EN' : 'PT-BR'}</span>
    </button>
  );
}
