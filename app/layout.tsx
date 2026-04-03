import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'João Pedro | Software Engineer',
  description: 'Portfólio de Engenharia de Software - Black & Red Futurista'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
