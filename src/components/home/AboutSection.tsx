import { Link } from 'react-router-dom'
import { Shield, Star, HeartHandshake, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer, cardVariant } from '@/lib/motion'

const values = [
  {
    icon: Star,
    title: 'Curated Quality',
    description:
      'Every property is handpicked and verified for quality, comfort, and authentic Sri Lankan hospitality.',
  },
  {
    icon: Shield,
    title: 'Trusted Hosts',
    description:
      'Our host community upholds the highest standards of welcome, cleanliness, and guest care.',
  },
  {
    icon: HeartHandshake,
    title: 'Local Connection',
    description:
      'We partner with local owners to bring you genuine, community-rooted accommodation experiences.',
  },
  {
    icon: MapPin,
    title: 'Island-Wide Reach',
    description:
      "From Colombo city suites to Ella mountain retreats — we cover Sri Lanka's most remarkable destinations.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Image side */}
          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="overflow-hidden rounded-2xl aspect-[4/3]">
              <motion.img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
                alt="Stunning tropical villa with a private pool surrounded by lush Sri Lankan greenery"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {/* Floating stat */}
            <motion.div
              className="absolute -bottom-4 -right-4 hidden sm:flex flex-col items-center justify-center rounded-2xl bg-[#111827] px-6 py-4 text-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-3xl font-bold font-display">6+</span>
              <span className="text-xs text-[#9CA3AF] mt-0.5">Destinations</span>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#374151] mb-3">
              About Lanka Stayz
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-[#111827] sm:text-4xl mb-6 leading-tight">
              Your Gateway to Sri Lanka's Finest Accommodation
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#374151] leading-relaxed mb-6">
              Lanka Stayz was born from a love of Sri Lanka's extraordinary diversity — the
              golden beaches of the south, the misty highlands of the hill country, and
              the vibrant energy of Colombo. We believe that where you stay shapes the
              entire quality of your journey.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#374151] leading-relaxed mb-10">
              We partner with trusted local hosts to bring you a carefully curated
              collection of villas, boutique hotels, heritage houses, and private retreats
              — each chosen for its character, comfort, and connection to the island's spirit.
            </motion.p>

            {/* Values grid */}
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-10"
              variants={staggerContainer}
            >
              {values.map(({ icon: Icon, title, description }) => (
                <motion.div key={title} className="flex gap-3" variants={cardVariant}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
                    <Icon className="h-4 w-4 text-[#1F2937]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-1">{title}</h3>
                    <p className="text-xs text-[#374151] leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-[#1F2937] text-white hover:bg-[#111827]">
                <Link to="/stays">Explore Our Properties</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
