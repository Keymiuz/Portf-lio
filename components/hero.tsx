import { Download, Github, Linkedin } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/keymius/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/Keymiuz', label: 'GitHub', icon: Github }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="relative flex flex-col gap-6">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Software Portfolio</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">João Pedro</h1>
        <p className="max-w-2xl text-xl text-zinc-200 md:text-2xl">Engenheiro de Software</p>
        <p className="max-w-3xl text-zinc-400">
          Profissional com foco em desenvolvimento de software, interfaces modernas e soluções digitais construídas com
          clareza técnica, boa experiência de uso e visão de produto.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="group inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition duration-300 hover:border-red-600 hover:text-red-500 hover:shadow-glow"
              aria-label={label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-4 w-4 transition-colors group-hover:text-red-500" />
              {label}
            </a>
          ))}

          <a
            href="/CV.pdf"
            download="Joao-Pedro-CV.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:bg-red-500 hover:shadow-glow"
          >
            <Download className="h-4 w-4" />
            Baixar currículo
          </a>
        </div>
      </div>
    </section>
  );
}
