import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, LayoutGrid } from 'lucide-react'
import { properties } from '@/data/properties'
import type { PropertyType } from '@/types/property.types'
import PropertyGrid from '@/components/stays/PropertyGrid'
import DestinationFilter from '@/components/stays/DestinationFilter'
import SearchBar from '@/components/home/SearchBar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const propertyTypes: PropertyType[] = [
  'Villa',
  'Apartment',
  'Boutique Hotel',
  'Holiday Home',
  'Cottage',
]

export default function StaysPage() {
  const [searchParams] = useSearchParams()
  const urlDestination = searchParams.get('destination') || ''
  const urlCheckIn = searchParams.get('checkIn') || ''
  const urlCheckOut = searchParams.get('checkOut') || ''
  const urlGuests = Number(searchParams.get('guests') || 2)

  const [destination, setDestination] = useState(urlDestination)
  const [typeFilter, setTypeFilter] = useState<PropertyType | ''>('')

  // Sync destination when URL params change (e.g. browser back/forward)
  useEffect(() => {
    setDestination(urlDestination)
  }, [urlDestination])

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchDest =
        !destination ||
        p.district.toLowerCase() === destination.toLowerCase() ||
        p.location.toLowerCase() === destination.toLowerCase()
      const matchType = !typeFilter || p.type === typeFilter
      return matchDest && matchType
    })
  }, [destination, typeFilter])

  const hasFilters = !!destination || !!typeFilter

  const clearAll = () => {
    setDestination('')
    setTypeFilter('')
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Page header */}
      <div className="bg-[#111827] pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
            Accommodation
          </p>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl mb-3">
            Explore Stays
          </h1>
          <p className="text-[#9CA3AF] max-w-lg text-sm sm:text-base">
            Browse our curated collection of villas, boutique hotels, heritage
            houses and private retreats across Sri Lanka.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar
            initialDestination={urlDestination}
            initialCheckIn={urlCheckIn}
            initialCheckOut={urlCheckOut}
            initialGuests={urlGuests}
            compact
          />
        </div>

        {/* Filter panel */}
        <div className="rounded-xl border border-[#9CA3AF]/20 bg-white p-5 mb-8 space-y-4">
          {/* Destination filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#374151] shrink-0">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              <span>Destination</span>
            </div>
            <DestinationFilter
              selected={destination}
              onChange={setDestination}
            />
          </div>

          {/* Property type filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-t border-[#9CA3AF]/10 pt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#374151] shrink-0">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              <span>Property type</span>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by property type"
            >
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setTypeFilter((prev) => (prev === type ? '' : type))
                  }
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors border',
                    typeFilter === type
                      ? 'bg-[#1F2937] text-white border-[#1F2937]'
                      : 'bg-white text-[#374151] border-[#9CA3AF]/40 hover:border-[#374151] hover:text-[#111827]',
                  )}
                  aria-pressed={typeFilter === type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results bar */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <p
            className="text-sm text-[#374151]"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="font-semibold text-[#111827]">{filtered.length}</span>{' '}
            propert{filtered.length === 1 ? 'y' : 'ies'} found
            {destination && (
              <span>
                {' '}
                in <span className="font-medium text-[#111827]">{destination}</span>
              </span>
            )}
            {typeFilter && (
              <span>
                {' '}
                · <span className="font-medium text-[#111827]">{typeFilter}</span>
              </span>
            )}
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-[#374151] hover:text-[#111827] shrink-0"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {/* Grid */}
        <PropertyGrid
          properties={filtered}
          onClearFilter={clearAll}
          hasFilter={hasFilters}
        />
      </div>
    </div>
  )
}
