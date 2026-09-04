/**
 * Skills - dados reais do GitHub (sthevan027) + curadoria manual (currículo)
 * Última sincronização automática: 2026-08-17T13:01:10.372Z
 * Ajustes manuais (2026-08-17): Node.js à frente de C#/Java (repos de estudo),
 * Supabase no lugar de Prisma, PWA único item de Mobile, OCR em Automação,
 * remoção de N8N/Make/React Native/Expo sem evidência de uso real.
 * Execute: pnpm run sync:skills para atualizar (sobrescreve os ajustes acima)
 */

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  color: string
  iconColor: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    "id": "frontend",
    "title": "Frontend",
    "icon": "Monitor",
    "color": "from-blue-500 to-cyan-500",
    "iconColor": "text-blue-400",
    "skills": [
      {
        "name": "TypeScript",
        "level": 95
      },
      {
        "name": "HTML",
        "level": 72
      },
      {
        "name": "CSS",
        "level": 72
      },
      {
        "name": "JavaScript",
        "level": 71
      },
      {
        "name": "React/Next.js",
        "level": 90
      },
      {
        "name": "Tailwind CSS",
        "level": 85
      }
    ]
  },
  {
    "id": "backend",
    "title": "Backend",
    "icon": "Server",
    "color": "from-green-500 to-emerald-500",
    "iconColor": "text-green-400",
    "skills": [
      {
        "name": "Node.js",
        "level": 90
      },
      {
        "name": "C#",
        "level": 75
      },
      {
        "name": "Java",
        "level": 70
      }
    ]
  },
  {
    "id": "database",
    "title": "Database",
    "icon": "Database",
    "color": "from-teal-500 to-cyan-500",
    "iconColor": "text-teal-400",
    "skills": [
      {
        "name": "PostgreSQL",
        "level": 95
      },
      {
        "name": "Supabase",
        "level": 90
      }
    ]
  },
  {
    "id": "devops",
    "title": "DevOps & Cloud",
    "icon": "Cloud",
    "color": "from-orange-500 to-red-500",
    "iconColor": "text-orange-400",
    "skills": [
      {
        "name": "Docker",
        "level": 80
      },
      {
        "name": "Vercel",
        "level": 85
      },
      {
        "name": "GitHub Actions",
        "level": 80
      }
    ]
  },
  {
    "id": "mobile",
    "title": "Mobile",
    "icon": "Smartphone",
    "color": "from-slate-500 to-zinc-600",
    "iconColor": "text-slate-300",
    "skills": [
      {
        "name": "PWA",
        "level": 85
      }
    ]
  },
  {
    "id": "automation",
    "title": "Automação",
    "icon": "Settings",
    "color": "from-yellow-500 to-orange-500",
    "iconColor": "text-yellow-400",
    "skills": [
      {
        "name": "Python",
        "level": 95
      },
      {
        "name": "OCR (Tesseract)",
        "level": 88
      },
      {
        "name": "PowerShell",
        "level": 71
      },
      {
        "name": "Shell",
        "level": 70
      },
      {
        "name": "VBScript",
        "level": 70
      }
    ]
  }
]
