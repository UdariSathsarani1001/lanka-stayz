import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react'
import {
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion'
import GalleryCard from './GalleryCard'
import { galleryImages } from './gallery.data'

// ─── Responsive config ────────────────────────────────────────────────────
interface RingConfig {
  radius: number
  cardWidth: number
  cardHeight: number
  perspectiveDistance: number
}

function useRingConfig(): RingConfig {
  const [config, setConfig] = useState<RingConfig>(getConfig())

  useEffect(() => {
    const update = () => setConfig(getConfig())
    const mq = window.matchMedia('(max-width: 480px)')
    const mq2 = window.matchMedia('(max-width: 768px)')
    mq.addEventListener('change', update)
    mq2.addEventListener('change', update)
    return () => {
      mq.removeEventListener('change', update)
      mq2.removeEventListener('change', update)
    }
  }, [])

  return config
}

function getConfig(): RingConfig {
  const w = window.innerWidth
  if (w < 480) {
    return { radius: 200, cardWidth: 140, cardHeight: 190, perspectiveDistance: 900 }
  }
  if (w < 768) {
    return { radius: 280, cardWidth: 180, cardHeight: 240, perspectiveDistance: 1100 }
  }
  if (w < 1024) {
    return { radius: 360, cardWidth: 210, cardHeight: 280, perspectiveDistance: 1300 }
  }
  return { radius: 460, cardWidth: 240, cardHeight: 320, perspectiveDistance: 1600 }
}

// ─── Constants ────────────────────────────────────────────────────────────
const IMAGES = galleryImages
const COUNT = IMAGES.length
const AUTO_SPEED = 0.008       // degrees per ms → very slow, cinematic
const DRAG_FACTOR = 0.35       // how much drag translates to rotation
const INERTIA_DECAY = 0.94     // how fast drag momentum decays
const RESUME_DELAY = 1200      // ms after drag ends before auto-rotation resumes

export default function GalleryRing() {
  const config = useRingConfig()
  const containerRef = useRef<HTMLDivElement>(null)

  // Current ring angle (degrees) driven by motion value for smooth updates
  const angle = useMotionValue(0)

  // Drag / interaction state (plain refs — no React state to avoid re-renders)
  const isDragging = useRef(false)
  const isHovered = useRef(false)
  const lastPointerX = useRef(0)
  const velocity = useRef(0)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoRunning = useRef(true)

  // Reduced-motion check
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ── Animation frame: auto-rotate + inertia ──────────────────────────────
  useAnimationFrame((_time, delta) => {
    if (prefersReducedMotion) return

    if (isDragging.current) {
      // Apply drag inertia when not actively dragging (finger lifted)
      if (Math.abs(velocity.current) > 0.01) {
        angle.set(angle.get() + velocity.current)
        velocity.current *= INERTIA_DECAY
      }
      return
    }

    if (!autoRunning.current || isHovered.current) return

    // Smooth auto-rotation
    angle.set(angle.get() + AUTO_SPEED * delta)
  })

  // ── Pointer handlers ─────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    autoRunning.current = false
    lastPointerX.current = e.clientX
    velocity.current = 0

    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - lastPointerX.current
      lastPointerX.current = e.clientX
      const delta = dx * DRAG_FACTOR
      angle.set(angle.get() + delta)
      velocity.current = delta
    },
    [angle],
  )

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    // Resume auto-rotation after delay (inertia will continue meanwhile)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      autoRunning.current = true
      velocity.current = 0
    }, RESUME_DELAY)
  }, [])

  // Touch: prevent vertical page scroll only when dragging horizontally
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isHorizontalDrag = useRef(false)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isHorizontalDrag.current = false
    isDragging.current = true
    autoRunning.current = false
    lastPointerX.current = e.touches[0].clientX
    velocity.current = 0
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX.current
      const dy = e.touches[0].clientY - touchStartY.current

      if (!isHorizontalDrag.current) {
        isHorizontalDrag.current = Math.abs(dx) > Math.abs(dy)
      }

      if (isHorizontalDrag.current) {
        e.stopPropagation()
        const moveDx = e.touches[0].clientX - lastPointerX.current
        lastPointerX.current = e.touches[0].clientX
        const delta = moveDx * DRAG_FACTOR
        angle.set(angle.get() + delta)
        velocity.current = delta
      }
    },
    [angle],
  )

  const onTouchEnd = useCallback(() => {
    isDragging.current = false
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      autoRunning.current = true
      velocity.current = 0
    }, RESUME_DELAY)
  }, [])

  // Hover pause (desktop)
  const onMouseEnter = useCallback(() => { isHovered.current = true }, [])
  const onMouseLeave = useCallback(() => { isHovered.current = false }, [])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [])

  // ── Ring geometry ─────────────────────────────────────────────────────────
  // Each card is placed at an angle offset around the circle.
  // We read the live angle value in the render tick via a subscriber.
  // To avoid subscribing in a way that causes re-renders, we do DOM mutation directly.
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const unsub = angle.on('change', (currentAngle) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const baseAngle = (360 / COUNT) * i
        const totalAngle = baseAngle + currentAngle
        const rad = (totalAngle * Math.PI) / 180
        const x = Math.sin(rad) * config.radius
        const z = Math.cos(rad) * config.radius
        // Depth-based opacity: front = 1, back = 0.45
        const normalizedZ = (z + config.radius) / (2 * config.radius) // 0–1
        const opacity = 0.45 + normalizedZ * 0.55
        // Depth-based scale: front = 1, back = 0.78
        const scale = 0.78 + normalizedZ * 0.22

        el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${totalAngle}deg) scale(${scale})`
        el.style.opacity = String(opacity)
        // Higher z-index for front cards so they naturally layer
        el.style.zIndex = String(Math.round(normalizedZ * 100))
      })
    })

    return unsub
  }, [angle, config.radius])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        height: config.cardHeight + config.radius * 0.7,
        perspective: config.perspectiveDistance,
        perspectiveOrigin: '50% 50%',
        cursor: isDragging.current ? 'grabbing' : 'grab',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Interactive 3D gallery of Sri Lankan accommodation. Drag to rotate."
      role="region"
    >
      {/* The 3D stage — cards are positioned relative to this centre point */}
      <div
        className="relative"
        style={{
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {IMAGES.map((image, i) => {
          // Initial CSS position — JS will update via ref after mount
          const baseAngle = (360 / COUNT) * i
          const rad = (baseAngle * Math.PI) / 180
          const x = Math.sin(rad) * config.radius
          const z = Math.cos(rad) * config.radius
          const normalizedZ = (z + config.radius) / (2 * config.radius)
          const opacity = 0.45 + normalizedZ * 0.55
          const scale = 0.78 + normalizedZ * 0.22

          return (
            <div
              key={image.id}
              ref={(el) => { cardRefs.current[i] = el }}
              className="absolute"
              style={{
                width: config.cardWidth,
                height: config.cardHeight,
                marginLeft: -config.cardWidth / 2,
                marginTop: -config.cardHeight / 2,
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${baseAngle}deg) scale(${scale})`,
                opacity,
                zIndex: Math.round(normalizedZ * 100),
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
              }}
            >
              <GalleryCard
                image={image}
                width={config.cardWidth}
                height={config.cardHeight}
              />
            </div>
          )
        })}
      </div>

      {/* Reduced motion fallback hint */}
      {prefersReducedMotion && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
          Drag to rotate the gallery
        </p>
      )}
    </div>
  )
}
