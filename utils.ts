
import { PILLAR_MAPPING, GLOBAL_BENCHMARK, PILLARS } from './constants';
import { PillarName } from './types';

export function calculatePillarScore(pillarName: PillarName, responses: Record<number, number>): number {
  const questionIds = PILLAR_MAPPING[pillarName];
  const pillarResponses = questionIds.map(id => responses[id] ?? 0);
  const average = pillarResponses.reduce((a, b) => a + b, 0) / pillarResponses.length;
  return (average / 3) * 100;
}

export function calculateTotalGRC(pillarScores: Record<PillarName, number>): number {
  const sum = PILLARS.reduce((acc, pillar) => acc + pillarScores[pillar], 0);
  return sum / PILLARS.length;
}

export function calculateGap(benchmark: number, companyScore: number): number {
  return benchmark - companyScore;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function getStatusFromScore(score: number) {
  if (score <= 20) return { color: "#EF4444", status: "Crítico", textClass: "text-red-600", bgClass: "bg-red-50" };
  if (score <= 40) return { color: "#F97316", status: "Preocupante", textClass: "text-orange-600", bgClass: "bg-orange-50" };
  if (score <= 70) return { color: "#EAB308", status: "Em Desenvolvimento", textClass: "text-yellow-600", bgClass: "bg-yellow-50" };
  return { color: "#22C55E", status: "Adequado/Avançado", textClass: "text-green-600", bgClass: "bg-green-50" };
}

export function getHeatmapColor(gap: number): string {
  if (gap <= 5) return "#22C55E";   // Green - low vuln
  if (gap <= 15) return "#EAB308";  // Yellow - med vuln
  return "#EF4444";                 // Red - high vuln
}
