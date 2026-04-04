import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Timeline } from '@/components/timeline';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-4 py-8 md:px-8 md:py-10">
      <header className="sticky top-3 z-40 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-3 backdrop-blur-xl">
        <nav className="flex items-center justify-between text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">JP {'\u2022'} Software Engineer</span>

          <div className="flex items-center gap-3">
            <a href="#skills" className="transition hover:text-red-500">
              Skills
            </a>
            <a href="#timeline" className="transition hover:text-red-500">
              Timeline
            </a>
            <a href="#projects" className="transition hover:text-red-500">
              Projetos
            </a>
          </div>
        </nav>
      </header>

      <Hero />
      <Skills />
      <Timeline />
      <Projects />
      <Footer />
    </main>
  );
}
