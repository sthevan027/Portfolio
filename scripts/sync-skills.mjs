#!/usr/bin/env node
/**
 * Sincroniza skills do portfólio com dados reais do GitHub
 * Agrega linguagens de todos os repositórios e calcula níveis
 * Uso: pnpm run sync:skills
 */

import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const GITHUB_USER = 'sthevan027'

// Mapeamento: linguagem GitHub -> categoria + nome de exibição
const LANGUAGE_MAP = {
  TypeScript: { category: 'frontend', name: 'TypeScript' },
  JavaScript: { category: 'frontend', name: 'JavaScript' },
  HTML: { category: 'frontend', name: 'HTML' },
  CSS: { category: 'frontend', name: 'CSS' },
  Python: { category: 'automation', name: 'Python' },
  PowerShell: { category: 'automation', name: 'PowerShell' },
  PLpgSQL: { category: 'database', name: 'PostgreSQL' },
  PLSQL: { category: 'database', name: 'SQL' },
  Java: { category: 'backend', name: 'Java' },
  PHP: { category: 'backend', name: 'PHP' },
  Go: { category: 'backend', name: 'Go' },
  'C#': { category: 'backend', name: 'C#' },
  'C++': { category: 'backend', name: 'C++' },
  Vue: { category: 'frontend', name: 'Vue.js' },
  SCSS: { category: 'frontend', name: 'SCSS' },
  VBScript: { category: 'automation', name: 'VBScript' },
  Batchfile: { category: 'automation', name: 'Shell' },
}

// Categorias com ícones e cores (estrutura fixa)
const CATEGORY_CONFIG = {
  frontend: {
    title: 'Frontend',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-400',
    fallbackSkills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Vite.js', level: 80 },
    ]
  },
  backend: {
    title: 'Backend',
    color: 'from-green-500 to-emerald-500',
    iconColor: 'text-green-400',
    fallbackSkills: [{ name: 'Node.js', level: 85 }]
  },
  database: {
    title: 'Database',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-400',
    fallbackSkills: [
      { name: 'Prisma ORM', level: 80 },
      { name: 'SQL', level: 85 },
    ]
  },
  devops: {
    title: 'DevOps & Cloud',
    color: 'from-orange-500 to-red-500',
    iconColor: 'text-orange-400',
    fallbackSkills: [
      { name: 'Docker', level: 80 },
      { name: 'Vercel', level: 85 },
      { name: 'GitHub Actions', level: 80 },
    ]
  },
  mobile: {
    title: 'Mobile',
    color: 'from-indigo-500 to-purple-500',
    iconColor: 'text-indigo-400',
    fallbackSkills: [
      { name: 'React Native', level: 80 },
      { name: 'Expo', level: 85 },
      { name: 'PWA', level: 85 },
    ]
  },
  automation: {
    title: 'Automação',
    color: 'from-yellow-500 to-orange-500',
    iconColor: 'text-yellow-400',
    fallbackSkills: [
      { name: 'N8N', level: 85 },
      { name: 'Make', level: 80 },
    ]
  },
}

function runGh(command) {
  try {
    const out = execSync(command, { encoding: 'utf-8' })
    return JSON.parse(out)
  } catch (e) {
    console.error('Erro ao executar gh:', e.message)
    process.exit(1)
  }
}

function fetchLanguagesForRepo(repoName) {
  try {
    const out = execSync(
      `gh api repos/${GITHUB_USER}/${repoName}/languages`,
      { encoding: 'utf-8' }
    )
    return JSON.parse(out)
  } catch {
    return {}
  }
}

function bytesToLevel(bytes, maxBytes) {
  if (maxBytes <= 0) return 75
  const ratio = bytes / maxBytes
  return Math.round(70 + ratio * 25)
}

function main() {
  console.log('🔄 Sincronizando skills do GitHub...\n')

  const repos = runGh(
    `gh repo list ${GITHUB_USER} --limit 50 --json name --source`
  )

  const exclude = ['Config', 'sthevan027', 'Curriculo']
  const repoNames = repos
    .map(r => r.name)
    .filter(n => !exclude.includes(n) && !n.match(/^\./))

  const langTotals = {}
  for (const name of repoNames) {
    const langs = fetchLanguagesForRepo(name)
    for (const [lang, bytes] of Object.entries(langs)) {
      langTotals[lang] = (langTotals[lang] || 0) + bytes
    }
  }

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0)
  const categorySkills = { frontend: [], backend: [], database: [], devops: [], mobile: [], automation: [] }

  for (const [lang, bytes] of Object.entries(langTotals)) {
    const mapping = LANGUAGE_MAP[lang]
    if (!mapping) continue

    const cat = mapping.category
    if (!categorySkills[cat]) categorySkills[cat] = []

    const maxInCat = Math.max(
      ...Object.entries(langTotals)
        .filter(([l]) => LANGUAGE_MAP[l]?.category === cat)
        .map(([, b]) => b),
      1
    )
    const level = Math.min(95, Math.max(70, bytesToLevel(bytes, maxInCat)))

    const existing = categorySkills[cat].find(s => s.name === mapping.name)
    if (!existing) {
      categorySkills[cat].push({ name: mapping.name, level })
    } else {
      existing.level = Math.max(existing.level, level)
    }
  }

  const skillCategories = []
  const iconNames = ['Monitor', 'Server', 'Database', 'Cloud', 'Smartphone', 'Settings']

  let idx = 0
  for (const [catId, config] of Object.entries(CATEGORY_CONFIG)) {
    let skills = (categorySkills[catId] || [])
      .sort((a, b) => b.level - a.level)
      .slice(0, 8)

    if (skills.length === 0) {
      skills = config.fallbackSkills || []
    } else {
      const fallback = (config.fallbackSkills || []).filter(
        f => !skills.some(s => s.name.toLowerCase().includes(f.name.toLowerCase().split('/')[0]))
      )
      skills = [...skills, ...fallback.slice(0, 2)].slice(0, 8)
    }

    skillCategories.push({
      id: catId,
      title: config.title,
      icon: iconNames[idx % iconNames.length],
      color: config.color,
      iconColor: config.iconColor,
      skills,
    })
    idx++
  }

  const output = `/**
 * Skills - dados reais do GitHub (${GITHUB_USER})
 * Última sincronização: ${new Date().toISOString()}
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

export const skillCategories: SkillCategory[] = ${JSON.stringify(skillCategories, null, 2)}
`

  const targetPath = join(ROOT, 'src', 'data', 'skills.ts')
  writeFileSync(targetPath, output, 'utf-8')

  const totalLangs = Object.keys(langTotals).length
  console.log(`✅ ${totalLangs} linguagens detectadas em ${repoNames.length} repositórios`)
  console.log(`   Top: ${Object.entries(langTotals).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([l])=>l).join(', ')}`)
  console.log(`   Salvo em src/data/skills.ts`)
}

main()
