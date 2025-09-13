'use client';

import React from 'react';
import { Player } from '@/lib/gameLogic';

interface GameCellProps {
  value: Player;
  onClick: () => void;
  disabled: boolean;
  isWinning: boolean;
  index: number;
}

export default function GameCell({ 
  value, 
  onClick, 
  disabled, 
  isWinning,
  index 
}: GameCellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        relative aspect-square rounded-2xl font-bold text-4xl md:text-6xl
        transition-all duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
        shadow-lg hover:shadow-2xl
        font-fredoka
        ${value === null 
          ? 'bg-white/20 hover:bg-white/30 border-2 border-white/40 hover:border-white/60' 
          : 'bg-white/90 border-2 border-white'
        }
        ${isWinning 
          ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 animate-pulse ring-4 ring-yellow-400' 
          : ''
        }
        ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-500' : 'text-white/60'}
        ${disabled && value === null ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <span 
        className={`
          block transition-all duration-500 transform
          ${value ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
        `}
      >
        {value}
      </span>
      
      {/* Efecto de hover para celdas vacías */}
      {value === null && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-30 transition-opacity duration-200 text-white text-2xl font-light">
          ×
        </span>
      )}
    </button>
  );
}