import { TetrisGame } from '@/components/tetris-game';

export default function TetrisPage() {
  return (
    <main className="h-screen overflow-hidden bg-black px-3 py-3 md:px-4 md:py-4">
      <div className="mx-auto h-full max-w-7xl">
        <TetrisGame />
      </div>
    </main>
  );
}
