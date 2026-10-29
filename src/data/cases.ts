/**
 * Estudos de caso mostrados na landing e em /projetos/[slug].
 * `result` só existe onde o Sthevan mediu o ganho; nos demais fica ausente de
 * propósito (não inventar número). Casos de demonstração (`kind: 'demonstracao'`)
 * não são clientes de referência: aparecem com a etiqueta "Demonstração" e
 * linkam para o site de demonstração, sem página própria.
 */

export type ClientType = 'pessoa-fisica' | 'pequeno-negocio' | 'empresa'
export type CaseKind = 'cliente' | 'demonstracao' | 'projeto-proprio'

export interface CaseStudy {
  slug: string
  /** título do projeto em src/data/projects.ts (ou nome da demonstração) */
  projectTitle: string
  /** quem contratou ou para quem a ferramenta foi feita */
  clientType: ClientType
  /** cliente entregue, demonstração ou projeto próprio — vira etiqueta visível */
  kind: CaseKind
  /** site de demonstração público; quando existe, o card linka para ele */
  demoUrl?: string
  /** imagem do caso quando não há projeto correspondente (ex.: demonstrações) */
  image?: string
  /** frase curta sobre o tipo de problema (cards e <title>) */
  tagline: string
  /** descrição para meta description e para o card */
  summary: string
  problem: string
  solution: string
  how: string[]
  /** ganho medido pelo autor naquele contexto — não é promessa para outros clientes */
  result?: string
  resultNote?: string
  /** onde a mesma ideia pode ser aplicada em outros negócios (possibilidades, não casos feitos) */
  applications: string[]
  /** aviso sobre dados (exemplo, código privado etc.) */
  dataNote: string
}

export const CASES: CaseStudy[] = [
  {
    slug: 'restaurante-vo-zilda',
    projectTitle: 'Restaurante da Vó Zilda',
    clientType: 'pequeno-negocio',
    kind: 'demonstracao',
    demoUrl: 'https://restaurantevozilda.netlify.app/',
    image: '/cases/restaurante-vo-zilda.png',
    tagline: 'Pedidos de marmita direto no site, sem depender de aplicativo',
    summary:
      'Protótipo de um site de pedidos, com entrega e retirada, e um painel para o restaurante acompanhar tudo. Pensado para um restaurante de marmita que ainda não tinha canal próprio.',
    problem:
      'O restaurante estava abrindo sem nenhum sistema e sem canal próprio de pedidos: cada pedido dependia de uma conversa direta.',
    solution:
      'Um site onde o cliente escolhe no cardápio, monta o pedido e escolhe entrega ou retirada, e um painel onde o restaurante vê os pedidos chegando, cadastra produtos e bairros e acompanha os relatórios.',
    how: [
      'Cardápio online com carrinho, para entrega ou retirada.',
      'Painel do restaurante com os pedidos chegando ao vivo, em colunas por etapa.',
      'Cadastro de produtos, clientes e bairros de entrega, com relatórios.',
    ],
    applications: [
      'Mesmo modelo de pedidos para confeitaria, lanchonete, padaria ou qualquer loja que vende por encomenda.',
      'Cardápio e catálogo com pedido direto, para negócios que hoje recebem pedidos só por mensagem.',
    ],
    dataNote:
      'Protótipo de demonstração. Os dados ficam no navegador e o sistema definitivo ainda não foi construído. Não há número de vendas.',
  },
  {
    slug: 'meusalario',
    projectTitle: 'MeuSalário',
    clientType: 'pessoa-fisica',
    kind: 'projeto-proprio',
    tagline: 'CLT ou PJ/MEI: quanto sobra de cada proposta',
    summary:
      'Ferramenta que compara uma proposta CLT com uma PJ ou MEI e mostra quanto sobra no bolso em cada uma, já com os descontos de INSS e imposto de renda.',
    problem:
      'Comparar uma proposta CLT com uma PJ ou MEI exige calcular INSS e imposto de renda e entender o que muda no mês. Quase todo mundo faz isso à mão ou no chute.',
    solution:
      'Um site em que você informa os valores e vê os dois cenários lado a lado, e que ainda ajuda a organizar as finanças pessoais com gráficos.',
    how: [
      'Cálculo dos descontos de INSS e imposto de renda para quem é CLT.',
      'Comparação lado a lado com PJ ou MEI.',
      'Controle financeiro pessoal com gráficos.',
    ],
    applications: [
      'Comparação de propostas de trabalho para quem recebe ofertas em regimes diferentes.',
      'Controle financeiro pessoal com gráficos de gastos e de renda.',
    ],
    dataNote: 'Projeto pessoal. Não há métrica de ganho medida para este projeto.',
  },
  {
    slug: 'gerador-de-relatorio',
    projectTitle: 'Gerador de Relatório',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Comprovantes em PDF viram relatório pronto, sem digitação',
    summary:
      'Aplicativo que lê os comprovantes de pesagem em PDF e monta sozinho o relatório de descarte da obra, no mesmo modelo de Excel que a equipe já usava.',
    problem:
      'Para fechar o relatório de descarte, alguém copiava para o Excel, comprovante por comprovante, os dados e a foto de cada pesagem. Era um trabalho repetitivo, com risco de relatório duplicado e de os controles ficarem desencontrados.',
    solution:
      'Um aplicativo que lê os PDFs dos comprovantes, preenche o modelo de Excel com os dados e a foto de cada um, avisa quando um relatório já foi feito e mantém a planilha de controle e o status de aprovação sempre em dia.',
    how: [
      'Leitura automática dos comprovantes de pesagem em PDF, inclusive os que chegam como imagem.',
      'Preenchimento do modelo de Excel do relatório, com a foto de cada comprovante.',
      'Aviso quando o mesmo relatório já foi feito, para não duplicar.',
      'Atualização da planilha de controle e do status de aprovação.',
    ],
    result: 'De 1 para 3 relatórios processados por dia',
    resultNote:
      'Medido por mim na rotina da obra em que a ferramenta foi usada. Cada operação tem seus próprios volumes e documentos; este número não é uma promessa para outros contextos.',
    applications: [
      'Rotinas que recebem documentos em PDF ou imagem e precisam virar um relatório em formato fixo.',
      'Conferência de notas, romaneios, comprovantes e laudos contra uma planilha de controle.',
      'Qualquer fluxo em que o mesmo dado é digitado mais de uma vez em arquivos diferentes.',
    ],
    dataNote:
      'Ferramenta criada para uma obra industrial; as telas do portfólio usam dados de exemplo e o código é privado.',
  },
  {
    slug: 'gerador-de-art',
    projectTitle: 'Gerador de ART',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Documento de segurança montado a partir do que já foi aprovado',
    summary:
      'Aplicativo que monta a Análise de Risco da Tarefa (ART) reaproveitando os riscos e as medidas que já tinham sido aprovados em tarefas anteriores.',
    problem:
      'Montar uma Análise de Risco da Tarefa (ART) levava 5 dias, e muitos dos riscos e das medidas já tinham sido aprovados em tarefas anteriores. Reaproveitar esse histórico era um trabalho manual.',
    solution:
      'Um aplicativo que guarda o histórico de riscos aprovados, deixa escolher o que vale para a tarefa e gera o documento pronto em planilha.',
    how: [
      'Base com os riscos e as medidas já aprovados.',
      'Você escolhe o que se aplica à tarefa e o documento sai pronto em Excel.',
      'Tela simples, que roda direto no computador.',
    ],
    result: 'De 5 dias para meio dia por ART',
    resultNote:
      'Medido por mim no uso real da ferramenta na equipe de engenharia. O ganho depende de quanto histórico aprovado já existe e de como o processo é feito em cada empresa.',
    applications: [
      'Documentos recorrentes montados a partir de uma base aprovada: checklists, laudos, ordens de serviço, procedimentos.',
      'Padronização de documentos que hoje são copiados de arquivos antigos e editados à mão.',
    ],
    dataNote: 'Código privado; o material do portfólio usa dados de exemplo.',
  },
  {
    slug: 'analise-de-medicao',
    projectTitle: 'Análise de Medição',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Medição do mês calculada a partir dos comprovantes e da tabela de preços',
    summary:
      'Automação que lê os comprovantes de pesagem em PDF, cruza com a tabela de preços do contrato e entrega pronto o valor a medir no mês.',
    problem:
      'Para fechar a medição do mês, era preciso cruzar à mão os comprovantes de pesagem, que chegam em PDF, com a tabela de preços do contrato para chegar ao valor a medir.',
    solution:
      'Uma rotina automática que lê os comprovantes, encontra o preço de cada item na tabela do contrato e entrega um relatório em Excel com o valor a medir.',
    how: [
      'Leitura dos comprovantes em PDF, inclusive os que chegam como imagem.',
      'Cruzamento de cada item com a tabela de preços do contrato.',
      'Relatório final em Excel com o valor a medir.',
    ],
    applications: [
      'Conferência mensal de medições, faturamentos e comissões que combinam documentos recebidos com uma tabela de preços.',
      'Consolidação de dados de vários PDFs em uma única planilha para auditoria.',
    ],
    dataNote:
      'Não há métrica de ganho medida para este projeto. O código está público no GitHub; os exemplos do portfólio não exibem dados reais de empresa.',
  },
  {
    slug: 'painel-gerencial',
    projectTitle: 'Painel Gerencial',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Previsto, medido e cronograma da obra em uma tela só',
    summary:
      'Painel que reúne em uma tela o orçado e o medido, os itens que mais pesam no custo, o cronograma e os boletins de medição de uma obra.',
    problem:
      'Acompanhar uma obra no físico e no financeiro envolve orçamento, medições e cronograma que costumam ficar em planilhas separadas, difíceis de comparar.',
    solution:
      'Um painel que roda no próprio computador e junta tudo: o que foi orçado contra o que foi medido, os itens que mais pesam no custo, o cronograma e os boletins de medição.',
    how: [
      'Leitura dos dados de orçamento e medição que já existem nas planilhas.',
      'Gráficos e tabelas que comparam o previsto com o realizado.',
      'Funciona direto no computador, sem depender de servidor externo.',
    ],
    applications: [
      'Painéis de acompanhamento para qualquer operação que compare planejado e realizado.',
      'Substituir relatórios mensais montados à mão por uma visão sempre atualizada a partir das planilhas existentes.',
    ],
    dataNote:
      'O painel exibido usa dados de exemplo. Não há métrica de ganho medida para este projeto; o código é privado.',
  },
  {
    slug: 'dashboardcusto',
    projectTitle: 'DashboardCusto',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Custo previsto contra gasto real, com controle de quem lançou o quê',
    summary:
      'Sistema na internet que compara o custo previsto da obra com o gasto real, por grupo e por item, com permissões por usuário e histórico de cada lançamento.',
    problem:
      'Controlar o custo de uma obra pede comparar o previsto com o realizado em vários níveis, e saber com segurança quem lançou o quê.',
    solution:
      'Um sistema que mostra o previsto e o gasto real por grupo, subgrupo e item, e guarda o histórico de cada lançamento feito.',
    how: [
      'Painéis e tabelas que consolidam previsto e gasto real em cada nível.',
      'Cada usuário só vê e altera o que tem permissão.',
      'Histórico de todos os lançamentos, para saber quem fez o quê.',
      'Funciona no navegador, de qualquer computador.',
    ],
    applications: [
      'Sistemas internos de controle de custos, estoque ou contratos com perfis de acesso diferentes.',
      'Substituir planilhas compartilhadas por um sistema com histórico de alterações.',
    ],
    dataNote:
      'Não há métrica de ganho medida para este projeto. Código privado; as telas do portfólio usam dados de exemplo.',
  },
  {
    slug: 'laudofacil',
    projectTitle: 'LaudoFácil',
    clientType: 'empresa',
    kind: 'projeto-proprio',
    tagline: 'Laudos técnicos com cálculo automático, prontos em PDF e Excel',
    summary:
      'Aplicação que monta laudos de testes elétricos (Megger, hipot, cabos e disjuntores) com cálculo automático e exportação em PDF e Excel.',
    problem:
      'Os laudos de testes elétricos, como Megger, microhmímetro, hipot, lançamento de cabo e disjuntor, exigem cálculos e formatação repetitivos a cada teste.',
    solution:
      'Uma aplicação no navegador em que você digita os resultados ou deixa o cálculo automático, e exporta o laudo pronto em PDF e Excel.',
    how: [
      'Um formulário para cada tipo de teste, com digitação manual ou cálculo automático.',
      'Gráficos dos resultados.',
      'Os dados ficam salvos no próprio navegador de quem usa.',
      'Laudo exportado em PDF e em Excel.',
    ],
    applications: [
      'Laudos, checklists e relatórios técnicos de campo que seguem um modelo fixo.',
      'Ferramentas que funcionam no navegador, inclusive para equipes em campo.',
    ],
    dataNote: 'Não há métrica de ganho medida para este projeto. O código está público no GitHub.',
  },
]

export function getCase(slug: string) {
  return CASES.find((c) => c.slug === slug)
}
