'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/** Ferramentas por uso real, em uma faixa enxuta: o cliente só precisa saber que a base é sólida. */
const TOOLS = [
  'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Supabase', 'PostgreSQL', 'PWA',
  'Python', 'OCR (Tesseract)', 'pandas', 'openpyxl', 'pdfplumber', 'pywebview',
  'Git', 'GitHub Actions', 'Vercel', 'Docker',
]

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="stack" aria-labelledby="stack-title" className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0 lg:w-64">
            <h2 id="stack-title" className="text-[1.25rem] font-bold text-ink">
              {t('stack.title')}
            </h2>
            <p className="mt-1 text-[15px] text-steel">{t('stack.lede')}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {TOOLS.map((item) => (
              <li key={item} className="rounded-full bg-paper px-3 py-1.5 text-[14px] font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
