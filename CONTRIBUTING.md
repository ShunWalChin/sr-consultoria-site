# Contribuindo com o S&R Consultoria — Website

Obrigado pelo interesse em contribuir! Este documento descreve como
propor melhorias, reportar bugs e enviar pull requests.

---

## Tipos de contribuição bem-vindos

✅ **Correções de bugs** — qualquer comportamento que destoe da documentação
✅ **Melhorias de acessibilidade** — WCAG 2.1 AA/AAA, ARIA, navegação por teclado
✅ **Performance** — Core Web Vitals, redução de tamanho de bundles
✅ **SEO técnico** — Schema.org, sitemap, meta tags
✅ **Correções gramaticais ou de redação** — desde que mantenham o tom institucional
✅ **Compatibilidade cross-browser** — Safari, Firefox, Edge, navegadores móveis

⚠️ **NÃO aceitos sem discussão prévia (abra issue antes):**

- Mudanças na identidade visual (paleta, tipografia, hierarquia)
- Adição de bibliotecas/frameworks externos
- Reestruturação ampla de arquivos
- Mudanças no conteúdo institucional (textos da S&R, valores da marca)

---

## Antes de começar

1. **Abra um issue** descrevendo o problema ou melhoria.
2. **Aguarde feedback** — em geral respondemos em até 48h úteis.
3. **Bifurque o repositório** (fork) para sua conta.
4. **Clone localmente** e crie uma branch descritiva:

```bash
git checkout -b fix/contraste-botao-secundario
# ou
git checkout -b feat/lazy-load-imagens-instagram
```

---

## Setup de desenvolvimento

```bash
# Clone seu fork
git clone https://github.com/SEU-USUARIO/sr-consultoria-site.git
cd sr-consultoria-site

# Suba o servidor local
cd dist
python -m http.server 8080 --bind 127.0.0.1
```

Abra: **http://127.0.0.1:8080/**

---

## Padrões técnicos

### HTML

- Use HTML5 semântico estrito: `<main>`, `<nav>`, `<article>`, `<aside>`, `<footer>`
- Apenas **um `<h1>` por página**
- Hierarquia de headings linear (não pule do `<h2>` para `<h4>`)
- Sempre `lang="pt-BR"` no `<html>`
- Imagens com `alt` descritivo (vazio `alt=""` se decorativa)
- `loading="lazy"` em imagens abaixo da dobra
- Schema.org JSON-LD obrigatório em LPs de serviço

### CSS

- **Vanilla puro** — sem Tailwind, Bootstrap, etc.
- Custom properties em `:root` para tokens
- Mobile-first (`@media (min-width: ...)`)
- `clamp()` para tipografia fluida
- Touch targets ≥48px em interativos
- Foco visível com `:focus-visible`

### JavaScript

- **Vanilla ES2020+** — sem jQuery, sem frameworks
- Listeners passivos quando possível (`{ passive: true }`)
- Sem `document.write`
- Sem `eval` ou similares
- Comentários em PT-BR
- Idempotente onde fizer sentido

### Acessibilidade

- Contraste mínimo **4.5:1** para texto normal
- `aria-label` em elementos icônicos sem texto
- `aria-expanded` em toggles
- `aria-live` em status dinâmicos
- Respeitar `prefers-reduced-motion`

### Copywriting

- **PT-BR culto** (sem juridiquês excessivo)
- ABNT em páginas legais
- **Zero Lorem Ipsum** — se faltar conteúdo, marcar `[CONFIRMAR: ...]`
- Citações legais por extenso na primeira ocorrência: "Lei nº 13.709/2018 — LGPD"
- Tom corporativo discreto, autoridade sem arrogância

---

## Estrutura do commit

Use [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
<tipo>(escopo): descrição curta em PT-BR

Corpo opcional explicando o porquê.

Refs: #123
```

**Tipos válidos:**

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Mudanças em documentação |
| `style` | Formatação, espaçamento (sem mudança de código) |
| `refactor` | Refatoração sem mudar comportamento |
| `perf` | Melhoria de performance |
| `a11y` | Melhoria de acessibilidade |
| `seo` | Melhoria de SEO |
| `chore` | Manutenção, deps, build |

**Exemplos válidos:**

```
fix(form): impedir submit duplicado no diagnóstico
feat(instagram): adicionar lazy-load do embed.js via IntersectionObserver
a11y(navbar): adicionar aria-current na página ativa
docs(readme): atualizar badge de license
seo(criminal): adicionar BreadcrumbList JSON-LD
```

---

## Pull Request

1. **Mantenha PRs pequenos e focados** — um propósito por PR.
2. **Atualize `CHANGELOG.md`** na seção `[Não publicado]` (`## [Unreleased]`).
3. **Teste localmente** em pelo menos 2 navegadores (Chrome + Firefox).
4. **Valide responsividade** em viewport mobile (375px), tablet (768px) e desktop (1280px).
5. **Lighthouse** — não regredir performance, accessibility ou SEO em mais de 2 pontos.
6. **Descrição clara** explicando *o quê* e *por quê*.
7. **Screenshots** quando a mudança for visual.

### Checklist do PR

```markdown
- [ ] Testei localmente em Chrome + Firefox
- [ ] Testei em mobile (375px) e desktop (1280px)
- [ ] Não introduzi novas dependências externas
- [ ] Atualizei o CHANGELOG.md
- [ ] Não regredi acessibilidade (WCAG AA)
- [ ] Comentários do código estão em PT-BR
- [ ] Não há `console.log` de debug
```

---

## Reportando bugs

Use o template de issue. Inclua:

- **Navegador e versão** (Chrome 124, Safari 17.4, etc.)
- **Sistema operacional** (Windows 11, macOS 14, iOS 17)
- **Viewport** se relevante (mobile, tablet, desktop)
- **Passos para reproduzir** (numerados)
- **Comportamento esperado vs. observado**
- **Screenshots ou vídeo** se ajudar

---

## Código de conduta

- Seja respeitoso e profissional em discussões.
- Aceite feedback construtivo sem levar para o pessoal.
- Reconheça contribuições de outros nos commits e PRs.
- Em caso de discordância técnica, traga dados (benchmarks, specs, links).

---

## Dúvidas?

Abra uma [Discussion](../../discussions) ou entre em contato:

- **E-mail:** contato@srgestaotributaria.com
- **Desenvolvimento técnico:** [FAT Tech](https://fattech.com.br)

---

Obrigado por contribuir 🙌
