# n8n — Workflow do Diagnóstico Reforma Tributária

Automação completa de captura de leads: recebe o formulário, envia e-mail
para o admin via Gmail, registra em Google Sheets e notifica via WhatsApp
Cloud API (Meta oficial).

**Stack:** n8n self-hosted · Gmail OAuth2 · Google Sheets API · WhatsApp Cloud API.

---

## Fluxo do workflow

```
[Site] ──fetch POST──▶ [Webhook n8n]
                            │
                            ▼
                  [Validar + Sanitizar]
                            │
                            ▼
                    [Bot ou inválido?]
                       ┌────┴────┐
              SIM ◀────┘         └────▶ NÃO
               │                          │
               ▼                          ▼
        [Respond 422 ou           [Gmail → Sheets → WhatsApp]
         honeypot fake]                   │
                                          ▼
                                  [Respond sucesso + wa_client_url]
```

---

## Setup passo a passo

### 1. Importar o workflow no n8n

1. No n8n, vá em **Workflows → Import from File**
2. Selecione `workflow.json`
3. O workflow aparece com 8 nodes. **Não ative ainda** — falta configurar credenciais.

### 2. Configurar Gmail OAuth2

1. No n8n, vá em **Credentials → New → Gmail OAuth2 API**
2. Siga o fluxo OAuth do Google:
   - **Client ID / Secret:** crie em https://console.cloud.google.com → API & Services → OAuth Consent
   - **Authorized redirect URI:** copie o que o n8n mostra (algo como `https://n8n.seudominio.com/rest/oauth2-credential/callback`)
3. Faça o "Sign in with Google" usando a conta `srgestaotributaria@gmail.com` (ou conta que TEM acesso de envio em nome dela)
4. Volte ao workflow, abra o node **Gmail — Enviar E-mail Admin** e selecione a credencial criada

### 3. Configurar Google Sheets

1. **Crie a planilha**: https://docs.google.com/spreadsheets → "Leads Diagnóstico S&R"
2. Na primeira linha (header), cole as 15 colunas:
   ```
   Timestamp | Nome | WhatsApp | E-mail | Empresa | Cidade/UF | Tempo empresa | Atividade | Faturamento | Perfil cliente | Dúvida | Prazo | LGPD | Origem | IP
   ```
3. **Renomeie a aba** para `Leads` (importante — o workflow procura por esse nome)
4. **Copie o ID da planilha** da URL (entre `/d/` e `/edit`)
5. No n8n: **Credentials → New → Google Sheets OAuth2 API**
   - Use o mesmo Client ID / Secret do Gmail (ou crie outro projeto Google)
   - Autorize a mesma conta do passo 2
6. Abra o node **Sheets — Registrar Lead** no workflow:
   - **Document ID:** cole o ID da planilha
   - **Sheet Name:** `Leads`
   - **Credentials:** selecione a recém-criada

### 4. Configurar WhatsApp Cloud API (Meta)

#### 4.1. Criar template

Antes de tudo, **aprove o template** que o workflow vai usar:

1. Acesse https://business.facebook.com/wa/manage/message-templates/
2. Crie novo template com **nome exato:** `novo_lead_diagnostico`
3. Cole o texto de `template-whatsapp.txt` (arquivo nesta pasta) nos campos correspondentes
4. Submeta para aprovação (1 min a 24h)

#### 4.2. Obter credenciais

Após aprovado, no Meta for Developers (https://developers.facebook.com/apps):
- **Phone Number ID:** WhatsApp Business → API Setup → Phone numbers → copy ID
- **Access Token:** WhatsApp Business → API Setup → Permanent token (System User)
- **Número de destino:** `554184114279` (já configurado no workflow)

#### 4.3. Plugar no workflow

1. No n8n: **Credentials → New → Header Auth**
   - Name: `Meta Cloud API — Bearer Token`
   - Header Name: `Authorization`
   - Header Value: `Bearer SEU_ACCESS_TOKEN_AQUI`
2. Abra o node **WhatsApp Cloud API — Notificar Admin** no workflow:
   - Troque `REPLACE_PHONE_NUMBER_ID` na URL pelo seu Phone Number ID
   - Em **Authentication:** Generic Credential → selecione a credencial criada

### 5. Configurar CORS no webhook

O node **Webhook (POST /diagnostico)** já tem `allowedOrigins` configurado para:
- `https://srgestaotributaria.com`
- `https://www.srgestaotributaria.com`
- `http://127.0.0.1:8080` (dev local — REMOVER em produção)

Se quiser permitir outros domínios, edite o campo **Options → Allowed Origins** do webhook.

### 6. Ativar o workflow

1. Clique em **Save** (canto superior direito)
2. Clique no **toggle Active** ao lado do título
3. Copie a **Production URL** do webhook (algo como `https://n8n.seudominio.com/webhook/diagnostico-reforma-tributaria`)

### 7. Plugar a URL no site

Edite `sr-consultoria/diagnostico-reforma-tributaria.html`, busque por:

```js
const ENDPOINT = "";
```

e troque por:

```js
const ENDPOINT = "https://n8n.seudominio.com/webhook/diagnostico-reforma-tributaria";
```

Faça o deploy. **Pronto.**

---

## Como testar

1. Acesse o formulário em produção (ou local com a URL do webhook permitida no CORS)
2. Preencha tudo e envie
3. **Confira nos 4 lugares**:
   - 📧 **E-mail** em `srgestaotributaria@gmail.com` (chega em segundos)
   - 📊 **Google Sheets** → nova linha na aba `Leads`
   - 📱 **WhatsApp** no `+55 41 8411-4279` (chega em segundos)
   - 🌐 **Site** mostra o card de agradecimento e abre `wa.me` do admin em nova aba
4. No n8n → **Executions** → veja o histórico completo da execução, com possibilidade de **re-rodar** em caso de falha

---

## Monitoramento e troubleshooting

### Histórico de execuções
**n8n → Executions** mostra tudo: payloads recebidos, output de cada node, erros. Você pode "Replay" qualquer execução com 1 clique.

### Erros comuns

**Webhook retorna `CORS error` no navegador:**
- Adicione o domínio em `Allowed Origins` do webhook
- Verifique se o header `Access-Control-Allow-Origin` está saindo no Respond node

**E-mail não chega:**
- Verifique se a credencial OAuth Gmail está válida (Google às vezes revoga após 90 dias inativo)
- Olhe a aba `Spam` do Gmail (raro, mas pode acontecer)
- Confira no n8n se o node Gmail executou com sucesso

**WhatsApp não chega:**
- Template ainda em aprovação ou rejeitado → verifique no Meta Business
- Phone Number ID errado na URL → confira no Meta API Setup
- Token expirado → gere um permanente (System User) no Meta Business

**Google Sheets falha:**
- Aba `Leads` não existe ou está com nome diferente → renomeie
- Sheet ID errado → re-copie da URL da planilha

### Reenvio em massa
Se cair internet/cair Gmail e perder leads: o histórico do n8n guarda os payloads. **Executions → filtrar por status "Error" → Retry**.

---

## Custos

| Item | Custo mensal |
|---|---|
| Servidor n8n self-hosted | R$ 0 (você já tem) |
| Gmail OAuth | R$ 0 |
| Google Sheets | R$ 0 |
| WhatsApp Cloud API | R$ 0 até 1.000 conversas/mês · ~R$ 0,03 cada acima disso |
| **TOTAL** | **R$ 0** até picos altos |

---

## Adicionar passos no futuro

Querendo expandir, basta arrastar novos nodes no n8n:

- **Slack/Discord/Telegram:** notificar equipe em paralelo
- **HubSpot/Pipedrive/RD Station:** criar contato no CRM automaticamente
- **Notion:** registrar em base de conhecimento
- **OpenAI:** gerar pré-diagnóstico automático com base nas respostas
- **Cron:** enviar follow-up automático 24h depois se o lead não respondeu

Tudo plugando após o node de Validação, antes do Respond.
