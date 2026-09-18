# Ebook Equipe e Consistência

Landing page da EscalaMed para solicitar o ebook **Equipe e Consistência** pelo WhatsApp. O cadastro é enviado em segundo plano ao funil interno **Bioma 2** no Metrics.

## Rodar localmente

```bash
npm install
copy .env.example .env.local
npm run dev
```

Configure `METRICS_API_KEY` em `.env.local` com a mesma chave `ENDOMAX_API_KEY` usada pelo Metrics. Ela fica somente no servidor. Configure a mesma variável no projeto da Vercel. A integração busca o funil pelo nome exato `Bioma 2` e usa a API existente do Metrics. `METRICS_BIOMA_FUNNEL_ID` é opcional.

## Arquivo do ebook

O ebook final está em `public/ebook-equipe-e-consistencia.pdf`, com as dez imagens originais na ordem de `ebook1.png` a `ebook10.png`, uma por página. A LP não oferece mais o botão de download. O disparo automático pelo WhatsApp é configurado no Metrics. A capa exibida na página é `public/ebook-capa.png`.

## Comportamento

- O formulário valida os três campos. O checkbox de marketing é opcional e começa desmarcado; a confirmação aparece imediatamente enquanto `/api/leads` registra o pedido em segundo plano.
- A decisão, a URL da página e um ID estável por submissão são enviados ao Metrics. Um reenvio usa o mesmo ID para não reautorizar um contato depois de um opt-out posterior.
- O pedido de entrega do ebook é enviado em campo separado; o checkbox opcional trata apenas das comunicações de marketing.
- No Metrics, o lead guarda a decisão e sua evidência. `crm_contacts` é sincronizada pelo telefone canônico. Marcado concede `whatsapp_marketing`; desmarcado cria contato novo como `unknown` e preserva consentimentos anteriores. O disparo do template do ebook é configurado no Metrics em paralelo.
- A chave do Metrics nunca vai ao navegador.
- A tela diferencia registro, envio em processamento, envio iniciado, bloqueio e falha conforme a resposta do Metrics. Falhas permitem **Tentar novamente** com o mesmo ID de submissão.
- O envio depende de rede ativa. Se a pessoa fechar a página antes da conclusão da requisição, o cadastro pode não ser registrado.

## Verificação

```bash
npm run typecheck
npm run lint
npm run build
```
