'use client';

import { useLanguage } from '@/components/language-provider';

const footerCopy = {
  pt: {
    contact: 'Contato',
    rights: 'Todos os direitos reservados.'
  },
  en: {
    contact: 'Contact',
    rights: 'All rights reserved.'
  }
} as const;

export function Footer() {
  const { locale } = useLanguage();
  const copy = footerCopy[locale];

  return (
    <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
      <p>
        {copy.contact}:{' '}
        <a href="mailto:jpcicolo@gmail.com" className="text-zinc-300 hover:text-red-500">
          jpcicolo@gmail.com
        </a>
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} João Pedro. {copy.rights}
      </p>
    </footer>
  );
}
