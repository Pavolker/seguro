
import React, { useEffect, useState } from 'react';
import { DiagnosisResults, PillarName } from '../types';
import { getStatusFromScore, getHeatmapColor } from '../utils';
import { GrcRadarChart, ComparisonBarChart } from './ChartComponents';
import { getGeminiExecutiveAnalysis } from '../services/geminiService';
import {
  Download, Share2, Calendar, Target, AlertTriangle,
  CheckCircle, ArrowRight, BrainCircuit, TrendingDown, TrendingUp
} from 'lucide-react';
import { PILLARS } from '../constants';

interface Props {
  results: DiagnosisResults;
  onReset: () => void;
}

const recommendations: Record<PillarName, { description: string; actions: string[] }> = {
  "Governança": {
    description: "Estruturação de órgãos colegiados e práticas de governança",
    actions: [
      "Formalizar Conselho de Administração ou Comitê Consultivo",
      "Implementar reuniões periódicas documentadas",
      "Contratar Seguro D&O robusto"
    ]
  },
  "Risco": {
    description: "Gestão de riscos estratégicos e operacionais",
    actions: [
      "Desenvolver matriz de riscos atualizada",
      "Estabelecer comitê formal de riscos",
      "Implementar avaliações trimestrais"
    ]
  },
  "Conformidade": {
    description: "Adequação regulatória SUSEP/CNSP e processos de auditoria",
    actions: [
      "Documentar processos de conformidade",
      "Implementar calendário de auditorias internas",
      "Criar plano de remediação de não-conformidades"
    ]
  },
  "Gestão de Dados": {
    description: "Proteção de dados e conformidade LGPD",
    actions: [
      "Mapear tratamento de dados pessoais",
      "Implementar políticas documentadas de privacidade",
      "Automatizar controles de acesso e criptografia"
    ]
  },
  "Controles & Mitigação": {
    description: "Controles internos e segregação de funções",
    actions: [
      "Implementar segregação de funções críticas",
      "Automatizar trilhas de auditoria de sistemas",
      "Desenvolver matriz de controles manuais e sistêmicos"
    ]
  }
};

const Dashboard: React.FC<Props> = ({ results, onReset }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('Carregando análise via IA...');
  const status = getStatusFromScore(results.totalGRC);

  useEffect(() => {
    getGeminiExecutiveAnalysis(results).then(setAiAnalysis);
  }, [results]);

  // Fix: Explicitly cast entries to fix arithmetic type error for sorting gaps
  const topPriorities = Object.entries(results.gaps)
    .sort((a, b) => (b[1] as number) - (a[1] as number)) // Higher gap first
    .slice(0, 3);

  // Fix: Explicitly cast values to number array for Math.max
  const maxGap = Math.max(...(Object.values(results.gaps) as number[]));

  const getCommercialOffer = (gap: number) => {
    if (gap > 20) return { situation: "Crítica", offer: "Consultoria GRC Estratégica", cta: "Agendar Diagnóstico Presencial" };
    if (gap > 10) return { situation: "Importante", offer: "Implementação de Frameworks", cta: "Solicitar Proposta de Implementação" };
    if (gap > 5) return { situation: "Moderada", offer: "Treinamento & Capacitação", cta: "Conhecer Programas" };
    return { situation: "Mínima", offer: "Monitoramento Contínuo", cta: "Configurar Monitoramento" };
  };

  const commercial = getCommercialOffer(maxGap);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resultado do Diagnóstico GRC</h2>
          <p className="text-slate-500">Emitido para {results.companyInfo.companyName} em {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all">
            <Share2 className="w-4 h-4" /> Compartilhar
          </button>
          <button onClick={onReset} className="text-blue-600 hover:underline text-sm font-medium ml-4">Reiniciar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Hero */}
        <div className={`${status.bgClass} rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Target className="w-24 h-24" />
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">Score GRC Total</span>
          <div className={`text-8xl font-black mb-4 ${status.textClass}`}>{Math.round(results.totalGRC)}</div>
          <div className={`text-xl font-bold py-1 px-4 rounded-full border-2 ${status.textClass} border-current mb-4`}>
            {status.status}
          </div>
          <p className="text-slate-600 max-w-[200px]">Média integrada de maturidade nos 5 pilares estratégicos.</p>
        </div>

        {/* Gemini AI Summary */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">Análise do Time Centauro</h3>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed italic">
            {aiAnalysis.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" /> Perfil de Maturidade (Radar)
          </h3>
          <GrcRadarChart results={results} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> Comparativo vs Benchmark
          </h3>
          <ComparisonBarChart results={results} />
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Mapa de Calor: Vulnerabilidade por Pilar</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PILLARS.map(pillar => {
            const gap = results.gaps[pillar];
            const color = getHeatmapColor(gap);
            return (
              <div key={pillar} className="text-center p-4 rounded-xl border border-slate-100 flex flex-col justify-between" style={{ backgroundColor: `${color}10` }}>
                <span className="text-xs font-bold text-slate-500 uppercase mb-2 block">{pillar}</span>
                <div className="text-2xl font-bold mb-1" style={{ color }}>
                  {/* Fix: Explicitly cast gap to number to access toFixed method */}
                  {gap > 0 ? `+${(gap as number).toFixed(0)}` : (gap as number).toFixed(0)}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">GAP SCORE</div>
                <div className="mt-4 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full" style={{ backgroundColor: color, width: `${Math.min(100, (Math.abs(gap) / 40) * 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roadmap */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-green-600" /> Roadmap de Ação: Top 3 Prioridades
          </h3>
          <div className="space-y-6">
            {topPriorities.map(([pillar, gap], index) => {
              const rec = recommendations[pillar as PillarName];
              return (
                <div key={pillar} className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      {pillar}
                      {/* Fix: Explicitly cast gap to number to access toFixed method */}
                      <span className="text-xs py-0.5 px-2 bg-red-100 text-red-600 rounded-full">Gap: {(gap as number).toFixed(0)}</span>
                    </h4>
                    <p className="text-sm text-slate-500 mb-3">{rec.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {rec.actions.map((act, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" /> {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commercial CTA */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Próximo Passo Estratégico</h3>
            <p className="text-blue-100 mb-6">
              Sua vulnerabilidade atual é considerada <span className="font-bold underline decoration-white/30">{commercial.situation}</span>.
              Recomendamos uma ação direta para proteção dos administradores e conformidade SUSEP.
            </p>
            <div className="bg-white/10 p-4 rounded-xl mb-8">
              <span className="text-xs uppercase font-bold text-blue-200">Oferta Recomendada</span>
              <p className="text-xl font-bold">{commercial.offer}</p>
            </div>
          </div>
          <button className="w-full bg-white text-blue-600 font-black py-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg group">
            {commercial.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
