import type { Variants } from 'framer-motion'

// Reusable fade-up — the workhorse for scroll-in sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stagger container — wraps a list of children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

// Card variant for property grids (slightly less travel)
export const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

// Fade only (no movement) — for overlays, lightboxes
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

// Slide in from left (for mobile menus)
export const slideDown: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

// Hero image scale (very gentle — 1.05 → 1)
export const heroImageScale: Variants = {
  hidden: { scale: 1.06, opacity: 0.85 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
}

// Stagger delay helper
export const delay = (d: number) => ({
  transition: { delay: d },
})
