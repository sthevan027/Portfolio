/**
 * Dados dos projetos - sincronizados com GitHub (sthevan027)
 * Última sincronização: 2026-03-07T16:44:50.068Z
 * Execute: pnpm run sync:projects para atualizar
 */

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'automation'

export interface Project {
  id: number
  title: string
  description: string
  image: string
  category: ProjectCategory
  technologies: string[]
  github: string
  demo: string | null
  featured: boolean
}

export const projects: Project[] = [
  {
    "id": 1,
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
    "demo": "https://ceo-os-ochre.vercel.app",
    "featured": true
  },
  {
    "id": 2,
    "title": "CodeFocus",
    "description": "Aplicação de foco e produtividade",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "JavaScript",
      "PLpgSQL",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/CodeFocus",
    "demo": "https://code-focus-ten.vercel.app",
    "featured": true
  },
  {
    "id": 3,
    "title": "Gh Dev Analyzer",
    "description": "CLI que analisa perfis do GitHub e gera relatórios HTML detalhados com métricas, estatísticas e insights",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "PowerShell"
    ],
    "github": "https://github.com/sthevan027/gh-dev-analyzer",
    "demo": null,
    "featured": true
  },
  {
    "id": 4,
    "title": "Medicao De Obra",
    "description": "Sistema de medição de obras",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Medicao-de-Obra",
    "demo": null,
    "featured": false
  },
  {
    "id": 5,
    "title": "Sistema Gestao Industrial",
    "description": "Sistema de gestão industrial",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/sistema-gestao-industrial",
    "demo": null,
    "featured": false
  },
  {
    "id": 6,
    "title": "EletroLab",
    "description": "Sistema para laboratório de eletrônica",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/EletroLab",
    "demo": "https://eletro-lab.vercel.app",
    "featured": false
  },
  {
    "id": 7,
    "title": "Dashboard Jl Construtora",
    "description": "Dashboard para JL Construtora",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/dashboard-jl-construtora",
    "demo": "https://dashboard-jl-construtora.vercel.app",
    "featured": false
  },
  {
    "id": 8,
    "title": "Clary IA",
    "description": "Assistente de IA - Clary",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python"
    ],
    "github": "https://github.com/sthevan027/clary.IA",
    "demo": null,
    "featured": false
  },
  {
    "id": 9,
    "title": "Sistema De Propostas Por E Mail",
    "description": "Sistema de propostas por e-mail",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "JavaScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Sistema-de-Propostas-por-E-mail",
    "demo": null,
    "featured": false
  },
  {
    "id": 10,
    "title": "Proposta 99 Auto",
    "description": "Sistema de propostas para 99 Auto",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Proposta-99-auto",
    "demo": null,
    "featured": false
  },
  {
    "id": 11,
    "title": "MeuSalario",
    "description": "Gestão de salários e folha de pagamento",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "TypeScript",
      "PLpgSQL",
      "JavaScript",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/MeuSalario",
    "demo": "https://meu-salario-lime.vercel.app",
    "featured": false
  },
  {
    "id": 12,
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
    "demo": "https://system-control.vercel.app",
    "featured": false
  },
  {
    "id": 13,
    "title": "Craig Virex Bot",
    "description": "Bot para Virex",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "JavaScript",
      "Python"
    ],
    "github": "https://github.com/sthevan027/craig_devloop_bot",
    "demo": null,
    "featured": false
  },
  {
    "id": 14,
    "title": "Proposta JL",
    "description": "Sistema de propostas JL",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/Proposta-JL",
    "demo": null,
    "featured": false
  },
  {
    "id": 15,
    "title": "Cardapio",
    "description": "Sistema de cardápio digital",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/cardapio",
    "demo": null,
    "featured": false
  },
  {
    "id": 16,
    "title": "Virex",
    "description": "Sistema Virex",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Virex",
    "demo": "https://virex-three.vercel.app",
    "featured": false
  },
  {
    "id": 17,
    "title": "Gestaofinanceira",
    "description": "Gestão financeira",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/Gestaofinanceira",
    "demo": null,
    "featured": false
  },
  {
    "id": 18,
    "title": "ERP   Galp O",
    "description": "ERP para galpão",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "TypeScript",
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/ERP---galp-o",
    "demo": null,
    "featured": false
  },
  {
    "id": 19,
    "title": "Gravacao",
    "description": "Este e um repositorio feito para testas as coisa, para grava e posta no instagram.",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "github": "https://github.com/sthevan027/Gravacao",
    "demo": null,
    "featured": false
  },
  {
    "id": 20,
    "title": "Fiscalfy",
    "description": "Sistema fiscal",
    "image": "/api/placeholder/400/250",
    "category": "automation",
    "technologies": [
      "Python",
      "TypeScript",
      "Makefile",
      "CSS",
      "JavaScript"
    ],
    "github": "https://github.com/sthevan027/Fiscalfy",
    "demo": null,
    "featured": false
  },
  {
    "id": 21,
    "title": "Super Trunfo Csharp",
    "description": "Jogo Super Trunfo em C#",
    "image": "/api/placeholder/400/250",
    "category": "fullstack",
    "technologies": [
      "C#"
    ],
    "github": "https://github.com/sthevan027/super-trunfo-csharp",
    "demo": null,
    "featured": false
  },
  {
    "id": 22,
    "title": "Site De Rifa",
    "description": "Site de rifas",
    "image": "/api/placeholder/400/250",
    "category": "frontend",
    "technologies": [
      "CSS",
      "JavaScript",
      "HTML"
    ],
    "github": "https://github.com/sthevan027/site-de-Rifa",
    "demo": "https://site-de-rifa.vercel.app",
    "featured": false
  }
]
