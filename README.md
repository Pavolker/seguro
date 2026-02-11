# INTELIGÊNCIA DE GOVERNANÇA DE SEGUROS (GRC)

Aplicação de diagnóstico GRC (Governança, Risco e Conformidade) para o setor de seguros, desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Recharts** - Visualização de dados
- **Google Gemini AI** - Análise executiva inteligente

## 📋 Pré-requisitos

- Node.js 18 ou superior
- Chave de API do Google Gemini

## 🔧 Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/Pavolker/seguro.git
cd seguro
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite `.env.local` e adicione sua chave de API do Gemini:
```
VITE_GEMINI_API_KEY=sua_chave_aqui
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

6. Acesse `http://localhost:3000`

## 🌐 Deploy no Netlify

### Via GitHub (Recomendado)

1. Faça push do código para o GitHub
2. Acesse [Netlify](https://app.netlify.com)
3. Clique em "Add new site" → "Import an existing project"
4. Conecte sua conta do GitHub e selecione o repositório `seguro`
5. Configure as variáveis de ambiente:
   - Vá em "Site settings" → "Environment variables"
   - Adicione: `VITE_GEMINI_API_KEY` com sua chave de API
6. O deploy será automático!

### Build Settings (já configurado no netlify.toml)
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

## 📦 Build de Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🎯 Funcionalidades

- **Onboarding:** Coleta de informações da empresa
- **Questionário:** 10 perguntas sobre os 5 pilares GRC
- **Dashboard Interativo:**
  - Score GRC total
  - Análise executiva gerada por IA
  - Gráficos de radar e comparação
  - Mapa de calor de vulnerabilidades
  - Roadmap de ações prioritárias
  - Recomendações comerciais

## 📊 Pilares Avaliados

1. **Governança** - Estrutura de órgãos colegiados
2. **Risco** - Gestão de riscos estratégicos
3. **Conformidade** - Adequação SUSEP/CNSP
4. **Gestão de Dados** - Proteção e LGPD
5. **Controles & Mitigação** - Controles internos

## 🔄 Atualizações Recentes

### v1.1 - Correção de Análise de IA (Fevereiro 2026)

✅ **Problema Resolvido:** Análise de IA travada após responder questionário

**Correções implementadas:**
- Substituído pacote `@google/genai` por `@google/generative-ai` (oficial)
- Corrigida sintaxe da API do Google Gemini
- Adicionado timeout de 30 segundos para evitar travamentos
- Melhorado tratamento de erros com mensagens específicas
- Adicionado indicador visual de loading durante análise

**Documentação adicional:**
- 📖 [CORREÇÃO_ANALISE_IA.md](./CORREÇÃO_ANALISE_IA.md) - Detalhes técnicos da correção
- 🚀 [GUIA_DEPLOY_NETLIFY.md](./GUIA_DEPLOY_NETLIFY.md) - Guia completo de deploy

## 🐛 Troubleshooting

### Análise de IA não funciona

1. Verifique se `VITE_GEMINI_API_KEY` está configurada
2. Confirme que a chave da API é válida no [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Verifique o console do navegador (F12) para erros
4. Consulte [CORREÇÃO_ANALISE_IA.md](./CORREÇÃO_ANALISE_IA.md) para mais detalhes

### Build falha

1. Certifique-se de ter Node.js 18+
2. Delete `node_modules` e `package-lock.json`, depois rode `npm install`
3. Limpe o cache: `npm cache clean --force`

## 👨‍💻 Desenvolvedor

**PVolker** - versão 1.1

## 📄 Licença

© 2026 GRC Strategy Tool. Em conformidade com LGPD e diretrizes de governança corporativa.
