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
const GH_FIELDS = 'name,description,url,primaryLanguage,isFork,isPrivate,updatedAt,homepageUrl,languages'
const VERCEL_TOKEN = process.env.VERCEL_TOKEN

const FEATURED_REPOS = [
  'gerador-de-relatorio',
  'gerador-de-art',
  'ceo-os',
  'devradar',
  'laudofacil',
]

/** Pré-visualizações em public/projects/ — mantém após cada sync */
const PREVIEW_IMAGES = {
  'analisado-de-contratos': '/projects/analisado-de-contratos.png',
  'analise_medicao': '/projects/analise-medicao.png',
  ataai: '/projects/ataai.png',
  'ceo-os': '/projects/atlas.png',
  'claude-glass': '/projects/claude-glass.png',
  'cracha-digital': '/projects/cracha-digital.png',
  dashboardcusto: '/projects/dashboardcusto.png',
  devradar: '/projects/devradar.png',
  focusbrew: '/projects/focusbrew.png',
  'gerador-de-art': '/projects/gerador-de-art.png',
  'gerador-de-relatorio': '/projects/gerador-de-relatorio.png',
  'gnome-pr-indicator': '/projects/gnome-pr-indicator.png',
  laudofacil: '/projects/laudofacil.png',
  meusalario: '/projects/meusalario.png',
  mypage: '/projects/mypage.png',
  obratrack: '/projects/obratrack.png',
  'painel-gerencial': '/projects/painel-gerencial.png',
  placadedadosusina1e2: '/projects/placadedadosusina1e2.png',
  pontoleve: '/projects/pontoleve.png',
}

/**
 * Ganho de produtividade medido pelo autor (antes → depois).
 * Só entram números reais informados, não estimativas.
 */
const IMPACT_METRICS = {
  'gerador-de-relatorio': 'De 1 para 3 relatórios processados por dia',
  'gerador-de-art': 'De 5 dias para meio dia por ART',
}

/**
 * Ajustes do portfólio por repo: título com acento / nome do produto (quando o
 * repo não foi renomeado), descrição e stack real (do package.json /
 * requirements.txt de cada projeto — as linguagens do GitHub não dizem o
 * framework).
 */
const OVERRIDES = {
  'ceo-os': {
    title: 'Atlas',
    description:
      'Sistema pessoal de evolução: tarefas, hábitos, saúde e log diário em um só lugar. PWA em React + TypeScript com Supabase (Auth/RLS).',
    stack: ['React', 'TypeScript', 'Supabase', 'PWA'],
  },
  'gerador-de-relatorio': { title: 'Gerador de Relatório', stack: ['Python', 'pywebview', 'OCR (Tesseract)', 'openpyxl'] },
  'gerador-de-art': { title: 'Gerador de ART', stack: ['Python', 'pywebview', 'openpyxl'] },
  'painel-gerencial': { title: 'Painel Gerencial', category: 'fullstack', stack: ['Python', 'Flask', 'Plotly', 'pandas'] },
  'analisado-de-contratos': { title: 'Analisador de Contratos', stack: ['Python', 'Flask', 'openpyxl', 'Chart.js'] },
  analise_medicao: { title: 'Análise de Medição', stack: ['Python', 'OCR (Tesseract)', 'pandas', 'pdfplumber'] },
  'claude-glass': { title: 'Claude Glass', stack: ['Electron', 'JavaScript', 'Node.js'] },
  meusalario: { title: 'MeuSalário', stack: ['Next.js', 'TypeScript', 'Supabase', 'Recharts'] },
  laudofacil: {
    title: 'LaudoFácil',
    description:
      'Relatórios de qualidade elétrica — Megger, microhmímetro, hipot, lançamento de cabo (NBR 5410) e teste de disjuntor — com entrada manual ou cálculo automático e exportação em PDF e Excel.',
    stack: ['React', 'TypeScript', 'Dexie (IndexedDB)', 'Chart.js'],
  },
  devradar: { title: 'DevRadar', stack: ['PowerShell', 'GitHub API'] },
  obratrack: { title: 'ObraTrack', category: 'frontend', stack: ['SolidJS', 'TypeScript', 'Vite'] },
  pontoleve: { title: 'PontoLeve', stack: ['React', 'React Router', 'Vite'] },
  ataai: { title: 'AtaAI', stack: ['Node.js', 'Express', 'OpenAI', 'PostgreSQL', 'React'] },
  'cracha-digital': { title: 'Crachá Digital', category: 'fullstack', stack: ['Next.js', 'TypeScript', 'SQLite'] },
  focusbrew: {
    title: 'focusbrew',
    description:
      'App de bandeja que percebe quando você está programando com IA, liga o modo foco (bloqueia distrações e ativa o Não Perturbe) e reúne tarefas, PRs do GitHub e um timer com pausa-café.',
    stack: ['Tauri', 'Rust', 'React', 'TypeScript'],
  },
  'gnome-pr-indicator': { title: 'PR Indicator', stack: ['GJS', 'GNOME Shell', 'GitHub API'] },
  dashboardcusto: {
    title: 'DashboardCusto',
    description:
      'Dashboard de custos de obra (orçado × realizado) por grupo, subgrupo e item, com views no Postgres, RLS e trilha de auditoria dos lançamentos.',
    stack: ['React', 'Supabase', 'PostgreSQL'],
  },
  mypage: { title: 'mypage', stack: ['Next.js', 'TypeScript'] },
  placadedadosusina1e2: { title: 'Painel de Obras', stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
}

/**
 * Versão em inglês (modo EN do site), por repo — ou pelo título nos projetos
 * manuais. Nomes de produto ficam como estão; só os descritivos são traduzidos.
 */
const EN = {
  dashboardcusto: {
    description:
      'Construction cost dashboard (budgeted × actual) by group, subgroup and item, with Postgres views, RLS and an audit trail of every entry.',
  },
  'claude-glass': {
    description: 'Desktop widget that shows your Claude Code usage, with a pixel-art pet.',
  },
  'ceo-os': {
    description:
      'Personal growth system: tasks, habits, health and a daily log in one place. A React + TypeScript PWA on Supabase (Auth/RLS).',
  },
  'gnome-pr-indicator': {
    description:
      'GNOME Shell extension — a top-bar indicator showing the PRs waiting for your review and your own open PRs on GitHub.',
  },
  analise_medicao: {
    title: 'Measurement Analysis',
    description:
      'Python pipeline that automates the monthly measurement of an industrial site: reads weighbridge tickets from PDFs (with OCR), matches them to the contract price table and outputs the Excel report of the amount to bill.',
  },
  'painel-gerencial': {
    title: 'Management Dashboard',
    description:
      'Desktop dashboard (Flask + pywebview) to track a construction project physically and financially: budget vs. measured, ABC curve, schedule and measurement bulletins (sample data).',
  },
  meusalario: {
    description:
      'Brazilian salary simulator comparing employee (CLT) vs. contractor (PJ/MEI) pay, with INSS/IRRF tax math and personal finance tracking. Next.js + TypeScript.',
  },
  'gerador-de-art': {
    title: 'ART Generator',
    description:
      'Desktop app that assembles task risk analyses (ARTs) from a history of approved risks.',
    impact: 'From 5 days to half a day per ART',
  },
  focusbrew: {
    description:
      'Tray app that notices when you are coding with AI, turns on focus mode (blocks distractions, enables Do Not Disturb) and gathers tasks, GitHub PRs and a timer with coffee breaks.',
  },
  'gerador-de-relatorio': {
    title: 'Report Generator',
    description:
      'Desktop app (Python + pywebview) that builds the visual disposal report from weighbridge-ticket PDFs (with OCR), fills the Excel template with the ticket photo, prevents duplicate reports and keeps the control map and approval status in sync.',
    impact: 'From 1 to 3 reports processed per day',
  },
  'analisado-de-contratos': {
    title: 'Contract Analyzer',
    description:
      'Reads contract budget spreadsheets (QQP/LD/CPU) and builds a local financial dashboard (Flask + Chart.js) with cost breakdown by group and a planned S-curve.',
  },
  laudofacil: {
    description:
      'Electrical quality reports — Megger, micro-ohmmeter, hipot, cable sizing (NBR 5410) and breaker tests — with manual input or automatic calculation and PDF/Excel export.',
  },
  'cracha-digital': {
    title: 'Digital Badge',
    description:
      'Digital badge prototype with a QR code: a public page with the worker’s details and the status of their safety trainings. Next.js + SQLite.',
  },
  devradar: {
    description: 'CLI that analyzes GitHub profiles and generates an HTML report with metrics and insights.',
  },
  pontoleve: {
    description: 'Employee portal / HR prototype (React): timesheet, vacation, payslips and profile.',
  },
  ataai: {
    description: 'Meeting automation: syncs meetings, summarizes them with AI into action items and sends the follow-ups.',
  },
  obratrack: {
    description:
      'Material traceability and control system — QR codes and operational organization for industrial construction sites.',
  },
  mypage: {
    description: 'Personal hub page (Next.js + TypeScript) with posts, links and resume.',
  },
  placadedadosusina1e2: {
    title: 'Site Board',
    description:
      'Static construction-site tracking page: banner and quick-access cards to project files, configurable through a JSON file.',
  },
  'RDO Fotos': {
    title: 'RDO Photos',
    description:
      'Desktop app that files the daily site report (RDO) photos received on WhatsApp straight into each asset’s folder — one click per photo, with content-based duplicate checking.',
  },
  CopyAutomity: {
    description:
      'Automation that copies and renames the measurement tickets every day at 7 a.m., organizing them by month with no manual work.',
  },
}

/**
 * Projetos locais que ainda não têm repositório no GitHub — mantidos aqui
 * porque o sync sobrescreve todo o projects.ts a cada execução.
 */
const MANUAL_PROJECTS = [
  {
    title: 'RDO Fotos',
    description:
      'App desktop que organiza as fotos do RDO (WhatsApp) direto nas pastas de cada ativo, com fluxo de 1 clique por foto e checagem de duplicidade por conteúdo.',
    category: 'automation',
    technologies: ['Python', 'Tkinter', 'Pillow'],
    github: null,
    demo: null,
    featured: false,
    previewImage: '/projects/rdo-fotos.png',
  },
  {
    title: 'CopyAutomity',
    description:
      'Automação que copia e renomeia os tickets de medição todo dia às 07h, organizando por mês sem intervenção manual.',
    category: 'automation',
    technologies: ['Python', 'Agendador do Windows'],
    github: null,
    demo: null,
    featured: false,
    previewImage: '/projects/copyautomity.png',
  },
]

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
      runGh(`gh repo list ${GITHUB_USER} --limit 100 --json ${GH_FIELDS} --source`)
    ),
    fetchVercelDemos(),
  ])

  const exclude = [
    'portiflio', 'Config', 'Curriculo', 'sthevan027', 'Strivo', 'ResolveJa', 'FORGE', 'organizador', 'Converso',
    // Sem peso no portfólio (estudo, config ou o próprio site)
    'Calculadora.dotnet', 'Dotfile', 'Engenheiro-de-software', 'Portfolio', 'AgendaZap',
    // Com JL no nome
    'painel-gerencial-JL',
    // Removido a pedido
    'System-control',
    // Pessoais, nunca publicar
    'meu2cerebro', 'jarvis-core', 'virex-site-prototipos',
  ]
  const filtered = repos.filter(r => !exclude.includes(r.name) && !r.isFork && r.description)

  const syncedProjects = filtered.map((repo, i) => {
    const repoKey = repo.name.toLowerCase()
    const demo = vercelDemos[repoKey] || null
    const featured = FEATURED_REPOS.includes(repoKey)

    const previewImage = PREVIEW_IMAGES[repoKey]
    const impact = IMPACT_METRICS[repoKey]

    return {
      id: i + 1,
      title: OVERRIDES[repoKey]?.title ?? formatTitle(repo.name),
      description: OVERRIDES[repoKey]?.description ?? (repo.description || 'Projeto no GitHub'),
      image: '/api/placeholder/400/250',
      category: OVERRIDES[repoKey]?.category ?? mapToCategory(repo),
      technologies: OVERRIDES[repoKey]?.stack ?? formatTechnologies(repo),
      // Repo privado daria 404 pro visitante: sem botão "Código"
      github: repo.isPrivate ? null : repo.url,
      demo,
      featured,
      ...(previewImage ? { previewImage } : {}),
      ...(impact ? { impact } : {}),
      ...(EN[repoKey]?.title ? { titleEn: EN[repoKey].title } : {}),
      ...(EN[repoKey]?.description ? { descriptionEn: EN[repoKey].description } : {}),
      ...(EN[repoKey]?.impact ? { impactEn: EN[repoKey].impact } : {}),
    }
  })

  const projects = [
    ...syncedProjects,
    ...MANUAL_PROJECTS.map((p, i) => ({
      id: syncedProjects.length + i + 1,
      image: '/api/placeholder/400/250',
      ...p,
      ...(EN[p.title]?.title ? { titleEn: EN[p.title].title } : {}),
      ...(EN[p.title]?.description ? { descriptionEn: EN[p.title].description } : {}),
    })),
  ]

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
  github: string | null
  demo: string | null
  featured: boolean
  impact?: string
  titleEn?: string
  descriptionEn?: string
  impactEn?: string
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
