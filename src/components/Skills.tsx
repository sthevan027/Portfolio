'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/** Stack por uso real — nomes legíveis, sem barra de porcentagem. */
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
    <section id="stack" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(3.6rem,10vw,6rem)] font-extrabold uppercase leading-[0.85] text-ink lg:col-span-6">
            {t('stack.title')}
          </h2>
          <p className="max-w-[48ch] text-[1.2rem] leading-relaxed text-steel lg:col-span-6">{t('stack.lede')}</p>
        </div>

        <div className="mt-12 grid gap-0 border-t-[3px] border-ink lg:grid-cols-3">
          {GROUPS.map((g, i) => (
            <div
              key={g.key}
              className={`border-b-[3px] border-ink py-8 lg:border-b-0 ${i > 0 ? 'lg:border-l-[3px] lg:pl-8' : ''} ${i < GROUPS.length - 1 ? 'lg:pr-8' : ''}`}
            >
              <h3 className="font-display text-[2.2rem] font-extrabold uppercase text-ink">{t(`stack.${g.key}`)}</h3>
              <p className="mt-2 text-[1rem] text-steel">{t(`stack.${g.key}Text`)}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[6px] bg-white px-3 py-1.5 font-display text-[1.15rem] font-bold uppercase tracking-wide text-ink ring-2 ring-inset ring-ink"
                  >
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
