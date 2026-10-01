/**
 * Dados dos projetos - sincronizados com GitHub (sthevan027)
 * Última sincronização: 2026-10-01T21:51:30.923Z
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
  titleEn?: string
  descriptionEn?: string
  impactEn?: string
}

export const projects: Project[] = [
  {
    "id": 1,
    "title": "DashboardCusto",
    "description": "Dashboard de custos de obra (orçado × realizado) por grupo, subgrupo e item, com views no Postgres, RLS e trilha de auditoria dos lançamentos.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "React",
      "Supabase",
      "PostgreSQL"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/dashboardcusto.png",
    "descriptionEn": "Construction cost dashboard (budgeted × actual) by group, subgroup and item, with Postgres views, RLS and an audit trail of every entry."
  },
  {
    "id": 2,
    "title": "Claude Glass",
    "description": "Widget de desktop que mostra o uso do Claude Code, com um pet de pixel art",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "Electron",
      "JavaScript",
      "Node.js"
    ],
    "github": "https://github.com/sthevan027/Claude-Glass",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/claude-glass.png",
    "descriptionEn": "Desktop widget that shows your Claude Code usage, with a pixel-art pet."
  },
  {
    "id": 3,
    "title": "Atlas",
    "description": "Sistema pessoal de evolução: tarefas, hábitos, saúde e log diário em um só lugar. PWA em React + TypeScript com Supabase (Auth/RLS).",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "React",
      "TypeScript",
      "Supabase",
      "PWA"
    ],
    "github": null,
    "demo": null,
    "featured": true,
    "previewImage": "/projects/atlas.png",
    "descriptionEn": "Personal growth system: tasks, habits, health and a daily log in one place. A React + TypeScript PWA on Supabase (Auth/RLS)."
  },
  {
    "id": 4,
    "title": "PR Indicator",
    "description": "Extensão do GNOME Shell — indicador na barra superior mostrando PRs esperando sua revisão e seus PRs abertos no GitHub.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "GJS",
      "GNOME Shell",
      "GitHub API"
    ],
    "github": "https://github.com/sthevan027/gnome-pr-indicator",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/gnome-pr-indicator.png",
    "descriptionEn": "GNOME Shell extension — a top-bar indicator showing the PRs waiting for your review and your own open PRs on GitHub."
  },
  {
    "id": 5,
    "title": "Análise de Medição",
    "description": "Pipeline Python que automatiza a medição mensal das Usinas 1 e 2: extrai tíquetes de balança em PDF (com OCR), cruza com a tabela de preços do contrato (QQP) e gera relatório Excel do valor a medir.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "OCR (Tesseract)",
      "pandas",
      "pdfplumber"
    ],
    "github": "https://github.com/sthevan027/Analise_Medicao",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/analise-medicao.png",
    "titleEn": "Measurement Analysis",
    "descriptionEn": "Python pipeline that automates the monthly measurement of an industrial site: reads weighbridge tickets from PDFs (with OCR), matches them to the contract price table and outputs the Excel report of the amount to bill."
  },
  {
    "id": 6,
    "title": "Painel Gerencial",
    "description": "Painel gerencial desktop (Flask + pywebview) para acompanhamento fisico-financeiro de obras: orcado x medido, curva ABC, cronograma e boletins de medicao (dados de exemplo).",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Python",
      "Flask",
      "Plotly",
      "pandas"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/painel-gerencial.png",
    "titleEn": "Management Dashboard",
    "descriptionEn": "Desktop dashboard (Flask + pywebview) to track a construction project physically and financially: budget vs. measured, ABC curve, schedule and measurement bulletins (sample data)."
  },
  {
    "id": 7,
    "title": "MeuSalário",
    "description": "Simulador e comparador de salário CLT vs PJ/MEI com cálculo de INSS/IRRF e gestão financeira pessoal. Next.js + TypeScript.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Recharts"
    ],
    "github": "https://github.com/sthevan027/MeuSalario",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/meusalario.png",
    "descriptionEn": "Brazilian salary simulator comparing employee (CLT) vs. contractor (PJ/MEI) pay, with INSS/IRRF tax math and personal finance tracking. Next.js + TypeScript."
  },
  {
    "id": 8,
    "title": "Gerador de ART",
    "description": "Aplicativo desktop para gerar ARTs (Analise de Risco da Tarefa) a partir de um historico de riscos aprovados",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "pywebview",
      "openpyxl"
    ],
    "github": null,
    "demo": null,
    "featured": true,
    "previewImage": "/projects/gerador-de-art.png",
    "impact": "De 5 dias para meio dia por ART",
    "titleEn": "ART Generator",
    "descriptionEn": "Desktop app that assembles task risk analyses (ARTs) from a history of approved risks.",
    "impactEn": "From 5 days to half a day per ART"
  },
  {
    "id": 9,
    "title": "focusbrew",
    "description": "App de bandeja que percebe quando você está programando com IA, liga o modo foco (bloqueia distrações e ativa o Não Perturbe) e reúne tarefas, PRs do GitHub e um timer com pausa-café.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Tauri",
      "Rust",
      "React",
      "TypeScript"
    ],
    "github": "https://github.com/sthevan027/focusbrew",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/focusbrew.png",
    "descriptionEn": "Tray app that notices when you are coding with AI, turns on focus mode (blocks distractions, enables Do Not Disturb) and gathers tasks, GitHub PRs and a timer with coffee breaks."
  },
  {
    "id": 10,
    "title": "Gerador de Relatório",
    "description": "Aplicativo desktop (Python + pywebview) que gera o Relatório Visual de descarte a partir dos tíquetes de balança em PDF (com OCR), preenche o modelo Excel com a foto do tíquete, evita relatórios duplicados e mantém sincronizado o mapa de controle e o status de aprovação.",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "pywebview",
      "OCR (Tesseract)",
      "openpyxl"
    ],
    "github": null,
    "demo": null,
    "featured": true,
    "previewImage": "/projects/gerador-de-relatorio.png",
    "impact": "De 1 para 3 relatórios processados por dia",
    "titleEn": "Report Generator",
    "descriptionEn": "Desktop app (Python + pywebview) that builds the visual disposal report from weighbridge-ticket PDFs (with OCR), fills the Excel template with the ticket photo, prevents duplicate reports and keeps the control map and approval status in sync.",
    "impactEn": "From 1 to 3 reports processed per day"
  },
  {
    "id": 11,
    "title": "Analisador de Contratos",
    "description": "Leitor de planilhas orçamentárias de contrato (QQP/LD/CPU) que gera um dashboard financeiro local (Flask + Chart.js) com composição de custos por grupo/frente e Curva S planejada.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Python",
      "Flask",
      "openpyxl",
      "Chart.js"
    ],
    "github": "https://github.com/sthevan027/Analisado-de-Contratos",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/analisado-de-contratos.png",
    "titleEn": "Contract Analyzer",
    "descriptionEn": "Reads contract budget spreadsheets (QQP/LD/CPU) and builds a local financial dashboard (Flask + Chart.js) with cost breakdown by group and a planned S-curve."
  },
  {
    "id": 12,
    "title": "LaudoFácil",
    "description": "Relatórios de qualidade elétrica — Megger, microhmímetro, hipot, lançamento de cabo (NBR 5410) e teste de disjuntor — com entrada manual ou cálculo automático e exportação em PDF e Excel.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "React",
      "TypeScript",
      "Dexie (IndexedDB)",
      "Chart.js"
    ],
    "github": "https://github.com/sthevan027/LaudoFacil",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/laudofacil.png",
    "descriptionEn": "Electrical quality reports — Megger, micro-ohmmeter, hipot, cable sizing (NBR 5410) and breaker tests — with manual input or automatic calculation and PDF/Excel export."
  },
  {
    "id": 13,
    "title": "Crachá Digital",
    "description": "Protótipo de crachá digital com QR Code: página pública com dados do colaborador e status dos treinamentos de segurança. Next.js + SQLite.",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Next.js",
      "TypeScript",
      "SQLite"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/cracha-digital.png",
    "titleEn": "Digital Badge",
    "descriptionEn": "Digital badge prototype with a QR code: a public page with the worker’s details and the status of their safety trainings. Next.js + SQLite."
  },
  {
    "id": 14,
    "title": "DevRadar",
    "description": "CLI para analisar perfis do GitHub e gerar relatório HTML com métricas e insights",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "PowerShell",
      "GitHub API"
    ],
    "github": "https://github.com/sthevan027/DevRadar",
    "demo": null,
    "featured": true,
    "previewImage": "/projects/devradar.png",
    "descriptionEn": "CLI that analyzes GitHub profiles and generates an HTML report with metrics and insights."
  },
  {
    "id": 15,
    "title": "PontoLeve",
    "description": "Portal do colaborador / protótipo RH (React)",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "React",
      "React Router",
      "Vite"
    ],
    "github": "https://github.com/sthevan027/PontoLeve",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/pontoleve.png",
    "descriptionEn": "Employee portal / HR prototype (React): timesheet, vacation, payslips and profile."
  },
  {
    "id": 16,
    "title": "AtaAI",
    "description": "Automação de reuniões (agenda, notas e follow-ups)",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "Node.js",
      "Express",
      "OpenAI",
      "PostgreSQL",
      "React"
    ],
    "github": "https://github.com/sthevan027/AtaAI",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/ataai.png",
    "descriptionEn": "Meeting automation: syncs meetings, summarizes them with AI into action items and sends the follow-ups."
  },
  {
    "id": 17,
    "title": "ObraTrack",
    "description": "Sistema de Rastreabilidade e Controle de Materiais - QR Code e organização operacional para obras industriais",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "SolidJS",
      "TypeScript",
      "Vite"
    ],
    "github": "https://github.com/sthevan027/ObraTrack",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/obratrack.png",
    "descriptionEn": "Material traceability and control system — QR codes and operational organization for industrial construction sites."
  },
  {
    "id": 18,
    "title": "mypage",
    "description": "Página pessoal/portfólio (TypeScript)",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "Next.js",
      "TypeScript"
    ],
    "github": "https://github.com/sthevan027/mypage",
    "demo": null,
    "featured": false,
    "previewImage": "/projects/mypage.png",
    "descriptionEn": "Personal hub page (Next.js + TypeScript) with posts, links and resume."
  },
  {
    "id": 19,
    "title": "Painel de Obras",
    "description": "Site estático de acompanhamento de obras (Usinas 1 e 2): banner e cards de acesso rápido a arquivos no Dropbox, configurável via JSON.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/placadedadosusina1e2.png",
    "titleEn": "Site Board",
    "descriptionEn": "Static construction-site tracking page: banner and quick-access cards to project files, configurable through a JSON file."
  },
  {
    "id": 20,
    "image": "/api/placeholder/400/250",
    "title": "RDO Fotos",
    "description": "App desktop que organiza as fotos do RDO (WhatsApp) direto nas pastas de cada ativo, com fluxo de 1 clique por foto e checagem de duplicidade por conteúdo.",
    "category": "automation",
    "technologies": [
      "Python",
      "Tkinter",
      "Pillow"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/rdo-fotos.png",
    "titleEn": "RDO Photos",
    "descriptionEn": "Desktop app that files the daily site report (RDO) photos received on WhatsApp straight into each asset’s folder — one click per photo, with content-based duplicate checking."
  },
  {
    "id": 21,
    "image": "/api/placeholder/400/250",
    "title": "CopyAutomity",
    "description": "Automação que copia e renomeia os tickets de medição todo dia às 07h, organizando por mês sem intervenção manual.",
    "category": "automation",
    "technologies": [
      "Python",
      "Agendador do Windows"
    ],
    "github": null,
    "demo": null,
    "featured": false,
    "previewImage": "/projects/copyautomity.png",
    "descriptionEn": "Automation that copies and renames the measurement tickets every day at 7 a.m., organizing them by month with no manual work."
  }
]
