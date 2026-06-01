# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2026-06-01

### 🚀 Lançamento inicial

Versão consolidada do site institucional após múltiplas iterações de design
e arquitetura. Pronta para deploy em HostGator compartilhado.

### Adicionado

#### Frontend
- 14 páginas HTML semânticas em PT-BR estrito (ABNT)
- Home institucional com 7 seções (hero, serviços, como funciona, equipe, parcerias, FAQ, Instagram)
- 7 LPs de serviço com Schema.org `LegalService` específico:
  - Direito Criminal Empresarial (LP completa com 12 frentes + 10 áreas)
  - RenegociaPR
  - Transação com a PGFN
  - Negócio Jurídico Processual
  - Revisão de Tributos
  - Restituição e Compensação
  - Defesa em Execuções Fiscais
- Página de Diagnóstico Reforma Tributária com formulário multi-step
- Página de Contato com formulário completo
- Programa de Parceria (B2B)
- Política de Privacidade (LGPD em 10 seções ABNT)
- Termos de Uso (10 seções ABNT)
- Página 404 customizada com navegação institucional

#### Design
- Sistema de design com tokens em `:root` (paleta navy/dourado)
- Tipografia editorial Forum + DM Sans
- Mobile-first com `clamp()` e breakpoints `min-width`
- Touch targets ≥48px (WCAG AAA)
- Acessibilidade WCAG 2.1 AA confirmada

#### SEO técnico
- Schema.org `LegalService` em todas as LPs
- Schema `BreadcrumbList` em páginas internas
- Schema `Organization` + `WebSite` na home
- `sitemap.xml` com 14 URLs e priority hierárquica
- `robots.txt` com diretivas e referência ao sitemap
- Open Graph + Twitter Card em todas as páginas
- Canonical URLs únicas
- Meta descriptions otimizadas com palavra-chave + "Curitiba — PR"

#### Backend (n8n)
- Workflow JSON pronto para importar
- Integração Gmail OAuth2 (e-mail para admin)
- Integração Google Sheets API (backup persistente)
- Integração WhatsApp Cloud API (notificação proativa via template)
- Template `novo_lead_diagnostico` para aprovação no Meta Business
- Honeypot anti-spam
- Validação e sanitização em JavaScript
- Rate limiting por IP

#### Infraestrutura
- `.htaccess` com HTTPS forçado, HSTS, gzip, brotli, cache granular
- Content-Security-Policy completa
- Headers de segurança (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- MIME types para webp, avif, woff2, webmanifest
- 404 customizado com fallback de imagens
- `manifest.webmanifest` para PWA install
- `favicon.svg` em SVG (escala perfeita)

#### Componentes especiais
- Hero da home com background image + overlay + divider dourado
- WhatsApp Float em todas as páginas (56×56 px, mensagem pré-preenchida)
- Sticky progress bar no formulário Diagnóstico
- Microcopy dinâmico de progresso ("Vamos lá!" → "Quase lá!" → "Pronto!")
- Card de agradecimento animado com checkmark dourado
- Embed Instagram com 8 publicações (@schellworth.rodrigues)
- Tabs da equipe com bio e foto
- Accordion exclusivo para "Como funciona" (1 aberto por vez)
- FAQ com 8 perguntas tributárias reais
- Fallback `onerror` nas imagens de equipe (placeholder SVG elegante)

#### Documentação
- `README.md` completo com badges, sumário e quick start
- `DOCUMENTACAO.md` técnica em 13 capítulos
- `LEIAME-DEPLOY.txt` com instruções para cPanel HostGator
- `CONTRIBUTING.md` com diretrizes de contribuição
- `LICENSE` híbrida (MIT código + ARR conteúdo)
- Setup completo do n8n em `sr-consultoria/n8n/README.md`

#### Build & Deploy
- ZIP de release `sr-consultoria-deploy.zip` (95 KB compactado)
- 24 arquivos prontos para extrair em `public_html/`
- SHA-256 documentado para validação de integridade

### Decisões arquiteturais

- **Vanilla First** — zero framework no front (HTML/CSS/JS apenas)
- **Backend serverless** — n8n self-hosted em vez de PHP no HostGator
- **WhatsApp Cloud API (Meta)** — oficial em vez de gateways de terceiros
- **Gmail OAuth2** — inbox garantido em vez de SMTP/mail() do PHP
- **Google Sheets como backup** — auditoria visual sem necessidade de banco

### Iterações descartadas

Antes de chegar à identidade visual final (navy + dourado + Forum + DM Sans),
foram experimentadas e revertidas duas variações de design:

- **BMW M (motorsport-engineering)** — canvas preto, UPPERCASE, faixa tricolor.
  Rejeitada por tom agressivo demais para o público jurídico.
- **ElevenLabs (editorial magazine)** — off-white, EB Garamond Light, orbs pastéis.
  Rejeitada por tom etéreo demais para Direito Tributário.

A identidade final projeta autoridade institucional consistente com
escritórios de advocacia de alto padrão.

### Pendências do cliente (não bloqueiam deploy)

- [ ] Upload das fotos profissionais da equipe (`assets/img/edilton.jpg` e `emilly.jpg`)
- [ ] Aprovação do template WhatsApp no Meta Business Manager
- [ ] Configuração das credenciais n8n (Gmail OAuth2 + Sheets + Meta Bearer)
- [ ] Substituição do `const ENDPOINT = ""` pela URL do webhook em produção
- [ ] Cadastro no Google Search Console e Business Profile

---

## [Não publicado]

Próximas mudanças planejadas — consulte o [Roadmap no README](README.md#roadmap).
