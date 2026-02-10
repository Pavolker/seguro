
import React, { useState, useEffect, useCallback } from 'react';
import { AppStep, CompanyInfo, DiagnosisResults, PillarName } from './types';
import { QUESTIONS, PILLARS, GLOBAL_BENCHMARK } from './constants';
import { calculatePillarScore, calculateTotalGRC, calculateGap, shuffleArray } from './utils';
import Onboarding from './components/Onboarding';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import { Loader2 } from 'lucide-react';

import centauroLogo from './centauro.gif';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.ONBOARDING);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [results, setResults] = useState<DiagnosisResults | null>(null);

  const handleOnboardingComplete = (info: CompanyInfo) => {
    setCompanyInfo(info);
    setStep(AppStep.QUESTIONNAIRE);
  };

  const handleQuestionnaireComplete = (finalResponses: Record<number, number>) => {
    setResponses(finalResponses);
    setStep(AppStep.LOADING);

    // Simulation of processing for better UX
    setTimeout(() => {
      const pillarScores: Record<PillarName, number> = {} as any;
      const gaps: Record<PillarName, number> = {} as any;

      PILLARS.forEach(pillar => {
        const score = calculatePillarScore(pillar, finalResponses);
        pillarScores[pillar] = score;
        gaps[pillar] = calculateGap(GLOBAL_BENCHMARK[pillar], score);
      });

      const totalGRC = calculateTotalGRC(pillarScores);

      setResults({
        companyInfo: companyInfo!,
        pillarScores,
        totalGRC,
        gaps
      });

      setStep(AppStep.DASHBOARD);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={centauroLogo} alt="Centauro Logo" className="h-10 object-contain" />
          <h1 className="text-xl font-bold text-slate-800">INTELIGÊNCIA DE GOVERNANÇA DE SEGUROS <span className="text-blue-600">(GRC)</span></h1>
        </div>
        {companyInfo && (
          <div className="hidden md:block text-sm text-slate-500 font-medium">
            {companyInfo.companyName} • {companyInfo.segment}
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        {step === AppStep.ONBOARDING && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {step === AppStep.QUESTIONNAIRE && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}

        {step === AppStep.LOADING && (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <h2 className="text-2xl font-semibold text-slate-800">Processando seu Diagnóstico...</h2>
            <p className="text-slate-500 mt-2 max-w-md">Estamos analisando suas respostas em conformidade com as normas SUSEP/CNSP e benchmarks globais.</p>
          </div>
        )}

        {step === AppStep.DASHBOARD && results && (
          <Dashboard results={results} onReset={() => setStep(AppStep.ONBOARDING)} />
        )}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-6 px-4">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 GRC Strategy Tool. - versão 1.0 - Desenvolvido por PVolker.</p>
          <p className="mt-1">Em conformidade com LGPD e diretrizes de governança corporativa.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
