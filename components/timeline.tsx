'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, Rocket } from 'lucide-react';
import { ProjectModal } from '@/components/project-modal';
import { timelineItems, type TimelineItem, type TimelineKind } from '@/data/portfolio-data';

const kindConfig: Record<TimelineKind, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  experience: { label: 'Experiência', icon: BriefcaseBusiness },
  education: { label: 'Educação', icon: GraduationCap },
  project: { label: 'Projeto', icon: Rocket }
};

export function Timeline() {
  const [selectedProject, setSelectedProject] = useState<TimelineItem | null>(null);

  return (
    <section id="timeline" className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">The Continuous Timeline</h2>
        <p className="text-sm text-zinc-400">Experiência, educação e projetos em uma jornada única e contínua.</p>
      </div>

      <div className="relative pl-8 md:pl-0">
        <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-red-600/70 via-zinc-700 to-transparent md:left-1/2" />

        <div className="space-y-6">
          {timelineItems.map((item, index) => {
            const Icon = kindConfig[item.kind].icon;
            const isProject = item.kind === 'project';
            const alignRight = index % 2 !== 0;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => isProject && setSelectedProject(item)}
                className={`relative w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 text-left backdrop-blur-xl transition duration-300 hover:border-red-600 hover:shadow-glow md:w-[calc(50%-1.5rem)] ${
                  alignRight ? 'md:ml-auto' : ''
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="absolute -left-[2.15rem] top-8 hidden h-4 w-4 rounded-full border border-red-500 bg-black md:block" />
                <span className="absolute -left-[1.65rem] top-7 h-3 w-3 rounded-full bg-red-500 md:hidden" />

                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                  <Icon className="h-4 w-4" />
                  {kindConfig[item.kind].label}
                </div>

                <p className="text-sm text-red-500">{item.date}</p>
                <h3 className="mt-1 text-xl font-semibold text-zinc-100">{item.title}</h3>
                <p className="text-zinc-400">{item.subtitle}</p>
                <p className="mt-3 text-zinc-300">{item.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
