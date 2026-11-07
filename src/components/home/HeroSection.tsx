import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import SearchBar from './SearchBar'
import { fadeUp, heroImageScale, staggerContainer } from '@/lib/motion'

export default function HeroSection() {
  const scrollToFeatured = () => {
    const el = document.getElementById('featured')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col overflow-hidden" aria-label="Hero">
      {/* Background image — gentle zoom-in on load */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={heroImageScale}
        initial="hidden"
        animate="visible"
      >
        <img
          src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&q=85"
          alt="Aerial view of Sri Lanka's lush tropical coastline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
      </motion.div>

      {/* Content — staggered children */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8 overflow-y-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center max-w-4xl mx-auto w-full">
          {/* Tag */}
          <motion.p
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm"
            variants={fadeUp}
          >
            Sri Lanka's Finest Stays
          </motion.p>

          {/* Headline — each line staggered */}
          <motion.h1
            className="mb-5 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            variants={fadeUp}
          >
            Discover Your <br className="hidden sm:block" />
            <span className="italic font-normal">Perfect Stay</span>
            <br className="hidden sm:block" /> in Sri Lanka.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mb-8 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            From sun-drenched beachfront villas to misty hill-country retreats —
            curated accommodation across the island's most extraordinary destinations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            variants={fadeUp}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="bg-white text-[#111827] hover:bg-[#F3F4F6] font-semibold px-8">
                <Link to="/stays">Explore All Stays</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white font-medium px-8"
                onClick={scrollToFeatured}
              >
                See Featured Properties
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Search bar */}
        <motion.div className="w-full max-w-5xl px-0" variants={fadeUp}>
          <SearchBar />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 flex justify-center pb-6 shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <button
          onClick={scrollToFeatured}
          className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll down to featured stays"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  )
}
