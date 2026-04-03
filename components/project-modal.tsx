'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Gamepad2, Github, X } from 'lucide-react';
import type { TimelineItem } from '@/data/portfolio-data';

type ProjectModalProps = {
  project: TimelineItem | null;
  onClose: () => void;
};

function getIcon(type: 'play' | 'site' | 'github') {
  if (type === 'play') return Gamepad2;
  if (type === 'github') return Github;
  return ExternalLink;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project?.details ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="accent-glow w-full max-w-3xl rounded-2xl border border-red-600/60 bg-zinc-950/95 p-5 md:p-7"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-red-500">{project.date}</p>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-zinc-400">{project.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:border-red-600 hover:text-red-500"
                aria-label="Fechar modal"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <p className="mb-5 text-zinc-300">{project.details.description}</p>

            <div className="mb-5 grid gap-4 md:grid-cols-2">
              {project.details.images.map((image) => (
                <div key={image.src} className="overflow-hidden rounded-xl border border-zinc-800">
                  <Image src={image.src} alt={image.alt} width={800} height={500} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {project.details.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.details.ctas.map((cta) => {
                const Icon = getIcon(cta.type);
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 hover:shadow-glow"
                  >
                    <Icon className="h-4 w-4" />
                    {cta.label}
                  </a>
                );
              })}
            </div>
          </motion.article>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
