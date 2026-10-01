'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { projects } from '@/data/projects'

/**
 * Quadro de resultados — o "estamos há X dias sem acidentes" do canteiro, com
 * os ganhos medidos no lugar dos dias. Cada dígito é uma plaquinha que vira
 * (0 → valor) quando o quadro entra na tela. O valor final já vem no HTML:
 * sem JS ou com reduced-motion, o quadro aparece parado e completo.
 */

function useBoardInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true)
          io.disconnect()
        }
      },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, run }
}

function FlipDigit({ char, run, delay }: { char: string; run: boolean; delay: number }) {
  const target = /\d/.test(char) ? Number(char) : null
  const [shown, setShown] = useState(char)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!run) return
    const steps = target === null ? [char] : Array.from({ length: target + 1 }, (_, i) => String(i))
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const step = () => {
      setShown(steps[i])
      setTick((n) => n + 1)
      i += 1
      if (i < steps.length) timer = setTimeout(step, 85)
    }
    timer = setTimeout(step, delay)
    return () => clearTimeout(timer)
  }, [run, char, target, delay])

  return (
    <span className="relative inline-flex h-[1.18em] w-[0.86em] items-center justify-center overflow-hidden rounded-[6px] bg-ink text-sign shadow-[0_6px_14px_-8px_rgb(0_0_0/0.6)] [perspective:400px]">
      <span key={tick} className={tick > 0 ? 'flip-in' : undefined}>
        {shown}
      </span>
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-black/70" aria-hidden />
    </span>
  )
}

function Digits({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  return (
    <span className="tabular inline-flex gap-[0.12em] font-display font-extrabold" aria-hidden>
      {value.split('').map((c, i) => (
        <FlipDigit key={`${c}-${i}`} char={c} run={run} delay={delay + i * 120} />
      ))}
    </span>
  )
}

function Row({
  label,
  source,
  children,
  sr,
}: {
  label: string
  source: string
  children: React.ReactNode
  sr: string
}) {
  return (
    <li className="grid gap-4 border-t-[3px] border-ink px-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
      <div>
        <p className="font-display text-[1.6rem] font-bold uppercase leading-none text-ink sm:text-[1.85rem]">
          {label}
        </p>
        <p className="mt-2 text-[15px] text-steel">{source}</p>
      </div>
      <div className="text-[3.4rem] leading-none sm:text-[4rem]">
        <span className="sr-only">{sr}</span>
        {children}
      </div>
    </li>
  )
}

export default function ResultsBoard() {
  const { t } = useLanguage()
  const { ref, run } = useBoardInView<HTMLDivElement>()
  const total = String(projects.length)

  const beforeAfter = (before: string, after: string, delay: number, beforeLabel: string, afterLabel: string) => (
    <span className="flex items-end gap-3 sm:gap-4">
      <span className="flex flex-col items-center gap-1.5">
        <Digits value={before} run={run} delay={delay} />
        <span className="font-display text-sm font-bold uppercase tracking-wider text-steel">{beforeLabel}</span>
      </span>
      <ArrowRight className="mb-9 h-8 w-8 shrink-0 text-ink" aria-hidden />
      <span className="flex flex-col items-center gap-1.5">
        <Digits value={after} run={run} delay={delay + 380} />
        <span className="font-display text-sm font-bold uppercase tracking-wider text-ink">{afterLabel}</span>
      </span>
    </span>
  )

  return (
    <section aria-labelledby="board-title" className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-site px-3 sm:px-6 lg:px-8">
        <div ref={ref} className="plate p-[16px]">
          <div className="overflow-hidden rounded-[6px]">
          <div className="bg-ink px-5 pb-6 pt-7 sm:px-8">
            <h2 id="board-title" className="font-display text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold uppercase text-sign">
              {t('board.title')}
            </h2>
            <p className="mt-3 max-w-[60ch] text-[1.05rem] text-paper/80">{t('board.lede')}</p>
          </div>
          <ul>
            <Row
              label={t('board.reportsLabel')}
              source={t('board.reportsSource')}
              sr={`${t('board.before')} 1, ${t('board.after')} 3`}
            >
              {beforeAfter('1', '3', 0, t('board.before'), t('board.after'))}
            </Row>
            <Row
              label={t('board.artLabel')}
              source={t('board.artSource')}
              sr={`${t('board.before')} 5 ${t('board.artBeforeUnit')}, ${t('board.after')} ½ ${t('board.artAfterUnit')}`}
            >
              {beforeAfter('5', '½', 250, `${t('board.artBeforeUnit')} · ${t('board.before')}`, `${t('board.artAfterUnit')} · ${t('board.after')}`)}
            </Row>
            <Row label={t('board.deliveredLabel')} source={t('board.deliveredSource')} sr="10">
              <Digits value="10" run={run} delay={500} />
            </Row>
            <Row label={t('board.portfolioLabel')} source={t('board.portfolioSource')} sr={total}>
              <Digits value={total} run={run} delay={750} />
            </Row>
          </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
