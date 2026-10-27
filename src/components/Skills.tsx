'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/** Stack por uso real, agrupada pelo que ela resolve para o cliente. */
const GROUPS = [
  {
    key: 'product',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Supabase', 'PostgreSQL', 'PWA'],
  },
  {
    key: 'automation',
    items: ['Python', 'OCR (Tesseract)', 'pandas', 'openpyxl', 'pdfplumber', 'pywebview', 'PowerShell', 'Shell'],
  },
  {
    key: 'delivery',
    items: ['Git', 'GitHub Actions', 'Vercel', 'Docker'],
  },
] as const

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="stack" aria-labelledby="stack-title" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">{t('stack.eyebrow')}</p>
          <h2 id="stack-title" className="mt-3 text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('stack.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('stack.lede')}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.key} className="plate p-7">
              <h3 className="text-[1.25rem] font-bold text-ink">{t(`stack.${g.key}`)}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-steel">{t(`stack.${g.key}Text`)}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="rounded-full bg-paper px-3 py-1.5 text-[14px] font-medium text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
