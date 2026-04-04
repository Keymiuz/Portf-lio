import { Languages, ShieldCheck } from 'lucide-react';
import { skillGroups, spokenLanguages } from '@/data/portfolio-data';

const allSkills = skillGroups.flatMap((group) => group.items);

export function Skills() {
  return (
    <section className="space-y-4" id="skills">
      <div>
        <h2 className="text-2xl font-semibold text-white">Skills & Tech Stack</h2>
        <p className="text-sm text-zinc-400">Resumo tecnico mais compacto, com tudo reunido em uma unica composicao.</p>
      </div>

      <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/65 p-5 backdrop-blur-xl md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Core stack, backend, dados, infra e workflow</p>
            <p className="mt-2 max-w-3xl text-sm text-zinc-400">
              Tecnologias, ferramentas e metodologias alinhadas ao seu curriculo, em leitura unica e direta.
            </p>
          </div>

          <div className="rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-red-400">
            {allSkills.length} skills
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {allSkills.map((item) => (
            <div
              key={item}
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3.5 py-1.5 text-xs text-zinc-300 transition duration-300 hover:border-red-600 hover:text-zinc-100"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-red-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-zinc-800 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-zinc-500">
              <Languages className="h-4 w-4" />
              Idiomas
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
    </section>
  );
}
