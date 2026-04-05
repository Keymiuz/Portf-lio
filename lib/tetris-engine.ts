export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const NEXT_QUEUE_SIZE = 5;

export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export type Rotation = 0 | 1 | 2 | 3;
export type BoardCell = PieceType | null;

export type ActivePiece = {
  type: PieceType;
  rotation: Rotation;
  x: number;
  y: number;
};

export type GameState = {
  board: BoardCell[][];
  active: ActivePiece;
  queue: PieceType[];
  hold: PieceType | null;
  canHold: boolean;
  score: number;
  lines: number;
  level: number;
  paused: boolean;
  gameOver: boolean;
  backToBack: boolean;
  lastAction: 'move' | 'rotate' | 'spawn' | 'drop';
  status: string;
};

type Matrix = number[][];

const PIECE_BAG: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

const JLSTZ_KICKS: Record<string, Array<[number, number]>> = {
  '0>1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '1>0': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '1>2': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  '2>1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  '2>3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  '3>2': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '3>0': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  '0>3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
};

const I_KICKS: Record<string, Array<[number, number]>> = {
  '0>1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '1>0': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '1>2': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  '2>1': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  '2>3': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  '3>2': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  '3>0': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  '0>3': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
};

export const PIECE_COLORS: Record<PieceType, { fill: string; edge: string; ghost: string }> = {
  I: { fill: '#2dd4ff', edge: '#cffafe', ghost: 'rgba(45, 212, 255, 0.24)' },
  O: { fill: '#facc15', edge: '#fef08a', ghost: 'rgba(250, 204, 21, 0.24)' },
  T: { fill: '#c084fc', edge: '#f5d0fe', ghost: 'rgba(192, 132, 252, 0.24)' },
  S: { fill: '#22c55e', edge: '#bbf7d0', ghost: 'rgba(34, 197, 94, 0.24)' },
  Z: { fill: '#ef4444', edge: '#fecaca', ghost: 'rgba(239, 68, 68, 0.24)' },
  J: { fill: '#3b82f6', edge: '#bfdbfe', ghost: 'rgba(59, 130, 246, 0.24)' },
  L: { fill: '#fb923c', edge: '#fed7aa', ghost: 'rgba(251, 146, 60, 0.24)' }
};

const SPAWN_MATRICES: Record<PieceType, Matrix> = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  O: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  T: [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  S: [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  Z: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  L: [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

const TETROMINOES: Record<PieceType, Matrix[]> = {
  I: buildRotations(SPAWN_MATRICES.I),
  O: [SPAWN_MATRICES.O, SPAWN_MATRICES.O, SPAWN_MATRICES.O, SPAWN_MATRICES.O],
  T: buildRotations(SPAWN_MATRICES.T),
  S: buildRotations(SPAWN_MATRICES.S),
  Z: buildRotations(SPAWN_MATRICES.Z),
  J: buildRotations(SPAWN_MATRICES.J),
  L: buildRotations(SPAWN_MATRICES.L)
};

function buildRotations(spawn: Matrix) {
  const first = cloneMatrix(spawn);
  const second = rotateMatrix(first);
  const third = rotateMatrix(second);
  const fourth = rotateMatrix(third);
  return [first, second, third, fourth];
}

function cloneMatrix(matrix: Matrix) {
  return matrix.map((row) => [...row]);
}

function rotateMatrix(matrix: Matrix) {
  return matrix[0].map((_, columnIndex) => matrix.map((row) => row[columnIndex]).reverse());
}

function createBoard() {
  return Array.from({ length: BOARD_HEIGHT }, () => Array<BoardCell>(BOARD_WIDTH).fill(null));
}

function shuffleBag() {
  const bag = [...PIECE_BAG];

  for (let index = bag.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [bag[index], bag[randomIndex]] = [bag[randomIndex], bag[index]];
  }

  return bag;
}

function refillQueue(queue: PieceType[]) {
  const nextQueue = [...queue];

  while (nextQueue.length < NEXT_QUEUE_SIZE + 1) {
    nextQueue.push(...shuffleBag());
  }

  return nextQueue;
}

function takeNextPiece(queue: PieceType[]) {
  const readyQueue = refillQueue(queue);
  const [type, ...remaining] = readyQueue;

  return {
    type,
    queue: refillQueue(remaining)
  };
}

function normalizeRotation(value: number): Rotation {
  return ((((value % 4) + 4) % 4) as Rotation);
}

function createPiece(type: PieceType): ActivePiece {
  return {
    type,
    rotation: 0,
    x: 3,
    y: -1
  };
}

function isInsideBoard(x: number, y: number) {
  return x >= 0 && x < BOARD_WIDTH && y < BOARD_HEIGHT;
}

function getMatrix(piece: ActivePiece) {
  return TETROMINOES[piece.type][piece.rotation];
}

export function getPreviewMatrix(type: PieceType) {
  return TETROMINOES[type][0];
}

export function getPieceCells(piece: ActivePiece) {
  const matrix = getMatrix(piece);
  const cells: Array<{ x: number; y: number }> = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < matrix[rowIndex].length; columnIndex += 1) {
      if (!matrix[rowIndex][columnIndex]) continue;

      cells.push({
        x: piece.x + columnIndex,
        y: piece.y + rowIndex
      });
    }
  }

  return cells;
}

function collides(board: BoardCell[][], piece: ActivePiece) {
  return getPieceCells(piece).some((cell) => {
    if (cell.x < 0 || cell.x >= BOARD_WIDTH || cell.y >= BOARD_HEIGHT) {
      return true;
    }

    if (cell.y < 0) {
      return false;
    }

    return board[cell.y][cell.x] !== null;
  });
}

function cloneBoard(board: BoardCell[][]) {
  return board.map((row) => [...row]);
}

function detectTSpin(board: BoardCell[][], piece: ActivePiece, lastAction: GameState['lastAction']) {
  if (piece.type !== 'T' || lastAction !== 'rotate') {
    return false;
  }

  const centerX = piece.x + 1;
  const centerY = piece.y + 1;
  const corners = [
    [centerX - 1, centerY - 1],
    [centerX + 1, centerY - 1],
    [centerX - 1, centerY + 1],
    [centerX + 1, centerY + 1]
  ];

  const blockedCorners = corners.filter(([x, y]) => {
    if (!isInsideBoard(x, y) || y < 0) {
      return true;
    }

    return board[y][x] !== null;
  });

  return blockedCorners.length >= 3;
}

function calculatePlacementScore(params: {
  level: number;
  clearedLines: number;
  tSpin: boolean;
  allClear: boolean;
  backToBack: boolean;
}) {
  const { level, clearedLines, tSpin, allClear, backToBack } = params;
  let basePoints = 0;
  let label = '';
  let qualifiesForBackToBack = false;

  if (tSpin) {
    qualifiesForBackToBack = true;

    if (clearedLines === 0) {
      basePoints = 400;
      label = 'T-Spin';
    } else if (clearedLines === 1) {
      basePoints = 800;
      label = 'T-Spin Single';
    } else if (clearedLines === 2) {
      basePoints = 1200;
      label = 'T-Spin Double';
    } else if (clearedLines === 3) {
      basePoints = 1600;
      label = 'T-Spin Triple';
    }
  } else if (clearedLines === 1) {
    basePoints = 100;
    label = 'Single';
  } else if (clearedLines === 2) {
    basePoints = 300;
    label = 'Double';
  } else if (clearedLines === 3) {
    basePoints = 500;
    label = 'Triple';
  } else if (clearedLines === 4) {
    basePoints = 800;
    label = 'Tetris';
    qualifiesForBackToBack = true;
  }

  if (basePoints > 0 && qualifiesForBackToBack && backToBack) {
    basePoints = Math.floor(basePoints * 1.5);
    label = `${label} B2B`;
  }

  let totalPoints = basePoints * level;

  if (allClear) {
    totalPoints += 2000 * level;
    label = label ? `${label} + All Clear` : 'All Clear';
  }

  const nextBackToBack = clearedLines === 0 && !tSpin ? backToBack : qualifiesForBackToBack;

  return {
    points: totalPoints,
    label: label || 'Piece locked',
    nextBackToBack
  };
}

function lockPiece(state: GameState): GameState {
  const nextBoard = cloneBoard(state.board);
  const activeCells = getPieceCells(state.active);
  const toppedOut = activeCells.some((cell) => cell.y < 0);

  activeCells.forEach((cell) => {
    if (cell.y >= 0 && cell.y < BOARD_HEIGHT) {
      nextBoard[cell.y][cell.x] = state.active.type;
    }
  });

  const fullRows = nextBoard.reduce<number[]>((rows, row, rowIndex) => {
    if (row.every(Boolean)) {
      rows.push(rowIndex);
    }

    return rows;
  }, []);

  const clearedLines = fullRows.length;
  let resolvedBoard = nextBoard;

  if (clearedLines > 0) {
    resolvedBoard = nextBoard.filter((_, rowIndex) => !fullRows.includes(rowIndex));

    while (resolvedBoard.length < BOARD_HEIGHT) {
      resolvedBoard.unshift(Array<BoardCell>(BOARD_WIDTH).fill(null));
    }
  }

  const tSpin = detectTSpin(state.board, state.active, state.lastAction);
  const allClear = resolvedBoard.every((row) => row.every((cell) => cell === null));
  const placement = calculatePlacementScore({
    level: state.level,
    clearedLines,
    tSpin,
    allClear,
    backToBack: state.backToBack
  });

  const nextLines = state.lines + clearedLines;
  const nextLevel = Math.floor(nextLines / 10) + 1;
  const nextScore = state.score + placement.points;

  if (toppedOut) {
    return {
      ...state,
      board: resolvedBoard,
      score: nextScore,
      lines: nextLines,
      level: nextLevel,
      gameOver: true,
      status: 'Game over'
    };
  }

  const { type, queue } = takeNextPiece(state.queue);
  const active = createPiece(type);
  const gameOver = collides(resolvedBoard, active);

  return {
    ...state,
    board: resolvedBoard,
    active,
    queue,
    canHold: true,
    score: nextScore,
    lines: nextLines,
    level: nextLevel,
    gameOver,
    backToBack: placement.nextBackToBack,
    lastAction: 'spawn',
    status: gameOver ? 'Game over' : placement.label
  };
}

function withUpdatedActive(state: GameState, active: ActivePiece, lastAction: GameState['lastAction']) {
  return {
    ...state,
    active,
    lastAction
  };
}

export function createInitialGameState(): GameState {
  const { type, queue } = takeNextPiece([]);

  return {
    board: createBoard(),
    active: createPiece(type),
    queue,
    hold: null,
    canHold: true,
    score: 0,
    lines: 0,
    level: 1,
    paused: false,
    gameOver: false,
    backToBack: false,
    lastAction: 'spawn',
    status: 'Ready'
  };
}

export function moveHorizontally(state: GameState, direction: -1 | 1): GameState {
  if (state.paused || state.gameOver) return state;

  const candidate = { ...state.active, x: state.active.x + direction };
  return collides(state.board, candidate) ? state : withUpdatedActive(state, candidate, 'move');
}

export function softDrop(state: GameState): GameState {
  if (state.paused || state.gameOver) return state;

  const candidate = { ...state.active, y: state.active.y + 1 };

  if (collides(state.board, candidate)) {
    return lockPiece(state);
  }

  return {
    ...withUpdatedActive(state, candidate, 'drop'),
    score: state.score + 1
  };
}

export function tickGame(state: GameState): GameState {
  if (state.paused || state.gameOver) return state;

  const candidate = { ...state.active, y: state.active.y + 1 };
  return collides(state.board, candidate) ? lockPiece(state) : withUpdatedActive(state, candidate, 'drop');
}

export function rotatePiece(state: GameState, direction: -1 | 1): GameState {
  if (state.paused || state.gameOver) return state;

  const nextRotation = normalizeRotation(state.active.rotation + direction);
  const kickKey = `${state.active.rotation}>${nextRotation}`;
  const kicks =
    state.active.type === 'O'
      ? ([[0, 0]] as Array<[number, number]>)
      : (state.active.type === 'I' ? I_KICKS[kickKey] : JLSTZ_KICKS[kickKey]) ?? [[0, 0]];

  for (const [xOffset, yOffset] of kicks) {
    const candidate: ActivePiece = {
      ...state.active,
      rotation: nextRotation,
      x: state.active.x + xOffset,
      y: state.active.y - yOffset
    };

    if (!collides(state.board, candidate)) {
      return withUpdatedActive(state, candidate, 'rotate');
    }
  }

  return state;
}

export function getGhostY(state: GameState): number {
  let ghostY = state.active.y;

  while (!collides(state.board, { ...state.active, y: ghostY + 1 })) {
    ghostY += 1;
  }

  return ghostY;
}

export function hardDrop(state: GameState): GameState {
  if (state.paused || state.gameOver) return state;

  const ghostY = getGhostY(state);
  const distance = ghostY - state.active.y;

  return lockPiece({
    ...state,
    active: { ...state.active, y: ghostY },
    score: state.score + distance * 2,
    lastAction: 'drop'
  });
}

export function holdPiece(state: GameState): GameState {
  if (state.paused || state.gameOver || !state.canHold) return state;

  const currentType = state.active.type;
  let nextActive: ActivePiece;
  let nextHold: PieceType;
  let nextQueue = state.queue;

  if (state.hold) {
    const heldType = state.hold;
    nextActive = createPiece(heldType);
    nextHold = currentType;
  } else {
    const nextPiece = takeNextPiece(state.queue);
    nextActive = createPiece(nextPiece.type);
    nextQueue = nextPiece.queue;
    nextHold = currentType;
  }

  if (collides(state.board, nextActive)) {
    return {
      ...state,
      hold: nextHold,
      queue: nextQueue,
      gameOver: true,
      status: 'Game over'
    };
  }

  return {
    ...state,
    active: nextActive,
    hold: nextHold,
    queue: nextQueue,
    canHold: false,
    lastAction: 'spawn',
    status: state.hold ? 'Swap complete' : 'Hold placed'
  };
}

export function togglePause(state: GameState): GameState {
  if (state.gameOver) return state;

  return {
    ...state,
    paused: !state.paused,
    status: state.paused ? 'Game resumed' : 'Paused'
  };
}

export function restartGame(): GameState {
  return createInitialGameState();
}

function getPieceExtents(piece: ActivePiece) {
  const cells = getPieceCells(piece).map((cell) => ({ x: cell.x - piece.x, y: cell.y - piece.y }));
  const columns = cells.map((cell) => cell.x);

  return {
    minColumn: Math.min(...columns),
    maxColumn: Math.max(...columns),
    centerColumn: Math.round((Math.min(...columns) + Math.max(...columns)) / 2)
  };
}

function findNearestValidX(board: BoardCell[][], piece: ActivePiece, desiredX: number) {
  const candidates = [desiredX];

  for (let offset = 1; offset < BOARD_WIDTH; offset += 1) {
    candidates.push(desiredX - offset, desiredX + offset);
  }

  for (const candidateX of candidates) {
    if (!collides(board, { ...piece, x: candidateX })) {
      return candidateX;
    }
  }

  return null;
}

export function snapPieceToColumn(state: GameState, hoveredColumn: number): GameState {
  if (state.paused || state.gameOver) return state;

  const { minColumn, maxColumn, centerColumn } = getPieceExtents(state.active);
  const rawX = hoveredColumn - centerColumn;
  const clampedX = Math.min(BOARD_WIDTH - 1 - maxColumn, Math.max(-minColumn, rawX));
  const validX = findNearestValidX(state.board, state.active, clampedX);

  if (validX === null || validX === state.active.x) {
    return state;
  }

  return withUpdatedActive(state, { ...state.active, x: validX }, 'move');
}

export function getDropInterval(level: number) {
  return Math.max(1000 - (level - 1) * 70, 120);
}
