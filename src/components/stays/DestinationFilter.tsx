import { X } from 'lucide-react'
import { getAllDistricts } from '@/data/properties'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DestinationFilterProps {
  selected: string
  onChange: (value: string) => void
}

export default function DestinationFilter({
  selected,
  onChange,
}: DestinationFilterProps) {
  const districts = getAllDistricts()

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by destination">
      {districts.map((district) => {
        const isActive = district === 'All' ? !selected : selected === district
        return (
          <button
            key={district}
            onClick={() => onChange(district === 'All' ? '' : district)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors border',
              isActive
                ? 'bg-[#1F2937] text-white border-[#1F2937]'
                : 'bg-white text-[#374151] border-[#9CA3AF]/40 hover:border-[#374151] hover:text-[#111827]',
            )}
            aria-pressed={isActive}
          >
            {district}
          </button>
        )
      })}

      {selected && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange('')}
          className="gap-1.5 text-[#374151] hover:text-[#111827]"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear filter
        </Button>
      )}
    </div>
  )
}
