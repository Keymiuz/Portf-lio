'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, SlidersHorizontal, X } from 'lucide-react';
import { projects, type ProjectItem, type ProjectLink } from '@/data/portfolio-data';

function DifficultyBar({ level }: { level: ProjectItem['difficulty'] }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        <span>Nivel de dificuldade</span>
        <span>{level}/5</span>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: 5 }, (_, index) => {
          const active = index < level;
          return (
            <span
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors ${active ? 'bg-red-500' : 'bg-zinc-800'}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function getLinkIcon(kind: ProjectLink['kind']) {
  return kind === 'github' ? Github : ExternalLink;
}

function isDisabledDemo(link: ProjectLink) {
  return link.kind === 'demo' && link.href === '#';
}

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href);
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <section id="projects" className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Projetos</h2>
          <p className="text-sm text-zinc-400">
            Cada projeto agora traz contexto, nivel estimado de dificuldade e links separados entre repositorio, site real e futura demo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 backdrop-blur-xl transition duration-300 hover:border-red-600/80"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Projeto {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">{project.title}</h3>
                </div>

                {project.badge === 'projeto real' ? (
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

              <div className="mt-4">
                <DifficultyBar level={project.difficulty} />
              </div>

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
                  Saber mais
                </button>
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
                  aria-label="Fechar detalhes do projeto"
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
                    <DifficultyBar level={selectedProject.difficulty} />
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.stack.map((item) => (
                        <span key={item} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Links</p>
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
