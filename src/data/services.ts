import type { NeedType } from '@/lib/site'

/** Conteúdo da página /servicos (português). Sem preços, prazos ou resultados prometidos. */
export interface Service {
  id: string
  /** âncora na página e valor pré-selecionado no formulário */
  need: NeedType
  title: string
  intro: string
  problems: string[]
  solutions: string[]
  /** estudos de caso relacionados (slug em data/cases.ts) */
  cases: string[]
  whatsappMessage: string
}

export const SERVICES: Service[] = [
  {
    id: 'sistemas-personalizados',
    need: 'sistema',
    title: 'Sistemas personalizados',
    intro:
      'Para empresas que precisam centralizar informações, organizar a operação ou ter uma ferramenta que os sistemas atuais não oferecem.',
    problems: [
      'Dados espalhados em várias planilhas e pastas, sem uma versão única e confiável.',
      'Controles internos que dependem de uma pessoa ou de um arquivo que só ela entende.',
      'Falta de histórico: não se sabe quem alterou o quê e quando.',
      'Necessidade de acompanhar indicadores, custos ou prazos em um painel.',
    ],
    solutions: [
      'Sistemas web internos com cadastro, fluxo de trabalho e permissões por perfil de usuário.',
      'Dashboards e painéis de gestão a partir dos dados que a empresa já tem.',
      'Banco de dados organizado, com regras de acesso e trilha de auditoria.',
      'Aplicações desktop ou web, conforme o ambiente em que a equipe trabalha.',
    ],
    cases: ['dashboardcusto', 'painel-gerencial'],
    whatsappMessage: 'Olá, Sthevan! Vi a página de serviços e quero conversar sobre um sistema personalizado.',
  },
  {
    id: 'automacao-de-processos',
    need: 'automacao',
    title: 'Automação de processos',
    intro:
      'Para rotinas repetitivas com planilhas, relatórios e documentos que consomem o tempo da equipe e abrem espaço para erro de digitação.',
    problems: [
      'Relatórios montados à mão, copiando dados de um arquivo para outro.',
      'PDFs e documentos recebidos que alguém precisa ler e digitar em planilhas.',
      'Rotinas diárias ou mensais que se repetem sempre do mesmo jeito.',
      'Documentos padronizados refeitos do zero a cada vez.',
    ],
    solutions: [
      'Leitura de PDFs e imagens (com OCR) e extração de dados para planilhas.',
      'Geração automática de relatórios e documentos a partir de modelos em Excel.',
      'Consolidação de dados de várias fontes e conferência contra tabelas de controle.',
      'Rotinas agendadas, como copiar, renomear e organizar arquivos.',
    ],
    cases: ['gerador-de-relatorio', 'gerador-de-art', 'analise-de-medicao'],
    whatsappMessage: 'Olá, Sthevan! Vi a página de serviços e quero conversar sobre automação de processos.',
  },
  {
    id: 'modernizacao-e-melhoria',
    need: 'manutencao',
    title: 'Modernização e melhoria de sistemas',
    intro:
      'Para empresas que já têm um sistema ou site no ar e precisam corrigir problemas, adicionar funcionalidades ou conectá-lo a outras ferramentas.',
    problems: [
      'Erros recorrentes e partes do sistema que ninguém mais sabe mexer.',
      'Funcionalidades que o negócio pede e o sistema atual não tem.',
      'Ferramentas que não conversam entre si e exigem retrabalho.',
      'Aplicações web que ficaram lentas, difíceis de usar no celular ou desatualizadas.',
    ],
    solutions: [
      'Diagnóstico do sistema atual e correção de falhas.',
      'Desenvolvimento de novas funcionalidades sobre o que já existe.',
      'Integração entre sistemas, planilhas e serviços por API ou arquivos.',
      'Evolução de aplicações web, com atenção a desempenho e uso em dispositivos móveis.',
    ],
    cases: ['laudofacil'],
    whatsappMessage: 'Olá, Sthevan! Vi a página de serviços e quero conversar sobre melhorias em um sistema que já uso.',
  },
]

export const PROCESS_STEPS = [
  {
    title: 'Conversa sobre o problema',
    text: 'Você conta como o processo funciona hoje. Posso pedir exemplos de planilhas e documentos, sem dados sigilosos.',
  },
  {
    title: 'Levantamento e proposta',
    text: 'Eu organizo o que precisa ser resolvido e apresento o escopo da solução antes de começar.',
  },
  {
    title: 'Desenvolvimento e entrega',
    text: 'A solução é construída e entregue para uso, com os ajustes combinados no escopo.',
  },
]
