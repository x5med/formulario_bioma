# Formulário do ebook Bioma 2

Landing page da EscalaMed para captar nome, e-mail e WhatsApp. Após o envio, a pessoa avança imediatamente para a tela do material; o cadastro é enviado em segundo plano ao funil **Bioma 2** no Metrics.

## Rodar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configure `METRICS_API_KEY` em `.env.local` com a mesma chave `ENDOMAX_API_KEY` usada pelo Metrics. Ela fica somente no servidor. A integração busca o funil pelo nome exato `Bioma 2` e usa a API existente do Metrics. `METRICS_BIOMA_FUNNEL_ID` é opcional.

## Arquivo do ebook

O botão **Baixar ebook** aponta para `/api/ebook`. Coloque o PDF em `public/ebook-bioma.pdf` ou configure `EBOOK_URL` com uma URL HTTPS do arquivo. A rota entrega o PDF como anexo ou redireciona para a URL configurada. Sem o arquivo ou a URL, responde `503`; o ebook precisa ser adicionado antes de publicar a página para visitantes.

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
