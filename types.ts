
export type PillarName = "Governança" | "Risco" | "Conformidade" | "Gestão de Dados" | "Controles & Mitigação";

export interface Question {
  id: number;
  text: number | string; // Using actual text from constants
  themes: PillarName[];
  primaryPillar: PillarName;
  options: { value: number; label: string }[];
}

export interface CompanyInfo {
  companyName: string;
  cnpj: string;
  segment: string;
  employees: number;
  responsibleName: string;
  email: string;
  position: string;
}

export interface PillarScore {
  pillar: PillarName;
  score: number;
  benchmark: number;
  gap: number;
}

export interface DiagnosisResults {
  companyInfo: CompanyInfo;
  pillarScores: Record<PillarName, number>;
  totalGRC: number;
  gaps: Record<PillarName, number>;
}

export enum AppStep {
  ONBOARDING,
  QUESTIONNAIRE,
  LOADING,
  DASHBOARD
}
