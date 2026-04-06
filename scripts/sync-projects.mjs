#!/usr/bin/env node
/**
 * Script para sincronizar projetos do GitHub com o portfólio
 * Inclui links de demo da Vercel quando disponíveis
 * 
 * Uso: node scripts/sync-projects.mjs
 * Ou: pnpm run sync:projects
 * 
 * Requer: gh CLI instalado e autenticado (gh auth login)
 * Opcional: VERCEL_TOKEN para buscar demos na Vercel
 *   Obtenha em: https://vercel.com/account/tokens
 */

import { execSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const path = join(ROOT, file)
    if (existsSync(path)) {
      const content = readFileSync(path, 'utf-8')
      for (const line of content.split('\n')) {
        const m = line.match(/^([^#=]+)=(.*)$/)
        if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '')
      }
      break
    }
  }
}
loadEnv()

const GITHUB_USER = 'sthevan027'
const GH_FIELDS = 'name,description,url,primaryLanguage,isFork,updatedAt,homepageUrl,languages'
const VERCEL_TOKEN = process.env.VERCEL_TOKEN

const FEATURED_REPOS = [
  'codefocus',
  'ceo-os',
  'gh-dev-analyzer',
  'eletrolab',
  'system-control',
]

/** Pré-visualizações em public/projects/ — mantém após cada sync */
const PREVIEW_IMAGES = {
  'ceo-os': '/projects/ceo-os.svg',
  codefocus: '/projects/codefocus.svg',
  'gh-dev-analyzer': '/projects/gh-dev-analyzer.svg',
  eletrolab: '/projects/eletrolab.svg',
  'system-control': '/projects/system-control.svg',
}

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

async function fetchVercelDemos() {
  if (!VERCEL_TOKEN) {
    console.log('   ℹ️  VERCEL_TOKEN não definido — demos virão só do GitHub (homepageUrl)')
    console.log('      Defina em: https://vercel.com/account/tokens')
    return {}
  }

  const map = {}
  const headers = { Authorization: `Bearer ${VERCEL_TOKEN}` }

  try {
    const listRes = await fetch('https://api.vercel.com/v9/projects?limit=100', { headers })
    if (!listRes.ok) throw new Error(`Vercel API: ${listRes.status} ${await listRes.text()}`)
    const listData = await listRes.json()
    const projects = listData.projects || listData

    for (const p of projects) {
      const repo = (p.link?.repo || p.name || '').replace(/^.+\//, '').toLowerCase()
      if (!repo) continue

      let url = null

      function setUrl(v) {
        if (v && !url) url = v.startsWith('http') ? v : `https://${v}`
      }

      if (p.targets?.production?.alias) {
        const a = p.targets.production.alias
        setUrl(Array.isArray(a) ? a[0] : a)
      }
      if (p.alias?.length) {
        const prod = p.alias.find((a) => (a.target || a.deployment?.target) === 'production')
        setUrl(prod?.domain || prod?.deployment?.url)
      }
      if (p.latestDeployments?.production) {
        const d = p.latestDeployments.production
        setUrl(d.url || d.domain)
      }

      if (!url && p.name) {
        const detailRes = await fetch(
          `https://api.vercel.com/v9/projects/${encodeURIComponent(p.name)}`,
          { headers }
        )
        if (detailRes.ok) {
          const detail = await detailRes.json()
          const alias = detail.targets?.production?.alias ?? detail.alias
          if (alias?.length) {
            const prod = alias.find((a) => (a.target || a.deployment?.target) === 'production')
            setUrl(prod?.domain || prod?.deployment?.url)
          }
          if (!url && detail.latestDeployments?.production) {
            const d = detail.latestDeployments.production
            setUrl(d?.url || d?.domain)
          }
        }
      }

      if (url) map[repo] = url
    }
    console.log(`   ✅ ${Object.keys(map).length} demos encontrados na Vercel`)
  } catch (e) {
    console.warn('   ⚠️  Erro ao buscar Vercel:', e.message)
  }
  return map
}

async function main() {
  console.log('🔄 Sincronizando projetos do GitHub...\n')

  const [repos, vercelDemos] = await Promise.all([
    Promise.resolve(
      runGh(`gh repo list ${GITHUB_USER} --limit 30 --json ${GH_FIELDS} --source`)
    ),
    fetchVercelDemos(),
  ])

  const exclude = ['portiflio', 'Config', 'Curriculo', 'sthevan027', 'Strivo', 'ResolveJa', 'FORGE', 'organizador', 'Converso']
  const filtered = repos.filter(r => !exclude.includes(r.name) && !r.isFork && r.description)

  const projects = filtered.map((repo, i) => {
    const repoKey = repo.name.toLowerCase()
    const demo = vercelDemos[repoKey] || null
    const featured = FEATURED_REPOS.includes(repoKey)

    const previewImage = PREVIEW_IMAGES[repoKey]

    return {
      id: i + 1,
      title: formatTitle(repo.name),
      description: repo.description || 'Projeto no GitHub',
      image: '/api/placeholder/400/250',
      category: mapToCategory(repo),
      technologies: formatTechnologies(repo),
      github: repo.url,
      demo,
      featured,
      ...(previewImage ? { previewImage } : {}),
    }
  })

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
  previewImage?: string
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
  const withDemo = projects.filter(p => p.demo).length
  console.log(`   Com demo: ${withDemo} projetos`)
}

main().catch(console.error)
