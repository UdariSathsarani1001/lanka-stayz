import type { GalleryImage } from './gallery.data'

interface GalleryCardProps {
  image: GalleryImage
  width: number
  height: number
}

export default function GalleryCard({ image, width, height }: GalleryCardProps) {
  return (
    <div
      className="relative select-none rounded-xl"
      style={{
        width,
        height,
        flexShrink: 0,
        overflow: 'hidden',
      }}
      aria-label={image.alt}
    >
      {/* Image: explicit px dimensions via style guarantee it fills the box
          regardless of the image's natural aspect ratio or 3D stacking context */}
      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        loading="eager"
        decoding="async"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${height}px`,
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
        }}
      />

      {/* Caption */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 14px',
        }}
      >
        <p style={{
          color: '#ffffff',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {image.caption}
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '2px',
        }}>
          {image.location}
        </p>
      </div>

      {/* Subtle border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '0.75rem',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
