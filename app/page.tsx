'use client';

import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { LanguageToggle } from '@/components/language-toggle';
import { Projects } from '@/components/projects';
import { RealCaseStudy } from '@/components/real-case-study';
import { Skills } from '@/components/skills';
import { Timeline } from '@/components/timeline';
import { useLanguage } from '@/components/language-provider';

const navLabels = {
  pt: { caseStudy: 'Caso Real', projects: 'Projetos', contact: 'Contato' },
  en: { caseStudy: 'Real Case', projects: 'Projects', contact: 'Contact' }
} as const;

export default function HomePage() {
  const { locale } = useLanguage();
  const copy = navLabels[locale];

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-4 py-8 md:px-8 md:py-10">
      <header className="sticky top-3 z-40 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3 backdrop-blur-xl">
        <nav className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">JP {'\u2022'} Software Engineer</span>

          <div className="flex flex-wrap items-center gap-3">
            <a href="#skills" className="transition hover:text-red-500">
              Skills
            </a>
            <a href="#timeline" className="transition hover:text-red-500">
              Timeline
            </a>
            <a href="#case-study" className="transition hover:text-red-500">
              {copy.caseStudy}
            </a>
            <a href="#projects" className="transition hover:text-red-500">
              {copy.projects}
            </a>
            <a href="#contact" className="transition hover:text-red-500">
              {copy.contact}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      </header>

      <Hero />
      <Skills />
      <Timeline />
      <RealCaseStudy />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
