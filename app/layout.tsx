import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jo\u00e3o Pedro | Software Engineer',
  description:
    'Portf\u00f3lio de Jo\u00e3o Pedro, com foco em engenharia de software, front-end e experi\u00eancias digitais.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
