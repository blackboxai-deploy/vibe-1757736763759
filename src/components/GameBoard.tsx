'use client';

import React from 'react';
import GameCell from './GameCell';
import { Board } from '@/lib/gameLogic';

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningLine?: number[];
}

export default function GameBoard({ 
  board, 
  onCellClick, 
  disabled, 
  winningLine = [] 
}: GameBoardProps) {
  return (
    <div className="relative">
      {/* Tablero principal */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20">
        {board.map((value, index) => (
          <GameCell
            key={index}
            value={value}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            isWinning={winningLine.includes(index)}
            index={index}
          />
        ))}
      </div>
      
      {/* Línea de victoria animada */}
      {winningLine.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          <WinningLine positions={winningLine} />
        </div>
      )}
    </div>
  );
}

// Componente para mostrar la línea de victoria
function WinningLine({ positions }: { positions: number[] }) {
  const getLineStyle = (): React.CSSProperties => {
    const [start, , end] = positions;
    
    // Determinar el tipo de línea
    if (start === 0 && end === 2) return { /* Primera fila */ };
    if (start === 3 && end === 5) return { /* Segunda fila */ };
    if (start === 6 && end === 8) return { /* Tercera fila */ };
    if (start === 0 && end === 6) return { /* Primera columna */ };
    if (start === 1 && end === 7) return { /* Segunda columna */ };
    if (start === 2 && end === 8) return { /* Tercera columna */ };
    if (start === 0 && end === 8) return { /* Diagonal principal */ };
    if (start === 2 && end === 6) return { /* Diagonal secundaria */ };
    
    return {};
  };

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={getLineStyle()}
    >
      <div className="w-full h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-full animate-pulse opacity-80" />
    </div>
  );
}