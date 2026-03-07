#!/usr/bin/env node
/**
 * Script para sincronizar projetos do GitHub com o portfólio
 * Uso: node scripts/sync-projects.mjs
 * Ou: pnpm run sync:projects
 * 
 * Requer: gh CLI instalado e autenticado (gh auth login)
 */

import { execSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const GITHUB_USER = 'sthevan027'
const GH_FIELDS = 'name,description,url,primaryLanguage,isFork,updatedAt,homepageUrl,languages'

const categoryMap = {
  fullstack: ['typescript', 'javascript', 'react', 'node', 'gestao', 'dashboard', 'fullstack'],
  frontend: ['typescript', 'javascript', 'react', 'html', 'css'],
  backend: ['python', 'node', 'go', 'php'],
  automation: ['python', 'bot', 'cli', 'powershell', 'ai']
}

function mapToCategory(repo) {
  const topics = (repo.repositoryTopics || []).map(t => t.name?.toLowerCase()).filter(Boolean)
  const languages = (repo.languages || []).map(l => l.node?.name?.toLowerCase()).filter(Boolean)
  const desc = (repo.description || '').toLowerCase()
  const combined = [...topics, ...languages, desc].join(' ')

  if (combined.includes('bot') || combined.includes('cli') || combined.includes('automation') || combined.includes('ai')) {
    return 'automation'
  }
  if (combined.includes('gestao') || combined.includes('dashboard') || combined.includes('fullstack') || combined.includes('plpgsql')) {
    return 'fullstack'
  }
  if (combined.includes('python') && !combined.includes('react')) {
    return 'automation'
  }
  if (combined.includes('typescript') || combined.includes('javascript') || combined.includes('react')) {
    return combined.includes('plpgsql') || combined.includes('node') ? 'fullstack' : 'frontend'
  }

  return 'fullstack'
}

function formatTitle(name) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace(/\.(\w)/g, (_, c) => ` ${c.toUpperCase()}`)
    .replace(/ Ia$/i, ' IA')
}

function formatTechnologies(repo) {
  const langs = (repo.languages || [])
    .sort((a, b) => (b.size || 0) - (a.size || 0))
    .slice(0, 5)
    .map(l => l.node?.name)
    .filter(Boolean)
  if (repo.primaryLanguage?.name && !langs.includes(repo.primaryLanguage.name)) {
    langs.unshift(repo.primaryLanguage.name)
  }
  return [...new Set(langs)].slice(0, 5)
}

function runGh(command) {
  try {
    const out = execSync(command, { encoding: 'utf-8' })
    return JSON.parse(out)
  } catch (e) {
    console.error('Erro ao executar gh:', e.message)
    console.error('Certifique-se de que o gh CLI está instalado e autenticado: gh auth login')
    process.exit(1)
  }
}

function main() {
  console.log('🔄 Sincronizando projetos do GitHub...\n')

  const repos = runGh(
    `gh repo list ${GITHUB_USER} --limit 30 --json ${GH_FIELDS} --source`
  )

  const exclude = ['portiflio', 'Config', 'Curriculo', 'sthevan027', 'Strivo', 'ResolveJa', 'FORGE', 'organizador', 'Converso']
  const filtered = repos.filter(r => !exclude.includes(r.name) && !r.isFork && r.description)

  const projects = filtered.map((repo, i) => ({
    id: i + 1,
    title: formatTitle(repo.name),
    description: repo.description || 'Projeto no GitHub',
    image: '/api/placeholder/400/250',
    category: mapToCategory(repo),
    technologies: formatTechnologies(repo),
    github: repo.url,
    demo: repo.homepageUrl || null,
    featured: i < 3
  }))

  const output = `/**
 * Dados dos projetos - sincronizados com GitHub (${GITHUB_USER})
 * Última sincronização: ${new Date().toISOString()}
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

export const projects: Project[] = ${JSON.stringify(projects, null, 2)}
`

  const targetPath = join(ROOT, 'src', 'data', 'projects.ts')
  writeFileSync(targetPath, output, 'utf-8')

  console.log(`✅ ${projects.length} projetos sincronizados em src/data/projects.ts`)
  console.log(`   Destaques: ${projects.filter(p => p.featured).map(p => p.title).join(', ')}`)
}

main()
