
import { PillarName, Question } from './types';

export const PILLAR_MAPPING: Record<PillarName, number[]> = {
  "Governança": [1, 6, 9],
  "Risco": [3, 6, 7],
  "Conformidade": [2, 10],
  "Gestão de Dados": [5, 8],
  "Controles & Mitigação": [4, 8, 10]
};

export const GLOBAL_BENCHMARK: Record<PillarName | "GRC Total", number> = {
  "Governança": 62,
  "Risco": 58,
  "Conformidade": 65,
  "Gestão de Dados": 55,
  "Controles & Mitigação": 60,
  "GRC Total": 60
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Sua organização possui um Conselho de Administração ou órgão colegiado equivalente que se reúne regularmente?",
    themes: ["Governança"],
    primaryPillar: "Governança",
    options: [
      { value: 0, label: "Não possuímos órgãos colegiados" },
      { value: 1, label: "Órgãos informais ou reuniões esporádicas" },
      { value: 2, label: "Conselho estruturado com reuniões semestrais" },
      { value: 3, label: "Conselho de Administração ativo com reuniões mensais/bimestrais" }
    ]
  },
  {
    id: 2,
    text: "Qual é o nível de formalização e documentação de processos críticos de conformidade regulatória (SUSEP/CNSP)?",
    themes: ["Conformidade"],
    primaryPillar: "Conformidade",
    options: [
      { value: 0, label: "Processos não documentados" },
      { value: 1, label: "Documentação parcial ou desatualizada" },
      { value: 2, label: "Processos documentados e revisados anualmente" },
      { value: 3, label: "Full compliance documentado com trilhas de auditoria" }
    ]
  },
  {
    id: 3,
    text: "Sua empresa mantém uma matriz de riscos estratégicos atualizada e realiza avaliações periódicas?",
    themes: ["Risco"],
    primaryPillar: "Risco",
    options: [
      { value: 0, label: "Não possuímos matriz de riscos formalizada" },
      { value: 1, label: "Existe matriz, mas desatualizada ou informal" },
      { value: 2, label: "Matriz documentada com revisões anuais" },
      { value: 3, label: "Matriz integrada ao planejamento com revisões trimestrais" }
    ]
  },
  {
    id: 4,
    text: "Existe segregação clara de funções entre aprovação, execução e supervisão nas operações críticas?",
    themes: ["Controles & Mitigação"],
    primaryPillar: "Controles & Mitigação",
    options: [
      { value: 0, label: "Sem segregação clara de funções" },
      { value: 1, label: "Segregação parcial dependente de poucas pessoas" },
      { value: 2, label: "Segregação formalizada na maioria dos processos" },
      { value: 3, label: "Segregação rígida e automatizada por sistema" }
    ]
  },
  {
    id: 5,
    text: "Sua organização está em conformidade integral com a LGPD e possui políticas documentadas de proteção de dados?",
    themes: ["Gestão de Dados"],
    primaryPillar: "Gestão de Dados",
    options: [
      { value: 0, label: "Não iniciamos o processo de adequação" },
      { value: 1, label: "Adequação em andamento, sem políticas formais" },
      { value: 2, label: "Políticas implementadas com DPO nomeado" },
      { value: 3, label: "Conformidade total com auditorias de dados recorrentes" }
    ]
  },
  {
    id: 6,
    text: "Existe um comitê formal de Risco e/ou Auditoria com participação do conselho?",
    themes: ["Governança", "Risco"],
    primaryPillar: "Governança",
    options: [
      { value: 0, label: "Não existem comitês de apoio" },
      { value: 1, label: "Comitês informais sem reporte ao conselho" },
      { value: 2, label: "Comitê formalizado com atas de reuniões" },
      { value: 3, label: "Comitês independentes com participação direta do conselho" }
    ]
  },
  {
    id: 7,
    text: "Qual é a cobertura de riscos operacionais documentados versus os riscos identificados na sua avaliação interna?",
    themes: ["Risco"],
    primaryPillar: "Risco",
    options: [
      { value: 0, label: "Identificamos menos de 20% dos riscos" },
      { value: 1, label: "Mapeamento básico (20-50%)" },
      { value: 2, label: "Mapeamento avançado (50-80%)" },
      { value: 3, label: "Cobertura total (>90%) com planos de mitigação" }
    ]
  },
  {
    id: 8,
    text: "Existem controles internos automatizados (tecnologia) para segregação de funções e auditoria de transações?",
    themes: ["Controles & Mitigação", "Gestão de Dados"],
    primaryPillar: "Controles & Mitigação",
    options: [
      { value: 0, label: "Controles manuais ou inexistentes" },
      { value: 1, label: "Poucos controles automatizados em sistemas legados" },
      { value: 2, label: "Automação na maioria das transações críticas" },
      { value: 3, label: "Ecossistema digital com monitoramento contínuo" }
    ]
  },
  {
    id: 9,
    text: "Sua organização possui Seguro D&O (Directors and Officers) ativo e acompanhado?",
    themes: ["Governança"],
    primaryPillar: "Governança",
    options: [
      { value: 0, label: "Não possuímos Seguro D&O" },
      { value: 1, label: "D&O em fase de cotação" },
      { value: 2, label: "Seguro ativo, mas sem revisão recente de limites" },
      { value: 3, label: "Seguro robusto com limites revisados trimestralmente" }
    ]
  },
  {
    id: 10,
    text: "Com que frequência auditorias internas são realizadas sobre processos de conformidade e controles internos?",
    themes: ["Conformidade", "Controles & Mitigação"],
    primaryPillar: "Conformidade",
    options: [
      { value: 0, label: "Não realizamos auditorias internas" },
      { value: 1, label: "Auditorias eventuais (mais de 2 anos)" },
      { value: 2, label: "Auditorias anuais sistemáticas" },
      { value: 3, label: "Monitoramento contínuo ou auditorias trimestrais" }
    ]
  }
];

export const PILLARS: PillarName[] = [
  "Governança",
  "Risco",
  "Conformidade",
  "Gestão de Dados",
  "Controles & Mitigação"
];
