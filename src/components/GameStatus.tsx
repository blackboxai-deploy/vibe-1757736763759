'use client';

import React from 'react';
import { GameState } from '@/lib/gameLogic';

interface GameStatusProps {
  gameState: GameState;
  currentPlayer: 'X' | 'O';
  isThinking?: boolean;
}

interface Stats {
  wins: number;
  losses: number;
  draws: number;
}

interface GameStatusWithStatsProps extends GameStatusProps {
  stats: Stats;
}

export default function GameStatus({ 
  gameState, 
  currentPlayer, 
  isThinking = false,
  stats
}: GameStatusWithStatsProps) {
   const getStatusMessage = (): string => {
    if (isThinking) return "IA pensando...";
    if (gameState === 'playing') {
      return currentPlayer === 'X' ? "Tu turno" : "Turno de la IA";
    }
    return "";
  };

  const getPlayerIndicator = (player: 'X' | 'O') => {
    const isActive = gameState === 'playing' && currentPlayer === player && !isThinking;
    const isYou = player === 'X';
    
    return (
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-xl
        transition-all duration-300 font-fredoka font-medium
        ${isActive 
          ? 'bg-white/30 text-white scale-105 ring-2 ring-white/50' 
          : 'bg-white/10 text-white/70'
        }
      `}>
        <span className={`
          text-2xl font-bold
          ${player === 'X' ? 'text-blue-300' : 'text-red-300'}
        `}>
          {player}
        </span>
        <span className="text-sm">
          {isYou ? 'Tú' : 'IA'}
        </span>
         {isActive && (
          <span className="ml-1 animate-pulse text-yellow-300">
            {isThinking ? '...' : '•'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Estado actual del juego */}
      <div className="text-center">
        <div className="text-white font-fredoka font-semibold text-lg mb-2">
          {getStatusMessage()}
        </div>
        
        {/* Indicadores de jugadores */}
        <div className="flex items-center gap-4">
          {getPlayerIndicator('X')}
          <div className="text-white/60 text-sm font-medium">VS</div>
          {getPlayerIndicator('O')}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="flex gap-6 text-center">
         <StatItem
          label="Victorias"
          value={stats.wins}
          color="text-green-300"
          emoji=""
        />
        <StatItem
          label="Derrotas"
          value={stats.losses}
          color="text-red-300"
          emoji=""
        />
        <StatItem
          label="Empates"
          value={stats.draws}
          color="text-yellow-300"
          emoji=""
        />
      </div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
  emoji: string;
}

function StatItem({ label, value, color, emoji }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {emoji && <div className="text-lg">{emoji}</div>}
      <div className={`text-2xl font-bold font-fredoka ${color}`}>
        {value}
      </div>
      <div className="text-xs text-white/70 font-medium">
        {label}
      </div>
    </div>
  );
}