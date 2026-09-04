export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.7,
  delay,
  ease: EASE_SMOOTH,
})

export const staggerContainer = (staggerDelay = 0.08, initialDelay = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})
