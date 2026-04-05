'use client';

import { useState } from 'react';
import { Copy, Download, Github, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

const email = 'jpcicolo@gmail.com';
const whatsappNumber = '5511976468942';
const whatsappHref = `https://wa.me/${whatsappNumber}`;
const whatsappLabel = '(11) 97646-8942';

const contactLinks = {
  pt: [
    {
      href: whatsappHref,
      label: 'Abrir WhatsApp',
      description: `Canal rápido para conversas diretas sobre vagas, freelas e oportunidades no número ${whatsappLabel}.`,
      icon: MessageCircle,
      accent: 'from-emerald-500 to-lime-400'
    },
    {
      href: `mailto:${email}`,
      label: 'Enviar email',
      description: 'Contato ideal para propostas, processos seletivos e conversas mais estruturadas.',
      icon: Mail,
      accent: 'from-red-600 to-orange-400'
    },
    {
      href: 'https://www.linkedin.com/in/keymius/',
      label: 'Abrir LinkedIn',
      description: 'Perfil profissional com trajetória, experiências e posicionamento de carreira.',
      icon: Linkedin,
      accent: 'from-sky-500 to-cyan-400'
    },
    {
      href: 'https://github.com/Keymiuz',
      label: 'Abrir GitHub',
      description: 'Repositórios públicos com projetos, estudos e aplicações desenvolvidas por mim.',
      icon: Github,
      accent: 'from-zinc-200 to-zinc-500'
    }
  ],
  en: [
    {
      href: whatsappHref,
      label: 'Open WhatsApp',
      description: `Fast channel for direct conversations about roles, freelance work and opportunities at ${whatsappLabel}.`,
      icon: MessageCircle,
      accent: 'from-emerald-500 to-lime-400'
    },
    {
      href: `mailto:${email}`,
      label: 'Send email',
      description: 'Best channel for proposals, hiring processes and more structured conversations.',
      icon: Mail,
      accent: 'from-red-600 to-orange-400'
    },
    {
      href: 'https://www.linkedin.com/in/keymius/',
      label: 'Open LinkedIn',
      description: 'Professional profile with background, experience and career positioning.',
      icon: Linkedin,
      accent: 'from-sky-500 to-cyan-400'
    },
    {
      href: 'https://github.com/Keymiuz',
      label: 'Open GitHub',
      description: 'Public repositories with projects, studies and applications built by me.',
      icon: Github,
      accent: 'from-zinc-200 to-zinc-500'
    }
  ]
} as const;

const sectionCopy = {
  pt: {
    eyebrow: 'Contato rápido',
    title: 'Aberto a oportunidades, projetos e conversas com foco em resultado.',
    description:
      'Esta seção foi pensada para facilitar o contato com recrutadores, líderes técnicos e clientes. Escolha o canal mais conveniente e seguimos a conversa por lá.',
    whatsapp: 'Chamar no WhatsApp',
    email: 'Enviar email',
    copyEmail: 'Copiar email',
    copiedEmail: 'Email copiado',
    resume: 'Baixar currículo'
  },
  en: {
    eyebrow: 'Quick contact',
    title: 'Open to opportunities, projects and conversations focused on results.',
    description:
      'This section is designed to make it easy for recruiters, engineering leaders and clients to reach out through the most convenient channel.',
    whatsapp: 'Message on WhatsApp',
    email: 'Send email',
    copyEmail: 'Copy email',
    copiedEmail: 'Email copied',
    resume: 'Download resume'
  }
} as const;

export function Contact() {
  const { locale } = useLanguage();
  const copy = sectionCopy[locale];
  const links = contactLinks[locale];
  const resumeHref = locale === 'pt' ? '/CV_PT.pdf' : '/CV.pdf';
  const resumeDownload = locale === 'pt' ? 'Joao-Pedro-CV-PT.pdf' : 'Joao-Pedro-CV-EN.pdf';
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
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{copy.eyebrow}</p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white md:text-5xl">{copy.title}</h2>
          <p className="max-w-2xl text-base leading-7 text-zinc-300">{copy.description}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.whatsapp}
            </a>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500"
            >
              <Send className="h-4 w-4" />
              {copy.email}
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
            >
              <Copy className="h-4 w-4" />
              {copied ? copy.copiedEmail : copy.copyEmail}
            </button>

            <a
              href={resumeHref}
              download={resumeDownload}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/70 px-5 py-3 text-sm text-zinc-100 transition hover:border-red-600 hover:text-red-400"
            >
              <Download className="h-4 w-4" />
              {copy.resume}
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          {links.map(({ href, label, description, icon: Icon, accent }) => (
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
