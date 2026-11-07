import type { GalleryImage } from './gallery.data'

interface GalleryCardProps {
  image: GalleryImage
  /** Width of the card in px */
  width: number
  /** Height of the card in px */
  height: number
}

export default function GalleryCard({ image, width, height }: GalleryCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl select-none"
      style={{ width, height }}
      aria-label={image.alt}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        className="h-full w-full object-cover"
        style={{ pointerEvents: 'none' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-white font-display font-semibold text-sm sm:text-base leading-tight">
          {image.caption}
        </p>
        <p className="text-white/65 text-xs mt-0.5 uppercase tracking-widest">
          {image.location}
        </p>
      </div>

      {/* Subtle border */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
    </div>
  )
}
