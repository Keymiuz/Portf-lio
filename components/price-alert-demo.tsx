'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BellRing, ChevronRight, CircleDollarSign, ExternalLink, Globe, LogOut, Plus, SearchCheck, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { useLanguage, type SiteLocale } from '@/components/language-provider';

type StoreKey = 'Amazon' | 'Google Shopping' | 'Mercado Livre' | 'KaBuM!';
type AlertStatus = 'monitoring' | 'close' | 'triggered' | 'paused';
type PriceAlert = { id: string; productName: string; site: StoreKey; currentPrice: number; targetPrice: number; lowestPrice: number; history: number[]; enabled: boolean; lastChecked: string; url: string };
type DemoUser = { name: string; email: string; password: string; alerts: PriceAlert[] };

type AuthError = null | 'missingCredentials' | 'invalidLogin' | 'missingName' | 'accountExists';

const USER_STORAGE_KEY = 'price-alert-demo.users';
const SESSION_STORAGE_KEY = 'price-alert-demo.session';

const STORE_META: Record<StoreKey, { accent: string; glow: string; url: string }> = {
  Amazon: { accent: 'from-amber-300/90 to-orange-500/90', glow: 'rgba(249, 115, 22, 0.28)', url: 'https://www.amazon.com.br' },
  'Google Shopping': { accent: 'from-sky-300/90 to-blue-500/90', glow: 'rgba(59, 130, 246, 0.28)', url: 'https://shopping.google.com' },
  'Mercado Livre': { accent: 'from-yellow-200/90 to-yellow-400/90', glow: 'rgba(250, 204, 21, 0.25)', url: 'https://www.mercadolivre.com.br' },
  'KaBuM!': { accent: 'from-violet-300/90 to-fuchsia-500/90', glow: 'rgba(168, 85, 247, 0.28)', url: 'https://www.kabum.com.br' }
};

const copy = {
  pt: {
    eyebrow: 'Projeto demo', title: 'Sistema de Alerta de Preço', active: 'Persistência local ativa', back: 'Voltar ao portfólio', loading: 'Carregando experiência...',
    heroTag: 'Painel premium de monitoramento', heroTitle: 'Seus alertas ficam salvos e prontos para novas varreduras.', heroText: 'Conta mock com persistência no navegador, leitura de marketplaces e visual pensado como produto real.',
    stats: { alerts: 'Alertas ativos', goals: 'Metas atingidas', savings: 'Economia possível' }, account: 'Conta ativa', marketplaces: 'Marketplaces', recent: 'Leitura recente', scan: 'Executar nova varredura mock', signOut: 'Sair',
    prices: { current: 'Preço atual', target: 'Preço alvo', best: 'Melhor valor' }, lastRead: 'Última leitura', open: 'Abrir site', pause: 'Pausar', reactivate: 'Reativar', remove: 'Remover',
    form: { title: 'Novo alerta', product: 'Produto', site: 'Site monitorado', save: 'Salvar alerta', placeholder: 'Ex.: iPhone 16 128GB' }, signals: 'Sinais recentes', stack: 'Stack desta demo',
    stackText: 'Nesta primeira versão, autenticação e monitoramento são simulados localmente, mas o fluxo já está desenhado como um produto real.',
    auth: { tag: 'Elegância operacional para e-commerce', title: 'Crie sua conta e acompanhe preços com um painel limpo, bonito e direto.', text: 'Experiência premium com persistência local e dados mock.', access: 'Acesso mock', signup: 'Criar conta', login: 'Entrar', signupTab: 'Cadastro', loginTab: 'Login', name: 'Nome', email: 'E-mail', password: 'Senha', create: 'Criar conta e abrir painel', open: 'Entrar no painel', notesTitle: 'Notas da demo', notes: ['Os dados ficam salvos em localStorage.', 'Os preços e varreduras são mockados.', 'A conta já entra com alertas iniciais prontos.'] },
    statuses: { triggered: 'Meta atingida', close: 'Quase lá', paused: 'Pausado', monitoring: 'Monitorando' },
    errors: { missing: 'Preencha e-mail e senha para continuar.', invalid: 'Conta não encontrada ou senha incorreta.', name: 'Adicione seu nome para criar a conta.', exists: 'Já existe uma conta com esse e-mail. Faça login para continuar.' },
    currentShort: 'Atual', targetShort: 'alvo'
  },
  en: {
    eyebrow: 'Demo project', title: 'Price Alert System', active: 'Local persistence active', back: 'Back to portfolio', loading: 'Loading experience...',
    heroTag: 'Premium monitoring panel', heroTitle: 'Your alerts stay saved and ready for future scans.', heroText: 'Mock account with browser persistence, marketplace reads, and a product-minded visual system.',
    stats: { alerts: 'Active alerts', goals: 'Targets reached', savings: 'Potential savings' }, account: 'Active account', marketplaces: 'Marketplaces', recent: 'Recent reading', scan: 'Run new mock scan', signOut: 'Sign out',
    prices: { current: 'Current price', target: 'Target price', best: 'Best price' }, lastRead: 'Last check', open: 'Open site', pause: 'Pause', reactivate: 'Reactivate', remove: 'Remove',
    form: { title: 'New alert', product: 'Product', site: 'Monitored site', save: 'Save alert', placeholder: 'Ex.: iPhone 16 128GB' }, signals: 'Recent signals', stack: 'Demo stack',
    stackText: 'In this first version, authentication and monitoring are simulated locally, but the flow is already designed like a real product.',
    auth: { tag: 'Operational elegance for e-commerce', title: 'Create your account and track prices through a clean, polished, product-style dashboard.', text: 'Premium experience with local persistence and mock marketplace data.', access: 'Mock access', signup: 'Create account', login: 'Sign in', signupTab: 'Sign up', loginTab: 'Login', name: 'Name', email: 'Email', password: 'Password', create: 'Create account and open dashboard', open: 'Open dashboard', notesTitle: 'Demo notes', notes: ['Data is stored in localStorage.', 'Prices and scans are mocked.', 'The account starts with ready-made seeded alerts.'] },
    statuses: { triggered: 'Target reached', close: 'Almost there', paused: 'Paused', monitoring: 'Monitoring' },
    errors: { missing: 'Enter your email and password to continue.', invalid: 'Account not found or incorrect password.', name: 'Add your name to create the account.', exists: 'An account with this email already exists. Sign in to continue.' },
    currentShort: 'Current', targetShort: 'target'
  }
} as const;

function id() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
function money(locale: SiteLocale, value: number) { return new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: locale === 'pt' ? 'BRL' : 'USD', maximumFractionDigits: 2 }).format(value); }
function stamp(locale: SiteLocale, date = new Date()) { return date.toLocaleString(locale === 'pt' ? 'pt-BR' : 'en-US', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
function clamp(value: number) { return Number(Math.max(10, value).toFixed(2)); }
function history(current: number, target: number) { const base = Math.max(current, target * 1.16); return [base * 1.05, base * 1.02, base, base * 0.98, current * 1.04, current].map(clamp); }
function statusOf(alert: PriceAlert): AlertStatus { if (!alert.enabled) return 'paused'; if (alert.currentPrice <= alert.targetPrice) return 'triggered'; if (alert.currentPrice <= alert.targetPrice * 1.08) return 'close'; return 'monitoring'; }
function seedAlerts(locale: SiteLocale): PriceAlert[] {
  return [
    { id: id(), productName: 'SSD NVMe 1TB Kingston', site: 'Amazon', currentPrice: 349.9, targetPrice: 319.9, lowestPrice: 339.9, enabled: true, lastChecked: stamp(locale), url: STORE_META.Amazon.url, history: history(349.9, 319.9) },
    { id: id(), productName: 'Monitor Ultrawide 29"', site: 'Mercado Livre', currentPrice: 1169, targetPrice: 1099, lowestPrice: 1129, enabled: true, lastChecked: stamp(locale), url: STORE_META['Mercado Livre'].url, history: history(1169, 1099) },
    { id: id(), productName: 'Teclado Mecânico Hot Swap', site: 'Google Shopping', currentPrice: 289.9, targetPrice: 299.9, lowestPrice: 279.9, enabled: true, lastChecked: stamp(locale), url: STORE_META['Google Shopping'].url, history: history(289.9, 299.9) }
  ];
}
function coverage(primary: StoreKey) { const all: StoreKey[] = ['Amazon', 'Google Shopping', 'Mercado Livre', 'KaBuM!']; return [primary, ...all.filter((site) => site !== primary)].slice(0, 3); }
function statusMeta(locale: SiteLocale, value: AlertStatus) {
  const label = copy[locale].statuses[value];
  if (value === 'triggered') return { label, tone: 'border-emerald-500/30 bg-emerald-500/12 text-emerald-300' };
  if (value === 'close') return { label, tone: 'border-amber-400/30 bg-amber-400/12 text-amber-200' };
  if (value === 'paused') return { label, tone: 'border-zinc-700 bg-zinc-900 text-zinc-400' };
  return { label, tone: 'border-sky-500/30 bg-sky-500/12 text-sky-200' };
}
function bannerText(locale: SiteLocale, banner: string, payload = '') {
  const pt = { default: 'Experiência com persistência local usando dados mock.', restored: `Sessão restaurada para ${payload}. Seus alertas seguem salvos neste navegador.`, created: 'Conta criada com sucesso. Os alertas mock já foram carregados.', fill: 'Preencha produto, preço atual e preço alvo para criar um alerta.', newAlert: `Novo alerta criado para ${payload}.`, loggedOut: 'Sessão encerrada com segurança.', scan: 'Varredura mock concluída. Os preços foram atualizados.', removed: 'Alerta removido da sua conta.' };
  const en = { default: 'Experience with local persistence powered by mock data.', restored: `Session restored for ${payload}. Your alerts remain saved in this browser.`, created: 'Account created successfully. Mock alerts are ready.', fill: 'Enter a product, current price, and target price to create an alert.', newAlert: `New alert created for ${payload}.`, loggedOut: 'Session closed safely.', scan: 'Mock scan completed. Prices were refreshed.', removed: 'Alert removed from your account.' };
  return (locale === 'pt' ? pt : en)[banner as keyof typeof pt] ?? (locale === 'pt' ? pt.default : en.default);
}
function Sparkline({ values, glow }: { values: number[]; glow: string }) {
  const max = Math.max(...values); const min = Math.min(...values);
  const points = values.map((value, index) => `${(index / Math.max(values.length - 1, 1)) * 100},${100 - ((value - min) / Math.max(max - min, 1)) * 84 - 8}`).join(' ');
  return <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-3"><svg viewBox="0 0 100 100" className="h-20 w-full overflow-visible"><polyline fill="none" stroke={glow} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" points={points} /><polyline fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.92" points={points} /></svg></div>;
}

export function PriceAlertDemo() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<Record<string, DemoUser>>({});
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [authError, setAuthError] = useState<AuthError>(null);
  const [banner, setBanner] = useState<{ key: string; payload?: string }>({ key: 'default' });
  const [authForm, setAuthForm] = useState({ name: 'João Pedro', email: 'jp.alertas@gmail.com', password: '123456' });
  const [alertForm, setAlertForm] = useState({ productName: '', site: 'Amazon' as StoreKey, currentPrice: '349.90', targetPrice: '299.90' });

  useEffect(() => {
    const storedUsers = window.localStorage.getItem(USER_STORAGE_KEY);
    const storedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (storedUsers) setUsers(JSON.parse(storedUsers) as Record<string, DemoUser>);
    if (storedSession) setSessionEmail(storedSession);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    if (sessionEmail) window.localStorage.setItem(SESSION_STORAGE_KEY, sessionEmail);
    else window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }, [ready, sessionEmail, users]);

  const user = sessionEmail ? users[sessionEmail] : null;
  const activeAlerts = user?.alerts.filter((alert) => alert.enabled) ?? [];
  const triggeredAlerts = activeAlerts.filter((alert) => statusOf(alert) === 'triggered');
  const potentialSavings = activeAlerts.reduce((sum, alert) => sum + Math.max(alert.currentPrice - alert.targetPrice, 0), 0);
  const recentHighlights = user?.alerts.slice(0, 3) ?? [];
  const uniqueMarketplaces = user ? new Set(user.alerts.map((alert) => alert.site)).size : 4;

  function updateUser(updater: (current: DemoUser) => DemoUser) {
    if (!sessionEmail) return;
    setUsers((current) => {
      const currentUser = current[sessionEmail];
      if (!currentUser) return current;
      return { ...current, [sessionEmail]: updater(currentUser) };
    });
  }

  function submitAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);
    const email = authForm.email.trim().toLowerCase();
    if (!email || !authForm.password.trim()) return setAuthError('missingCredentials');
    if (authMode === 'login') {
      const currentUser = users[email];
      if (!currentUser || currentUser.password !== authForm.password) return setAuthError('invalidLogin');
      setSessionEmail(email);
      setBanner({ key: 'restored', payload: currentUser.name });
      return;
    }
    if (!authForm.name.trim()) return setAuthError('missingName');
    if (users[email]) return setAuthError('accountExists');
    setUsers((current) => ({ ...current, [email]: { name: authForm.name.trim(), email, password: authForm.password, alerts: seedAlerts(locale) } }));
    setSessionEmail(email);
    setBanner({ key: 'created' });
  }

  function createAlert(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentPrice = Number(alertForm.currentPrice.replace(',', '.'));
    const targetPrice = Number(alertForm.targetPrice.replace(',', '.'));
    if (!alertForm.productName.trim() || Number.isNaN(currentPrice) || Number.isNaN(targetPrice)) return setBanner({ key: 'fill' });
    const next: PriceAlert = { id: id(), productName: alertForm.productName.trim(), site: alertForm.site, currentPrice: clamp(currentPrice), targetPrice: clamp(targetPrice), lowestPrice: clamp(currentPrice), enabled: true, lastChecked: stamp(locale), url: STORE_META[alertForm.site].url, history: history(clamp(currentPrice), clamp(targetPrice)) };
    updateUser((current) => ({ ...current, alerts: [next, ...current.alerts] }));
    setAlertForm({ productName: '', site: alertForm.site, currentPrice: '', targetPrice: '' });
    setBanner({ key: 'newAlert', payload: next.productName });
  }

  function toggleAlert(id: string) {
    updateUser((current) => ({ ...current, alerts: current.alerts.map((alert) => alert.id === id ? { ...alert, enabled: !alert.enabled, lastChecked: stamp(locale) } : alert) }));
  }

  function removeAlert(id: string) {
    updateUser((current) => ({ ...current, alerts: current.alerts.filter((alert) => alert.id !== id) }));
    setBanner({ key: 'removed' });
  }

  function scanAlerts() {
    updateUser((current) => ({
      ...current,
      alerts: current.alerts.map((alert, index) => {
        if (!alert.enabled) return alert;
        const variation = ((index % 3) - 1) * 0.018 + (Math.random() * 0.04 - 0.02);
        const nextPrice = clamp(alert.currentPrice * (1 + variation));
        return { ...alert, currentPrice: nextPrice, lowestPrice: Math.min(alert.lowestPrice, nextPrice), history: [...alert.history.slice(-5), nextPrice], lastChecked: stamp(locale) };
      })
    }));
    setBanner({ key: 'scan' });
  }

  return (
    <main className="min-h-screen bg-[#06070d] text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_bottom,rgba(234,179,8,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-8 md:py-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
            <div><p className="text-[11px] uppercase tracking-[0.34em] text-zinc-500">{t.eyebrow}</p><h1 className="mt-1 text-xl font-semibold text-white md:text-2xl">{t.title}</h1></div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">{t.active}</span>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10">{t.back}<ChevronRight className="h-4 w-4" /></Link>
            </div>
          </header>

          {!ready ? (
            <div className="flex flex-1 items-center justify-center text-zinc-400">{t.loading}</div>
          ) : user ? (
            <div className="grid flex-1 gap-6 xl:grid-cols-[1.55fr_0.85fr]">
              <section className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl">
                  <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="min-w-0 space-y-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-zinc-500"><Sparkles className="h-4 w-4 text-amber-300" />{t.heroTag}</div>
                      <div><h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">{t.heroTitle}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{t.heroText}</p></div>
                      <div className="flex flex-wrap gap-3">{(['Amazon', 'Google Shopping', 'Mercado Livre', 'KaBuM!'] as StoreKey[]).map((site) => <span key={site} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-zinc-200">{site}</span>)}</div>
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-3xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.stats.alerts}</p><p className="mt-3 text-3xl font-semibold text-white">{activeAlerts.length}</p></div>
                        <div className="rounded-3xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.stats.goals}</p><p className="mt-3 text-3xl font-semibold text-emerald-300">{triggeredAlerts.length}</p></div>
                        <div className="rounded-3xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.stats.savings}</p><p className="mt-3 break-words text-2xl font-semibold leading-tight text-white">{money(locale, potentialSavings)}</p></div>
                      </div>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-[#0a0c14] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                      <div className="flex items-center justify-between">
                        <div><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.account}</p><h3 className="mt-2 text-xl font-semibold text-white">{user.name}</h3><p className="text-sm text-zinc-400">{user.email}</p></div>
                        <button type="button" onClick={() => { setSessionEmail(null); setBanner({ key: 'loggedOut' }); }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10"><LogOut className="h-4 w-4" />{t.signOut}</button>
                      </div>
                      <div className="mt-6 space-y-3">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.marketplaces}</p><p className="mt-2 text-2xl font-semibold text-white">{uniqueMarketplaces}</p><p className="mt-2 text-sm text-zinc-400">{coverage('Amazon').join(' · ')}</p></div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.recent}</p><p className="mt-2 text-sm leading-6 text-zinc-300">{bannerText(locale, banner.key, banner.payload)}</p></div>
                        <button type="button" onClick={scanAlerts} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:scale-[1.01]"><SearchCheck className="h-4 w-4" />{t.scan}</button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  {user.alerts.map((alert, index) => {
                    const meta = statusMeta(locale, statusOf(alert));
                    const store = STORE_META[alert.site];
                    return (
                      <motion.article key={alert.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="min-w-0 rounded-[1.9rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl">
                        <div className="flex items-start justify-between gap-3">
                          <div><div className={`inline-flex rounded-full bg-gradient-to-r ${store.accent} px-3 py-1 text-xs font-medium text-zinc-950`}>{alert.site}</div><h3 className="mt-3 text-xl font-semibold text-white">{alert.productName}</h3></div>
                          <span className={`rounded-full border px-3 py-1 text-xs ${meta.tone}`}>{meta.label}</span>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          <div className="rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t.prices.current}</p><p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">{money(locale, alert.currentPrice)}</p></div>
                          <div className="rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t.prices.target}</p><p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">{money(locale, alert.targetPrice)}</p></div>
                          <div className="rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{t.prices.best}</p><p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">{money(locale, alert.lowestPrice)}</p></div>
                        </div>
                        <div className="mt-5"><Sparkline values={alert.history} glow={store.glow} /></div>
                        <div className="mt-4 flex flex-wrap gap-2">{coverage(alert.site).map((site) => <span key={`${alert.id}-${site}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">{site}</span>)}</div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
                          <span>{t.lastRead}: {alert.lastChecked}</span>
                          <div className="flex flex-wrap gap-2">
                            <a href={alert.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-zinc-200 transition hover:border-white/20 hover:bg-white/5">{t.open}<ExternalLink className="h-4 w-4" /></a>
                            <button type="button" onClick={() => toggleAlert(alert.id)} className="rounded-full border border-white/10 px-3 py-2 text-zinc-200 transition hover:border-amber-300/40 hover:bg-white/5">{alert.enabled ? t.pause : t.reactivate}</button>
                            <button type="button" onClick={() => removeAlert(alert.id)} className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-3 py-2 text-red-200 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" />{t.remove}</button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>

              <aside className="space-y-6">
                <motion.section initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500"><Plus className="h-4 w-4 text-rose-300" />{t.form.title}</div>
                  <form className="mt-5 space-y-4" onSubmit={createAlert}>
                    <label className="block space-y-2"><span className="text-sm text-zinc-300">{t.form.product}</span><input value={alertForm.productName} onChange={(event) => setAlertForm((current) => ({ ...current, productName: event.target.value }))} placeholder={t.form.placeholder} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50" /></label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2"><span className="text-sm text-zinc-300">{t.form.site}</span><select value={alertForm.site} onChange={(event) => setAlertForm((current) => ({ ...current, site: event.target.value as StoreKey }))} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50">{(Object.keys(STORE_META) as StoreKey[]).map((site) => <option key={site} value={site} className="bg-zinc-950">{site}</option>)}</select></label>
                      <label className="block space-y-2"><span className="text-sm text-zinc-300">{t.prices.current}</span><input value={alertForm.currentPrice} onChange={(event) => setAlertForm((current) => ({ ...current, currentPrice: event.target.value }))} placeholder="349.90" className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50" /></label>
                    </div>
                    <label className="block space-y-2"><span className="text-sm text-zinc-300">{t.prices.target}</span><input value={alertForm.targetPrice} onChange={(event) => setAlertForm((current) => ({ ...current, targetPrice: event.target.value }))} placeholder="299.90" className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50" /></label>
                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"><BellRing className="h-4 w-4" />{t.form.save}</button>
                  </form>
                </motion.section>

                <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500"><CircleDollarSign className="h-4 w-4 text-emerald-300" />{t.signals}</div>
                  <div className="mt-5 space-y-3">{recentHighlights.map((alert) => { const meta = statusMeta(locale, statusOf(alert)); return <div key={alert.id} className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-white">{alert.productName}</p><p className="mt-1 text-sm text-zinc-400">{alert.site}</p></div><span className={`rounded-full border px-3 py-1 text-[11px] ${meta.tone}`}>{meta.label}</span></div><p className="mt-3 text-sm text-zinc-300">{t.currentShort}: <span className="font-medium text-white">{money(locale, alert.currentPrice)}</span> · {t.targetShort} <span className="font-medium text-white">{money(locale, alert.targetPrice)}</span></p></div>; })}</div>
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500"><ShieldCheck className="h-4 w-4 text-sky-300" />{t.stack}</div>
                  <div className="mt-5 flex flex-wrap gap-2">{['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'localStorage', 'Mock data'].map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-200">{item}</span>)}</div>
                  <p className="mt-4 text-sm leading-6 text-zinc-400">{t.stackText}</p>
                </section>
              </aside>
            </div>
          ) : (
            <div className="grid flex-1 items-center gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-400"><Globe className="h-4 w-4 text-sky-300" />{t.auth.tag}</div>
                <div className="space-y-5"><h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">{t.auth.title}</h2><p className="max-w-2xl text-lg leading-8 text-zinc-300">{t.auth.text}</p></div>
                <div className="grid gap-4 sm:grid-cols-3">{t.auth.notes.map((note) => <div key={note} className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5"><p className="text-sm leading-6 text-zinc-300">{note}</p></div>)}</div>
              </motion.section>
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-2xl">
                <div className="flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{t.auth.access}</p><h3 className="mt-2 text-2xl font-semibold text-white">{authMode === 'signup' ? t.auth.signup : t.auth.login}</h3></div><div className="flex gap-2 rounded-full border border-white/10 bg-black/20 p-1">{(['signup', 'login'] as const).map((mode) => <button key={mode} type="button" onClick={() => { setAuthMode(mode); setAuthError(null); }} className={`rounded-full px-4 py-2 text-sm transition ${authMode === mode ? 'bg-white text-zinc-950' : 'text-zinc-300 hover:text-white'}`}>{mode === 'signup' ? t.auth.signupTab : t.auth.loginTab}</button>)}</div></div>
                <form className="mt-6 space-y-4" onSubmit={submitAuth}>
                  <AnimatePresence initial={false}>{authMode === 'signup' ? <motion.label key="signup-name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="block overflow-hidden"><span className="mb-2 block text-sm text-zinc-300">{t.auth.name}</span><input value={authForm.name} onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50" /></motion.label> : null}</AnimatePresence>
                  <label className="block"><span className="mb-2 block text-sm text-zinc-300">{t.auth.email}</span><input value={authForm.email} onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50" /></label>
                  <label className="block"><span className="mb-2 block text-sm text-zinc-300">{t.auth.password}</span><input type="password" value={authForm.password} onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50" /></label>
                  {authError ? <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{authError === 'missingCredentials' ? t.errors.missing : authError === 'invalidLogin' ? t.errors.invalid : authError === 'missingName' ? t.errors.name : t.errors.exists}</div> : null}
                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:scale-[1.01]"><BellRing className="h-4 w-4" />{authMode === 'signup' ? t.auth.create : t.auth.open}</button>
                </form>
                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{t.auth.notesTitle}</p><ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">{t.auth.notes.map((note) => <li key={note}>{note}</li>)}</ul></div>
              </motion.section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
