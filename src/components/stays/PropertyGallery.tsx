import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PropertyGalleryProps {
  images: string[]
  propertyName: string
}

export default function PropertyGallery({
  images,
  propertyName,
}: PropertyGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx)
    setLightbox(idx)
  }
  const closeLightbox = () => setLightbox(null)

  const prevLight = () =>
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  const nextLight = () =>
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1))

  // Layout: 1 main + up to 3 thumbnails in a 2x2 grid feel
  const mainImage = images[0]
  const thumbs = images.slice(1, 4) // up to 3 thumbs

  return (
    <>
      {/* Desktop gallery grid */}
      <div
        className={cn(
          'grid gap-2',
          thumbs.length === 0 && 'grid-cols-1',
          thumbs.length === 1 && 'grid-cols-2',
          thumbs.length === 2 && 'grid-cols-2',
          thumbs.length >= 3 && 'grid-cols-4',
        )}
        style={
          thumbs.length >= 3
            ? { gridTemplateRows: 'repeat(2, 1fr)' }
            : undefined
        }
      >
        {/* Main image spans full height */}
        <button
          className={cn(
            'overflow-hidden rounded-xl relative group',
            thumbs.length >= 3 ? 'col-span-2 row-span-2' : 'col-span-1',
            thumbs.length === 0 ? 'aspect-[16/7]' : 'aspect-[4/3]',
          )}
          onClick={() => openLightbox(0)}
          aria-label={`View gallery for ${propertyName}, image 1`}
        >
          <img
            src={mainImage}
            alt={`${propertyName} — main view`}
            className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          {/* View all gallery button on main image when ≤2 thumbs */}
          {images.length > 1 && thumbs.length < 3 && (
            <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
              1 / {images.length}
            </div>
          )}
        </button>

        {/* Thumbnails */}
        {thumbs.map((img, idx) => (
          <button
            key={idx}
            className="overflow-hidden rounded-xl aspect-[4/3] relative group"
            onClick={() => openLightbox(idx + 1)}
            aria-label={`View gallery for ${propertyName}, image ${idx + 2}`}
          >
            <img
              src={img}
              alt={`${propertyName} — view ${idx + 2}`}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {/* Show-all overlay on last thumb when more images exist */}
            {idx === thumbs.length - 1 && images.length > thumbs.length + 1 && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                <span className="text-white font-semibold text-sm">View all</span>
                <span className="text-white/80 text-xs">
                  +{images.length - thumbs.length - 1} more
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyName} photo gallery`}
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') { e.preventDefault(); prevLight() }
            if (e.key === 'ArrowRight') { e.preventDefault(); nextLight() }
          }}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevLight() }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextLight() }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={`${propertyName} — photo ${lightboxIndex + 1} of ${images.length}`}
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <p className="text-white/60 text-sm">
              {lightboxIndex + 1} / {images.length}
            </p>
            {/* Dot nav */}
            {images.length <= 8 && (
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === lightboxIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40',
                    )}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
