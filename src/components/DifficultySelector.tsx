'use client';

import React from 'react';
import { Difficulty } from '@/lib/gameLogic';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

export default function DifficultySelector({ 
  difficulty, 
  onDifficultyChange, 
  disabled = false 
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-white font-fredoka font-semibold text-lg">
        Nivel de Dificultad
      </h3>
      
      <div className="flex gap-3 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
         <DifficultyButton
          isSelected={difficulty === 'normal'}
          onClick={() => onDifficultyChange('normal')}
          disabled={disabled}
          label="Normal"
          description="70% inteligente"
          emoji=""
        />
        
        <DifficultyButton
          isSelected={difficulty === 'hard'}
          onClick={() => onDifficultyChange('hard')}
          disabled={disabled}
          label="Difícil"
          description="Imposible de vencer"
          emoji=""
        />
      </div>
    </div>
  );
}

interface DifficultyButtonProps {
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
  description: string;
  emoji: string;
}

function DifficultyButton({
  isSelected,
  onClick,
  disabled,
  label,
  description,
  emoji
}: DifficultyButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-fredoka font-medium text-sm
        transition-all duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
        min-w-[120px] text-center
        ${isSelected
          ? 'bg-white text-purple-600 shadow-lg scale-105 ring-2 ring-white/50'
          : 'bg-white/20 text-white hover:bg-white/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
       <div className="flex flex-col items-center gap-1">
        {emoji && <span className="text-xl">{emoji}</span>}
        <span className="font-semibold">{label}</span>
        <span className="text-xs opacity-80 leading-tight">{description}</span>
      </div>
    </button>
  );
}