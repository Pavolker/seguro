# Guia de Deploy no Netlify

## Passo a Passo para Deploy

### 1. Preparar o Projeto

Certifique-se de que todas as dependências estão instaladas:
```bash
npm install
```

### 2. Testar Localmente

Antes de fazer deploy, teste localmente:
```bash
npm run dev
```

Acesse `http://localhost:5173` e teste todo o fluxo:
1. Preencha o formulário de onboarding
2. Responda todas as perguntas
3. Verifique se a análise de IA é gerada corretamente

### 3. Build de Produção

Gere o build de produção:
```bash
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados.

### 4. Configurar Variáveis de Ambiente no Netlify

**IMPORTANTE**: No painel do Netlify, vá em:
1. Site settings → Environment variables
2. Adicione a variável:
   - **Key**: `VITE_GEMINI_API_KEY`
   - **Value**: Sua chave da API do Google Gemini (ex: AIzaSy...)

⚠️ **Atenção**: Variáveis que começam com `VITE_` são expostas no frontend. Certifique-se de configurar restrições de API no Google Cloud Console.

### 5. Deploy Automático via Git

Se você conectou o repositório ao Netlify:
1. Faça commit das alterações:
```bash
git add .
git commit -m "Corrigido problema de análise de IA travada"
git push
```

2. O Netlify fará o deploy automaticamente

### 6. Deploy Manual

Se preferir fazer deploy manual:
1. Arraste a pasta `dist/` para o Netlify Drop
2. Ou use o Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Configuração da API do Google Gemini

### Obter a Chave da API

1. Acesse: https://makersuite.google.com/app/apikey
2. Crie um novo projeto ou selecione um existente
3. Clique em "Create API Key"
4. Copie a chave gerada

### Configurar Restrições de Segurança

No Google Cloud Console:
1. Vá em "APIs & Services" → "Credentials"
2. Clique na sua API key
3. Em "Application restrictions":
   - Selecione "HTTP referrers (web sites)"
   - Adicione: `https://seu-site.netlify.app/*`
4. Em "API restrictions":
   - Selecione "Restrict key"
   - Marque apenas "Generative Language API"

## Verificação Pós-Deploy

Após o deploy, teste:

1. ✅ Página carrega corretamente
2. ✅ Formulário de onboarding funciona
3. ✅ Questionário salva respostas
4. ✅ Dashboard é exibido com os scores
5. ✅ **Análise de IA é gerada em até 30 segundos**
6. ✅ Gráficos são renderizados

## Troubleshooting

### Análise de IA não funciona

1. Verifique o console do navegador (F12)
2. Procure por erros relacionados a:
   - `API_KEY_INVALID`
   - `CORS`
   - `Network error`

3. Soluções:
   - Confirme que `VITE_GEMINI_API_KEY` está configurada no Netlify
   - Verifique se a chave da API é válida
   - Confirme que a API do Gemini está habilitada no Google Cloud

### Build falha no Netlify

1. Verifique a versão do Node.js (deve ser 18+)
2. Limpe o cache do Netlify:
   - Site settings → Build & deploy → Clear cache and retry deploy

### Variáveis de ambiente não funcionam

1. Certifique-se de que a variável começa com `VITE_`
2. Após adicionar variáveis, faça um novo deploy
3. Variáveis de ambiente só são aplicadas durante o build

## Monitoramento

### Logs do Netlify

Acesse os logs de deploy em:
- Deploys → [seu deploy] → Deploy log

### Logs do Navegador

Para debug em produção:
1. Abra o console (F12)
2. Vá para a aba "Console"
3. Procure por mensagens de erro

### Analytics (Opcional)

Considere adicionar:
- Google Analytics
- Sentry para monitoramento de erros
- LogRocket para session replay

## Custos da API

A API do Google Gemini tem:
- **Tier gratuito**: 60 requisições por minuto
- **Custo**: Após o tier gratuito, consulte a tabela de preços

Para monitorar uso:
1. Google Cloud Console → APIs & Services → Dashboard
2. Selecione "Generative Language API"
3. Veja métricas de uso

## Próximos Passos

1. Configure um domínio customizado no Netlify
2. Adicione SSL (automático no Netlify)
3. Configure redirects se necessário
4. Implemente cache de análises para reduzir custos da API
5. Adicione rate limiting no frontend
