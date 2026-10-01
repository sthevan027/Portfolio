# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recrutadores e líderes técnicos** avaliando o Sthevan para uma vaga de dev fullstack (júnior–pleno, remoto ou presencial/híbrido no ES). Chegam pelo link do currículo, LinkedIn ou candidatura; decidem em poucos minutos se ele vale uma entrevista.
- **Clientes da Virex** (pequenas e médias empresas) avaliando se contratam ele para um site, sistema ou automação. Querem ver que ele entrega coisa que funciona e resolve problema de negócio.

## Product Purpose

Portfólio pessoal de Sthevan das Virgens dos Santos ("Sthevan"): mostrar o que ele já construiu e o resultado disso, para conseguir uma vaga 100% dev e clientes para a Virex. Sucesso = recrutador ou cliente entende em segundos quem ele é, vê projetos reais funcionando e entra em contato (WhatsApp, e-mail, currículo).

## Positioning

Desenvolvedor fullstack que veio da obra: antes de programar, trabalhou como eletricista e na equipe de engenharia de uma construtora, e construiu ali ferramentas que automatizaram processos reais de engenharia (relatórios, ARTs, medição, controle de obra) com ganho medido. Une React/TypeScript/Supabase com automação em Python — e entende o problema de quem está no campo, não só o código.

## Operating Context

- Visitado principalmente no desktop (recrutador) e no celular (cliente que recebeu o link no WhatsApp).
- Site em Next.js (App Router) + TypeScript + Tailwind, deploy na Vercel (`sthevandev.vercel.app`), bilíngue PT/EN (`src/lib/i18n.ts`).
- Lista de projetos sincronizada do GitHub por `scripts/sync-projects.mjs` (títulos, descrições, stack, imagens de preview, métricas de impacto, exclusões). O sync reescreve `src/data/projects.ts`; ajustes manuais vão no script.
- Currículos em `public/curriculo/` (programação e automação/elétrica).

## Capabilities and Constraints

- Seções atuais: hero, sobre, trajetória, skills, projetos (destaques + página `/projetos` com filtro por categoria), contato (formulário via `/api/contact`, WhatsApp, e-mail, redes), footer, botão flutuante de WhatsApp.
- Repos privados aparecem sem botão "Código" (link daria 404).
- Projetos ligados à JL Construtora (ex-empregador) não podem expor dados reais nem marca da JL nas imagens; prints usam dados de exemplo.

## Brand Commitments

- Nome de exibição: **Sthevan Santos**. Handle: `sthevan027` (GitHub).
- **Virex** é a empresa dele (freelance de desenvolvimento). Marca oficial: "VIREX" maiúsculo em Audiowide, paleta ink/âmbar, Manrope no corpo — vale para material da Virex, não obriga o portfólio pessoal.
- Foto real em `public/sthevan.jpg`.

## Evidence on Hand

Fatos confirmados (vault `E:\meu2cerebro`, 2026-10-01):

- Técnico em Automação (2022–2024). Cursando Engenharia de Software (2025–atual). CS50 (Harvard) concluído em 2026.
- JL Construtora, Serra/ES, obra Vale Tubarão (set/2024 – 15/09/2026): cargo formal Eletricista FC, atuando de fato na equipe de engenharia (planejamento, controle, qualidade) e desenvolvendo as soluções internas.
- Virex (jan/2025 – atual): desenvolvedor fullstack freelance, **10 projetos entregues** (sites institucionais, dashboards, sistemas, ERPs, CRMs). Dedicação integral desde 15/09/2026.
- Métricas medidas pelo próprio Sthevan: Gerador de Relatório "de 1 para 3 relatórios processados por dia"; Gerador de ART "de 5 dias para meio dia por ART".
- 21 projetos no portfólio, todos com imagem em `public/projects/` (prints reais, prints com dados de exemplo ou banners).
- Contato: sthevan.ssantos@gmail.com, WhatsApp +55 (27) 98877-2784, LinkedIn, GitHub, Instagram.
- Compromisso de resposta "em até 24 horas" — já estava no texto do site antigo, escrito pelo Sthevan; mantido.

Ausências — não inventar: depoimentos de clientes, logos de clientes, nomes de clientes da Virex, números de usuários/receita, anos de experiência além dos fatos acima. O "+30 projetos entregues" e a trajetória 2021–2023 do site antigo **não** batem com os fatos e foram descartados.

Em aberto: número do "WhatsApp Empresarial" no site antigo (+55 27 998962-8554) parece ter um dígito a mais — confirmar com o Sthevan antes de publicar.

## Product Principles

1. Prova antes de adjetivo: projeto funcionando e ganho medido valem mais que frase sobre paixão por código.
2. A história de campo é o diferencial — contar sem esconder nem dramatizar.
3. Dois públicos, uma ação clara cada: recrutador → currículo/contato; cliente → WhatsApp.
4. Nada inventado: só fatos confirmados; dado de exemplo é rotulado como exemplo.
