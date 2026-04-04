'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Undo2
} from 'lucide-react';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  NEXT_QUEUE_SIZE,
  PIECE_COLORS,
  PieceType,
  createInitialGameState,
  getDropInterval,
  getGhostY,
  getPieceCells,
  getPreviewMatrix,
  hardDrop,
  holdPiece,
  moveHorizontally,
  restartGame,
  rotatePiece,
  softDrop,
  tickGame,
  togglePause
} from '@/lib/tetris-engine';

function MiniPreview({ type, title }: { type: PieceType | null; title: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">{title}</p>

      <div className="mt-3 grid grid-cols-4 gap-1 rounded-2xl bg-black/40 p-2">
        {Array.from({ length: 16 }, (_, index) => {
          const row = Math.floor(index / 4);
          const column = index % 4;
          const filled = type ? getPreviewMatrix(type)[row][column] === 1 : false;
          const palette = type ? PIECE_COLORS[type] : null;

          return (
            <div
              key={`${title}-${index}`}
              className="aspect-square rounded-md border border-white/5"
              style={{
                background: filled && palette ? palette.fill : 'rgba(10, 10, 12, 0.9)',
                boxShadow: filled && palette ? `inset 0 0 0 1px ${palette.edge}` : 'none'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function StatPanel({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <div className="mt-2 rounded-2xl bg-black/40 px-3 py-2 text-xl font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  icon
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}

export function TetrisGame() {
  const [game, setGame] = useState(createInitialGameState);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setGame((current) => tickGame(current));
    }, getDropInterval(game.level));

    return () => window.clearInterval(interval);
  }, [game.level]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat && !['ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        event.preventDefault();
        setGame((current) => moveHorizontally(current, -1));
        return;
      }

      if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        event.preventDefault();
        setGame((current) => moveHorizontally(current, 1));
        return;
      }

      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
        event.preventDefault();
        setGame((current) => softDrop(current));
        return;
      }

      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        setGame((current) => hardDrop(current));
        return;
      }

      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'x') {
        event.preventDefault();
        setGame((current) => rotatePiece(current, 1));
        return;
      }

      if (event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'q') {
        event.preventDefault();
        setGame((current) => rotatePiece(current, -1));
        return;
      }

      if (event.key.toLowerCase() === 'c' || event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setGame((current) => holdPiece(current));
        return;
      }

      if (event.key.toLowerCase() === 'p') {
        event.preventDefault();
        setGame((current) => togglePause(current));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeCells = getPieceCells(game.active);
  const ghostY = getGhostY(game);
  const ghostCells = getPieceCells({ ...game.active, y: ghostY });

  const boardCells = Array.from({ length: BOARD_HEIGHT * BOARD_WIDTH }, (_, index) => {
    const row = Math.floor(index / BOARD_WIDTH);
    const column = index % BOARD_WIDTH;
    const settled = game.board[row][column];
    const active = activeCells.find((cell) => cell.x === column && cell.y === row);
    const ghost = ghostCells.find((cell) => cell.x === column && cell.y === row);

    return {
      row,
      column,
      settled,
      active,
      ghost: Boolean(ghost && !settled && !active)
    };
  });

  return (
    <section className="relative h-[calc(100svh-2rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,#182033_0%,#0b1020_35%,#05070f_100%)] p-4 text-zinc-100 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-5">
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-300/70">Playable demo</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">Tetris</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Layout mais compacto, foco em teclado e visual mais contemporâneo. Hold em `C`, hard drop em `Espaço` e pausa em `P`.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao portfólio
          </Link>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[11rem_minmax(17rem,20rem)_11rem] xl:items-stretch xl:justify-center">
          <div className="grid auto-rows-min gap-3 xl:content-start">
            <MiniPreview title="Hold" type={game.hold} />
            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <StatPanel label="Score" value={game.score} />
              <StatPanel label="Level" value={game.level} />
              <StatPanel label="Lines" value={game.lines} />
            </div>
          </div>

          <div className="flex min-h-0 flex-col gap-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
              <div className="relative mx-auto w-full max-w-[320px] rounded-[1.5rem] border border-white/10 bg-black/70 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                <div className="grid grid-cols-10 gap-[1px] rounded-[1.2rem] bg-zinc-800/80 p-[1px]">
                  {boardCells.map((cell) => {
                    const palette = cell.active
                      ? PIECE_COLORS[game.active.type]
                      : cell.settled
                        ? PIECE_COLORS[cell.settled]
                        : cell.ghost
                          ? PIECE_COLORS[game.active.type]
                          : null;

                    return (
                      <div
                        key={`${cell.row}-${cell.column}`}
                        className="aspect-square rounded-[0.18rem] border border-white/5 transition-colors"
                        style={{
                          background: cell.active || cell.settled
                            ? `linear-gradient(180deg, ${palette?.edge}, ${palette?.fill})`
                            : cell.ghost
                              ? palette?.ghost
                              : 'rgba(6, 6, 10, 0.98)',
                          boxShadow: cell.active || cell.settled ? `inset 0 0 0 1px ${palette?.edge}` : 'none'
                        }}
                      />
                    );
                  })}
                </div>

                {(game.paused || game.gameOver) && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-[1.2rem] bg-black/72">
                    <div className="rounded-3xl border border-white/10 bg-zinc-950/95 px-7 py-6 text-center shadow-2xl">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">{game.gameOver ? 'Fim de jogo' : 'Pausado'}</p>
                      <p className="mt-3 text-xl font-semibold text-white">{game.gameOver ? 'Bora mais uma?' : 'Jogo pausado'}</p>
                      <button
                        type="button"
                        onClick={() => setGame(game.gameOver ? restartGame() : togglePause(game))}
                        className="mt-5 rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500"
                      >
                        {game.gameOver ? 'Reiniciar partida' : 'Retomar jogo'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-3 text-sm text-zinc-300 backdrop-blur-xl md:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Status</p>
                <p className="mt-2 text-base font-semibold text-white">{game.status}</p>
                <p className="mt-2 text-zinc-400">
                  B2B: <span className="font-medium text-zinc-200">{game.backToBack ? 'ativo' : 'inativo'}</span>
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Controles</p>
                <p className="mt-2 leading-6 text-zinc-400">
                  Setas ou `A/D/S`, `Espaço` para hard drop, `Z/Q` e `X` para girar, `C` para hold e `P` para pausar.
                </p>
              </div>
            </div>
          </div>

          <div className="grid min-h-0 auto-rows-min gap-3 xl:content-start">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">Next</p>
              <div className="mt-3 space-y-2">
                {game.queue.slice(0, NEXT_QUEUE_SIZE).map((pieceType, index) => (
                  <div key={`${pieceType}-${index}`} className="rounded-2xl bg-black/40 p-2">
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 16 }, (_, cellIndex) => {
                        const row = Math.floor(cellIndex / 4);
                        const column = cellIndex % 4;
                        const filled = getPreviewMatrix(pieceType)[row][column] === 1;
                        const palette = PIECE_COLORS[pieceType];

                        return (
                          <div
                            key={`${pieceType}-${cellIndex}`}
                            className="aspect-square rounded-md border border-white/5"
                            style={{
                              background: filled ? palette.fill : 'rgba(24, 24, 27, 0.9)',
                              boxShadow: filled ? `inset 0 0 0 1px ${palette.edge}` : 'none'
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Ações</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <ControlButton label="Esq." onClick={() => setGame((current) => moveHorizontally(current, -1))} icon={<ArrowLeft className="h-4 w-4" />} />
                <ControlButton label="Dir." onClick={() => setGame((current) => moveHorizontally(current, 1))} icon={<ArrowRight className="h-4 w-4" />} />
                <ControlButton label="Soft" onClick={() => setGame((current) => softDrop(current))} icon={<ArrowDown className="h-4 w-4" />} />
                <ControlButton label="Drop" onClick={() => setGame((current) => hardDrop(current))} icon={<ArrowUp className="h-4 w-4" />} />
                <ControlButton label="Anti" onClick={() => setGame((current) => rotatePiece(current, -1))} icon={<RotateCcw className="h-4 w-4" />} />
                <ControlButton label="Hora" onClick={() => setGame((current) => rotatePiece(current, 1))} icon={<RotateCw className="h-4 w-4" />} />
                <ControlButton label="Hold" onClick={() => setGame((current) => holdPiece(current))} icon={<Undo2 className="h-4 w-4" />} />
                <ControlButton
                  label={game.paused ? 'Play' : 'Pause'}
                  onClick={() => setGame((current) => togglePause(current))}
                  icon={game.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                />
              </div>
              <button
                type="button"
                onClick={() => setGame(restartGame())}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200 transition hover:border-red-500/60 hover:bg-red-500/20"
              >
                <Undo2 className="h-4 w-4" />
                Reiniciar
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 text-xs leading-5 text-zinc-400 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Pontuação</p>
              <ul className="mt-2 space-y-1">
                <li>Single 100 x nível</li>
                <li>Double 300 x nível</li>
                <li>Triple 500 x nível</li>
                <li>Tetris 800 x nível</li>
                <li>T-Spin 400 x nível</li>
                <li>T-Spin Double 1200 x nível</li>
                <li>T-Spin Triple 1600 x nível</li>
                <li>Soft drop +1 por linha</li>
                <li>Hard drop +2 por linha</li>
                <li>All Clear +2000 x nível</li>
                <li>B2B x1.5</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
