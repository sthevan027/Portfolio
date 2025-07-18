# Documento Técnico — Componentes, Fontes e Animações para Portfólio Internacional

**Responsável:** Sthevan Santos  
**Projeto:** Portfólio Internacional DevLoop

---

## 🧩 Componentes Essenciais

### 1. **Navbar Fixa com Troca de Idioma**
- Responsiva (hamburguer mobile)
- Logo + links para seções
- Botão para PT / EN

### 2. **Hero Section (Abertura)**
- Texto com efeito "Typed" ou "Fade In"
- Foto ou ilustração animada
- Botões: Ver Projetos | Falar com Sthevan (WhatsApp)

### 3. **Sobre Mim**
- Bloco com bio + missão e visão
- Linha do tempo animada com ícones
- Destaques visuais de clientes ou parceiros atendidos

### 4. **Projetos**
- Grid de cards com hover animado
- Modal para detalhes (descrição, tech stack, links)
- Filtro por tipo de projeto (Dev, Design, Bot, SaaS)

### 5. **Stack Técnica (Skills)**
- Ícones organizados em blocos: Frontend / Backend / Automação
- Accordion ou Tabs com descrição por tecnologia

### 6. **Experiência Profissional**
- Timeline com ícones e datas (scroll reveal)
- Feedbacks ou depoimentos com print real ou card

### 7. **Contato**
- Formulário com campos básicos (nome, e-mail, mensagem)
- Botão flutuante do WhatsApp
- Links para GitHub, LinkedIn, Instagram

### 8. **Rodapé**
- Navegação, copyright
- Frase inspiracional + redes

---

## 🖋️ Fontes Profissionais

### 1. Montserrat ExtraBold
- **Uso:** Títulos, headers, CTAs
- **Estilo:** Moderna, forte, internacional

### 2. Inter (ou IBM Plex)
- **Uso:** Corpo do texto, descrições, FAQ
- **Estilo:** Clara, elegante, fácil leitura

---

## 🎞️ Animações Recomendadas

### Biblioteca Sugerida: Framer Motion

| Seção    | Tipo de Animação                    | Detalhe                                 |
| -------- | ----------------------------------- | --------------------------------------- |
| Hero     | Texto digitando ou entrada por fade | `motion.div` com `initial/animate/exit` |
| Projetos | Hover suave nos cards               | Escala leve + sombra                    |
| Timeline | Scroll reveal                       | Aparece à medida que usuário rola       |
| Botões   | Microinterações ao hover/click      | Leve scale ou glow                      |
| Imagens  | FadeIn com atraso                   | Stagger nos delays por ordem            |

### Outras Bibliotecas Úteis:
- **Animate.css** – efeitos prontos (bounce, fade, slide)
- **GSAP** – animações complexas em scroll e transformações
- **Lottie** – ilustrações animadas com JSON exportado do After Effects

---

## 🎨 Estilo Visual Global

- **Tema escuro** com detalhes em roxo e azul
- **Glassmorphism** leve (fundos translúcidos + blur)
- **Cards com sombras suaves** e bordas arredondadas
- **Ícones minimalistas** (Heroicons, Lucide, Tabler)

---

## 🚀 Pronto para Implementar

Com essa base, o site pode ser desenvolvido em Next.js + TailwindCSS com animações em Framer Motion. Pronto para apresentar você de forma internacional, inovadora e impactante.

**DevLoop — Do conceito ao código. Do código ao resultado.** 