import { MapPin } from 'lucide-react'
import type { Property } from '@/types/property.types'
import PropertyCard from './PropertyCard'
import { Button } from '@/components/ui/button'

interface PropertyGridProps {
  properties: Property[]
  onClearFilter: () => void
  hasFilter: boolean
}

export default function PropertyGrid({
  properties,
  onClearFilter,
  hasFilter,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6] mb-6">
          <MapPin className="h-7 w-7 text-[#9CA3AF]" aria-hidden="true" />
        </div>
        <h3 className="font-display text-xl font-semibold text-[#111827] mb-2">
          No properties found
        </h3>
        <p className="text-[#374151] text-sm max-w-sm mb-6">
          No stays match your current filter. Try a different destination or clear the
          filter to see all properties.
        </p>
        {hasFilter && (
          <Button onClick={onClearFilter} variant="outline">
            Show all properties
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {properties.map((property) => (
        <div key={property.id} role="listitem">
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  )
}
