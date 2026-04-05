'use client';

import { useState } from 'react';
import { Copy, Download, Github, Linkedin, Mail, Send } from 'lucide-react';

const email = 'jpcicolo@gmail.com';

const contactLinks = [
  {
    href: `mailto:${email}`,
    label: 'Enviar email',
    description: 'Canal mais direto para propostas, vagas e freelas.',
    icon: Mail,
    accent: 'from-red-600 to-orange-400'
  },
  {
    href: 'https://www.linkedin.com/in/keymius/',
    label: 'Abrir LinkedIn',
    description: 'Perfil profissional com experiências, trajetória e networking.',
    icon: Linkedin,
    accent: 'from-sky-500 to-cyan-400'
  },
  {
    href: 'https://github.com/Keymiuz',
    label: 'Abrir GitHub',
    description: 'Repositórios públicos com projetos, estudos e aplicações autorais.',
    icon: Github,
    accent: 'from-zinc-200 to-zinc-500'
  }
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_28%),rgba(9,9,11,0.82)] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contato rápido</p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Se a ideia é conversar sobre projeto, vaga ou freela, aqui ficou fácil.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-300">
            Transformei o fim do portfólio em uma área de conversão de verdade: contato visível, currículo à mão e atalhos
            rápidos para os canais mais relevantes.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500"
            >
              <Send className="h-4 w-4" />
              Falar por email
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Email copiado' : 'Copiar email'}
            </button>

            <a
              href="/CV.pdf"
              download="Joao-Pedro-CV.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
            >
              <Download className="h-4 w-4" />
              Baixar currículo
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          {contactLinks.map(({ href, label, description, icon: Icon, accent }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4 transition duration-300 hover:border-red-600/80"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-100 transition group-hover:text-white">{label}</p>
                  <p className="text-sm leading-6 text-zinc-400">{description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
