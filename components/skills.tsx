'use client';

import { Braces, Languages, MonitorCog, ServerCog } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { TiltCard } from '@/components/tilt-card';
import { getPortfolioContent } from '@/data/portfolio-data';

const sectionCopy = {
  pt: {
    title: 'Skills & Tech Stack',
    description: 'Stack principal e competências técnicas organizadas para leitura objetiva e avaliação rápida.',
    eyebrow: 'Stack principal',
    body: 'Tecnologias alinhadas à minha atuação em desenvolvimento de software, back-end, front-end e construção de aplicações escaláveis.',
    countLabel: 'competências',
    languages: 'Idiomas'
  },
  en: {
    title: 'Skills & Tech Stack',
    description: 'Core stack and technical capabilities organized for fast, objective evaluation.',
    eyebrow: 'Core stack',
    body: 'Technologies aligned with my work in software development, back-end, front-end and scalable application delivery.',
    countLabel: 'skills',
    languages: 'Languages'
  }
} as const;

const skillVisuals: Record<
  string,
  {
    badge: string;
    badgeClassName: string;
  }
> = {
  'Node.js': { badge: 'N', badgeClassName: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/25' },
  Angular: { badge: 'Ng', badgeClassName: 'bg-red-500/15 text-red-300 ring-1 ring-red-500/25' },
  React: { badge: 'R', badgeClassName: 'bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/25' },
  'Spring Boot': { badge: 'SB', badgeClassName: 'bg-lime-500/15 text-lime-300 ring-1 ring-lime-500/25' },
  Java: { badge: 'J', badgeClassName: 'bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/25' },
  C: { badge: 'C', badgeClassName: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/25' },
  'C++': { badge: 'C++', badgeClassName: 'bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/25' },
  TypeScript: { badge: 'TS', badgeClassName: 'bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/25' },
  JavaScript: { badge: 'JS', badgeClassName: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/25' },
  Python: { badge: 'Py', badgeClassName: 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/25' },
  SQL: { badge: 'SQL', badgeClassName: 'bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/25' },
  Shell: { badge: 'Sh', badgeClassName: 'bg-zinc-400/15 text-zinc-200 ring-1 ring-zinc-400/25' }
};

const groupIcons = {
  'Core stack': ServerCog,
  'Linguagens': Braces,
  Languages: Braces,
  'Ferramentas de automação': MonitorCog,
  'Automation tools': MonitorCog
} as const;

export function Skills() {
  const { locale } = useLanguage();
  const copy = sectionCopy[locale];
  const { skillGroups, spokenLanguages } = getPortfolioContent(locale);
  const allSkills = skillGroups.flatMap((group) => group.items);

  return (
    <section className="space-y-4" id="skills">
      <div>
        <h2 className="text-2xl font-semibold text-white">{copy.title}</h2>
        <p className="text-sm text-zinc-400">{copy.description}</p>
      </div>

      <TiltCard maxTilt={5}>
        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/65 p-5 backdrop-blur-xl md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{copy.eyebrow}</p>
              <p className="mt-2 max-w-3xl text-sm text-zinc-400">{copy.body}</p>
            </div>

            <div className="rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-red-400">
              {allSkills.length} {copy.countLabel}
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_1fr_0.9fr]">
            {skillGroups.map((group) => {
              const GroupIcon = groupIcons[group.title as keyof typeof groupIcons] ?? ServerCog;

              return (
                <div
                  key={group.title}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/45 p-4"
                >
                  <div className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    <GroupIcon className="h-4 w-4" />
                    {group.title}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const visual = skillVisuals[item] ?? {
                        badge: item.slice(0, 2).toUpperCase(),
                        badgeClassName: 'bg-zinc-500/15 text-zinc-200 ring-1 ring-zinc-500/25'
                      };

                      return (
                        <div
                          key={item}
                          className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-300 transition duration-300 hover:border-red-600 hover:text-zinc-100"
                        >
                          <span
                            className={`inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${visual.badgeClassName}`}
                          >
                            {visual.badge}
                          </span>
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 border-t border-zinc-800 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
                <Languages className="h-4 w-4" />
                {copy.languages}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {spokenLanguages.map((language) => (
                  <div
                    key={language}
                    className="rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1.5 text-xs text-zinc-300 transition duration-300 hover:border-red-600 hover:text-zinc-100"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </section>
  );
}
