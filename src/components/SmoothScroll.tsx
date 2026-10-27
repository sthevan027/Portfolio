'use client'

import { useEffect } from 'react'

const DURATION = 900

/** Aceleração e desaceleração suaves (cúbica). */
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Rolagem animada para links internos (#seção). A rolagem com o mouse continua
 * a do navegador. Com "reduzir movimento" ativo, a rolagem é instantânea.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const root = document.documentElement
    let frame = 0

    const animateTo = (targetY: number) => {
      cancelAnimationFrame(frame)
      const startY = window.scrollY
      const distance = targetY - startY
      const startTime = performance.now()

      // desliga o scroll-behavior CSS e o encaixe durante a animação, senão cada quadro vira outra animação
      const prevBehavior = root.style.scrollBehavior
      const prevSnap = root.style.scrollSnapType
      root.style.scrollBehavior = 'auto'
      root.style.scrollSnapType = 'none'

      const step = (now: number) => {
        const p = Math.min(1, (now - startTime) / DURATION)
        window.scrollTo(0, startY + distance * easeInOutCubic(p))
        if (p < 1) {
          frame = requestAnimationFrame(step)
        } else {
          root.style.scrollBehavior = prevBehavior
          root.style.scrollSnapType = prevSnap
        }
      }
      frame = requestAnimationFrame(step)
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return
      if (!url.hash || url.hash === '#') return

      let target: Element | null = null
      try {
        target = document.querySelector(decodeURIComponent(url.hash))
      } catch {
        return
      }
      if (!target) return

      e.preventDefault()
      const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      history.pushState(null, '', url.hash)

      if (reduce.matches) window.scrollTo(0, top)
      else animateTo(top)
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
