
import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagnosisResults } from "../types";

export async function getGeminiExecutiveAnalysis(results: DiagnosisResults): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY not found in environment variables");
    return "Erro: Chave de API não configurada. Verifique o arquivo .env.local";
  }

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

  // Função auxiliar com retry e backoff exponencial
  async function generateWithRetry(model: any, prompt: string, retries = 3, delay = 2000): Promise<string> {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error: any) {
      if (retries > 0 && (
          error?.message?.includes('429') || 
          error?.message?.includes('quota') || 
          error?.message?.includes('RESOURCE_EXHAUSTED') ||
          error?.status === 429
      )) {
        console.warn(`⚠️ Cota excedida ou Rate Limit. Tentando novamente em ${delay/1000}s... (Tentativas restantes: ${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return generateWithRetry(model, prompt, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Atualizado para gemini-flash-latest que demonstrou estabilidade nos testes
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Adicionar timeout global para evitar travamento
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("Timeout: A análise demorou muito tempo")), 45000); // Aumentado para 45s para permitir retries
    });

    const analysisPromise = (async () => {
      const text = await generateWithRetry(model, prompt);

      if (!text || text.trim() === "") {
        throw new Error("Resposta vazia da API");
      }

      return text;
    })();

    // Race entre a análise e o timeout
    const text = await Promise.race([analysisPromise, timeoutPromise]);
    return text;

  } catch (error: any) {
    console.error("Gemini API Error Details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
      error: error
    });

    // Mensagens de erro mais específicas
    if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('API key')) {
      return "Erro: Chave de API inválida. Verifique se a chave está correta no arquivo .env.local";
    }
    if (error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED') || error?.message?.includes('429')) {
      return "⚠️ O sistema está sobrecarregado no momento (Muitas requisições). Por favor, aguarde 1 minuto e tente novamente.";
    }
    if (error?.message?.includes('Timeout')) {
      return "Erro: A análise demorou muito tempo. Por favor, tente novamente.";
    }
    if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
      console.error("Erro de conexão detectado. Verifique DNS, VPN, AdBlockers ou firewall.");
      return "Erro de conexão: Verifique sua conexão com a internet e tente novamente.";
    }

    return `Erro ao gerar análise: ${error?.message || 'Erro desconhecido'}. Por favor, tente novamente.`;
  }
}
