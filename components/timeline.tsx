'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BriefcaseBusiness, ChevronDown, GraduationCap } from 'lucide-react';
import { timelineEntries, type TimelineKind } from '@/data/portfolio-data';

const kindConfig: Record<TimelineKind, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  experience: { label: 'Experiencia', icon: BriefcaseBusiness },
  education: { label: 'Formacao', icon: GraduationCap }
};

export function Timeline() {
  const [openItemId, setOpenItemId] = useState<string>(timelineEntries[0]?.id ?? '');

  return (
    <section id="timeline" className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Timeline</h2>
        <p className="text-sm text-zinc-400">
          Formacao primeiro, depois experiencia profissional, com uma linha central e detalhes expansivos em cada etapa.
        </p>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-red-600/80 via-zinc-700 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-6">
          {timelineEntries.map((item, index) => {
            const Icon = kindConfig[item.kind].icon;
            const alignRight = index % 2 !== 0;
            const isOpen = openItemId === item.id;

            return (
              <motion.div
                key={item.id}
                className="relative md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="absolute left-4 top-8 h-4 w-4 -translate-x-1/2 rounded-full border border-red-500 bg-black md:left-1/2" />

                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItemId((currentId) => (currentId === item.id ? '' : item.id))}
                  className={`relative ml-10 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-left backdrop-blur-xl transition duration-300 hover:border-red-600/80 md:ml-0 ${
                    alignRight ? 'md:col-start-3' : 'md:col-start-1'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                        <Icon className="h-4 w-4" />
                        {kindConfig[item.kind].label}
                      </div>

                      <p className="text-sm text-red-500">{item.period}</p>
                      <h3 className="mt-1 text-xl font-semibold text-zinc-100">{item.title}</h3>
                      <p className="text-zinc-300">{item.organization}</p>
                      <p className="text-sm text-zinc-500">{item.location}</p>
                    </div>

                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-red-500' : ''
                      }`}
                    />
                  </div>

                  <p className="mt-4 leading-7 text-zinc-300">{item.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {isOpen ? 'Clique para recolher' : 'Clique para expandir'}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 border-t border-zinc-800 pt-5">
                          <ul className="space-y-3 text-sm leading-6 text-zinc-300">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
