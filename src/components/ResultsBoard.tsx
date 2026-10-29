'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

/**
 * Números medidos, em destaque. Cada dígito gira até o valor quando o bloco
 * entra na tela. O valor final já vem no HTML: sem JS ou com reduced-motion,
 * os números aparecem parados e completos.
 */

function useInView<T extends Element>() {
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
    <span className="relative inline-flex h-[1.1em] min-w-[0.8em] items-center justify-center overflow-hidden whitespace-nowrap rounded-xl bg-ink px-[0.14em] text-white shadow-[0_6px_14px_-8px_rgb(15_23_42/0.5)] [perspective:400px]">
      <span key={tick} className={tick > 0 ? 'flip-in' : undefined}>
        {shown}
      </span>
    </span>
  )
}

function Digits({ value, run, delay = 0 }: { value: string; run: boolean; delay?: number }) {
  return (
    <span className="tabular inline-flex gap-[0.1em] font-extrabold tracking-tight" aria-hidden>
      {value.split('').map((c, i) => (
        <FlipDigit key={`${c}-${i}`} char={c} run={run} delay={delay + i * 120} />
      ))}
    </span>
  )
}

function Stat({
  label,
  source,
  sr,
  children,
}: {
  label: string
  source: string
  sr: string
  children: React.ReactNode
}) {
  return (
    <li className="flex flex-col gap-5 p-6 sm:p-7">
      <div className="text-[3rem] leading-none sm:text-[3.5rem]">
        <span className="sr-only">{sr}</span>
        {children}
      </div>
      <div>
        <p className="text-[1.05rem] font-semibold leading-snug text-ink">{label}</p>
        <p className="mt-1 text-[14px] text-steel">{source}</p>
      </div>
    </li>
  )
}

export default function ResultsBoard() {
  const { t } = useLanguage()
  const { ref, run } = useInView<HTMLDivElement>()

  const beforeAfter = (before: string, after: string, delay: number, beforeLabel: string, afterLabel: string) => (
    <span className="flex items-end gap-3">
      <span className="flex flex-col items-center gap-2">
        <Digits value={before} run={run} delay={delay} />
        <span className="text-[13px] font-medium text-steel">{beforeLabel}</span>
      </span>
      <ArrowRight className="mb-8 h-6 w-6 shrink-0 text-sign" aria-hidden />
      <span className="flex flex-col items-center gap-2">
        <Digits value={after} run={run} delay={delay + 380} />
        <span className="text-[13px] font-semibold text-ink">{afterLabel}</span>
      </span>
    </span>
  )

  return (
    <section id="board" aria-labelledby="board-title" className="bg-paper py-12 sm:py-16">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="board-title" className="text-[clamp(2.2rem,4.6vw,3.25rem)] font-extrabold text-ink">
            {t('board.title')}
          </h2>
          <p className="mt-4 text-[1.125rem] leading-relaxed text-steel">{t('board.lede')}</p>
        </div>

        <div ref={ref} className="plate mt-12 overflow-hidden">
          <ul className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <Stat
              label={t('board.reportsLabel')}
              source={t('board.reportsSource')}
              sr={`${t('board.before')} 1, ${t('board.after')} 3`}
            >
              {beforeAfter('1', '3', 0, t('board.before'), t('board.after'))}
            </Stat>
            <Stat
              label={t('board.artLabel')}
              source={t('board.artSource')}
              sr={`${t('board.before')} 5 ${t('board.artBeforeUnit')}, ${t('board.after')} ½ ${t('board.artAfterUnit')}`}
            >
              {beforeAfter('5', '½', 250, `${t('board.artBeforeUnit')}`, `${t('board.artAfterUnit')}`)}
            </Stat>
            <Stat label={t('board.deliveredLabel')} source={t('board.deliveredSource')} sr="10">
              <Digits value="10" run={run} delay={500} />
            </Stat>
          </ul>
        </div>
      </div>
    </section>
  )
}
