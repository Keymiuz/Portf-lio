'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, SlidersHorizontal, X } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { getPortfolioContent, type ProjectItem, type ProjectLink } from '@/data/portfolio-data';

function getLinkIcon(kind: ProjectLink['kind']) {
  return kind === 'github' ? Github : ExternalLink;
}

function isDisabledDemo(link: ProjectLink) {
  return link.kind === 'demo' && link.href === '#';
}

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

const sectionCopy = {
  pt: {
    title: 'Projetos em Destaque',
    description: 'Seleção de projetos com contexto técnico, impacto prático e links para demonstração ou repositório.',
    details: 'Ver detalhes',
    stack: 'Stack',
    links: 'Links'
  },
  en: {
    title: 'Featured Projects',
    description: 'Selected projects with technical context, practical impact and links to demos or repositories.',
    details: 'View details',
    stack: 'Stack',
    links: 'Links'
  }
} as const;

export function Projects() {
  const { locale } = useLanguage();
  const copy = sectionCopy[locale];
  const { projects } = getPortfolioContent(locale);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <section id="projects" className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">{copy.title}</h2>
          <p className="text-sm text-zinc-400">{copy.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 backdrop-blur-xl transition duration-300 hover:border-red-600/80"
            >
              {project.image ? (
                <div className="aspect-[16/9] overflow-hidden border-b border-zinc-800 bg-zinc-900/60">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={1200}
                    height={700}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              ) : null}

              <div className="flex h-full flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Project {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-xl font-semibold text-zinc-100">{project.title}</h3>
                  </div>

                  {project.badge === 'projeto real' || project.badge === 'real project' ? (
                    <a
                      href={project.links.find((link) => link.kind === 'live')?.href ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-red-600/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-red-400 transition hover:border-red-500 hover:bg-red-600/10"
                    >
                      {project.badge}
                    </a>
                  ) : (
                    <span className="rounded-full border border-zinc-700 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                      {project.badge}
                    </span>
                  )}
                </div>

                <p className="text-sm leading-6 text-zinc-300">{project.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.links.map((link) => {
                    const Icon = getLinkIcon(link.kind);
                    const disabled = isDisabledDemo(link);

                    if (disabled) {
                      return (
                        <button
                          key={link.label}
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-500"
                        >
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </button>
                      );
                    }

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isExternalLink(link.href) ? '_blank' : undefined}
                        rel={isExternalLink(link.href) ? 'noreferrer' : undefined}
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                          link.kind === 'github'
                            ? 'border border-zinc-700 bg-zinc-900/70 text-zinc-100 hover:border-red-600 hover:text-red-400'
                            : 'bg-red-600 font-medium text-white hover:bg-red-500'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </a>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {copy.details}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.article
              className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/60 md:p-7"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{selectedProject.badge}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProject.title}</h3>
                  <p className="mt-2 max-w-2xl text-zinc-400">{selectedProject.summary}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:border-red-600 hover:text-red-400"
                  aria-label="Close project details"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-5">
                  {selectedProject.image ? (
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
                      <Image
                        src={selectedProject.image.src}
                        alt={selectedProject.image.alt}
                        width={1200}
                        height={700}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}

                  <div className="space-y-3 text-sm leading-6 text-zinc-300">
                    {selectedProject.details.map((detail) => (
                      <div key={detail} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                        <p>{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{copy.stack}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.stack.map((item) => (
                        <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{copy.links}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {selectedProject.links.map((link) => {
                        const Icon = getLinkIcon(link.kind);
                        const disabled = isDisabledDemo(link);

                        if (disabled) {
                          return (
                            <button
                              key={link.label}
                              type="button"
                              disabled
                              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-500"
                            >
                              <Icon className="h-4 w-4" />
                              {link.label}
                            </button>
                          );
                        }

                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            target={isExternalLink(link.href) ? '_blank' : undefined}
                            rel={isExternalLink(link.href) ? 'noreferrer' : undefined}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition ${
                              link.kind === 'github'
                                ? 'border border-zinc-700 bg-zinc-900/70 text-zinc-100 hover:border-red-600 hover:text-red-400'
                                : 'bg-red-600 font-medium text-white hover:bg-red-500'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {link.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
