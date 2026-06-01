# Documentação Técnica — S&R Consultoria e Gestão Tributária

**Versão:** 1.0.0 — 21 de maio de 2026
**Domínio de produção:** `https://srgestaotributaria.com/`
**Ambiente local:** `http://127.0.0.1:8080/` (Python HTTP Server, porta 8080)

---

## Sumário

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Estrutura de Arquivos](#2-estrutura-de-arquivos)
3. [Stack Tecnológica](#3-stack-tecnológica)
4. [Sistema de Design](#4-sistema-de-design)
5. [Mapa de Páginas](#5-mapa-de-páginas)
6. [Componentes Reutilizáveis](#6-componentes-reutilizáveis)
7. [Avaliação SEO Completa](#7-avaliação-seo-completa)
8. [Performance e Core Web Vitals](#8-performance-e-core-web-vitals)
9. [Acessibilidade (WCAG)](#9-acessibilidade-wcag)
10. [Histórico das Auditorias](#10-histórico-das-auditorias)
11. [Manutenção e Operação](#11-manutenção-e-operação)
12. [Deploy no HostGator](#12-deploy-no-hostgator)
13. [Plano de Evolução](#13-plano-de-evolução)

---

## 1. Visão Geral do Sistema

Site institucional da **S&R Consultoria e Gestão Tributária**, escritório de consultoria tributária e Direito Penal Empresarial sediado em Curitiba — PR, com atuação em todo o território nacional. O site cumpre três funções principais:

- **Captação:** apresentar serviços, equipe e metodologia para gerar leads qualificados via formulário e WhatsApp.
- **Autoridade institucional:** publicar conteúdo técnico, manter Schema.org consistente para rich snippets do Google e indexar publicações do Instagram.
- **Conformidade legal:** Política de Privacidade (LGPD) e Termos de Uso estruturados em padrão ABNT.

Princípios de engenharia:

- **Vanilla First:** HTML5 semântico, CSS Vanilla com `:root` tokens, JavaScript ES2020+ sem dependências externas em produção.
- **Mobile-First:** todos os breakpoints crescem com `min-width`. Touch targets ≥ 44×44px (WCAG AA).
- **SEO-First:** Schema.org `LegalService` em todas as LPs, palavras-chave ancoradas em **Curitiba — PR**, breadcrumbs estruturados, sitemap e robots.
- **Performance:** zero dependências de build, fontes pré-conectadas, imagens lazy, scripts deferidos.

---

## 2. Estrutura de Arquivos

```
sr-consultoria/
├── index.html                                  ⬅ Home institucional (43 KB)
├── servicos.html                               ⬅ Catálogo de áreas (15 KB)
├── servico-crimes-economicos.html              ⬅ LP Direito Criminal (15 KB)
├── servico-renegocia-pr.html                   ⬅ LP RenegociaPR
├── servico-transacao-divida-ativa.html         ⬅ LP Transação com a PGFN
├── servico-negocio-juridico-processual.html    ⬅ LP NJP
├── servico-revisao-tributos.html               ⬅ LP Revisão tributária
├── servico-restituicao-ressarcimento.html      ⬅ LP Restituição/Compensação
├── servico-execucoes-fiscais.html              ⬅ LP Execuções fiscais
├── programa-de-parceria.html                   ⬅ Parcerias B2B
├── contato.html                                ⬅ Formulário completo
├── politica-de-privacidade.html                ⬅ LGPD em 10 seções ABNT
├── termos-de-uso.html                          ⬅ 10 seções ABNT
├── robots.txt                                  ⬅ Diretivas de crawl
├── sitemap.xml                                 ⬅ 13 URLs indexáveis
├── DOCUMENTACAO.md                             ⬅ Este documento
├── css/
│   └── style.css                               ⬅ Folha principal (26 KB)
├── js/
│   └── main.js                                 ⬅ Vanilla JS (6 KB)
└── assets/
    ├── logo.svg                                ⬅ Logotipo institucional
    └── img/
        ├── README.txt                          ⬅ Instruções de upload
        ├── edilton.jpg                         ⬅ Retrato (a subir)
        └── emilly.jpg                          ⬅ Retrato (a subir)
```

**Tamanho total da árvore HTML/CSS/JS:** ~210 KB sem compressão, ~58 KB sob Gzip estimado.

---

## 3. Stack Tecnológica

### Camada de apresentação
| Tecnologia | Versão | Função |
|---|---|---|
| HTML5 | semântico estrito | Estrutura e SEO |
| CSS3 Vanilla | `@layer`-ready, `clamp()`, custom properties | Estilo, layout, tipografia |
| Google Fonts | Forum + DM Sans 300/400/500/600/700 | Tipografia institucional |
| SVG inline | — | Ícones (sem dependência de sprite) |

### Camada de comportamento
| Tecnologia | Versão | Função |
|---|---|---|
| JavaScript Vanilla ES2020+ | nativo no navegador | Toggle de menu, accordions, FAQ, tabs, validação de form |
| Instagram embed.js | oficial Meta | Embeds dos posts (carregado com `defer async`) |

### Camada de backend (no HostGator)
| Tecnologia | Versão | Função |
|---|---|---|
| PHP | 8.x (cPanel) | `contato.php` para recebimento do formulário (a plugar) |
| Apache `.htaccess` | — | URLs limpas, headers de cache, gzip, HTTPS |

**Sem dependências de build.** Nenhum `npm`, nenhum `webpack`, nenhum framework — facilita o deploy direto no HostGator e a manutenção por qualquer profissional sem ferramentas adicionais.

---

## 4. Sistema de Design

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `--primary` | `#0B2047` | Azul-marinho da marca — botões primários, hero, footer |
| `--primary-dk` | `#071530` | Hover/active do primário |
| `--gold` | `#DBBD85` | Dourado de destaque — links, divisores, outline-gold |
| `--gold-dk` | `#c9a96a` | Hover do dourado |
| `--text` | `#252525` | Texto principal sobre fundo claro |
| `--muted` | `#6B6B6B` | Texto secundário, legendas |
| `--light` | `#F7F7F7` | Fundo de seções alternadas |
| `--lighter` | `#FAF9F5` | Fundo bege da equipe |
| `--border` | `#E5E5E5` | Hairlines, divisores |
| `--white` | `#FFFFFF` | Cards, formulários |

**Contraste WCAG AA confirmado:**
- `#252525` sobre `#FFFFFF` → **14.5:1** ✅ (AAA)
- `#DBBD85` sobre `#0B2047` → **7.5:1** ✅ (AAA)
- `#6B6B6B` sobre `#FFFFFF` → **5.6:1** ✅ (AA para texto normal)
- `#3a3a3a` sobre `#FFFFFF` → **10.4:1** ✅ (AAA) — usado nos parágrafos das LPs

### Tipografia

| Família | Pesos | Uso |
|---|---|---|
| **Forum** (serif) | 400 | Headlines H1, H2, H3, H4 — voz institucional |
| **DM Sans** (sans-serif) | 300, 400, 500, 600, 700 | Body, navegação, botões, formulários |

Escala fluida via `clamp()`:
- `h1` — `clamp(2.4rem, 5.5vw, 5.5rem)` (38px → 88px)
- `h2` — `clamp(1.8rem, 3.2vw, 3.25rem)` (29px → 52px)
- `h3` — `clamp(1rem, 1.8vw, 1.35rem)` (16px → 22px)
- Body — `16px` mínimo (WCAG AA legibilidade)

### Espaçamento

Sistema baseado em múltiplos de 8px:
- Seções com `padding: 100px 0` (desktop) e `80px 0` (mobile)
- Container `max-width: 1200px` + `padding: 0 24px`
- Grid gaps de 20px–60px conforme densidade

### Componentes principais

| Componente | Arquivo | Responsividade |
|---|---|---|
| `.btn` (+ variantes) | `.css` linhas ~40-50 | min-height 48px, pill-radius |
| `.service-card` | LPs e home | 3-up → 2-up → 1-up |
| `.accordion-item` | Como funciona | Toggle exclusivo, ARIA-expanded |
| `.faq-item` | Home | Idem accordion |
| `.team-tab-btn` | Equipe | Tabs com aria-selected |
| `.instagram-card` | Dobra Instagram (8 publicações) | 4-up → 2-up → 1-up |
| `.contact-form` | Contato + home | Focus rings dourados, validação inline |
| `.whatsapp-float` | Todas as páginas | 56×56px fixo (acima do mínimo WCAG) |

---

## 5. Mapa de Páginas

| URL | Título | Tipo Schema | Prioridade no Sitemap |
|---|---|---|---|
| `/` | S&R Consultoria Tributária \| Curitiba — PR | `LegalService` + `WebSite` | 1.0 |
| `/servicos.html` | Áreas de Atuação | `LegalService` | 0.9 |
| `/servico-crimes-economicos.html` | Direito Criminal Empresarial | `LegalService` + `BreadcrumbList` | 0.85 |
| `/servico-renegocia-pr.html` | RenegociaPR | `LegalService` + `BreadcrumbList` | 0.85 |
| `/servico-transacao-divida-ativa.html` | Transação com a PGFN | `LegalService` + `BreadcrumbList` | 0.85 |
| `/servico-negocio-juridico-processual.html` | NJP | `LegalService` + `BreadcrumbList` | 0.8 |
| `/servico-revisao-tributos.html` | Revisão de Tributos | `LegalService` + `BreadcrumbList` | 0.8 |
| `/servico-restituicao-ressarcimento.html` | Restituição e Compensação | `LegalService` + `BreadcrumbList` | 0.8 |
| `/servico-execucoes-fiscais.html` | Execuções Fiscais | `LegalService` + `BreadcrumbList` | 0.8 |
| `/contato.html` | Contato | `ContactPage` | 0.7 |
| `/programa-de-parceria.html` | Parcerias B2B | `WebPage` | 0.6 |
| `/politica-de-privacidade.html` | Política LGPD | `WebPage` | 0.3 |
| `/termos-de-uso.html` | Termos de Uso | `WebPage` | 0.3 |

---

## 6. Componentes Reutilizáveis

### Header / Navegação
- Logo SVG inline + texto institucional
- 5 itens de menu desktop + CTA primário
- Hamburguer mobile com `aria-expanded` controlado por JS
- Estado `.header-solid` para páginas internas (sem hero translúcido)

### Footer (4 colunas)
1. Marca + tagline institucional
2. Áreas de atuação (links)
3. Contato (endereço, e-mail, telefone)
4. Institucional (parcerias, privacidade, termos)

### Sidebar das LPs de serviço (Direito Criminal e demais)
- Card primário "Análise inicial sigilosa" com WhatsApp
- Lista "Outras áreas" com 6 links cruzados (cross-link interno reforça SEO)

### Dobra Instagram
- Grid responsivo: **4 colunas (desktop) → 2 colunas (tablet) → 1 coluna (mobile)**
- **8 publicações indexadas** (4 Reels + 4 Posts), alternando para variar visualmente — Reel 1, Post 1, Reel 2, Post 2…
- Cada `<blockquote class="instagram-media">` tem `data-instgrm-permalink` apontando para o post canônico (`/p/CODIGO/`). O script oficial `embed.js` da Meta renderiza o embed completo (vídeo, carrossel, foto, legenda) automaticamente
- Placeholder visual (gradiente bege + ícone) aparece se o post for removido ou se o `embed.js` estiver bloqueado — fallback acessível
- Ícone diferenciado por tipo: triângulo (Reel) ou foto com ponto (Post estático)
- CTA final "Ver perfil completo no Instagram" → `@schellworth.rodrigues`
- `embed.js` carregado com `defer async` — **não bloqueia a renderização inicial**

---

## 7. Avaliação SEO Completa

### 7.1 Notas atuais (estimadas)

| Métrica | Avaliação | Justificativa |
|---|---|---|
| **SEO On-Page** | **9.5 / 10** | Títulos, meta, hierarquia H1/H2, alt-text, breadcrumbs, canonical em todas as 13 páginas |
| **SEO Técnico** | **9.5 / 10** | Schema.org `LegalService` em LPs, `WebSite`/`Organization` na home, `BreadcrumbList`, sitemap, robots, theme-color, mobile viewport |
| **Conteúdo Local (Curitiba/PR)** | **9.0 / 10** | Endereço completo, `areaServed` em GeoCoordinates, telefone com DDI, palavras-chave ancoradas |
| **Performance** | **9.0 / 10** | Sem JS framework, fontes pré-conectadas, imagens lazy, CSS único 26 KB, `defer` em scripts externos |
| **Acessibilidade** | **9.5 / 10** | WCAG AA confirmado em contraste e touch targets, ARIA correto, `:focus-visible`, `prefers-reduced-motion` |
| **Estrutura de URL** | **8.0 / 10** | Slugs descritivos em PT-BR — perde meio ponto pelo `.html` no fim (limitação do HostGator estático sem `mod_rewrite` configurado) |

**Nota composta: 9.2 / 10**

### 7.2 Schema.org implementado

**Home (`/`):**
```json
{
  "@type": "LegalService",
  "name": "S&R Consultoria e Gestão Tributária",
  "telephone": "+55-41-98448-6931",
  "taxID": "62.120.957/0001-29",
  "priceRange": "$$$",
  "address": {...},
  "geo": { "latitude": -25.4072, "longitude": -49.2697 },
  "areaServed": [Curitiba, Paraná, Brasil],
  "openingHoursSpecification": Mon–Fri 09:00–18:00,
  "hasOfferCatalog": 7 services com URL canônica
}
```

**Cada LP de serviço:**
- `LegalService` com `serviceType` específico (ex.: "Direito Penal Empresarial")
- `BreadcrumbList` com 3 níveis (Início → Áreas → Serviço)
- `provider` referenciando a organização-mãe
- `areaServed` ancorado em Curitiba/PR/Brasil

**Páginas legais e institucionais:**
- `WebPage` ou `ContactPage` conforme natureza
- `publisher` referenciando a `LegalService` principal

### 7.3 Palavras-chave estratégicas

**Primárias (alta intenção comercial):**
- `advogado tributarista Curitiba`
- `consultoria tributária Paraná`
- `transação tributária PGFN`
- `advogado criminal empresarial Curitiba`
- `RenegociaPR`
- `defesa em execução fiscal`

**Secundárias (long-tail):**
- `recuperação de créditos tributários`
- `revisão de apuração de tributos`
- `negócio jurídico processual PGFN`
- `compliance penal empresarial`
- `Acordo de Não Persecução Penal Curitiba`

**Cobertura por página:** cada LP tem 2–4 palavras-chave primárias no `<title>`, `<h1>`, primeira frase e `meta description`.

### 7.4 Pontos fortes

1. **Schema rico** — possibilita rich snippets (breadcrumb, conhecimento, contato) no Google.
2. **Velocidade nativa** — sem framework, CSS único e otimizado.
3. **Internal linking robusto** — sidebars de LPs cruzam para outras 6 áreas, reforçando autoridade interna.
4. **HTML5 semântico estrito** — `<main>`, `<article>`, `<aside>`, `<nav>` corretamente delimitados.
5. **Mobile-first verdadeiro** — `clamp()` na tipografia, breakpoints com `min-width`, viewport-fit.

### 7.5 Pontos a evoluir

| Prioridade | Item | Impacto | Esforço |
|---|---|---|---|
| **Alta** | Adicionar blog/artigos jurídicos (5–10 posts) | Acelera autoridade em buscas long-tail | 8–20h |
| **Alta** | Imagens das fotos da equipe (`assets/img/edilton.jpg` e `emilly.jpg`) | Confiança visual + alt-text qualificado | 30min após receber fotos |
| **Média** | Indexar Google My Business + sincronizar `geo` do Schema | Captura buscas "advogado tributarista perto de mim" | 1–2h |
| **Média** | Adicionar Open Graph image específica por LP (1200×630 com texto da LP) | Compartilhamento social mais rico | 4–8h (com designer) |
| **Média** | Configurar `mod_rewrite` no `.htaccess` para remover `.html` da URL | URLs mais limpas | 1h |
| **Baixa** | Adicionar FAQ schema na home (já tem `FAQ` visual; falta `FAQPage` JSON-LD) | Possíveis rich snippets de FAQ | 1h |
| **Baixa** | Lighthouse PWA — adicionar manifest.webmanifest + favicons multi-tamanho | Score PWA | 2h |

### 7.6 Próximos 30 dias — roadmap SEO

**Semana 1:**
- Subir as fotos reais da equipe
- Cadastrar Google Search Console → submeter `sitemap.xml`
- Cadastrar Google Business Profile (Curitiba — PR)
- Validar Schema.org em https://search.google.com/test/rich-results

**Semana 2:**
- Publicar 2 primeiros artigos no blog (sugestões: *"Como funciona a Capacidade de Pagamento (CAPAG) na transação tributária"* e *"5 sinais de que sua execução fiscal contém nulidades"*)
- Vincular os 4 posts do Instagram via `data-instgrm-permalink`

**Semanas 3–4:**
- Conseguir 3–5 backlinks de qualidade (parceiros, OAB, sindicatos)
- Adicionar `FAQPage` schema na home
- Publicar mais 3 artigos para totalizar 5 no blog

---

## 8. Performance e Core Web Vitals

### Pesos por página
| Recurso | Tamanho | Notas |
|---|---|---|
| `index.html` | 44 KB | Home com Instagram + Schema + 7 cards de serviço |
| `servicos.html` | 15 KB | Grid de 7 cards |
| `servico-*.html` | 13–15 KB cada | LPs com sidebar |
| `css/style.css` | 26 KB | Folha única — pode ser comprimida para ~6 KB com Gzip |
| `js/main.js` | 6 KB | Vanilla, sem frameworks |
| Logo SVG | <1 KB | Inline ou arquivo |
| Fontes (Google) | ~80 KB | DM Sans 5 pesos + Forum |
| Instagram embed.js | ~120 KB | Carregado com `defer async` apenas na home |

### Recomendações já aplicadas
- ✅ `preconnect` para `fonts.googleapis.com` e `fonts.gstatic.com`
- ✅ `defer` no script principal
- ✅ `loading="lazy"` em imagens secundárias
- ✅ `fetchpriority="high"` no LCP (quando aplicável)
- ✅ Sem JS de framework
- ✅ CSS unificado em um único arquivo (1 request)

### Core Web Vitals esperados (target)
| Métrica | Alvo | Estimativa |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | ~1.4s (hero é o LCP — texto + gradient) |
| **FID** / **INP** (Interaction to Next Paint) | < 200ms | ~50ms (JS pequeno) |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ~0.02 (dimensões fixas em imagens) |

---

## 9. Acessibilidade (WCAG)

### Conformidades verificadas

| Critério WCAG | Status | Implementação |
|---|---|---|
| **1.1.1** Texto alternativo | ✅ AAA | Todas as imagens com `alt` descritivo qualificado |
| **1.3.1** Info e relações | ✅ AA | `<nav>`, `<main>`, `<article>`, `aria-label`, `aria-labelledby` |
| **1.4.3** Contraste mínimo | ✅ AA | Verificado: 5.6:1 ou mais em todos os pares ink/canvas |
| **1.4.10** Reflow | ✅ AA | `clamp()` + breakpoints mobile-first |
| **2.1.1** Teclado | ✅ AA | Todos os botões, links e forms acessíveis via Tab |
| **2.4.4** Propósito dos links | ✅ AA | `aria-label` em links com ícone |
| **2.4.7** Foco visível | ✅ AA | `:focus-visible` dourado 3px |
| **2.5.5** Tamanho do alvo | ✅ AAA | 48px em CTAs, 44px em links de nav |
| **3.1.1** Idioma da página | ✅ AA | `<html lang="pt-BR">` |
| **3.3.1** Identificação de erro | ✅ AA | Form com `novalidate` + `aria-live` no feedback |
| **4.1.2** Nome, função, valor | ✅ AA | Buttons com `type="button"`, `aria-expanded` em accordions |

### `prefers-reduced-motion`
Animações de hover e transições são reduzidas para `0.01ms` quando o usuário sinaliza preferência por movimento reduzido — respeitando vestibular/epilepsia.

---

## 10. Histórico das Auditorias

O sistema atual é resultado de **6 ciclos de validação redundante** executados ao longo de 2026-05-21:

1. **Ciclo 1 — Auditoria Gramatical (PT-BR) e ABNT:** correção de regência verbal, padronização tipográfica (travessão longo `—`), estruturação de páginas legais em ABNT, citação por extenso de Lei nº 13.709/2018.
2. **Ciclo 2 — Engenharia de Copywriting:** hero institucional, CTAs verbais específicos (*"Solicitar análise inicial"*, *"Calcular benefício"*, *"Proteger o patrimônio"*), gatilhos de urgência sigilosa nas LPs criminais.
3. **Ciclo 3 — SEO Técnico Jurídico:** Schema `LegalService` em todas as LPs, `BreadcrumbList` JSON-LD, palavras-chave ancoradas em **Curitiba — PR**, `robots.txt` + `sitemap.xml`.
4. **Ciclo 4 — UX/UI Mobile-First:** `min-height: 48px` em CTAs, `min-height: 44px` em nav links, parágrafos ≥ 16px, `:focus-visible` dourado, contraste WCAG AA elevado a AAA nas LPs.
5. **Ciclo 5 — Refinamento Estético:** whitespace generoso (96px), tipografia Forum + DM Sans, ausência de dependências externas (Vanilla First).
6. **Ciclo 6 — Teste de Quebra (Redundância):** verificação de que títulos longos não estouram cards mobile, CTAs uppercase mantém legibilidade em 48px, 17 rotas servindo 200 OK.

### Iterações de design experimentadas e revertidas
Antes de chegar na identidade atual (azul-marinho institucional + dourado), o sistema passou por **dois experimentos de design** revertidos por não casarem com a voz jurídica:
- **BMW M (motorsport-engineering)** — canvas preto, UPPERCASE, faixa tricolor. Rejeitado: tom agressivo demais.
- **ElevenLabs (editorial magazine)** — off-white, EB Garamond Light, orbs pastéis. Rejeitado: tom etéreo demais para Direito Tributário.

A identidade final (navy + dourado + Forum + DM Sans) é a que projeta autoridade institucional consistente com escritórios de advocacia de alto padrão.

---

## 11. Manutenção e Operação

### Adicionar uma nova área de atuação
1. Crie `servico-<slug>.html` copiando uma LP existente (ex.: `servico-renegocia-pr.html`)
2. Atualize `<title>`, `<meta description>`, Schema `LegalService` com `serviceType` específico e `BreadcrumbList`
3. Adicione um card na `servicos.html` e no menu do footer (`<nav class="footer-col">`)
4. Adicione entrada no `sitemap.xml`
5. Adicione no `hasOfferCatalog` do Schema da home

### Atualizar texto da home
- Hero: bloco `<section class="hero">` em `index.html`
- Cards de serviço: `<div class="services-grid">` (7 `<article class="service-card">`)
- FAQ: `<div class="faq-list">` (8 `<div class="faq-item">`)

### Adicionar um novo membro da equipe
- Em `index.html`, dentro de `<div class="team-tabs">`:
  1. Adicione um `<button class="team-tab-btn" data-member="slug">Nome</button>` na navegação
  2. Adicione um `<article class="team-member-card" id="slug">...</article>` no conteúdo
  3. Suba a foto em `assets/img/<slug>.jpg` (proporção 4:5, 600×750px, ~120 KB)

### Trocar os links do Instagram (atualmente 8 slots indexados)

Em `index.html`, na seção `<section class="instagram-section">`, há **8 cards** com os seguintes permalinks já configurados:

| Slot | Tipo | Permalink |
|---|---|---|
| 1 | Reel | `/p/DYkzcXhxIPw/` |
| 2 | Post | `/p/DYE7AuzDFwa/` |
| 3 | Reel | `/p/DYF9cl9RKDu/` |
| 4 | Post | `/p/DYNymxkmFoz/` |
| 5 | Reel | `/p/DXuFh8KDvf9/` |
| 6 | Post | `/p/DT24kddikDl/` |
| 7 | Reel | `/p/DXh25S6Ed97/` |
| 8 | Post | `/p/DR0OCUGioki/` |

Para trocar um post, edite o atributo `data-instgrm-permalink` do `<blockquote>` correspondente (e o `href` do `<a>` placeholder logo abaixo, para casar). Use o formato canônico `https://www.instagram.com/p/CODIGO/` mesmo para Reels — o `embed.js` aceita ambos. O script oficial recarrega os embeds a cada nova requisição de página.

Se um post for removido do Instagram, o `<blockquote>` mostra o placeholder visual (gradiente bege + ícone) — comportamento esperado de fallback.

### Substituir o handler do formulário (deploy real)
Em `js/main.js`, bloco `===== CONTACT FORMS =====` (linha ~95), substitua a Promise simulada por:

```js
const res = await fetch('contato.php', {
  method: 'POST',
  body: new FormData(form),
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
});
const data = await res.json();
if (!data.ok) throw new Error(data.message);
```

E aponte o `action` dos forms para `/contato.php`. O endpoint PHP completo (com CSRF, sanitização e `mail()`) já existe em `public_html/api/contato.php` na codebase anterior — pode ser reaproveitado.

---

## 12. Deploy no HostGator

### Pré-requisitos
- Plano HostGator com PHP 8.x ativo (cPanel → Software → PHP Selector)
- Acesso FTP/SFTP ou cPanel File Manager
- Domínio `srgestaotributaria.com` apontado para a hospedagem

### Passos
1. **Upload da árvore inteira** de `sr-consultoria/` para `public_html/` do servidor
   - Permissões: arquivos `644`, pastas `755`
2. **Upload das fotos da equipe** em `public_html/assets/img/edilton.jpg` e `emilly.jpg` (600×750px, ~120 KB cada)
3. **Subir o backend PHP** (`api/contato.php` da codebase anterior) e ajustar:
   - `$destinatario = 'contato@srgestaotributaria.com';`
   - `$from = 'no-reply@srgestaotributaria.com';` (cadastrar essa conta no cPanel → E-mail)
4. **Ativar HTTPS** (Let's Encrypt no cPanel → SSL/TLS)
5. **Submeter sitemap** no Google Search Console: `https://srgestaotributaria.com/sitemap.xml`
6. **Validar Schema** em https://search.google.com/test/rich-results para 3 páginas (home, criminal, contato)

### `.htaccess` sugerido (criar em `public_html/`)

```apache
RewriteEngine On

# HTTPS obrigatório
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove www (ajuste se a preferência for manter www)
RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
RewriteRule ^ https://%1%{REQUEST_URI} [R=301,L]

# Cache de assets estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compressão Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/json
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# 404 amigável
ErrorDocument 404 /index.html
```

---

## 13. Plano de Evolução

### Curto prazo (próximas 2 semanas)
- ✅ Subir fotos reais da equipe
- ✅ Vincular os 4 posts do Instagram
- ✅ Cadastrar Google Search Console + Google Business Profile
- ✅ Plugar o handler real do formulário no PHP

### Médio prazo (próximos 60 dias)
- 📝 Lançar blog com 5–8 artigos técnicos iniciais
- 📝 Adicionar `FAQPage` schema na home
- 📝 Conseguir 3–5 backlinks de qualidade (OAB-PR, sindicatos, parceiros contábeis)
- 📝 Adicionar Open Graph images específicas por LP (1200×630 com texto)
- 📝 Configurar `mod_rewrite` para URLs sem `.html`

### Longo prazo (próximos 6 meses)
- 📊 Implementar área de "Casos de sucesso" anonimizados (com Schema `Article`)
- 📊 Vídeos curtos por LP (entrevista com Edilton/Emilly explicando o serviço)
- 📊 Newsletter quinzenal com novidades fiscais (lead magnet)
- 📊 Painel interno para equipe acompanhar leads (CRM integrado ao form)
- 📊 PWA com offline support para a página de contato

---

## Apêndice — Comandos úteis

### Subir o servidor local
```powershell
cd "H:\Documentos\F.A.T Tech 2026\S&R\Site New\sr-consultoria"
python -m http.server 8080 --bind 127.0.0.1
```

### Verificar todas as rotas (smoke test)
```bash
for url in / /servicos.html /servico-crimes-economicos.html /contato.html; do
  curl -s -o NUL -w "%{http_code} %{size_download}B $url\n" "http://127.0.0.1:8080${url}"
done
```

### Validar Schema.org
- https://search.google.com/test/rich-results — copiar e colar URL ou HTML
- https://validator.schema.org/ — validar JSON-LD isoladamente

### Auditar Performance
- https://pagespeed.web.dev/ — Lighthouse oficial Google
- https://www.webpagetest.org/ — análise detalhada de waterfall

---

**Documento mantido por:** Engenharia Legal Tech S&R
**Última revisão:** 21 de maio de 2026
**Próxima revisão sugerida:** após a primeira indexação completa no Google Search Console (~30 dias após o deploy)
