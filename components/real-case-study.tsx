'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers3, Music4, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const caseStudyCopy = {
  pt: {
    eyebrow: 'Caso Real',
    title: 'Cedro Rosa',
    subtitle: 'Projeto em produção com foco em interface, integração e experiência do usuário.',
    description:
      'Atuação em um contexto real de produto digital, com responsabilidade sobre interface, performance, usabilidade e integração entre plataformas do ecossistema musical.',
    projectLabel: 'Projeto publicado',
    projectLabelValue: 'cedrorosamusica.online',
    sectionTitles: {
      context: 'Contexto',
      role: 'Minha atuação',
      stack: 'Stack e integração',
      outcome: 'Resultado'
    },
    context:
      'Participei da evolução da experiência digital da Cedro Rosa, plataforma brasileira de streaming de música, contribuindo para uma entrega mais consistente, moderna e orientada ao uso em produção.',
    role: [
      'Colaborei ativamente na criação e implementação de interfaces interativas e responsivas com HTML, CSS, JavaScript e React.',
      'Implementei animações dinâmicas e transições mais fluidas para fortalecer a experiência de navegação e aumentar a interação dos usuários.',
      'Revisei usabilidade e estrutura de navegação para tornar o fluxo mais intuitivo, acessível e alinhado a boas práticas de UX.'
    ],
    stack: [
      'Utilizei Java na construção do site da Cedro Rosa dentro da stack da aplicação.',
      'A integração entre Music Go e Cedro Rosa foi realizada via React, conectando a experiência entre os dois sites de forma mais coesa.',
      'Atuei também em otimização de carregamento e responsividade para garantir uma navegação mais ágil e estável.'
    ],
    outcome: [
      'Redução do tempo médio de carregamento das páginas e melhora perceptível na fluidez de uso.',
      'Animações e transições mais consistentes, contribuindo para diminuir a taxa de rejeição.',
      'Integração com a plataforma Cedro Rosa que colaborou para ampliar funcionalidades e contribuir para o crescimento da base de usuários ativos.'
    ],
    highlights: [
      'Interfaces responsivas',
      'Java',
      'React',
      'Integração entre plataformas',
      'UX',
      'Performance'
    ],
    cta: 'Abrir projeto real'
  },
  en: {
    eyebrow: 'Real Case',
    title: 'Cedro Rosa',
    subtitle: 'Production project focused on interface quality, integration and user experience.',
    description:
      'Hands-on work in a real digital product context, with responsibility across interface delivery, performance, usability and platform integration within a music ecosystem.',
    projectLabel: 'Live project',
    projectLabelValue: 'cedrorosamusica.online',
    sectionTitles: {
      context: 'Context',
      role: 'My contribution',
      stack: 'Stack and integration',
      outcome: 'Outcome'
    },
    context:
      'I contributed to the evolution of Cedro Rosa, a Brazilian music streaming platform, helping shape a more consistent, modern and production-ready digital experience.',
    role: [
      'Actively collaborated on the creation and implementation of interactive, responsive interfaces using HTML, CSS, JavaScript and React.',
      'Built dynamic animations and smoother transitions to improve navigation quality and increase user interaction.',
      'Reviewed usability and navigation structure to make the experience more intuitive, accessible and aligned with solid UX principles.'
    ],
    stack: [
      'I used Java in the Cedro Rosa site stack as part of the application delivery.',
      'The integration between Music Go and Cedro Rosa was implemented through React across both sites, creating a more cohesive experience.',
      'I also worked on loading optimization and responsiveness to deliver a faster and more stable browsing flow.'
    ],
    outcome: [
      'Reduced average page load time and improved the overall fluidity of the experience.',
      'More consistent animations and transitions, helping reduce bounce rate.',
      'Cedro Rosa platform integration that expanded functionality and contributed to growth in active users.'
    ],
    highlights: [
      'Responsive interfaces',
      'Java',
      'React',
      'Platform integration',
      'UX',
      'Performance'
    ],
    cta: 'Open live project'
  }
} as const;

export function RealCaseStudy() {
  const { locale } = useLanguage();
  const copy = caseStudyCopy[locale];

  return (
    <section id="case-study" className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-red-400/80">{copy.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{copy.title}</h2>
        <p className="mt-3 text-lg text-zinc-200">{copy.subtitle}</p>
        <p className="mt-4 text-sm leading-7 text-zinc-400">{copy.description}</p>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-950/80 shadow-2xl shadow-black/40"
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[380px] overflow-hidden border-b border-zinc-800 lg:min-h-[640px] lg:border-b-0 lg:border-r">
            <Image
              src="/projects/cedro-rosa.png"
              alt="Tela do projeto Cedro Rosa em produção"
              fill
              className="object-cover object-center transition duration-700 hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-300/80">{copy.projectLabel}</p>
                <p className="mt-2 text-xl font-semibold text-white md:text-2xl">{copy.projectLabelValue}</p>
              </div>

              <a
                href="https://cedrorosamusica.online/musicas/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                {copy.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-8 p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {copy.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-700 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                  <Music4 className="h-4 w-4 text-red-400" />
                  {copy.sectionTitles.context}
                </div>
                <p className="text-sm leading-7 text-zinc-300">{copy.context}</p>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                  <Sparkles className="h-4 w-4 text-red-400" />
                  {copy.sectionTitles.role}
                </div>
                <div className="space-y-3">
                  {copy.role.map((item) => (
                    <p key={item} className="border-l border-zinc-700 pl-4 text-sm leading-7 text-zinc-300">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                    <Layers3 className="h-4 w-4 text-red-400" />
                    {copy.sectionTitles.stack}
                  </div>
                  <div className="space-y-3">
                    {copy.stack.map((item) => (
                      <p key={item} className="border-l border-zinc-700 pl-4 text-sm leading-7 text-zinc-300">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                    {copy.sectionTitles.outcome}
                  </div>
                  <div className="space-y-3">
                    {copy.outcome.map((item) => (
                      <p key={item} className="border-l border-zinc-700 pl-4 text-sm leading-7 text-zinc-300">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
