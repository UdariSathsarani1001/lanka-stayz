import { Link } from 'react-router-dom'
import { MapPin, Users, ArrowRight } from 'lucide-react'
import type { Property } from '@/types/property.types'
import { formatLKR } from '@/utils/currency'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#9CA3AF]/20 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <Link
        to={`/stays/${property.id}`}
        className="block overflow-hidden aspect-[4/3] relative"
        aria-label={`View details for ${property.name}`}
        tabIndex={-1}
      >
        <img
          src={property.images[0]}
          alt={`${property.name} — ${property.type} in ${property.location}, Sri Lanka`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
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
          <Button asChild size="sm" className="gap-1.5 shrink-0">
            <Link to={`/stays/${property.id}`}>
              View Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}
