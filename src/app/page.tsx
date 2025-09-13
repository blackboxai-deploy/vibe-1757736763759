'use client';

import { useState } from 'react';
import TicTacToeGame from '@/components/TicTacToeGame';
import LotteryGenerator from '@/components/LotteryGenerator';

type AppMode = 'menu' | 'game' | 'lottery';

export default function HomePage() {
  const [currentMode, setCurrentMode] = useState<AppMode>('menu');

  if (currentMode === 'game') {
    return (
      <div className="w-full min-h-screen flex flex-col p-4">
        <button
          onClick={() => setCurrentMode('menu')}
          className="self-start mb-4 bg-white/20 hover:bg-white/30 text-white
                   border-2 border-white/40 hover:border-white/60
                   px-4 py-2 rounded-xl font-fredoka font-medium
                   transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          ← Volver al Menú
        </button>
        <div className="flex-1 flex items-center justify-center">
          <TicTacToeGame />
        </div>
      </div>
    );
  }

  if (currentMode === 'lottery') {
    return (
      <div className="w-full min-h-screen flex flex-col p-4">
        <button
          onClick={() => setCurrentMode('menu')}
          className="self-start mb-4 bg-white/20 hover:bg-white/30 text-white
                   border-2 border-white/40 hover:border-white/60
                   px-4 py-2 rounded-xl font-fredoka font-medium
                   transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          ← Volver al Menú
        </button>
        <div className="flex-1 flex items-center justify-center">
          <LotteryGenerator />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div>
          <h1 className="text-6xl md:text-7xl font-bold text-white font-fredoka mb-4">
            Centro de Juegos
          </h1>
          <p className="text-white/80 text-xl font-medium">
            Elige tu aventura
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <GameCard
            title="Gato Game"
            description="Juega contra la IA en el clásico juego del gato"
            features={["2 niveles de dificultad", "Mensajes de Dayanara", "Estadísticas"]}
            onClick={() => setCurrentMode('game')}
            icon="X O"
          />

          <GameCard
            title="Generador de Lotería"
            description="Genera números de la suerte para diferentes loterías"
            features={["7 tipos de lotería", "Generación múltiple", "Números aleatorios"]}
            onClick={() => setCurrentMode('lottery')}
            icon="7 77"
          />
        </div>
      </div>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  features: string[];
  onClick: () => void;
  icon: string;
}

function GameCard({ title, description, features, onClick, icon }: GameCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 
                    hover:bg-white/20 transition-all duration-300 transform hover:scale-105
                    cursor-pointer max-w-sm w-full"
         onClick={onClick}>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-white font-fredoka mb-2">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-white font-fredoka mb-2">
          {title}
        </h2>
        <p className="text-white/80 text-sm">
          {description}
        </p>
      </div>

      <div className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-white/70 text-sm">
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            {feature}
          </div>
        ))}
      </div>

      <button className="w-full bg-white text-blue-600 hover:bg-white/90 
                       px-6 py-3 rounded-xl font-fredoka font-bold text-lg
                       transition-all duration-300 transform hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-2xl">
        Jugar Ahora
      </button>
    </div>
  );
}