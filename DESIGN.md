---
name: Sthevan Santos — Portfólio (sistema v2)
description: Site de estúdio de software voltado para clientes (pessoas, pequenos negócios e empresas), com prova de resultado e foco em conversão e SEO. Substitui a linguagem de sinalização de canteiro.
colors:
  sign: "#2563EB"        # ação e destaque (azul)
  route-deep: "#1D4ED8"  # ação em hover
  sign-ink: "#BFDBFE"    # texto secundário sobre azul ou escuro
  sign-soft: "#EFF6FF"   # fundo de selo e destaque leve
  ink: "#0F172A"         # texto principal
  paper: "#F8FAFC"       # seção alternada
  steel: "#475569"       # texto secundário
  line: "#E2E8F0"        # bordas
  surface: "#FFFFFF"     # superfície principal
typography:
  family: Manrope (corpo e títulos; um arquivo só)
  h1: 2.5–4.25rem, peso 800, entrelinha 1.04, tracking -0.03em, caixa normal
  h2: 2.2–3.25rem, peso 800, entrelinha 1.08
  body: 1.02–1.125rem, entrelinha 1.6, cor steel
  eyebrow: 0.875rem, peso 700, cor sign (rótulo acima de cada título)
---

# Sistema de design v2

## Princípios

1. **Cliente primeiro.** Cada seção responde a uma pergunta do visitante: "isso é para mim?", "vocês já fizeram algo parecido?", "quanto e como?". Não há tabela de preços: o orçamento é por escrito, depois da conversa.
2. **Prova antes de adjetivo.** Números medidos aparecem em destaque; casos mostram problema, solução e resultado. Sem número inventado.
3. **Um caminho principal por tela.** A ação principal é sempre o WhatsApp de orçamento (botão azul). A secundária é um contorno. O currículo fica no menu e no rodapé, para o recrutador.
4. **Nada de adorno.** Sem texturas, sem zebrado, sem parafusos. Sombra suave e bordas finas.

## Tokens

- **Cores.** Base branca e cinza claro (`paper`). Texto em `ink`, secundário em `steel`. Azul (`sign`) só para ação, destaque e selo. Verde do WhatsApp só no botão flutuante, por ser a marca do app.
- **Raio.** Cartões 16px, botões 12px, pílulas para selos e filtros.
- **Sombra.** `plate`: borda de 1px em `line` e sombra suave.
- **Tipografia.** Uma família (Manrope). Títulos em caixa normal. Sem `uppercase` em títulos ou botões.

## Componentes

| Componente | Uso |
|---|---|
| `Button` (`route`) | Ação principal, azul. |
| `Button` (`outlineSign`) | Ação secundária, contorno azul. |
| `Button` (`ink`) | Ação de apoio em superfície escura. |
| `.plate` | Cartão padrão (serviços, casos, passos, perguntas). |
| `.plate-ink` | Cartão escuro para destaque (ex.: contato rápido). |
| `.eyebrow` | Rótulo pequeno acima de cada título de seção. |
| `ResultsBoard` | Números medidos; cada dígito gira ao entrar na tela (sem JS, o valor já aparece). |
| `CasesSection` | Casos com filtro por tipo de cliente. Mostra três; "ver todos" abre o resto. Demonstrações têm etiqueta própria. |
| `Faq` | Perguntas frequentes com `<details>`, funciona sem JavaScript. |

## Seções da home (ordem)

1. Dobra (promessa, ação principal, prova em três pontos, foto).
2. Problemas que reconhece.
3. Serviços (resumo; detalhe em `/servicos`).
4. Números medidos.
5. Casos (filtro por cliente).
6. Para quem eu faço (pessoa física, pequeno negócio, empresa).
7. Como trabalho (três passos e ação).
8. Projetos.
9. Diferenciais.
10. Trajetória.
11. Tecnologias.
12. Perguntas frequentes.
13. Contato (formulário, WhatsApp, currículos).

## SEO

- Um H1 por página. Títulos de seção em H2, cartões em H3, perguntas em `<summary>` dentro de cartão.
- Título e descrição por página (`lib/seo.ts`, `pageMetadata`). Página inicial com "Sites, sistemas e apps" e área de atendimento.
- JSON-LD: `Person`, `ProfessionalService` (área: Espírito Santo e Brasil, mais remoto no exterior), `Service` por serviço em `/servicos`, `BreadcrumbList` nos casos, `ItemList` em `/projetos`.
- Sitemap inclui casos e páginas internas; `privacidade` fica fora do índice.
- Imagens com `alt` descritivo; a foto da dobra tem `priority` para o LCP.
- Pendente: `FAQPage` em JSON-LD, quando o FAQ estiver com conteúdo único por idioma.

## Acessibilidade e responsividade

- Alvo de toque de 44px em links e botões.
- Foco visível em azul; em superfície escura, em branco.
- Movimento reduzido respeitado (contagem, rolagem suave).
- Sem rolagem horizontal entre 360px e 1280px.

## Fora do sistema

- `src/data/services.ts` ainda tem textos de serviço escritos para empresa; precisam de revisão de copy.
- `Problems` e `ServicesSummary` mantêm parte da copy de empresa.
