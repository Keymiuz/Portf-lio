export function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
      <p>
        Contato:{' '}
        <a href="mailto:jpcicolo@gmail.com" className="text-zinc-300 hover:text-red-500">
          jpcicolo@gmail.com
        </a>
      </p>
      <p className="mt-2">© {new Date().getFullYear()} João Pedro. Todos os direitos reservados.</p>
    </footer>
  );
}
