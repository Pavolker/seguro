
import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS } from '../constants';
import { shuffleArray } from '../utils';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: (responses: Record<number, number>) => void;
}

const Questionnaire: React.FC<Props> = ({ onComplete }) => {
  const shuffledQuestions = useMemo(() => shuffleArray(QUESTIONS), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});

  const currentQuestion = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  const handleSelectOption = (value: number) => {
    setResponses(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (responses[currentQuestion.id] === undefined) return;
    if (isLastQuestion) {
      onComplete(responses);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-slate-500">Pergunta {currentIndex + 1} de {QUESTIONS.length}</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(progress)}% Concluído</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 min-h-[400px] flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
            "{currentQuestion.text}"
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((opt) => (
              <label 
                key={opt.value}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${responses[currentQuestion.id] === opt.value 
                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-slate-100 hover:border-slate-300 bg-slate-50'}
                `}
              >
                <input
                  type="radio"
                  name={`q-${currentQuestion.id}`}
                  className="hidden"
                  checked={responses[currentQuestion.id] === opt.value}
                  onChange={() => handleSelectOption(opt.value)}
                />
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${responses[currentQuestion.id] === opt.value ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}
                `}>
                  {responses[currentQuestion.id] === opt.value && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
                <span className={`font-medium ${responses[currentQuestion.id] === opt.value ? 'text-blue-900' : 'text-slate-700'}`}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 font-semibold px-4 py-2 rounded-lg transition-all ${currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <ChevronLeft className="w-5 h-5" /> Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={responses[currentQuestion.id] === undefined}
            className={`
              flex items-center gap-2 font-bold px-8 py-3 rounded-lg transition-all shadow-md
              ${responses[currentQuestion.id] === undefined 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 transform hover:translate-x-1'}
            `}
          >
            {isLastQuestion ? 'Finalizar Diagnóstico' : 'Próximo'} 
            {isLastQuestion ? <CheckCircle2 className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
