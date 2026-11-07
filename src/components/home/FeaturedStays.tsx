import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { properties } from '@/data/properties'
import PropertyCard from '@/components/stays/PropertyCard'
import { Button } from '@/components/ui/button'
import { fadeUp, staggerContainer } from '@/lib/motion'

export default function FeaturedStays() {
  return (
    <section id="featured" className="relative z-10 py-20 bg-[#F3F4F6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#374151] mb-2">
              Handpicked for You
            </p>
            <h2 className="font-display text-3xl font-bold text-[#111827] sm:text-4xl">
              Featured Stays
            </h2>
            <p className="mt-3 text-[#374151] max-w-md">
              A curated selection of exceptional properties across Sri Lanka's most
              sought-after destinations.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild variant="outline" className="shrink-0 gap-2">
              <Link to="/stays">
                View all properties
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Staggered cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
