
import { GoogleGenAI } from "@google/genai";
import { DiagnosisResults } from "../types";

export async function getGeminiExecutiveAnalysis(results: DiagnosisResults): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY not found in environment variables");
    throw new Error("API key not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-3-flash-preview';

  const prompt = `
    Aja como um consultor sênior de GRC (Governança, Risco e Conformidade) especializado no setor de seguros.
    Analise os seguintes resultados de diagnóstico para uma seguradora de médio porte:

    Empresa: ${results.companyInfo.companyName}
    Segmento: ${results.companyInfo.segment}
    Colaboradores: ${results.companyInfo.employees}

    Scores (0-100):
    - Governança: ${results.pillarScores["Governança"].toFixed(2)} (Benchmark: 62)
    - Risco: ${results.pillarScores["Risco"].toFixed(2)} (Benchmark: 58)
    - Conformidade: ${results.pillarScores["Conformidade"].toFixed(2)} (Benchmark: 65)
    - Gestão de Dados: ${results.pillarScores["Gestão de Dados"].toFixed(2)} (Benchmark: 55)
    - Controles & Mitigação: ${results.pillarScores["Controles & Mitigação"].toFixed(2)} (Benchmark: 60)
    - Score GRC Total: ${results.totalGRC.toFixed(2)} (Benchmark: 60)

    Tarefa:
    1. Forneça um resumo executivo de 2 parágrafos sobre o estado atual da empresa.
    2. Identifique a maior vulnerabilidade e sugira uma ação imediata estratégica.
    3. Use um tom profissional, direto e encorajador.

    Responda em Português do Brasil.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o motor de IA para análise executiva.";
  }
}
