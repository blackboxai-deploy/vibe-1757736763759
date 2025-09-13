'use client';

import React, { useState } from 'react';

interface LotteryType {
  name: string;
  numbers: number;
  maxNumber: number;
  extraBalls?: {
    count: number;
    maxNumber: number;
    name: string;
  };
}

const lotteryTypes: LotteryType[] = [
  {
    name: 'Mega Millions',
    numbers: 5,
    maxNumber: 70,
    extraBalls: {
      count: 1,
      maxNumber: 25,
      name: 'Mega Ball'
    }
  },
  {
    name: 'Powerball',
    numbers: 5,
    maxNumber: 69,
    extraBalls: {
      count: 1,
      maxNumber: 26,
      name: 'Power Ball'
    }
  },
  {
    name: 'EuroMillions',
    numbers: 5,
    maxNumber: 50,
    extraBalls: {
      count: 2,
      maxNumber: 12,
      name: 'Lucky Stars'
    }
  },
  {
    name: 'Lotería Nacional (México)',
    numbers: 6,
    maxNumber: 56
  },
  {
    name: 'Melate',
    numbers: 6,
    maxNumber: 56
  },
  {
    name: 'Tris',
    numbers: 3,
    maxNumber: 9
  },
  {
    name: 'Chispazo',
    numbers: 5,
    maxNumber: 28
  }
];

interface GeneratedNumbers {
  main: number[];
  extra?: number[];
}

export default function LotteryGenerator() {
  const [selectedLottery, setSelectedLottery] = useState<LotteryType>(lotteryTypes[0]);
  const [generatedNumbers, setGeneratedNumbers] = useState<GeneratedNumbers | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomNumbers = (count: number, max: number, exclude: number[] = []): number[] => {
    const numbers: number[] = [];
    while (numbers.length < count) {
      const randomNum = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(randomNum) && !exclude.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers.sort((a, b) => a - b);
  };

  const generateLotteryNumbers = () => {
    setIsGenerating(true);
    
    // Simular tiempo de generación para efecto
    setTimeout(() => {
      const mainNumbers = generateRandomNumbers(selectedLottery.numbers, selectedLottery.maxNumber);
      let extraNumbers: number[] | undefined;
      
      if (selectedLottery.extraBalls) {
        extraNumbers = generateRandomNumbers(
          selectedLottery.extraBalls.count, 
          selectedLottery.extraBalls.maxNumber
        );
      }
      
      setGeneratedNumbers({
        main: mainNumbers,
        extra: extraNumbers
      });
      setIsGenerating(false);
    }, 1000);
  };

  const generateMultipleTickets = (count: number) => {
    const tickets: GeneratedNumbers[] = [];
    for (let i = 0; i < count; i++) {
      const mainNumbers = generateRandomNumbers(selectedLottery.numbers, selectedLottery.maxNumber);
      let extraNumbers: number[] | undefined;
      
      if (selectedLottery.extraBalls) {
        extraNumbers = generateRandomNumbers(
          selectedLottery.extraBalls.count, 
          selectedLottery.extraBalls.maxNumber
        );
      }
      
      tickets.push({
        main: mainNumbers,
        extra: extraNumbers
      });
    }
    return tickets;
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
      {/* Título */}
      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-fredoka mb-2">
          Generador de Lotería
        </h1>
        <p className="text-white/80 text-lg font-medium">
          Genera números de la suerte para tu lotería favorita
        </p>
      </div>

      {/* Selector de Lotería */}
      <div className="w-full max-w-md">
        <label className="block text-white font-fredoka font-semibold text-lg mb-3">
          Tipo de Lotería:
        </label>
        <select
          value={lotteryTypes.indexOf(selectedLottery)}
          onChange={(e) => setSelectedLottery(lotteryTypes[parseInt(e.target.value)])}
          className="w-full p-3 rounded-xl bg-white/90 text-blue-800 font-fredoka font-medium
                   border-2 border-white/50 focus:border-blue-300 focus:outline-none
                   transition-all duration-300"
        >
          {lotteryTypes.map((lottery, index) => (
            <option key={index} value={index}>
              {lottery.name}
            </option>
          ))}
        </select>
      </div>

      {/* Información del juego seleccionado */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
        <h3 className="text-white font-fredoka font-semibold text-lg mb-2">
          {selectedLottery.name}
        </h3>
        <p className="text-white/80 text-sm">
          {selectedLottery.numbers} números del 1 al {selectedLottery.maxNumber}
          {selectedLottery.extraBalls && 
            ` + ${selectedLottery.extraBalls.count} ${selectedLottery.extraBalls.name} del 1 al ${selectedLottery.extraBalls.maxNumber}`
          }
        </p>
      </div>

      {/* Botón de generación */}
      <button
        onClick={generateLotteryNumbers}
        disabled={isGenerating}
        className="bg-white text-blue-600 hover:bg-white/90 disabled:bg-white/50
                 px-8 py-4 rounded-2xl font-fredoka font-bold text-xl
                 transition-all duration-300 transform hover:scale-105 active:scale-95
                 shadow-lg hover:shadow-2xl disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generando...' : 'Generar Números'}
      </button>

      {/* Números generados */}
      {generatedNumbers && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 w-full max-w-lg">
          <h3 className="text-white font-fredoka font-bold text-xl mb-4 text-center">
            Tus Números de la Suerte
          </h3>
          
          {/* Números principales */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {generatedNumbers.main.map((number, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-white text-blue-600 rounded-full
                         flex items-center justify-center font-bold text-lg
                         shadow-lg transform hover:scale-110 transition-all duration-300
                         animate-in fade-in zoom-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {number}
              </div>
            ))}
          </div>

          {/* Números extra */}
          {generatedNumbers.extra && generatedNumbers.extra.length > 0 && (
            <div className="border-t border-white/20 pt-4">
              <p className="text-white/80 text-sm font-medium mb-3 text-center">
                {selectedLottery.extraBalls?.name}
              </p>
              <div className="flex justify-center gap-3">
                {generatedNumbers.extra.map((number, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-yellow-400 text-yellow-900 rounded-full
                             flex items-center justify-center font-bold text-lg
                             shadow-lg transform hover:scale-110 transition-all duration-300
                             animate-in fade-in zoom-in"
                    style={{ animationDelay: `${(generatedNumbers.main.length + index) * 100}ms` }}
                  >
                    {number}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Generación múltiple */}
      {generatedNumbers && (
        <div className="flex gap-3 flex-wrap justify-center">
          <QuickGenerateButton 
            count={5} 
            lottery={selectedLottery}
            generateMultiple={generateMultipleTickets}
          />
          <QuickGenerateButton 
            count={10} 
            lottery={selectedLottery}
            generateMultiple={generateMultipleTickets}
          />
        </div>
      )}
    </div>
  );
}

interface QuickGenerateButtonProps {
  count: number;
  lottery: LotteryType;
  generateMultiple: (count: number) => GeneratedNumbers[];
}

function QuickGenerateButton({ count, lottery, generateMultiple }: QuickGenerateButtonProps) {
  const [showMultiple, setShowMultiple] = useState(false);
  const [multipleTickets, setMultipleTickets] = useState<GeneratedNumbers[]>([]);

  const handleGenerate = () => {
    const tickets = generateMultiple(count);
    setMultipleTickets(tickets);
    setShowMultiple(true);
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        className="bg-white/20 hover:bg-white/30 text-white
                 border-2 border-white/40 hover:border-white/60
                 px-4 py-2 rounded-xl font-fredoka font-medium
                 transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Generar {count} Boletos
      </button>

      {showMultiple && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-blue-600 font-fredoka">
                {count} Boletos - {lottery.name}
              </h3>
              <button
                onClick={() => setShowMultiple(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {multipleTickets.map((ticket, ticketIndex) => (
                <div key={ticketIndex} className="bg-blue-50 rounded-xl p-4 border-2 border-blue-100">
                  <div className="text-sm font-medium text-blue-600 mb-2">Boleto #{ticketIndex + 1}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      {ticket.main.map((number, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-blue-600 text-white rounded-full
                                   flex items-center justify-center font-bold text-sm"
                        >
                          {number}
                        </div>
                      ))}
                    </div>
                    {ticket.extra && ticket.extra.length > 0 && (
                      <>
                        <span className="text-blue-400 mx-2">+</span>
                        <div className="flex gap-2">
                          {ticket.extra.map((number, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full
                                       flex items-center justify-center font-bold text-sm"
                            >
                              {number}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}