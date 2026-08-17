/**
 * Dados dos projetos - sincronizados com GitHub (sthevan027)
 * Última sincronização: 2026-08-17T12:29:38.904Z
 * Execute: pnpm run sync:projects para atualizar
 */

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'automation'

export interface Project {
  id: number
  title: string
  description: string
  image: string
  previewImage?: string
  category: ProjectCategory
  technologies: string[]
  github: string | null
  demo: string | null
  featured: boolean
  impact?: string
}

export const projects: Project[] = [
  {
    "id": 1,
    "title": "Gerador De Relatorio",
    "description": "Aplicativo desktop (Python + pywebview) que gera o Relatório Visual de descarte a partir dos tíquetes de balança em PDF (com OCR), preenche o modelo Excel com a foto do tíquete, evita relatórios duplicados e mantém sincronizado o mapa de controle e o status de aprovação.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "JavaScript",
      "CSS",
      "HTML",
      "Batchfile"
    ],
    "github": "https://github.com/sthevan027/Gerador-de-relatorio",
    "demo": null,
    "featured": true,
    "impact": "De 1 para 3 relatórios processados por dia"
  },
  {
    "id": 2,
    "title": "Gerador De Art",
    "description": "Aplicativo desktop para gerar ARTs (Analise de Risco da Tarefa) a partir de um historico de riscos aprovados",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "JavaScript",
      "CSS",
      "PowerShell",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/gerador-de-art",
    "demo": null,
    "featured": true,
    "impact": "De 5 dias para meio dia por ART"
  },
  {
    "id": 3,
    "title": "Painel Gerencial",
    "description": "Painel gerencial desktop (Flask + pywebview) para acompanhamento fisico-financeiro de obras: orcado x medido, curva ABC, cronograma e boletins de medicao (dados de exemplo).",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "HTML",
      "CSS",
      "VBScript"
    ],
    "github": "https://github.com/sthevan027/painel-gerencial",
    "demo": null,
    "featured": false,
    "impact": "Acelera a tomada de decisão com dados sempre atualizados"
  },
  {
    "id": 4,
    "title": "Analisado De Contratos",
    "description": "Leitor de planilhas orçamentárias de contrato (QQP/LD/CPU) que gera um dashboard financeiro local (Flask + Chart.js) com composição de custos por grupo/frente e Curva S planejada.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Python",
      "CSS",
      "HTML",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/Analisado-de-Contratos",
    "demo": null,
    "featured": false
  },
  {
    "id": 5,
    "title": "Painel Gerencial JL",
    "description": "Dashboard interno (Flask + Plotly) para acompanhar o contrato de desmobilização das Usinas 1 e 2 (Vale/Tubarão): orçado x medido, cronograma físico-financeiro, macros do contrato (curva ABC) e as medições das subcontratadas. Roda local, como site (app.py) ou como app desktop.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Python",
      "HTML",
      "CSS",
      "VBScript"
    ],
    "github": "https://github.com/sthevan027/painel-gerencial-JL",
    "demo": null,
    "featured": false,
    "impact": "Acelera a tomada de decisão com dados sempre atualizados"
  },
  {
    "id": 6,
    "title": "Claude Glass",
    "description": "Widget de desktop que mostra o uso do Claude Code, com um pet de pixel art",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Claude-Glass",
    "demo": null,
    "featured": false
  },
  {
    "id": 7,
    "title": "Analise_Medicao",
    "description": "Pipeline Python que automatiza a medição mensal das Usinas 1 e 2: extrai tíquetes de balança em PDF (com OCR), cruza com a tabela de preços do contrato (QQP) e gera relatório Excel do valor a medir.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "Batchfile",
      "VBScript"
    ],
    "github": "https://github.com/sthevan027/Analise_Medicao",
    "demo": null,
    "featured": false
  },
  {
    "id": 8,
    "title": "Engenheiro De Software",
    "description": "Base de conhecimento pessoal de engenharia de software: pilares, mapa mental e checklist de validação de projetos.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python"
    ],
    "github": "https://github.com/sthevan027/Engenheiro-de-software",
    "demo": null,
    "featured": false
  },
  {
    "id": 9,
    "title": "MeuSalario",
    "description": "Simulador e comparador de salário CLT vs PJ/MEI com cálculo de INSS/IRRF e gestão financeira pessoal. Next.js + TypeScript.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "PLpgSQL",
      "JavaScript",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/MeuSalario",
    "demo": null,
    "featured": false
  },
  {
    "id": 10,
    "title": "LaudoFacil",
    "description": "Sistema para laboratório de eletrônica",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/LaudoFacil",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/eletrolab.svg"
  },
  {
    "id": 11,
    "title": "Cracha Digital",
    "description": "Protótipo de crachá digital com QR Code (JL Construtora): página pública com dados do colaborador e status dos treinamentos de segurança. Next.js + SQLite.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "JavaScript",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/cracha-digital",
    "demo": null,
    "featured": false
  },
  {
    "id": 12,
    "title": "DevRadar",
    "description": "CLI para analisar perfis do GitHub e gerar relatório HTML com métricas e insights",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "PowerShell"
    ],
    "github": "https://github.com/sthevan027/DevRadar",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/gh-dev-analyzer.svg"
  },
  {
    "id": 13,
    "title": "AgendaZap",
    "description": "Sistema Secretaria MVP em Java",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Java"
    ],
    "github": "https://github.com/sthevan027/AgendaZap",
    "demo": null,
    "featured": false
  },
  {
    "id": 14,
    "title": "PontoLeve",
    "description": "Portal do colaborador / protótipo RH (React)",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/PontoLeve",
    "demo": null,
    "featured": false
  },
  {
    "id": 15,
    "title": "AtaAI",
    "description": "Automação de reuniões (agenda, notas e follow-ups)",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "CSS",
      "PLpgSQL",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/AtaAI",
    "demo": null,
    "featured": false
  },
  {
    "id": 16,
    "title": "ObraTrack",
    "description": "Sistema de Rastreabilidade e Controle de Materiais - QR Code e organização operacional para obras industriais",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/ObraTrack",
    "demo": null,
    "featured": false
  },
  {
    "id": 17,
    "title": "Calculadora Dotnet",
    "description": "Calculadora em C# / .NET — estudo e exercícios",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "C#"
    ],
    "github": "https://github.com/sthevan027/Calculadora.dotnet",
    "demo": null,
    "featured": false
  },
  {
    "id": 18,
    "title": "Portfolio",
    "description": "Portfólio (Next.js + TypeScript) com projetos, currículo e contato",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "HTML",
      "JavaScript",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/Portfolio",
    "demo": null,
    "featured": false
  },
  {
    "id": 19,
    "title": "Mypage",
    "description": "Página pessoal/portfólio (TypeScript)",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/mypage",
    "demo": null,
    "featured": false
  },
  {
    "id": 20,
    "title": "System Control",
    "description": "Sistema de controle geral",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "PLpgSQL",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/System-control",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/system-control.svg"
  },
  {
    "id": 21,
    "title": "JL DashboardCusto",
    "description": "Dashboard de custos e KPIs JL Construtora (evolução/workspace próprio).",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "Python",
      "PLpgSQL",
      "JavaScript",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/JL-DashboardCusto",
    "demo": null,
    "featured": false
  },
  {
    "id": 22,
    "title": "Dotfile",
    "description": "Dotfiles e scripts para ambiente de desenvolvimento (Linux/Zsh/Bash)",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "Shell",
      "CSS",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/Dotfile",
    "demo": null,
    "featured": false
  },
  {
    "id": 23,
    "title": "CEO OS",
    "description": "Sistema de gestão executiva para CEOs",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "PLpgSQL",
      "CSS",
      "HTML",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/CEO-OS",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/ceo-os.svg"
  },
  {
    "id": 24,
    "title": "PlacadedadosUsina1e2",
    "description": "Site estático de acompanhamento de obras (Usinas 1 e 2): banner e cards de acesso rápido a arquivos no Dropbox, configurável via JSON.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/PlacadedadosUsina1e2",
    "demo": null,
    "featured": false
  },
  {
    "id": 25,
    "image": "/api/placeholder/400/250",
    "title": "RDO Fotos",
    "description": "App desktop que organiza as fotos do RDO (WhatsApp) direto nas pastas de cada ativo, com fluxo de 1 clique por foto e checagem de duplicidade por conteúdo.",
    "category": "automation",
    "technologies": [
      "Python",
      "Tkinter"
    ],
    "github": null,
    "demo": null,
    "featured": false
  },
  {
    "id": 26,
    "image": "/api/placeholder/400/250",
    "title": "CopyAutomity",
    "description": "Automação que copia e renomeia os tickets de medição todo dia às 07h, organizando por mês sem intervenção manual.",
    "category": "automation",
    "technologies": [
      "Python"
    ],
    "github": null,
    "demo": null,
    "featured": false
  }
]
