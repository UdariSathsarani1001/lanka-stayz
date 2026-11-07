import { Link } from 'react-router-dom'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Property } from '@/types/property.types'
import { formatLKR } from '@/utils/currency'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cardVariant } from '@/lib/motion'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-xl border border-[#9CA3AF]/20 bg-white shadow-sm"
      variants={cardVariant}
      whileHover={{
        y: -4,
        boxShadow: '0 12px 32px -8px rgba(0,0,0,0.12)',
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      {/* Image */}
      <Link
        to={`/stays/${property.id}`}
        className="block overflow-hidden aspect-[4/3] relative"
        aria-label={`View details for ${property.name}`}
        tabIndex={-1}
      >
        <motion.img
          src={property.images[0]}
          alt={`${property.name} — ${property.type} in ${property.location}, Sri Lanka`}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="default" className="text-xs">
            {property.type}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-[#374151] mb-2">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{property.location}, Sri Lanka</span>
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-[#111827] mb-2 leading-snug">
          <Link
            to={`/stays/${property.id}`}
            className="hover:text-[#374151] transition-colors"
          >
            {property.name}
          </Link>
        </h3>

        {/* Short description */}
        <p className="text-sm text-[#374151] leading-relaxed mb-4 flex-1 line-clamp-2">
          {property.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-[#374151] mb-4 border-t border-[#9CA3AF]/20 pt-4">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Up to {property.maxGuests} guests</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-xl font-bold text-[#111827]">
              {formatLKR(property.pricePerNight)}
            </span>
            <span className="text-xs text-[#374151] ml-1">/ night</span>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button asChild size="sm" className="gap-1.5 shrink-0">
              <Link to={`/stays/${property.id}`}>
                View Details
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
