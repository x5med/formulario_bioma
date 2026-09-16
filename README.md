# Ebook Equipe e Consistência

Landing page da EscalaMed para disponibilizar o ebook **Equipe e Consistência**. Após informar nome, e-mail e WhatsApp, a pessoa recebe o download imediatamente; o cadastro é enviado em segundo plano ao funil interno **Bioma 2** no Metrics.

## Rodar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configure `METRICS_API_KEY` em `.env.local` com a mesma chave `ENDOMAX_API_KEY` usada pelo Metrics. Ela fica somente no servidor. Configure a mesma variável no projeto da Vercel. A integração busca o funil pelo nome exato `Bioma 2` e usa a API existente do Metrics. `METRICS_BIOMA_FUNNEL_ID` é opcional.

## Arquivo do ebook

O ebook final está em `public/ebook-equipe-e-consistencia.pdf`, com as dez imagens originais na ordem de `ebook1.png` a `ebook10.png`, uma por página. O botão de download aponta diretamente para esse arquivo estático, servido pela Vercel. A capa exibida na página é `public/ebook-capa.png`.

## Comportamento

- O formulário valida os três campos, mostra a próxima etapa imediatamente e envia os dados em segundo plano por `/api/leads`.
- A chave do Metrics nunca vai ao navegador.
- Uma falha de integração mostra a opção **Tentar novamente** sem bloquear o acesso ao material.
- O cadastro não concede consentimento de marketing pelo WhatsApp automaticamente.
- O envio depende de rede ativa. Se a pessoa fechar a página antes da conclusão da requisição, o cadastro pode não ser registrado.

## Verificação

```bash
npm run typecheck
npm run lint
npm run build
```
