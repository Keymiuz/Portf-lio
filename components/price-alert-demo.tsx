'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BellRing,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  Globe,
  LogOut,
  Plus,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Trash2
} from 'lucide-react';

type StoreKey = 'Amazon' | 'Google Shopping' | 'Mercado Livre' | 'KaBuM!';
type AlertStatus = 'monitorando' | 'quase_la' | 'atingido' | 'pausado';

type PriceAlert = {
  id: string;
  productName: string;
  site: StoreKey;
  currentPrice: number;
  targetPrice: number;
  lowestPrice: number;
  history: number[];
  enabled: boolean;
  lastChecked: string;
  url: string;
};

type DemoUser = {
  name: string;
  email: string;
  password: string;
  alerts: PriceAlert[];
};

const USER_STORAGE_KEY = 'price-alert-demo.users';
const SESSION_STORAGE_KEY = 'price-alert-demo.session';

const STORE_META: Record<StoreKey, { accent: string; glow: string; url: string }> = {
  Amazon: {
    accent: 'from-amber-300/90 to-orange-500/90',
    glow: 'rgba(249, 115, 22, 0.28)',
    url: 'https://www.amazon.com.br'
  },
  'Google Shopping': {
    accent: 'from-sky-300/90 to-blue-500/90',
    glow: 'rgba(59, 130, 246, 0.28)',
    url: 'https://shopping.google.com'
  },
  'Mercado Livre': {
    accent: 'from-yellow-200/90 to-yellow-400/90',
    glow: 'rgba(250, 204, 21, 0.25)',
    url: 'https://www.mercadolivre.com.br'
  },
  'KaBuM!': {
    accent: 'from-violet-300/90 to-fuchsia-500/90',
    glow: 'rgba(168, 85, 247, 0.28)',
    url: 'https://www.kabum.com.br'
  }
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  }).format(value);
}

function formatTimestamp(date = new Date()) {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function clampPrice(value: number) {
  return Number(Math.max(10, value).toFixed(2));
}

function buildHistory(currentPrice: number, targetPrice: number) {
  const baseline = Math.max(currentPrice, targetPrice * 1.16);
  return [
    baseline * 1.05,
    baseline * 1.02,
    baseline,
    baseline * 0.98,
    currentPrice * 1.04,
    currentPrice
  ].map(clampPrice);
}

function getStatus(alert: PriceAlert): AlertStatus {
  if (!alert.enabled) {
    return 'pausado';
  }

  if (alert.currentPrice <= alert.targetPrice) {
    return 'atingido';
  }

  if (alert.currentPrice <= alert.targetPrice * 1.08) {
    return 'quase_la';
  }

  return 'monitorando';
}

function createSeedAlerts(): PriceAlert[] {
  const seed = [
    {
      productName: 'SSD NVMe 1TB Kingston',
      site: 'Amazon' as StoreKey,
      currentPrice: 349.9,
      targetPrice: 319.9,
      lowestPrice: 339.9,
      url: STORE_META.Amazon.url
    },
    {
      productName: 'Monitor Ultrawide 29"',
      site: 'Mercado Livre' as StoreKey,
      currentPrice: 1169,
      targetPrice: 1099,
      lowestPrice: 1129,
      url: STORE_META['Mercado Livre'].url
    },
    {
      productName: 'Teclado Mecânico Hot Swap',
      site: 'Google Shopping' as StoreKey,
      currentPrice: 289.9,
      targetPrice: 299.9,
      lowestPrice: 279.9,
      url: STORE_META['Google Shopping'].url
    }
  ];

  return seed.map((item) => ({
    id: createId(),
    ...item,
    enabled: true,
    lastChecked: formatTimestamp(),
    history: buildHistory(item.currentPrice, item.targetPrice)
  }));
}

function getCoverageSites(primary: StoreKey) {
  const sites: StoreKey[] = ['Amazon', 'Google Shopping', 'Mercado Livre', 'KaBuM!'];
  return [primary, ...sites.filter((site) => site !== primary)].slice(0, 3);
}

function getStatusMeta(status: AlertStatus) {
  if (status === 'atingido') {
    return {
      label: 'Meta atingida',
      tone: 'border-emerald-500/30 bg-emerald-500/12 text-emerald-300'
    };
  }

  if (status === 'quase_la') {
    return {
      label: 'Quase lá',
      tone: 'border-amber-400/30 bg-amber-400/12 text-amber-200'
    };
  }

  if (status === 'pausado') {
    return {
      label: 'Pausado',
      tone: 'border-zinc-700 bg-zinc-900 text-zinc-400'
    };
  }

  return {
    label: 'Monitorando',
    tone: 'border-sky-500/30 bg-sky-500/12 text-sky-200'
  };
}

function Sparkline({ values, glow }: { values: number[]; glow: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 100 - ((value - min) / Math.max(max - min, 1)) * 84 - 8;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-3">
      <svg viewBox="0 0 100 100" className="h-20 w-full overflow-visible">
        <polyline
          fill="none"
          stroke={glow}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
          points={points}
        />
        <polyline
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
          points={points}
        />
      </svg>
    </div>
  );
}

export function PriceAlertDemo() {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<Record<string, DemoUser>>({});
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [authError, setAuthError] = useState('');
  const [banner, setBanner] = useState('Experiência com persistência local usando dados mock.');
  const [authForm, setAuthForm] = useState({
    name: 'João Pedro',
    email: 'jp.alertas@gmail.com',
    password: '123456'
  });
  const [alertForm, setAlertForm] = useState({
    productName: '',
    site: 'Amazon' as StoreKey,
    currentPrice: '349.90',
    targetPrice: '299.90'
  });

  useEffect(() => {
    const storedUsers = window.localStorage.getItem(USER_STORAGE_KEY);
    const storedSession = window.localStorage.getItem(SESSION_STORAGE_KEY);

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers) as Record<string, DemoUser>);
    }

    if (storedSession) {
      setSessionEmail(storedSession);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));

    if (sessionEmail) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, sessionEmail);
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [ready, sessionEmail, users]);

  const currentUser = sessionEmail ? users[sessionEmail] : null;
  const uniqueMarketplaces = currentUser ? new Set(currentUser.alerts.map((alert) => alert.site)).size : 4;
  const activeAlerts = currentUser?.alerts.filter((alert) => alert.enabled) ?? [];
  const triggeredAlerts = activeAlerts.filter((alert) => getStatus(alert) === 'atingido');
  const potentialSavings = activeAlerts.reduce((total, alert) => total + Math.max(alert.currentPrice - alert.targetPrice, 0), 0);
  const recentHighlights = currentUser?.alerts.slice(0, 3) ?? [];

  function updateCurrentUser(updater: (user: DemoUser) => DemoUser) {
    if (!sessionEmail) {
      return;
    }

    setUsers((currentUsers) => {
      const user = currentUsers[sessionEmail];

      if (!user) {
        return currentUsers;
      }

      return {
        ...currentUsers,
        [sessionEmail]: updater(user)
      };
    });
  }

  function handleAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError('');

    const email = authForm.email.trim().toLowerCase();

    if (!email || !authForm.password.trim()) {
      setAuthError('Preencha e-mail e senha para continuar.');
      return;
    }

    if (authMode === 'login') {
      const user = users[email];

      if (!user || user.password !== authForm.password) {
        setAuthError('Conta não encontrada ou senha incorreta.');
        return;
      }

      setSessionEmail(email);
      setBanner(`Sessão restaurada para ${user.name}. Seus alertas seguem salvos neste navegador.`);
      return;
    }

    if (!authForm.name.trim()) {
      setAuthError('Adicione seu nome para criar a conta.');
      return;
    }

    if (users[email]) {
      setAuthError('Já existe uma conta com esse e-mail. Faça login para continuar.');
      return;
    }

    const newUser: DemoUser = {
      name: authForm.name.trim(),
      email,
      password: authForm.password,
      alerts: createSeedAlerts()
    };

    setUsers((currentUsers) => ({
      ...currentUsers,
      [email]: newUser
    }));
    setSessionEmail(email);
    setBanner('Conta criada com sucesso. Os alertas mock já foram carregados e ficarão salvos neste navegador.');
  }

  function handleCreateAlert(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const currentPrice = Number(alertForm.currentPrice.replace(',', '.'));
    const targetPrice = Number(alertForm.targetPrice.replace(',', '.'));

    if (!alertForm.productName.trim() || Number.isNaN(currentPrice) || Number.isNaN(targetPrice)) {
      setBanner('Preencha produto, preço atual e preço alvo para criar um alerta.');
      return;
    }

    const nextAlert: PriceAlert = {
      id: createId(),
      productName: alertForm.productName.trim(),
      site: alertForm.site,
      currentPrice: clampPrice(currentPrice),
      targetPrice: clampPrice(targetPrice),
      lowestPrice: clampPrice(currentPrice),
      enabled: true,
      lastChecked: formatTimestamp(),
      url: STORE_META[alertForm.site].url,
      history: buildHistory(clampPrice(currentPrice), clampPrice(targetPrice))
    };

    updateCurrentUser((user) => ({
      ...user,
      alerts: [nextAlert, ...user.alerts]
    }));
    setAlertForm({
      productName: '',
      site: alertForm.site,
      currentPrice: '',
      targetPrice: ''
    });
    setBanner(`Novo alerta criado para ${nextAlert.productName}.`);
  }

  function toggleAlert(id: string) {
    updateCurrentUser((user) => ({
      ...user,
      alerts: user.alerts.map((alert) =>
        alert.id === id ? { ...alert, enabled: !alert.enabled, lastChecked: formatTimestamp() } : alert
      )
    }));
  }

  function removeAlert(id: string) {
    updateCurrentUser((user) => ({
      ...user,
      alerts: user.alerts.filter((alert) => alert.id !== id)
    }));
    setBanner('Alerta removido da sua conta.');
  }

  function runScan() {
    updateCurrentUser((user) => ({
      ...user,
      alerts: user.alerts.map((alert, index) => {
        if (!alert.enabled) {
          return alert;
        }

        const variation = ((index % 3) - 1) * 0.018 + (Math.random() * 0.04 - 0.02);
        const nextPrice = clampPrice(alert.currentPrice * (1 + variation));

        return {
          ...alert,
          currentPrice: nextPrice,
          lowestPrice: Math.min(alert.lowestPrice, nextPrice),
          history: [...alert.history.slice(-5), nextPrice],
          lastChecked: formatTimestamp()
        };
      })
    }));
    setBanner('Varredura mock concluída. Os preços foram atualizados com uma nova leitura simulada.');
  }

  return (
    <main className="min-h-screen bg-[#06070d] text-zinc-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_bottom,rgba(234,179,8,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_78%,rgba(255,255,255,0.02))]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-8 md:py-8">
          <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-zinc-500">Projeto demo</p>
              <h1 className="mt-1 text-xl font-semibold text-white md:text-2xl">Sistema de Alerta de Preço</h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                Persistência local ativa
              </span>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
              >
                Voltar ao portfólio
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </header>

          {!ready ? (
            <div className="flex flex-1 items-center justify-center text-zinc-400">Carregando experiência...</div>
          ) : currentUser ? (
            <div className="grid flex-1 gap-6 xl:grid-cols-[1.55fr_0.85fr]">
              <section className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-2xl"
                >
                  <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="min-w-0 space-y-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-zinc-500">
                        <Sparkles className="h-4 w-4 text-amber-300" />
                        Painel premium de monitoramento
                      </div>

                      <div>
                        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                          Seus alertas ficam salvos e prontos para novas varreduras.
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
                          Conta mock com persistência em navegador, leitura de marketplaces e visual pensado como produto real.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {(['Amazon', 'Google Shopping', 'Mercado Livre', 'KaBuM!'] as StoreKey[]).map((site) => (
                          <span key={site} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-zinc-200">
                            {site}
                          </span>
                        ))}
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="min-w-0 rounded-3xl border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Alertas ativos</p>
                          <p className="mt-3 text-3xl font-semibold text-white">{activeAlerts.length}</p>
                        </div>
                        <div className="min-w-0 rounded-3xl border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Metas atingidas</p>
                          <p className="mt-3 text-3xl font-semibold text-emerald-300">{triggeredAlerts.length}</p>
                        </div>
                        <div className="min-w-0 rounded-3xl border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Economia possível</p>
                          <p className="mt-3 break-words text-2xl font-semibold leading-tight text-white">
                            {formatCurrency(potentialSavings)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 rounded-[1.75rem] border border-white/10 bg-[#0a0c14] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Conta ativa</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">{currentUser.name}</h3>
                          <p className="text-sm text-zinc-400">{currentUser.email}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSessionEmail(null);
                            setBanner('Sessão encerrada com segurança.');
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Sair
                        </button>
                      </div>

                      <div className="mt-6 space-y-3">
                        <div className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Marketplaces</p>
                          <p className="mt-2 text-2xl font-semibold text-white">{uniqueMarketplaces}</p>
                          <p className="mt-2 text-sm text-zinc-400">Cobertura mock de várias vitrines para cada produto.</p>
                        </div>

                        <div className="min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Leitura recente</p>
                          <p className="mt-2 text-sm leading-6 text-zinc-300">{banner}</p>
                        </div>

                        <button
                          type="button"
                          onClick={runScan}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:scale-[1.01]"
                        >
                          <SearchCheck className="h-4 w-4" />
                          Executar nova varredura mock
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  {currentUser.alerts.map((alert, index) => {
                    const status = getStatus(alert);
                    const statusMeta = getStatusMeta(status);
                    const store = STORE_META[alert.site];

                    return (
                      <motion.article
                        key={alert.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="min-w-0 rounded-[1.9rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className={`inline-flex rounded-full bg-gradient-to-r ${store.accent} px-3 py-1 text-xs font-medium text-zinc-950`}>
                              {alert.site}
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-white">{alert.productName}</h3>
                          </div>

                          <span className={`rounded-full border px-3 py-1 text-xs ${statusMeta.tone}`}>{statusMeta.label}</span>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                          <div className="min-w-0 rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Preço atual</p>
                            <p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">
                              {formatCurrency(alert.currentPrice)}
                            </p>
                          </div>
                          <div className="min-w-0 rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Preço alvo</p>
                            <p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">
                              {formatCurrency(alert.targetPrice)}
                            </p>
                          </div>
                          <div className="min-w-0 rounded-[1.4rem] border border-white/[0.08] bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Melhor valor</p>
                            <p className="mt-3 break-words text-[2rem] font-semibold leading-none text-white">
                              {formatCurrency(alert.lowestPrice)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5">
                          <Sparkline values={alert.history} glow={store.glow} />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {getCoverageSites(alert.site).map((site) => (
                            <span key={`${alert.id}-${site}`} className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                              {site}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-400">
                          <span>Última leitura: {alert.lastChecked}</span>
                          <div className="flex flex-wrap gap-2">
                            <a
                              href={alert.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-zinc-200 transition hover:border-white/20 hover:bg-white/5"
                            >
                              Abrir site
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button
                              type="button"
                              onClick={() => toggleAlert(alert.id)}
                              className="rounded-full border border-white/10 px-3 py-2 text-zinc-200 transition hover:border-amber-300/40 hover:bg-white/5"
                            >
                              {alert.enabled ? 'Pausar' : 'Reativar'}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAlert(alert.id)}
                              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 px-3 py-2 text-red-200 transition hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remover
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
              <aside className="space-y-6">
                <motion.section
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                    <Plus className="h-4 w-4 text-rose-300" />
                    Novo alerta
                  </div>

                  <form className="mt-5 space-y-4" onSubmit={handleCreateAlert}>
                    <label className="block space-y-2">
                      <span className="text-sm text-zinc-300">Produto</span>
                      <input
                        value={alertForm.productName}
                        onChange={(event) => setAlertForm((current) => ({ ...current, productName: event.target.value }))}
                        placeholder="Ex.: iPhone 16 128GB"
                        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50"
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block space-y-2">
                        <span className="text-sm text-zinc-300">Site monitorado</span>
                        <select
                          value={alertForm.site}
                          onChange={(event) => setAlertForm((current) => ({ ...current, site: event.target.value as StoreKey }))}
                          className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50"
                        >
                          {(Object.keys(STORE_META) as StoreKey[]).map((site) => (
                            <option key={site} value={site} className="bg-zinc-950">
                              {site}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block space-y-2">
                        <span className="text-sm text-zinc-300">Preço atual</span>
                        <input
                          value={alertForm.currentPrice}
                          onChange={(event) => setAlertForm((current) => ({ ...current, currentPrice: event.target.value }))}
                          placeholder="349.90"
                          className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50"
                        />
                      </label>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-sm text-zinc-300">Preço alvo</span>
                      <input
                        value={alertForm.targetPrice}
                        onChange={(event) => setAlertForm((current) => ({ ...current, targetPrice: event.target.value }))}
                        placeholder="299.90"
                        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-rose-400/50"
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100"
                    >
                      <BellRing className="h-4 w-4" />
                      Salvar alerta
                    </button>
                  </form>
                </motion.section>

                <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                    <CircleDollarSign className="h-4 w-4 text-emerald-300" />
                    Sinais recentes
                  </div>

                  <div className="mt-5 space-y-3">
                    {recentHighlights.map((alert) => {
                      const statusMeta = getStatusMeta(getStatus(alert));

                      return (
                        <div key={alert.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium text-white">{alert.productName}</p>
                              <p className="mt-1 text-sm text-zinc-400">{alert.site}</p>
                            </div>

                            <span className={`rounded-full border px-3 py-1 text-[11px] ${statusMeta.tone}`}>{statusMeta.label}</span>
                          </div>

                          <p className="mt-3 text-sm text-zinc-300">
                            Atual: <span className="font-medium text-white">{formatCurrency(alert.currentPrice)}</span> · alvo{' '}
                            <span className="font-medium text-white">{formatCurrency(alert.targetPrice)}</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-zinc-500">
                    <ShieldCheck className="h-4 w-4 text-sky-300" />
                    Stack desta demo
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'localStorage', 'Mock data'].map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-200">
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-400">
                    Nesta primeira versão a autenticação e o monitoramento são simulados localmente, mas o fluxo já está desenhado como um produto real.
                  </p>
                </section>
              </aside>
            </div>
          ) : (
            <div className="grid flex-1 items-center gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-400">
                  <Globe className="h-4 w-4 text-sky-300" />
                  Elegância operacional para e-commerce
                </div>

                <div className="space-y-5">
                  <h2 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
                    Crie sua conta e acompanhe preços com um painel limpo, bonito e direto.
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-zinc-300">
                    Uma visão de produto para alertas de preço com experiência premium, persistência local e leitura mock de marketplaces.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Conta pessoal</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">Salva alertas localmente por conta simulada dentro do navegador.</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Múltiplos sites</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">Amazon, Google Shopping, Mercado Livre e KaBuM! em uma visão única.</p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Visual premium</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">Interface com foco em produto, leitura rápida e sensação moderna.</p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Acesso mock</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{authMode === 'signup' ? 'Criar conta' : 'Entrar'}</h3>
                  </div>

                  <div className="flex gap-2 rounded-full border border-white/10 bg-black/20 p-1">
                    {(['signup', 'login'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          setAuthMode(mode);
                          setAuthError('');
                        }}
                        className={`rounded-full px-4 py-2 text-sm transition ${
                          authMode === mode ? 'bg-white text-zinc-950' : 'text-zinc-300 hover:text-white'
                        }`}
                      >
                        {mode === 'signup' ? 'Cadastro' : 'Login'}
                      </button>
                    ))}
                  </div>
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleAuthSubmit}>
                  <AnimatePresence initial={false}>
                    {authMode === 'signup' ? (
                      <motion.label
                        key="signup-name"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="block overflow-hidden"
                      >
                        <span className="mb-2 block text-sm text-zinc-300">Nome</span>
                        <input
                          value={authForm.name}
                          onChange={(event) => setAuthForm((current) => ({ ...current, name: event.target.value }))}
                          className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50"
                        />
                      </motion.label>
                    ) : null}
                  </AnimatePresence>

                  <label className="block">
                    <span className="mb-2 block text-sm text-zinc-300">E-mail</span>
                    <input
                      value={authForm.email}
                      onChange={(event) => setAuthForm((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm text-zinc-300">Senha</span>
                    <input
                      type="password"
                      value={authForm.password}
                      onChange={(event) => setAuthForm((current) => ({ ...current, password: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition focus:border-rose-400/50"
                    />
                  </label>

                  {authError ? (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{authError}</div>
                  ) : null}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-orange-400 to-amber-300 px-4 py-3 text-sm font-medium text-zinc-950 transition hover:scale-[1.01]"
                  >
                    <BellRing className="h-4 w-4" />
                    {authMode === 'signup' ? 'Criar conta e abrir painel' : 'Entrar no painel'}
                  </button>
                </form>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Notas da demo</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
                    <li>Os dados ficam salvos em `localStorage`, então a conta persiste neste navegador.</li>
                    <li>Os preços e varreduras são mockados para demonstrar o produto sem depender de integrações reais.</li>
                    <li>Ao criar a conta, você já entra com alertas iniciais prontos para explorar a interface.</li>
                  </ul>
                </div>
              </motion.section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
