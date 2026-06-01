# S&R Consultoria e Gestão Tributária — Website

> Site institucional de consultoria tributária e Direito Penal Empresarial em Curitiba — PR.
> Stack vanilla moderna, otimizado para HostGator compartilhado e backend serverless via n8n.

[![License](https://img.shields.io/badge/License-Hybrid%20MIT%20%2B%20Proprietary-blue.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%C2%B7%20CSS3%20%C2%B7%20JS%20Vanilla-0B2047.svg)](#stack)
[![Hosting](https://img.shields.io/badge/Hosting-HostGator%20Compartilhado-DBBD85.svg)](#deploy)
[![Backend](https://img.shields.io/badge/Backend-n8n%20Self--Hosted-EA4B71.svg)](#backend-n8n)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-success.svg)](#acessibilidade)

---

## 📑 Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Características](#características)
- [Stack](#stack)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Quick start (desenvolvimento)](#quick-start-desenvolvimento)
- [Deploy no HostGator](#deploy-no-hostgator)
- [Backend (n8n)](#backend-n8n)
- [Documentação detalhada](#documentação-detalhada)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licença)
- [Créditos](#créditos)

---

## Sobre o projeto

Website institucional completo da **S&R Consultoria e Gestão Tributária**, escritório
sediado em Curitiba — PR com atuação em todo o território brasileiro nas áreas de:

- **Direito Tributário** — transação com a PGFN, RenegociaPR, defesa fiscal, revisão de tributos
- **Direito Penal Empresarial** — crimes econômicos, lavagem de dinheiro, sonegação, compliance

O site cumpre três funções:

1. **Captação** — apresentar serviços, equipe e metodologia para gerar leads via formulário e WhatsApp
2. **Autoridade institucional** — Schema.org `LegalService` para rich snippets do Google, integração com Instagram do escritório
3. **Conformidade legal** — Política de Privacidade (LGPD) e Termos de Uso em ABNT

---

## Características

### 🎨 Design

- **Identidade institucional:** navy `#0B2047` + dourado `#DBBD85`
- **Tipografia editorial:** Forum (serif) + DM Sans (sans-serif)
- **Mobile-first verdadeiro** com `clamp()` e breakpoints `min-width`
- **Sem framework CSS** — folha única de 42 KB

### ⚡ Performance

- 314 KB descompactados, 95 KB no ZIP de deploy
- Zero JavaScript framework (vanilla ES2020+ em 6 KB)
- Gzip + Brotli ativados via `.htaccess`
- Cache 1 ano em imagens, 1 mês em CSS/JS, 5 min em HTML
- Imagens com `loading="lazy"` e `fetchpriority="high"` no LCP

### 🔍 SEO técnico

- Schema.org **LegalService** em todas as 7 LPs de serviço
- Schema **BreadcrumbList** em todas as páginas internas
- `sitemap.xml` com 14 URLs hierarquizadas + `robots.txt`
- Open Graph + Twitter Card em todas as páginas
- Canonical URLs, meta descriptions únicas e otimizadas
- Palavras-chave ancoradas em **"Curitiba — PR"**

### ♿ Acessibilidade WCAG 2.1 AA

- Contraste mínimo 4.5:1 (testado: navy/branco = 14.5:1)
- Touch targets ≥48px (WCAG AAA)
- ARIA labels, `aria-expanded`, `aria-live`, `aria-current`
- `:focus-visible` dourado em todos interativos
- `prefers-reduced-motion` respeitado
- Semântica HTML5 estrita (`<main>`, `<nav>`, `<article>`, `<aside>`, `<address>`)

### 🛡️ Segurança

- HTTPS forçado + HSTS 1 ano
- Content-Security-Policy completa
- X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
- Validação no servidor via n8n (honeypot + sanitização)
- LGPD compliant com Política completa

### 📱 Recursos extras

- **PWA-ready** com `manifest.webmanifest`
- **WhatsApp Float** em todas as páginas (mensagem pré-preenchida)
- **404 customizado** com navegação institucional
- **Página de erro** que respeita identidade visual
- **Embed Instagram** com 8 posts indexados (@schellworth.rodrigues)
- **Formulário multi-step** com progress bar dinâmico, máscara e validação

---

## Stack

### Frontend

| Tecnologia | Versão | Função |
|---|---|---|
| HTML5 | semântico estrito | Estrutura e SEO |
| CSS3 Vanilla | `clamp()`, custom properties, `:focus-visible` | Estilo, layout fluido |
| Google Fonts | Forum + DM Sans 300–700 | Tipografia institucional |
| JavaScript | Vanilla ES2020+ | Comportamento (accordion, FAQ, tabs, form) |
| SVG inline | — | Ícones (sem dependência de sprite) |

**Sem dependências externas em produção** além de Google Fonts e Instagram embed.

### Backend (serverless via n8n)

| Tecnologia | Função |
|---|---|
| n8n self-hosted | Orquestração do formulário |
| Gmail OAuth2 | Envio de e-mail para o admin |
| Google Sheets API | Backup persistente dos leads |
| WhatsApp Cloud API (Meta) | Notificação proativa via template aprovado |

### Hospedagem

- **HostGator compartilhado** (Apache + PHP 8.1+)
- **Sem PHP necessário** no front (backend está no n8n)
- **SSL Let's Encrypt** automático via cPanel

---

## Estrutura do repositório

```
sr-consultoria-site/
├── README.md                          ← Este arquivo
├── LICENSE                            ← Híbrida (MIT código + ARR conteúdo)
├── CHANGELOG.md                       ← Histórico de versões
├── CONTRIBUTING.md                    ← Como contribuir
├── .gitignore
│
├── dist/                              ⬅ Build pronto para HostGator
│   ├── .htaccess                      ← HTTPS, gzip, cache, CSP, 404
│   ├── index.html                     ← Home (47 KB)
│   ├── 404.html
│   ├── 7 servico-*.html               ← LPs de cada área
│   ├── diagnostico-reforma-tributaria.html  ← Formulário multi-step
│   ├── servicos.html · contato.html · programa-de-parceria.html
│   ├── politica-de-privacidade.html · termos-de-uso.html
│   ├── robots.txt · sitemap.xml
│   ├── manifest.webmanifest · favicon.svg
│   ├── css/style.css                  ← Folha única 42 KB
│   ├── js/main.js                     ← Vanilla 6 KB
│   ├── assets/logo.svg
│   ├── assets/img/placeholder.svg     ← Fallback para fotos da equipe
│   └── LEIAME-DEPLOY.txt              ← Instruções pro cPanel
│
└── sr-consultoria/                    ⬅ Source de desenvolvimento
    ├── DOCUMENTACAO.md                ← Documentação técnica profunda
    ├── (mesmas páginas e assets de dist/)
    └── n8n/
        ├── workflow.json              ← Workflow n8n pronto para importar
        ├── template-whatsapp.txt      ← Template Meta Business
        └── README.md                  ← Setup do backend
```

---

## Quick start (desenvolvimento)

### Pré-requisitos

- Python 3 (apenas para servidor HTTP local) **OU** qualquer servidor estático
- Navegador moderno (Chrome 120+, Firefox 120+, Safari 17+)

### Subir servidor local persistente

```bash
# A partir da raiz do repositório
cd dist
python -m http.server 8080 --bind 127.0.0.1
```

Abra: **http://127.0.0.1:8080/**

> ℹ️ O servidor Python serve `dist/` (build de produção) — exatamente o que vai para o HostGator. Para editar e ver mudanças, edite em `sr-consultoria/` e rebuild para `dist/` (ou edite direto em `dist/` durante desenvolvimento iterativo).

### Validar todas as rotas

```bash
for url in / /servicos.html /servico-crimes-economicos.html /diagnostico-reforma-tributaria.html /contato.html /404.html; do
  curl -s -o /dev/null -w "%{http_code} %-50s\n" "http://127.0.0.1:8080${url}" $url
done
```

---

## Deploy no HostGator

### Resumo (10 minutos)

1. **Backup** do `public_html/` atual via cPanel (precaução)
2. **Limpar** o conteúdo atual de `public_html/`
3. **Upload** do ZIP de release: [Releases → v1.0.0](../../releases/latest)
4. **Extrair** o ZIP via "Extract" do File Manager
5. **SSL** Let's Encrypt via cPanel → SSL/TLS Status → Run AutoSSL
6. **Validar** abrindo `https://srgestaotributaria.com/`

### Detalhado

Consulte `dist/LEIAME-DEPLOY.txt` para o passo a passo completo, incluindo:

- Permissões `644/755`
- Verificações pós-deploy (sitemap, 404, redirect HTTPS)
- Upload das fotos da equipe (`assets/img/edilton.jpg` e `emilly.jpg`)
- Configuração da URL do webhook n8n no formulário
- Cadastro no Google Search Console e Business Profile

---

## Backend (n8n)

O formulário **Diagnóstico Reforma Tributária** é processado por um workflow n8n
que entrega o lead em **três canais paralelos**:

```
[Site (browser)] → fetch POST → [n8n Webhook]
                                     ↓
                        ┌────────────┼────────────────┐
                        ↓            ↓                ↓
                  [Gmail OAuth] [Sheets API] [WhatsApp Cloud API]
                  (admin email)  (backup)      (notificação)
                        └────────────┴────────────────┘
                                     ↓
                              [Respond JSON]
                                     ↓
                      Frontend abre wa.me em nova aba
```

Setup completo em [`sr-consultoria/n8n/README.md`](sr-consultoria/n8n/README.md).

### Custos do backend

| Componente | Custo mensal |
|---|---|
| n8n self-hosted | R$ 0 (servidor próprio) |
| Gmail OAuth | R$ 0 |
| Google Sheets API | R$ 0 |
| WhatsApp Cloud API (Meta) | R$ 0 até 1.000 conversas/mês |
| **Total** | **R$ 0** |

---

## Documentação detalhada

| Documento | O que cobre |
|---|---|
| [`sr-consultoria/DOCUMENTACAO.md`](sr-consultoria/DOCUMENTACAO.md) | Arquitetura, design system, SEO, performance, acessibilidade, manutenção, deploy, evolução |
| [`sr-consultoria/n8n/README.md`](sr-consultoria/n8n/README.md) | Setup completo do backend n8n + Meta Cloud API + Gmail OAuth + Sheets |
| [`sr-consultoria/n8n/template-whatsapp.txt`](sr-consultoria/n8n/template-whatsapp.txt) | Template WhatsApp para aprovação no Meta Business |
| [`dist/LEIAME-DEPLOY.txt`](dist/LEIAME-DEPLOY.txt) | Passo a passo de deploy no cPanel HostGator |
| [`CHANGELOG.md`](CHANGELOG.md) | Histórico de versões e mudanças |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Como contribuir com correções e melhorias |

---

## Roadmap

### ✅ v1.0.0 — Lançamento (atual)
- 14 páginas indexáveis
- Schema.org LegalService completo
- Formulário multi-step com n8n
- Acessibilidade WCAG AA
- PWA-ready

### 🔄 v1.1.0 — Próximas 4 semanas
- Fotos profissionais da equipe (substituir placeholder.svg)
- Workflow n8n ativado em produção
- Google Search Console + Business Profile cadastrados
- Open Graph images específicas por LP (1200×630)

### 📋 v1.2.0 — Próximos 60 dias
- Blog técnico com 5–8 artigos (transação tributária, CAPAG, NJP)
- FAQPage schema na home
- 3–5 backlinks de qualidade
- Service Worker para offline

### 🚀 v2.0.0 — Próximos 6 meses
- Área de "Casos de sucesso" anonimizados
- Vídeos curtos por LP
- Newsletter (lead magnet)
- Painel CRM integrado

---

## Contribuindo

Pull requests são bem-vindos para correções, melhorias de acessibilidade,
performance e SEO. Para mudanças grandes, abra um issue primeiro para
discutir o que você gostaria de mudar.

Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md) para diretrizes.

---

## Licença

Este projeto usa **licença híbrida**:

- **Código** (HTML, CSS, JS, configs) — [MIT License](LICENSE)
- **Conteúdo** (textos, marca, identidade visual) — Todos os direitos reservados à S&R Consultoria

Veja [`LICENSE`](LICENSE) para o texto completo.

---

## Créditos

- **Cliente:** [S&R Consultoria e Gestão Tributária](https://srgestaotributaria.com/) — Curitiba/PR
- **Desenvolvimento:** [FAT Tech](https://fattech.com.br)
- **Stack:** Vanilla HTML/CSS/JS · n8n · WhatsApp Cloud API · Gmail OAuth2 · Google Sheets

---

<p align="center">
  <a href="https://srgestaotributaria.com">srgestaotributaria.com</a> ·
  <a href="https://wa.me/5541984486931">WhatsApp (41) 9 8448-6931</a> ·
  <a href="mailto:contato@srgestaotributaria.com">contato@srgestaotributaria.com</a>
</p>
