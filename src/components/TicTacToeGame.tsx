'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from './GameBoard';
import GameStatus from './GameStatus';
import DifficultySelector from './DifficultySelector';
import WinMessage from './WinMessage';
import {
  Board,
  Difficulty,
  GameResult,
  createEmptyBoard,
  checkWinner,
  getAIMove,
  getDayanaraMessage,
  isValidMove
} from '@/lib/gameLogic';

interface Stats {
  wins: number;
  losses: number;
  draws: number;
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameResult, setGameResult] = useState<GameResult>({ winner: null, state: 'playing' });
  const [isThinking, setIsThinking] = useState(false);
  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, draws: 0 });
  const [gameStarted, setGameStarted] = useState(false);

  // Verificar estado del juego
  const checkGameState = useCallback((currentBoard: Board) => {
    const result = checkWinner(currentBoard);
    setGameResult(result);
    
    if (result.state !== 'playing') {
      // Actualizar estadísticas
      setStats(prev => {
        if (result.state === 'draw') {
          return { ...prev, draws: prev.draws + 1 };
        } else if (result.winner === 'X') {
          return { ...prev, wins: prev.wins + 1 };
        } else {
          return { ...prev, losses: prev.losses + 1 };
        }
      });
    }
    
    return result;
  }, []);

  // Manejar jugada del jugador
  const handlePlayerMove = useCallback((position: number) => {
    if (!isPlayerTurn || !isValidMove(board, position) || gameResult.state !== 'playing') {
      return;
    }

    const newBoard = [...board];
    newBoard[position] = 'X';
    setBoard(newBoard);
    
    const result = checkGameState(newBoard);
    
    if (result.state === 'playing') {
      setIsPlayerTurn(false);
    }
  }, [board, isPlayerTurn, gameResult.state, checkGameState]);

  // IA hace su jugada
  useEffect(() => {
    if (!isPlayerTurn && gameResult.state === 'playing' && gameStarted) {
      setIsThinking(true);
      
      // Simular tiempo de pensamiento
      const thinkingTime = difficulty === 'hard' ? 1000 : 500;
      
      const timer = setTimeout(() => {
        const aiPosition = getAIMove(board, difficulty);
        
        if (aiPosition !== -1) {
          const newBoard = [...board];
          newBoard[aiPosition] = 'O';
          setBoard(newBoard);
          checkGameState(newBoard);
        }
        
        setIsThinking(false);
        setIsPlayerTurn(true);
      }, thinkingTime);

      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, [isPlayerTurn, gameResult.state, board, difficulty, gameStarted, checkGameState]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setIsPlayerTurn(true);
    setGameResult({ winner: null, state: 'playing' });
    setIsThinking(false);
    setGameStarted(true);
  }, []);

  // Cambiar dificultad y reiniciar
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    if (gameStarted) {
      resetGame();
    }
  }, [gameStarted, resetGame]);

  // Volver al menú principal
  const backToMenu = useCallback(() => {
    setGameStarted(false);
    setBoard(createEmptyBoard());
    setIsPlayerTurn(true);
    setGameResult({ winner: null, state: 'playing' });
    setIsThinking(false);
  }, []);

  // Obtener mensaje personalizado de Dayanara
  const getDayanaraMsg = useCallback(() => {
    return getDayanaraMessage(gameResult, gameResult.winner === 'X');
  }, [gameResult]);

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto">
      {/* Título */}
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-fredoka mb-2">
          Gato Game
        </h1>
 
      </div>

      {!gameStarted ? (
        /* Pantalla de inicio */
         <div className="flex flex-col items-center gap-8 text-center">
          <div className="text-8xl animate-bounce font-fredoka font-bold text-white">GATO</div>
          
          <div className="text-white/90 max-w-md">
            <p className="text-lg font-medium mb-4">
              ¡Prepárate para enfrentar a la IA en el clásico juego del gato!
            </p>
            <p className="text-sm opacity-80">
              Elige la dificultad.
            </p>
          </div>

          <DifficultySelector
            difficulty={difficulty}
            onDifficultyChange={changeDifficulty}
          />

          <button
            onClick={resetGame}
            className="bg-white text-blue-600 hover:bg-white/90 
                     px-8 py-4 rounded-2xl font-fredoka font-bold text-xl
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     shadow-lg hover:shadow-2xl"
          >
            ¡Comenzar Juego!
          </button>
        </div>
      ) : (
        /* Pantalla de juego */
        <div className="flex flex-col items-center gap-6">
          {/* Estado del juego */}
          <GameStatus
            gameState={gameResult.state}
            currentPlayer={isPlayerTurn ? 'X' : 'O'}
            isThinking={isThinking}
            stats={stats}
          />

          {/* Tablero */}
          <GameBoard
            board={board}
            onCellClick={handlePlayerMove}
            disabled={!isPlayerTurn || gameResult.state !== 'playing'}
            winningLine={gameResult.winningLine}
          />

          {/* Controles */}
           <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="bg-white/20 hover:bg-white/30 text-white
                       border-2 border-white/40 hover:border-white/60
                       px-4 py-2 rounded-xl font-fredoka font-medium
                       transition-all duration-300 transform hover:scale-105 active:scale-95
                       flex items-center gap-2"
            >
              Reiniciar
            </button>
            
            <button
              onClick={backToMenu}
              className="bg-white/10 hover:bg-white/20 text-white
                       border-2 border-white/30 hover:border-white/50
                       px-4 py-2 rounded-xl font-fredoka font-medium
                       transition-all duration-300 transform hover:scale-105 active:scale-95
                       flex items-center gap-2"
            >
              Menú
            </button>
          </div>

          {/* Indicador de dificultad actual */}
           <div className="text-center text-white/70 text-sm">
            <span className="font-medium">Dificultad:</span>{' '}
            <span className="font-semibold capitalize">
              {difficulty}
            </span>
          </div>
        </div>
      )}

      {/* Modal de resultado */}
      <WinMessage
        result={gameResult}
        message={getDayanaraMsg()}
        onPlayAgain={resetGame}
        onChangeDifficulty={backToMenu}
      />
    </div>
  );
}