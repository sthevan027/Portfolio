# Spec · Landing em casos (direção C)

Status: rascunho para aprovação. Base visual e de conteúdo: `doc/landing-opcoes.html`, direção C.
Nada aqui foi implementado no site.

## Objetivo

Atrair pessoa física e pequeno negócio que quer site, sistema ou app, sem perder o recrutador.

Sucesso, em ordem de importância:
1. Cliques em "Quero algo assim" e no botão de WhatsApp de orçamento.
2. Recrutador chega ao currículo em um clique, a partir da dobra.

## Públicos e entrada

| Público | Chega por | Quer ver | Ação |
|---|---|---|---|
| Pessoa física e pequeno negócio | WhatsApp, Instagram, indicação | "alguém como eu" resolvendo um problema parecido | WhatsApp de orçamento |
| Recrutador | LinkedIn, currículo, candidatura | prova técnica e stack | currículo e GitHub |

## Estrutura da página

1. **Dobra:** frase sobre o problema ("Cada projeto começou com um problema real. Veja o problema antes da tela."), botão primário de WhatsApp e link "Ver casos". "Currículo" fica no menu.
2. **Casos:** cards com filtro por tipo de cliente: Pessoa física, Pequeno negócio, Empresa. Três casos em destaque na home; a lista completa fica em `/projetos`.
3. **Para quem:** três colunas (pessoa física, pequeno negócio, empresa), cada uma com um exemplo de serviço.
4. **Como trabalho:** três passos (conversa, proposta, entrega). Sem preço nem prazo.
5. **Sobre e contato:** trajetória curta, formulário e links.
6. **Rodapé:** currículo, GitHub, LinkedIn.

## Modelo de caso

Estende o `CaseStudy` que já existe em `src/data/cases.ts` (no `main`). Campos novos:

- `clientType`: `'pessoa-fisica' | 'pequeno-negocio' | 'empresa'`.
- `kind`: `'cliente' | 'demonstracao' | 'projeto-proprio'`. Aparece como etiqueta visível no card e na página do caso.
- `demoUrl?`: link de demonstração público, quando existir.

Campos que continuam: `problem`, `solution`, `how`, `applications`, `dataNote`, `result?` e `resultNote?`.

Regras:
- `kind !== 'cliente'` mostra a etiqueta "Demonstração" ou "Projeto próprio".
- `result` só existe se o número foi medido. Sem número, o campo fica ausente, sem texto substituto.
- Botão "Código" só aparece para repositório público.

## Casos iniciais

| Caso | clientType | kind | Resultado | Pendência |
|---|---|---|---|---|
| Restaurante Vó Zilda (cardápio e painel de pedidos) | pequeno-negocio | demonstracao | nenhum ainda | confirmar com a dona que nome, marca e prints podem aparecer |
| Confeitaria (a criar) | pequeno-negocio | demonstracao | nenhum ainda | demo a ser feita; nome e dados a definir |
| MeuSalário | pessoa-fisica | projeto-proprio | nenhum | dados de exemplo |
| Gerador de Relatório | empresa | projeto-proprio | 1 para 3 relatórios por dia (já em `cases.ts`) | nenhuma |
| PontoLeve | pequeno-negocio | projeto-proprio | nenhum | **oculto desde o PR #8**: reverter a ocultação ou ficar fora |
| Crachá Digital | pequeno-negocio | projeto-proprio | nenhum | **oculto desde o PR #8**: mesmo caso |

Os casos da Vó Zilda e da confeitaria são demonstração. Não aparecem como cliente de referência.

## Identidade visual

- Fundo neutro (branco quente ou quase preto), tipografia sans grande e uma cor de destaque.
- Sem amarelo de sinalização e sem placas.
- Prints dentro de moldura de navegador ou de celular.
- Mobile: cards empilhados, margem lateral de 16px, sem rolagem horizontal.
- Texto em português simples, sem jargão de engenharia.

## Conteúdo

- Nenhum número inventado. Nada de prazo ou preço.
- Quando o caso usa dados fictícios, a etiqueta diz "dados de exemplo".
- Nome de cliente ou marca só com autorização.

## Implementação (depois da aprovação)

1. Aprovar direção, casos e cor de destaque.
2. Atualizar `src/data/cases.ts` (campos novos) e `CasesSection` (filtro por tipo de cliente).
3. Montar a nova home: dobra, casos, "Para quem", "Como trabalho".
4. Adicionar demos e prints; revisar no celular e rodar Lighthouse.
5. Medir cliques nos botões de contato com `src/lib/analytics.ts`, que já existe no `main`.

## Em aberto

- Cor de destaque (sugestão: verde do protótipo C).
- Autorização da dona do restaurante Vó Zilda.
- Reverter a ocultação de PontoLeve e Crachá Digital, ou ficar só com casos visíveis.
- Nome e dados da confeitaria.
- Manter ou não o currículo na dobra.
