import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  propertyName: string
}

export default function PropertyGallery({
  images,
  propertyName,
}: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [direction, setDirection] = useState(0) // +1 next, -1 prev

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)

  const prevLight = () => {
    setDirection(-1)
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }
  const nextLight = () => {
    setDirection(1)
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }

  const mainImage = images[0]
  const thumbs = images.slice(1, 4)

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.25 } }),
  } as const

  return (
    <>
      {/* Gallery grid */}
      <div
        className={cn(
          'grid gap-2',
          thumbs.length === 0 && 'grid-cols-1',
          thumbs.length === 1 && 'grid-cols-2',
          thumbs.length === 2 && 'grid-cols-2',
          thumbs.length >= 3 && 'grid-cols-4',
        )}
        style={thumbs.length >= 3 ? { gridTemplateRows: 'repeat(2, 1fr)' } : undefined}
      >
        {/* Main image */}
        <motion.button
          className={cn(
            'overflow-hidden rounded-xl relative group',
            thumbs.length >= 3 ? 'col-span-2 row-span-2' : 'col-span-1',
            thumbs.length === 0 ? 'aspect-[16/7]' : 'aspect-[4/3]',
          )}
          onClick={() => openLightbox(0)}
          aria-label={`View gallery for ${propertyName}, image 1`}
          whileHover="hover"
        >
          <motion.img
            src={mainImage}
            alt={`${propertyName} — main view`}
            className="h-full w-full object-cover"
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-black/0"
            variants={{ hover: { backgroundColor: 'rgba(0,0,0,0.08)' } }}
            transition={{ duration: 0.3 }}
          />
          {images.length > 1 && thumbs.length < 3 && (
            <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
              1 / {images.length}
            </div>
          )}
        </motion.button>

        {/* Thumbnails */}
        {thumbs.map((img, idx) => (
          <motion.button
            key={idx}
            className="overflow-hidden rounded-xl aspect-[4/3] relative group"
            onClick={() => openLightbox(idx + 1)}
            aria-label={`View gallery for ${propertyName}, image ${idx + 2}`}
            whileHover="hover"
          >
            <motion.img
              src={img}
              alt={`${propertyName} — view ${idx + 2}`}
              className="h-full w-full object-cover"
              loading="lazy"
              variants={{ hover: { scale: 1.07 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-black/0"
              variants={{ hover: { backgroundColor: 'rgba(0,0,0,0.08)' } }}
              transition={{ duration: 0.3 }}
            />
            {idx === thumbs.length - 1 && images.length > thumbs.length + 1 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                <span className="text-white font-semibold text-sm">View all</span>
                <span className="text-white/80 text-xs">
                  +{images.length - thumbs.length - 1} more
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${propertyName} photo gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            onKeyDown={(e) => {
              if (e.key === 'Escape') closeLightbox()
              if (e.key === 'ArrowLeft') { e.preventDefault(); prevLight() }
              if (e.key === 'ArrowRight') { e.preventDefault(); nextLight() }
            }}
            tabIndex={0}
          >
            {/* Close */}
            <motion.button
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close gallery"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.button>

            {/* Prev */}
            {images.length > 1 && (
              <motion.button
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); prevLight() }}
                aria-label="Previous image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </motion.button>
            )}

            {/* Next */}
            {images.length > 1 && (
              <motion.button
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); nextLight() }}
                aria-label="Next image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </motion.button>
            )}

            {/* Animated image slide */}
            <div
              className="relative flex items-center justify-center max-h-[85vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={lightboxIndex}
                  src={images[lightboxIndex]}
                  alt={`${propertyName} — photo ${lightboxIndex + 1} of ${images.length}`}
                  className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                />
              </AnimatePresence>
            </div>

            {/* Counter + dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <p className="text-white/60 text-sm">
                {lightboxIndex + 1} / {images.length}
              </p>
              {images.length <= 8 && (
                <div className="flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setDirection(i > lightboxIndex ? 1 : -1); setLightboxIndex(i) }}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        i === lightboxIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40',
                      )}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
