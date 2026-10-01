---
name: Sthevan Santos — Portfólio
description: Portfólio de dev fullstack desenhado como a sinalização de um canteiro de obra.
colors:
  sign: "#F5C400"
  sign-ink: "#3D3200"
  ink: "#121212"
  paper: "#F3F3F0"
  enamel-white: "#FFFFFF"
  steel: "#4A4A46"
  route: "#0B7A3E"
  route-deep: "#085E2F"
  info: "#1F4FA3"
  screw: "#6E6E68"
  destructive: "#BE1E1E"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.6rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "2rem"
    fontWeight: 800
    lineHeight: 0.92
  body:
    fontFamily: "Barlow, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.05em"
  counter:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "4rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "'tnum' 1"
rounded:
  tag: "4px"
  field: "6px"
  button: "8px"
  panel: "10px"
  plate: "14px"
spacing:
  gutter-sm: "12px"
  gutter-md: "24px"
  gutter-lg: "32px"
  stack: "24px"
  section: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 24px"
    height: "52px"
  button-route:
    backgroundColor: "{colors.route}"
    textColor: "{colors.enamel-white}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0 24px"
    height: "52px"
  button-route-hover:
    backgroundColor: "{colors.route-deep}"
  button-sign:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 28px"
    height: "56px"
  button-outline-sign:
    textColor: "{colors.sign}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "44px"
  button-outline-sign-hover:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
  chip-stack:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "6px 12px"
  tag-category-fullstack:
    backgroundColor: "{colors.info}"
    textColor: "{colors.enamel-white}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
  plate:
    backgroundColor: "{colors.enamel-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
  plate-sign:
    backgroundColor: "{colors.sign}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
  plate-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
  nav-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "64px"
---

# Design System: Sthevan Santos — Portfólio

## Overview

**Creative North Star: "A Sinalização do Canteiro"**

O site inteiro é sinalização de obra: cada bloco importante é uma placa esmaltada parafusada, cada ganho medido é um contador de dígitos que vira, e as divisas entre trechos são marcadas com faixa zebrada amarela e preta. Amarelo segurança aparece em campo cheio (dobra, contato, cabeçalhos de seção da página de projetos), não como acento; o preto de placa carrega navegação, rodapé e a seção de trajetória; o branco esmaltado é o chão de leitura.

A densidade é de placa, não de painel: títulos condensados enormes em caixa alta, poucas palavras por bloco, bordas grossas (3px) em preto, contraste máximo. A profundidade vem do material da placa (filete interno, parafusos, sombra difusa baixa), nunca de brilho ou vidro. O sistema recusa explicitamente o hero escuro com acento neon e a grade de cards todos iguais.

**Key Characteristics:**
- Amarelo segurança em campo cheio, preto de placa, branco esmaltado.
- Placas com filete interno recuado e quatro parafusos chapados.
- Faixa zebrada (28px de altura) fecha a dobra e abre o contato.
- Barlow Condensed 800 em caixa alta para todo título e rótulo.
- Verde de rota reservado a ação de contato/demo e ao foco.
- Cor de categoria como placa de categoria (amarelo, azul, preto, branco).
- Assinatura de movimento: dígitos do quadro de resultados viram de 0 até o valor.

## Colors

Paleta de sinalização NR-26: três materiais de placa em campo cheio, um verde funcional e um azul informativo. A fonte canônica são canais RGB em `globals.css` (`--sign: 245 196 0`), expostos ao Tailwind como `rgb(var(--x) / <alpha>)`; os hex do frontmatter são equivalentes exatos.

### Primary
- **Amarelo Segurança** (sign): campo cheio da dobra, da seção de contato e do topo de `/projetos`; logotipo de texto na navbar e rodapé; títulos sobre preto; caixa de "ganho medido" nos cards; seleção de texto. Ocupa áreas inteiras, não pontos.
- **Ocre de Placa** (sign-ink): texto secundário sobre amarelo (ledes, legendas). Nunca usar steel sobre amarelo.

### Secondary
- **Verde de Rota** (route): só ação. Botão de WhatsApp (hero, card de clientes, botão flutuante), botão "Demo" dos projetos, anel de foco, cursor de texto, ícone de sucesso do formulário. Hover escurece para **Verde de Rota Fundo** (route-deep), que também é o hover de links sublinhados.

### Tertiary
- **Azul Informativo** (info): cabeçalho/etiqueta da categoria "Fullstack". É o único uso no build; não se espalha para links ou estados.

### Neutral
- **Preto de Placa** (ink): texto principal, navbar, rodapé, seção Trajetória, botão primário, bordas de 2–3px, filete das placas claras, plaquinhas dos dígitos.
- **Branco Esmaltado** (paper): fundo da página e das seções de leitura; texto sobre preto (com opacidades 50–85%).
- **Branco de Placa** (enamel-white): campo das placas de conteúdo, cards de projeto, campos de formulário, chips de stack.
- **Aço** (steel): texto secundário sobre branco/paper (descrições, fontes dos números, placeholders).
- **Parafuso** (screw): cor dos parafusos chapados nas placas claras; na placa preta clareia para `rgb(150 150 144)`.
- **Vermelho de Erro** (destructive): só a mensagem de erro do formulário e `aria-invalid`.

### Named Rules
**A Regra do Verde de Rota.** Verde aparece apenas onde algo leva a um contato ou a um projeto rodando (WhatsApp, Demo) e no foco. Nunca decoração, nunca fundo de seção, nunca ícone solto.

**A Regra do Campo Cheio.** Amarelo entra como campo inteiro (seção, placa, caixa de ganho), não como sublinhado fino ou glow. Se o amarelo virou um detalhe de 2px, está errado — exceto o sublinhado de hover da navbar sobre preto.

**A Regra da Cor de Categoria.** Cada categoria tem uma placa fixa: automação = amarelo/preto, fullstack = azul/branco, frontend = preto/amarelo, backend = branco/preto, sempre com contorno preto de 2px nas etiquetas. A aba ligada do filtro herda a mesma cor.

## Typography

**Display Font:** Barlow Condensed 600/700/800 (fallback Arial Narrow, sans-serif), via `next/font` como `--font-display`.
**Body Font:** Barlow 400/500/600/700 (fallback ui-sans-serif, system-ui), via `--font-sans`.

**Character:** O par de uma família só: a versão condensada grita como placa de obra, a versão normal lê como relatório técnico. Todo `h1–h4` é condensado, 800, caixa alta, `line-height` 0.92 (0.85–0.86 nos títulos gigantes), `text-wrap: balance`.

### Hierarchy
- **Display** (800, clamp(3.6rem, 11vw, 6rem), 0.86): nome na dobra e título de `/projetos`. Títulos de seção usam a mesma escala (clamp(3.6rem, 10vw, 6rem), 0.85; "Projetos" sobe para clamp(4rem, 12vw, 6rem)).
- **Headline** (800, clamp(2.4rem, 6vw, 4.2rem)): título do quadro de resultados; linha de posicionamento da dobra em 700, clamp(1.75rem, 3.4vw, 2.6rem), 1.02.
- **Title** (800, 2rem): títulos de card de projeto e de placa de contato; card largo sobe para 2.6rem / 3.2rem; grupos de stack 2.2rem; linhas do quadro 1.6–1.85rem em 700.
- **Body** (400, 1.05rem, 1.625): descrições, `max-width` 58–62ch; ledes de seção 1.125–1.2rem com 48–60ch. `text-wrap: pretty`.
- **Label** (700, 15px, tracking 0.05em, caixa alta): rótulos de campo, legenda da foto, faixa de categoria do card (tracking 0.12em), navegação (17px), botões (18px no tamanho padrão).
- **Counter** (800, 3.4rem → 4rem, tabular): dígitos do quadro de resultados, sempre `tnum`.

### Named Rules
**A Regra da Caixa Alta Condensada.** Tudo que é título, rótulo, botão ou navegação é Barlow Condensed em caixa alta. Barlow normal só em parágrafo, descrição e lista de tecnologias.

**A Regra do Número Tabular.** Números de contagem, períodos da trajetória e contadores de filtro usam `tabular-nums`; o corpo desliga `tnum` por padrão.

## Layout

Contêiner único de 76rem (`max-w-site`) centrado, com gutters de 12px no celular, 24px a partir de `sm` e 32px a partir de `lg`. Grade de 12 colunas em `lg`: dobra 7/5 (texto/foto), cabeçalhos de seção 6/6 (título/lede alinhados pela base), contato 5/7. Abaixo de `lg` tudo empilha em uma coluna.

Ritmo vertical: seções com 80px (`py-20`) e 112px a partir de `sm`; quadro e contato com 64px/96px. Gaps de grade de 24px entre cards; 48px entre cabeçalho de seção e conteúdo. Navbar fixa de 64px; `section[id]` compensa com `scroll-margin-top` de 4.5rem.

Projetos não são grade de iguais: o destaque principal ocupa a largura toda em layout "wide" (print 21:8 recortado por cima, texto 7/5), os demais destaques vão em 2 colunas e o restante vira lista tabular com etiqueta de categoria. Em `/projetos` a lista completa usa 2 colunas de cards iguais (ver divergências).

Sequência de campos na home: amarelo (dobra) → zebra → paper (quadro, projetos) → preto (trajetória) → paper (stack) → zebra → amarelo (contato) → preto (rodapé).

## Elevation & Depth

Profundidade é material de placa, não camadas de interface. Superfícies são chapadas; a única sombra externa é uma sombra baixa e difusa que descola a placa do campo, mais um contorno de 1px em preto a 12%. O filete interno é desenhado com `box-shadow` inset, de modo que a cor do campo vai até a borda e o filete fica recuado 9px.

### Shadow Vocabulary
- **Placa** (`inset 0 0 0 9px <campo>, inset 0 0 0 12px <filete>, 0 0 0 1px rgb(18 18 18 / .12), 0 22px 40px -24px rgb(0 0 0 / .45)`): toda placa (dobra, foto, quadro, placas de contato).
- **Moldura** (`inset 0 0 0 4px #121212, 0 22px 40px -24px rgb(0 0 0 / .45)`): cards de projeto — borda preta na beirada, sem filete.
- **Plaquinha de dígito** (`0 6px 14px -8px rgb(0 0 0 / .6)`): cada dígito do contador.
- **Botão flutuante** (`0 14px 30px -12px rgb(0 0 0 / .55)`): atalho de WhatsApp.

### Named Rules
**A Regra da Sombra Baixa.** Sombra sempre com spread negativo e caída para baixo (y 6–22px, spread −8 a −24px). Nada de sombra dura deslocada, glow colorido ou blur de fundo.

## Shapes

Cantos de chapa: levemente arredondados, nunca pílula. Escala: 4px (etiqueta de categoria, chip de tecnologia), 6px (campos, logotipo de texto, caixa de ganho, chips de stack, recorte de foto e do quadro), 8px (botões), 10px (painel da trajetória, botão flutuante), 14px (placas e molduras). Bordas e contornos são grossos e pretos: 2px em etiquetas e chips (via `ring-inset`), 3px em campos, divisórias de quadro/listas e moldura da foto.

Formas recorrentes:
- **Parafusos chapados**: quatro círculos de 9px a 18px dos cantos, desenhados por `::before/::after` com gradiente radial. Só em placas, nunca em cards.
- **Placa de rota**: o período de cada etapa da trajetória é uma seta (`clip-path` com ponta de 28px), cada etapa apontando para a próxima.
- **Faixa zebrada**: `repeating-linear-gradient(-45deg)` amarelo/preto em listras de 22px, 28px de altura, sempre de ponta a ponta.
- **Divisória de dígito**: linha preta de 2px no meio de cada plaquinha, como placa de virar.

## Components

### Buttons
Chapa sólida, firme, em caixa alta condensada.
- **Shape:** canto de chapa (8px), altura mínima 52px (padrão), 44px (sm), 56px (lg); ícone de 20px (16px no sm).
- **Primary (ink):** preto com texto paper; ação padrão ("Ver projetos", enviar formulário, "Ver todos os projetos").
- **Route:** verde com texto branco; só WhatsApp. Hover para route-deep.
- **Sign:** amarelo com texto preto; currículo no menu móvel (sobre preto).
- **Outline sign:** contorno amarelo de 2px sobre a navbar preta; hover preenche amarelo.
- **Link:** texto preto sublinhado 2px com offset de 6px; hover route-deep. Usado para "Currículo" na dobra.
- **Hover / Focus:** ink e sign sobem 2px (`translateY(-2px)`), 200ms ease-out; foco é contorno verde de 3px com offset de 3px (global).

### Chips
- **Stack (seção Stack):** branco, contorno preto de 2px, 6px, Barlow Condensed 700 em caixa alta 1.15rem.
- **Tecnologia (card):** sem preenchimento, borda preta a 80% de 2px, 4px, Barlow 600 14px, caixa normal.
- **Etiqueta de categoria:** 4px, Barlow Condensed 13px caixa alta, contorno preto 2px, cores da Regra da Cor de Categoria.

### Cards / Containers
- **Card de projeto:** moldura de 14px (borda preta de 4px), fundo branco, faixa de categoria colorida no topo, print com bordas pretas de 3px em cima e embaixo, padding 20px → 28px (wide: 40px em `lg`). Hover sobe 4px em 300ms.
- **Caixa de ganho:** amarelo, contorno preto 2px, 6px, número/frase em 800 1.45rem + rótulo de 13px em sign-ink.
- **Placa (dobra, foto, contato, quadro):** ver Elevation; placas com conteúdo levam parafusos e padding vertical de 44px para não colidir com eles.
- **Painel de trajetória:** sobre preto, borda amarela de 3px sem topo, canto inferior de 10px, preso abaixo da seta de rota.

### Inputs / Fields
- **Style:** branco, borda preta de 3px, canto de 6px, padding 12px 14px, 1.05rem; placeholder em steel; rótulo acima em label 15px.
- **Focus:** a borda vira verde de rota (sem outline extra); cursor verde.
- **Error / Disabled:** `aria-invalid` troca a borda para vermelho; caixa de erro com borda vermelha 3px e fundo vermelho a 10%. Desabilitado a 60% de opacidade.

### Navigation
- **Style:** barra preta fixa de 64px; logotipo como placa amarela de texto (6px). Links em Barlow Condensed 17px caixa alta, paper a 85%; hover amarelo com sublinhado amarelo de offset 10px.
- **Idioma:** PT / EN, ativo em amarelo, inativo a 50%.
- **Mobile:** botão de menu de 44px; painel preto com borda superior amarela de 4px, itens de 52px em 2xl condensado, botão sign de largura total para o currículo. Esc fecha.

### Filter Tabs (/projetos)
Toggle group de abas brancas com contorno preto 3px, 48px de altura, 6px; aba ligada assume a cor da placa da categoria ("Todos" fica preto/paper); contador tabular a 70%. Setas navegam (Radix roving focus).

### Quadro de Resultados (signature)
Placa branca com cabeçalho preto (título amarelo), linhas separadas por régua preta de 3px: rótulo + fonte à esquerda, contador à direita; antes → depois com seta e legendas. Cada dígito é uma plaquinha preta com número amarelo e divisória central. Ao entrar 45% na tela, cada dígito conta de 0 ao valor (85ms por passo, escalonado 120ms por dígito), cada passo com flip `rotateX(-88deg → 0)` de 160ms em `cubic-bezier(0.16, 1, 0.3, 1)`. O valor final já está no HTML; sem JS ou com `prefers-reduced-motion`, o quadro aparece parado e completo.

### Botão flutuante de WhatsApp
Quadrado verde de 56px, canto de 10px, contorno preto inset de 3px; aparece só depois de 90% da primeira dobra rolada (fade + 16px de subida, 300ms).

## Do's and Don'ts

### Do:
- **Do** montar blocos de destaque como placa: campo até a borda, filete recuado 9→12px, parafusos nos quatro cantos, canto de 14px.
- **Do** fechar e abrir trechos amarelos com a faixa zebrada de 28px de ponta a ponta.
- **Do** escrever todo título, rótulo e botão em Barlow Condensed caixa alta; parágrafos em Barlow.
- **Do** usar verde de rota só para WhatsApp, Demo e foco (contorno de 3px, offset 3px).
- **Do** usar sign-ink para texto secundário sobre amarelo e steel sobre branco.
- **Do** variar a escala dos projetos (um destaque largo, pares, lista) em vez de uma grade uniforme.
- **Do** garantir que qualquer número animado já esteja completo no HTML e fique estático sob reduced motion.

### Don't:
- **Don't** fazer hero escuro com acento neon nem glow colorido.
- **Don't** usar verde como decoração, fundo de seção ou cor de destaque de texto.
- **Don't** usar o azul informativo fora das placas de categoria.
- **Don't** arredondar até pílula botões, chips ou placas; o maior canto é 14px (exceção: o thumb da barra de rolagem).
- **Don't** aplicar sombra dura deslocada, vidro ou blur de fundo; profundidade é a sombra baixa da placa.
- **Don't** colocar parafusos em cards de projeto; parafuso é de placa.
- **Don't** usar barra de porcentagem em habilidades; stack é lista de nomes por uso.
- **Don't** pôr kicker/eyebrow acima de títulos de seção; o título condensado entra sozinho.

### Divergências registradas (build vs. contrato)
- Cards de projeto usam a **moldura** (borda preta de 4px, sem filete nem parafusos), não a placa completa; "cada projeto é uma placa" se cumpre pela faixa de categoria, não pelo material.
- O azul informativo pinta só a categoria Fullstack; as outras placas de categoria são amarelo, preto e branco.
- A ação primária ("Ver projetos", enviar) é preta; verde fica só com WhatsApp/Demo.
- A dobra é uma placa amarela recuada dentro de um campo amarelo (12–32px de margem), não chapa de borda a borda literal.
- `/projetos` ainda é uma grade de 2 colunas de cards iguais (escala variada é item opcional em aberto).
