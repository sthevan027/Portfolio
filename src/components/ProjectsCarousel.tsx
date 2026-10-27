'use client'

import { useState, type KeyboardEvent, type TouchEvent } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Project } from '@/data/projects'
import { localized } from '@/lib/project-i18n'
import { CategoryTag, ProjectLinks } from '@/components/ProjectCard'

/** Quantos cartões ficam visíveis de cada lado do cartão ativo. */
const VISIBLE_SIDE = 2

/**
 * Carrossel em perspectiva: o cartão ativo fica no centro, os vizinhos
 * recuam e giram. Setas, pontos, teclado e arrastar no toque.
 */
export default function ProjectsCarousel({ items }: { items: Project[] }) {
  const { t, language } = useLanguage()
  const [index, setIndex] = useState(0)
  const [touchX, setTouchX] = useState<number | null>(null)
  const last = items.length - 1

  const go = (next: number) => setIndex(Math.max(0, Math.min(last, next)))

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(index - 1)
    if (e.key === 'ArrowRight') go(index + 1)
  }

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => setTouchX(e.touches[0].clientX)
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchX === null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1)
    setTouchX(null)
  }

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={t('projects.carouselLabel')}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-sign focus-visible:ring-offset-4 rounded-2xl"
    >
      <div className="relative h-[520px] overflow-hidden sm:h-[560px] [perspective:1200px]">
        {items.map((p, i) => {
          const offset = i - index
          const abs = Math.abs(offset)
          const hidden = abs > VISIBLE_SIDE
          const active = offset === 0
          const L = localized(p, language)
          return (
            <div
              key={p.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              aria-hidden={!active}
              onClick={() => !active && go(i)}
              className={`absolute left-1/2 top-1/2 w-[min(78vw,340px)] -translate-x-1/2 -translate-y-1/2 transition-[transform,opacity] duration-500 ease-out ${
                active ? 'cursor-default' : 'cursor-pointer'
              } ${hidden ? 'pointer-events-none opacity-0' : ''}`}
              style={{
                transform: `translate(calc(-50% + ${offset * 62}%), -50%) scale(${active ? 1 : 1 - 0.14 * abs}) rotateY(${-offset * 14}deg)`,
                zIndex: 100 - abs,
                opacity: hidden ? 0 : 1 - 0.22 * abs,
              }}
            >
              <article className={`plate flex flex-col overflow-hidden ${active ? 'shadow-[0_24px_50px_-20px_rgb(15_23_42/0.35)]' : ''}`}>
                {p.previewImage && (
                  <div className="relative aspect-[4/3] w-full border-b border-line bg-paper">
                    <Image
                      src={p.previewImage}
                      alt={`${t('projects.previewAlt')}: ${L.title}`}
                      fill
                      sizes="(min-width: 640px) 340px, 78vw"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <CategoryTag category={p.category} className="self-start" />
                  <h3 className="text-[1.35rem] font-bold leading-tight text-ink">{L.title}</h3>
                  {active && <p className="line-clamp-3 text-[15px] leading-relaxed text-steel">{L.description}</p>}
                  {active && (
                    <div className="mt-auto pt-2">
                      <ProjectLinks project={p} />
                    </div>
                  )}
                </div>
              </article>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label={t('projects.prev')}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-sign hover:text-sign disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {items.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`${t('projects.goTo')} ${i + 1}: ${localized(p, language).title}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${i === index ? 'w-7 bg-sign' : 'w-2.5 bg-line hover:bg-steel/40'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          aria-label={t('projects.next')}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-sign hover:text-sign disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
