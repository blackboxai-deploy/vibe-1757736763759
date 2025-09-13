'use client';

import React from 'react';
import { GameResult } from '@/lib/gameLogic';

interface WinMessageProps {
  result: GameResult;
  message: string;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export default function WinMessage({
  result,
  message,
  onPlayAgain,
  onChangeDifficulty
}: WinMessageProps) {
  if (result.state === 'playing') return null;

   const getResultStyles = () => {
    if (result.state === 'draw') {
      return {
        bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
        text: 'text-yellow-900',
        emoji: '',
        title: '¡Empate!'
      };
    }
    
    if (result.winner === 'X') {
      return {
        bg: 'bg-gradient-to-br from-green-400 to-emerald-500',
        text: 'text-green-900',
        emoji: '',
        title: '¡Ganaste!'
      };
    }
    
    return {
      bg: 'bg-gradient-to-br from-red-400 to-pink-500',
      text: 'text-red-900',
      emoji: '',
      title: '¡Perdiste!'
    };
  };

  const styles = getResultStyles();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`
        ${styles.bg} ${styles.text}
        rounded-3xl p-8 max-w-md w-full mx-4
        shadow-2xl border-4 border-white/20
        transform animate-in slide-in-from-bottom-4 duration-500
      `}>
        {/* Encabezado */}
         <div className="text-center mb-6">
          {styles.emoji && (
            <div className="text-6xl mb-3 animate-bounce">
              {styles.emoji}
            </div>
          )}
          <h2 className="text-3xl font-bold font-fredoka mb-2">
            {styles.title}
          </h2>
        </div>

        {/* Mensaje personalizado de Dayanara */}
        <div className="text-center mb-8">
          <div className="bg-white/20 rounded-2xl p-4 border-2 border-white/30">
            <p className="text-2xl font-bold font-fredoka leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-3">
           <button
            onClick={onPlayAgain}
            className="w-full bg-white/20 hover:bg-white/30 text-current
                     border-2 border-white/40 hover:border-white/60
                     rounded-xl px-6 py-4 font-fredoka font-semibold text-lg
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     flex items-center justify-center gap-2"
          >
            Jugar de Nuevo
          </button>
          
          <button
            onClick={onChangeDifficulty}
            className="w-full bg-white/10 hover:bg-white/20 text-current
                     border-2 border-white/30 hover:border-white/50
                     rounded-xl px-6 py-3 font-fredoka font-medium text-base
                     transition-all duration-300 transform hover:scale-105 active:scale-95
                     flex items-center justify-center gap-2"
          >
            Cambiar Dificultad
          </button>
        </div>

 
      </div>
    </div>
  );
}

