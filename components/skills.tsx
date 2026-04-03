import { ShieldCheck } from 'lucide-react';
import { techStack } from '@/data/portfolio-data';

export function Skills() {
  return (
    <section className="space-y-4" id="skills">
      <div>
        <h2 className="text-2xl font-semibold text-white">Skills & Tech Stack</h2>
        <p className="text-sm text-zinc-400">Stack principal e certificações relevantes para engenharia de software.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <div
            key={tech}
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300 transition duration-300 hover:border-red-600 hover:text-zinc-100 hover:shadow-glow"
          >
            <ShieldCheck className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-500" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
