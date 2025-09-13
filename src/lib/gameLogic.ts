// Tipos del juego
export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameState = 'playing' | 'won' | 'draw';
export type Difficulty = 'normal' | 'hard';

export interface GameResult {
  winner: Player;
  winningLine?: number[];
  state: GameState;
}

// Inicializar tablero vacío
export const createEmptyBoard = (): Board => Array(9).fill(null);

// Verificar si hay ganador
export const checkWinner = (board: Board): GameResult => {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: line,
        state: 'won'
      };
    }
  }

  // Verificar empate
  if (board.every(cell => cell !== null)) {
    return {
      winner: null,
      state: 'draw'
    };
  }

  return {
    winner: null,
    state: 'playing'
  };
};

// Obtener posiciones vacías
export const getEmptyPositions = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1)
              .filter(index => index !== -1);
};

// IA - Modo Normal (70% de jugadas inteligentes)
export const getAIMoveNormal = (board: Board): number => {
  const emptyPositions = getEmptyPositions(board);
  
  if (emptyPositions.length === 0) return -1;

  // 70% de probabilidad de hacer jugada inteligente
  if (Math.random() < 0.7) {
    // Primero: intentar ganar
    const winMove = findWinningMove(board, 'O');
    if (winMove !== -1) return winMove;

    // Segundo: bloquear al jugador
    const blockMove = findWinningMove(board, 'X');
    if (blockMove !== -1) return blockMove;

    // Tercero: tomar el centro si está libre
    if (board[4] === null) return 4;

    // Cuarto: tomar esquinas
    const corners = [0, 2, 6, 8].filter(pos => board[pos] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
  }

  // Movimiento aleatorio (30% del tiempo o si no hay jugadas estratégicas)
  return emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
};

// IA - Modo Difícil (Algoritmo Minimax)
export const getAIMoveHard = (board: Board): number => {
  const emptyPositions = getEmptyPositions(board);
  
  if (emptyPositions.length === 0) return -1;

  let bestScore = -Infinity;
  let bestMove = emptyPositions[0];

  for (const position of emptyPositions) {
    const newBoard = [...board];
    newBoard[position] = 'O';
    const score = minimax(newBoard, 0, false, -Infinity, Infinity);
    
    if (score > bestScore) {
      bestScore = score;
      bestMove = position;
    }
  }

  return bestMove;
};

// Algoritmo Minimax con poda alfa-beta
const minimax = (board: Board, depth: number, isMaximizing: boolean, alpha: number, beta: number): number => {
  const result = checkWinner(board);
  
  if (result.state === 'won') {
    return result.winner === 'O' ? 10 - depth : depth - 10;
  }
  
  if (result.state === 'draw') {
    return 0;
  }

  const emptyPositions = getEmptyPositions(board);

  if (isMaximizing) {
    let maxScore = -Infinity;
    
    for (const position of emptyPositions) {
      const newBoard = [...board];
      newBoard[position] = 'O';
      const score = minimax(newBoard, depth + 1, false, alpha, beta);
      maxScore = Math.max(score, maxScore);
      alpha = Math.max(alpha, score);
      
      if (beta <= alpha) break; // Poda alfa-beta
    }
    
    return maxScore;
  } else {
    let minScore = Infinity;
    
    for (const position of emptyPositions) {
      const newBoard = [...board];
      newBoard[position] = 'X';
      const score = minimax(newBoard, depth + 1, true, alpha, beta);
      minScore = Math.min(score, minScore);
      beta = Math.min(beta, score);
      
      if (beta <= alpha) break; // Poda alfa-beta
    }
    
    return minScore;
  }
};

// Encontrar jugada ganadora para un jugador específico
const findWinningMove = (board: Board, player: Player): number => {
  const emptyPositions = getEmptyPositions(board);
  
  for (const position of emptyPositions) {
    const testBoard = [...board];
    testBoard[position] = player;
    
    if (checkWinner(testBoard).state === 'won') {
      return position;
    }
  }
  
  return -1;
};

// Obtener jugada de IA según dificultad
export const getAIMove = (board: Board, difficulty: Difficulty): number => {
  return difficulty === 'normal' ? getAIMoveNormal(board) : getAIMoveHard(board);
};

// Obtener mensaje personalizado según resultado
export const getDayanaraMessage = (result: GameResult, isPlayerWinner: boolean): string => {
  if (result.state === 'draw') {
    return "Empate";
  }
  
  if (isPlayerWinner) {
    return "Dayanara fea😛";
  } else {
    return "Dayanara aún más fea😛";
  }
};

// Validar si una jugada es válida
export const isValidMove = (board: Board, position: number): boolean => {
  return position >= 0 && position < 9 && board[position] === null;
};