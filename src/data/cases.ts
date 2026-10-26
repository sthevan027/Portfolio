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
    tagline: 'Pedidos de marmita direto no site, sem depender de aplicativo',
    summary:
      'Protótipo de site de pedidos (entrega e retirada) com painel do restaurante, pensado para um restaurante de marmita que ainda não tinha canal próprio.',
    problem:
      'O restaurante estava abrindo sem nenhum sistema e sem canal próprio de pedidos, dependendo de contato direto para cada pedido.',
    solution:
      'Um site de pedidos com cardápio, carrinho, entrega e retirada, e um painel do restaurante com pedidos ao vivo, produtos, clientes, bairros de entrega e relatórios.',
    how: [
      'Cardápio online com produtos e carrinho para entrega ou retirada.',
      'Painel do restaurante com pedidos em kanban ao vivo.',
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
      'Simulador e comparador de salário CLT contra PJ/MEI, com cálculo de INSS e IRRF e gestão financeira pessoal.',
    problem:
      'Comparar uma proposta CLT com uma PJ ou MEI exige calcular INSS e IRRF e considerar o que muda no mês, o que costuma ser feito à mão.',
    solution:
      'Um simulador em Next.js e TypeScript, com Supabase, que calcula os dois cenários lado a lado e organiza a gestão financeira pessoal.',
    how: [
      'Cálculo de INSS e IRRF para o regime CLT.',
      'Comparação lado a lado com PJ/MEI.',
      'Gestão financeira pessoal com gráficos.',
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
    tagline: 'PDFs de tíquete viram relatório padronizado em Excel',
    summary:
      'Aplicativo desktop que lê tíquetes de balança em PDF com OCR e monta o relatório visual de descarte no modelo Excel da obra.',
    problem:
      'O relatório visual de descarte dependia de transportar para o modelo Excel, tíquete por tíquete, os dados e a foto de cada pesagem. Era um trabalho repetitivo, sujeito a duplicidade e a divergência entre o relatório, o mapa de controle e o status de aprovação.',
    solution:
      'Um aplicativo desktop em Python que recebe os PDFs dos tíquetes, extrai os dados com OCR, preenche o modelo Excel com a foto do tíquete e mantém o mapa de controle e o status de aprovação sincronizados.',
    how: [
      'Leitura dos tíquetes de balança em PDF, com OCR (Tesseract) para extrair os campos.',
      'Preenchimento automático do modelo Excel do relatório, incluindo a foto do tíquete.',
      'Verificação para evitar relatórios duplicados.',
      'Atualização do mapa de controle e do status de aprovação.',
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
    tagline: 'Documento de segurança montado a partir de um histórico aprovado',
    summary:
      'Aplicativo desktop que gera a Análise de Risco da Tarefa (ART) a partir de um histórico de riscos já aprovados.',
    problem:
      'Montar uma Análise de Risco da Tarefa (ART) levava 5 dias, e muitos dos riscos e das medidas já tinham sido aprovados em tarefas anteriores. Reaproveitar esse histórico era um trabalho manual.',
    solution:
      'Um aplicativo desktop em Python que organiza o histórico de riscos aprovados e monta a ART a partir dele, gerando o documento em planilha.',
    how: [
      'Base com o histórico de riscos e medidas já aprovados.',
      'Seleção do que se aplica à tarefa e geração do documento em Excel (openpyxl).',
      'Interface desktop simples (pywebview).',
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
    tagline: 'Medição mensal calculada a partir de tíquetes e tabela de preços',
    summary:
      'Pipeline em Python que lê tíquetes de balança em PDF, cruza com a tabela de preços do contrato e gera o relatório Excel do valor a medir.',
    problem:
      'A medição mensal exigia cruzar os tíquetes de balança, que chegam em PDF, com a tabela de preços do contrato (QQP) para chegar ao valor a medir.',
    solution:
      'Um pipeline em Python que extrai os dados dos tíquetes, relaciona cada item com a tabela de preços do contrato e entrega o relatório em Excel com o valor a medir.',
    how: [
      'Extração dos tíquetes em PDF com pdfplumber e OCR (Tesseract) quando necessário.',
      'Cruzamento dos itens com a tabela de preços do contrato (QQP) usando pandas.',
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
    tagline: 'Acompanhamento físico-financeiro em um painel único',
    summary:
      'Painel desktop em Flask que reúne orçado × medido, curva ABC, cronograma e boletins de medição de uma obra.',
    problem:
      'Acompanhar uma obra física e financeiramente envolve orçamento, medições e cronograma que costumam viver em planilhas separadas, difíceis de comparar.',
    solution:
      'Um painel gerencial desktop (Flask + pywebview) que reúne orçado × medido, curva ABC, cronograma e boletins de medição em um só lugar.',
    how: [
      'Leitura dos dados de orçamento e medição.',
      'Gráficos e tabelas com Plotly e pandas: orçado × medido, curva ABC, cronograma.',
      'Aplicativo desktop (pywebview) que roda localmente, sem servidor externo.',
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
    tagline: 'Orçado × realizado com banco de dados, permissões e auditoria',
    summary:
      'Dashboard web de custos de obra (orçado × realizado) por grupo, subgrupo e item, com views no Postgres, RLS e trilha de auditoria.',
    problem:
      'Controlar o custo de uma obra pede comparar o orçado com o realizado em vários níveis (grupo, subgrupo e item), com segurança sobre quem lançou o quê.',
    solution:
      'Um sistema web em React com Supabase e PostgreSQL, que calcula orçado × realizado por grupo, subgrupo e item e registra cada lançamento em uma trilha de auditoria.',
    how: [
      'Views no PostgreSQL consolidam orçado e realizado em cada nível.',
      'RLS (Row Level Security) do Supabase controla o que cada usuário enxerga e altera.',
      'Trilha de auditoria registra os lançamentos.',
      'Interface em React com dashboards e tabelas.',
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
    tagline: 'Relatórios técnicos com cálculo automático e exportação',
    summary:
      'Aplicação web para relatórios de qualidade elétrica (Megger, hipot, lançamento de cabo, disjuntor) com cálculo automático e exportação em PDF e Excel.',
    problem:
      'Relatórios de testes elétricos, como Megger, microhmímetro, hipot, lançamento de cabo (NBR 5410) e teste de disjuntor, exigem cálculos e formatação repetitivos.',
    solution:
      'Uma aplicação web em React e TypeScript que permite entrada manual ou cálculo automático dos resultados e exporta o laudo em PDF e Excel.',
    how: [
      'Formulários por tipo de ensaio, com entrada manual ou cálculo automático.',
      'Gráficos com Chart.js e armazenamento local no navegador (IndexedDB, via Dexie).',
      'Exportação do laudo em PDF e Excel.',
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
