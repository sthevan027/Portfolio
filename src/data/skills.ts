/**
 * Skills - dados reais do GitHub (sthevan027)
 * Última sincronização: 2026-03-07T17:05:00.687Z
 * Execute: pnpm run sync:skills para atualizar
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
        "name": "JavaScript",
        "level": 92
      },
      {
        "name": "CSS",
        "level": 90
      },
      {
        "name": "HTML",
        "level": 90
      },
      {
        "name": "React/Next.js",
        "level": 90
      },
      {
        "name": "Tailwind CSS",
        "level": 90
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
        "name": "C#",
        "level": 95
      },
      {
        "name": "Java",
        "level": 77
      },
      {
        "name": "Node.js",
        "level": 90
      }
    ]
  },
  {
    "id": "database",
    "title": "Database",
    "icon": "Database",
    "color": "from-purple-500 to-pink-500",
    "iconColor": "text-purple-400",
    "skills": [
      {
        "name": "PostgreSQL",
        "level": 95
      },
      {
        "name": "Prisma ORM",
        "level": 80
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
    "color": "from-indigo-500 to-purple-500",
    "iconColor": "text-indigo-400",
    "skills": [
      {
        "name": "React Native",
        "level": 80
      },
      {
        "name": "Expo",
        "level": 85
      },
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
        "name": "Node.js",
        "level": 85
      },
      {
        "name": "N8N",
        "level": 85
      },
    ]
  }
]
