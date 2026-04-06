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

const groupIcons = {
  'Core stack': ServerCog,
  Linguagens: Braces,
  Languages: Braces,
  'Ferramentas de automação': MonitorCog,
  'Automation tools': MonitorCog
} as const;

const skillStyles: Record<
  string,
  {
    shell: string;
    tile: string;
    glow: string;
  }
> = {
  'Node.js': {
    shell: 'border-emerald-500/15 bg-emerald-500/[0.04] hover:border-emerald-400/40',
    tile: 'bg-emerald-500/12 ring-1 ring-emerald-400/20',
    glow: 'from-emerald-400/20'
  },
  Angular: {
    shell: 'border-red-500/15 bg-red-500/[0.04] hover:border-red-400/40',
    tile: 'bg-red-500/12 ring-1 ring-red-400/20',
    glow: 'from-red-400/20'
  },
  React: {
    shell: 'border-cyan-500/15 bg-cyan-500/[0.04] hover:border-cyan-400/40',
    tile: 'bg-cyan-500/12 ring-1 ring-cyan-400/20',
    glow: 'from-cyan-400/20'
  },
  Java: {
    shell: 'border-orange-500/15 bg-orange-500/[0.04] hover:border-orange-400/40',
    tile: 'bg-orange-500/12 ring-1 ring-orange-400/20',
    glow: 'from-orange-400/20'
  },
  'Spring Boot': {
    shell: 'border-lime-500/15 bg-lime-500/[0.04] hover:border-lime-400/40',
    tile: 'bg-lime-500/12 ring-1 ring-lime-400/20',
    glow: 'from-lime-400/20'
  },
  C: {
    shell: 'border-sky-500/15 bg-sky-500/[0.04] hover:border-sky-400/40',
    tile: 'bg-sky-500/12 ring-1 ring-sky-400/20',
    glow: 'from-sky-400/20'
  },
  'C++': {
    shell: 'border-indigo-500/15 bg-indigo-500/[0.04] hover:border-indigo-400/40',
    tile: 'bg-indigo-500/12 ring-1 ring-indigo-400/20',
    glow: 'from-indigo-400/20'
  },
  'TypeScript / JavaScript': {
    shell: 'border-blue-500/15 bg-blue-500/[0.04] hover:border-blue-400/40',
    tile: 'bg-blue-500/12 ring-1 ring-blue-400/20',
    glow: 'from-blue-400/20'
  },
  Python: {
    shell: 'border-yellow-500/15 bg-yellow-500/[0.04] hover:border-yellow-400/40',
    tile: 'bg-yellow-500/12 ring-1 ring-yellow-400/20',
    glow: 'from-yellow-300/20'
  },
  SQL: {
    shell: 'border-fuchsia-500/15 bg-fuchsia-500/[0.04] hover:border-fuchsia-400/40',
    tile: 'bg-fuchsia-500/12 ring-1 ring-fuchsia-400/20',
    glow: 'from-fuchsia-400/20'
  },
  Shell: {
    shell: 'border-zinc-400/15 bg-zinc-400/[0.04] hover:border-zinc-300/40',
    tile: 'bg-zinc-400/10 ring-1 ring-zinc-300/15',
    glow: 'from-zinc-300/15'
  }
};

function SkillGlyph({ item }: { item: string }) {
  switch (item) {
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="6" cy="12" r="2.2" fill="#34d399" />
          <circle cx="18" cy="7" r="2.2" fill="#6ee7b7" />
          <circle cx="18" cy="17" r="2.2" fill="#10b981" />
          <path d="M8 11l7.6-3.1M8 13l7.6 3.1" stroke="#a7f3d0" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'Angular':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M12 3 5.8 5.2l1 10.1L12 21l5.2-5.7 1-10.1L12 3Z" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.2" />
          <path d="M12 7.4 9.1 15h1.7l.6-1.7h2.9L15 15h1.7L13.8 7.4H12Zm-.1 4.5.9-2.4.9 2.4h-1.8Z" fill="#fecaca" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <ellipse cx="12" cy="12" rx="8.3" ry="3.1" stroke="#67e8f9" strokeWidth="1.4" />
          <ellipse cx="12" cy="12" rx="8.3" ry="3.1" stroke="#67e8f9" strokeWidth="1.4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8.3" ry="3.1" stroke="#67e8f9" strokeWidth="1.4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.7" fill="#a5f3fc" />
        </svg>
      );
    case 'Java':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M9 16.2c1 .6 2 .9 3 .9s2-.3 3-.9" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8.2 14.6h7.1a2.4 2.4 0 1 1 0 4.8H10a2.8 2.8 0 0 1-2.8-2.8v-1a1 1 0 0 1 1-1Z" stroke="#38bdf8" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M16.2 15.4h.9a1.3 1.3 0 1 1 0 2.6h-.9" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10.2 4.8c1 .9.7 1.8-.1 2.7-.7.7-1 1.4-.2 2.2" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M13.5 4.1c1.1 1 .7 2-.1 3-.7.8-1.1 1.5-.2 2.4" stroke="#fb923c" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case 'Spring Boot':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M7 15c4.2.3 7-1 9.8-5.4 1.2 4-1.3 8.4-5.8 9.1-2.1.4-3.7-.3-4-3.7Z" fill="#4d7c0f" stroke="#bef264" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M8.7 14.6c2-1.4 4.4-3.4 6.5-6.6" stroke="#d9f99d" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 17.6c1.2-.3 2.4-.9 3.3-1.8" stroke="#d9f99d" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'C':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M16.8 7.4a6.2 6.2 0 1 0 0 9.2" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="9.6" cy="12" r="1.4" fill="#bae6fd" />
        </svg>
      );
    case 'C++':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="3.5" y="5.2" width="17" height="13.6" rx="4" stroke="#818cf8" strokeWidth="1.3" />
          <path d="M11.2 9a3.8 3.8 0 1 0 0 6" stroke="#a5b4fc" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M14.8 10.1v3.8M13 12h3.6M18.4 10.1v3.8M16.6 12h3.6" stroke="#c7d2fe" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case 'TypeScript / JavaScript':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="3.5" y="6.2" width="8.6" height="11.6" rx="2.2" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
          <rect x="11.9" y="6.2" width="8.6" height="11.6" rx="2.2" fill="#92400e" stroke="#facc15" strokeWidth="1" />
          <path d="M6.1 10.2h3.5M7.9 10.2v4.1M13.9 10.2h3.1M15.5 10.2v4.1M13.8 14.1c.5.5 1 .7 1.7.7.8 0 1.4-.4 1.4-1.1 0-1.6-3-.9-3-2.8 0-.9.8-1.6 2.1-1.6.7 0 1.3.2 1.8.5" stroke="#f8fafc" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path d="M12 5.2c0-1.2-1-2.2-2.2-2.2H7.9A2.9 2.9 0 0 0 5 5.9v3.4c0 1 .8 1.8 1.8 1.8h4.8c1.1 0 2-.9 2-2V5.2Z" fill="#2563eb" stroke="#93c5fd" strokeWidth="1" />
          <circle cx="8.2" cy="6.8" r=".8" fill="#e0f2fe" />
          <path d="M12 18.8c0 1.2 1 2.2 2.2 2.2h1.9a2.9 2.9 0 0 0 2.9-2.9v-3.4c0-1-.8-1.8-1.8-1.8h-4.8c-1.1 0-2 .9-2 2v3.9Z" fill="#ca8a04" stroke="#fde68a" strokeWidth="1" />
          <circle cx="15.8" cy="17.2" r=".8" fill="#fef3c7" />
        </svg>
      );
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <ellipse cx="12" cy="6.5" rx="5.5" ry="2.5" stroke="#e879f9" strokeWidth="1.3" />
          <path d="M6.5 6.5v5.1c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V6.5" stroke="#e879f9" strokeWidth="1.3" />
          <path d="M6.5 11.6v5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5" stroke="#f5d0fe" strokeWidth="1.3" />
        </svg>
      );
    case 'Shell':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="3.8" y="5" width="16.4" height="14" rx="3" stroke="#d4d4d8" strokeWidth="1.2" />
          <path d="m7.5 10 2.2 2-2.2 2M11.7 15h4.6" stroke="#fafafa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="12" cy="12" r="5.2" stroke="#e4e4e7" strokeWidth="1.4" />
          <path d="M12 8.5v7M8.5 12h7" stroke="#e4e4e7" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
  }
}

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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_1fr_0.95fr]">
            {skillGroups.map((group) => {
              const GroupIcon = groupIcons[group.title as keyof typeof groupIcons] ?? ServerCog;

              return (
                <div key={group.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/45 p-4">
                  <div className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-zinc-500">
                    <GroupIcon className="h-4 w-4" />
                    {group.title}
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const style = skillStyles[item] ?? {
                        shell: 'border-zinc-500/15 bg-zinc-500/[0.04] hover:border-zinc-300/40',
                        tile: 'bg-zinc-500/12 ring-1 ring-zinc-400/20',
                        glow: 'from-zinc-300/20'
                      };

                      return (
                        <div
                          key={item}
                          className={`group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-xs text-zinc-200 transition duration-300 ${style.shell}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${style.glow} via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100`} />
                          <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.tile}`}>
                            <SkillGlyph item={item} />
                          </div>
                          <span className="relative font-medium text-zinc-200">{item}</span>
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
