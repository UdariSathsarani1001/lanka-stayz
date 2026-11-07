import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import GalleryRing from './GalleryRing'

export default function GalleryShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-[#111827] py-20"
      aria-labelledby="gallery-heading"
    >
      {/* Subtle radial glow — consistent with the dark slate bg */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '70vw',
          height: '70vw',
          maxWidth: 900,
          maxHeight: 900,
          background:
            'radial-gradient(ellipse at center, rgba(55,65,81,0.45) 0%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — matches Testimonials pattern exactly */}
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
            Discover Sri Lanka
          </p>
          <h2
            id="gallery-heading"
            className="font-display text-3xl font-bold text-white sm:text-4xl"
          >
            A Glimpse of Paradise
          </h2>
          <p className="mt-3 text-[#9CA3AF] max-w-lg mx-auto">
            Explore the places, spaces and experiences waiting for you.
          </p>
        </motion.div>

        {/* 3D Ring */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GalleryRing />
        </motion.div>

        {/* Bottom label — same eyebrow style, dimmed */}
        <motion.p
          className="mt-10 text-center text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]/50"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Explore Our Collection
        </motion.p>
      </div>
    </section>
  )
}
