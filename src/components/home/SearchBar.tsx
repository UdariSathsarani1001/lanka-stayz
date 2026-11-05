import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, CalendarDays, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAllDistricts } from '@/data/properties'
import { getTodayString, getTomorrowString } from '@/utils/date'

interface SearchBarProps {
  initialDestination?: string
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
  compact?: boolean
}

export default function SearchBar({
  initialDestination = '',
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
  compact = false,
}: SearchBarProps) {
  const navigate = useNavigate()
  const districts = getAllDistricts().filter((d) => d !== 'All')
  const today = getTodayString()
  const tomorrow = getTomorrowString()

  const [destination, setDestination] = useState(initialDestination)
  const [checkIn, setCheckIn] = useState(initialCheckIn)
  const [checkOut, setCheckOut] = useState(initialCheckOut)
  const [guests, setGuests] = useState(initialGuests)
  const [error, setError] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out must be after check-in.')
      return
    }
    setError('')
    const params = new URLSearchParams()
    if (destination) params.set('destination', destination)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('guests', String(guests))
    navigate(`/stays?${params.toString()}`)
  }

  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border border-[#9CA3AF]/20 bg-white shadow-sm p-5"
        aria-label="Accommodation search"
        noValidate
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-[#9CA3AF]/20">
          {/* Destination */}
          <SearchField
            id="csearch-destination"
            label="Destination"
            icon={MapPin}
            compact
          >
            <select
              id="csearch-destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-[#111827] focus:outline-none cursor-pointer"
            >
              <option value="">Any destination</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </SearchField>

          {/* Check-in */}
          <SearchField id="csearch-checkin" label="Check-in" icon={CalendarDays} compact>
            <input
              id="csearch-checkin"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => { setCheckIn(e.target.value); setError('') }}
              className="w-full bg-transparent text-sm font-medium text-[#111827] focus:outline-none cursor-pointer"
            />
          </SearchField>

          {/* Check-out */}
          <SearchField id="csearch-checkout" label="Check-out" icon={CalendarDays} compact>
            <input
              id="csearch-checkout"
              type="date"
              value={checkOut}
              min={checkIn || tomorrow}
              onChange={(e) => { setCheckOut(e.target.value); setError('') }}
              className="w-full bg-transparent text-sm font-medium text-[#111827] focus:outline-none cursor-pointer"
            />
          </SearchField>

          {/* Guests */}
          <SearchField id="csearch-guests" label="Guests" icon={Users} compact>
            <input
              id="csearch-guests"
              type="number"
              value={guests}
              min={1}
              max={10}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
              className="w-full bg-transparent text-sm font-medium text-[#111827] focus:outline-none"
            />
          </SearchField>

          {/* Submit */}
          <div className="flex items-center lg:px-4">
            <Button
              type="submit"
              className="w-full gap-2 bg-[#1F2937] text-white hover:bg-[#111827]"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search
            </Button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-2 text-xs text-red-600">
            {error}
          </p>
        )}
      </form>
    )
  }

  // ─── Hero (frosted glass) variant ────────────────────────────────────────
  return (
    <form
      onSubmit={handleSearch}
      className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden"
      aria-label="Accommodation search"
      noValidate
    >
      <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-5 lg:divide-x">
        {/* Destination */}
        <SearchField id="hsearch-destination" label="Destination" icon={MapPin}>
          <select
            id="hsearch-destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer [color-scheme:dark]"
          >
            <option value="" className="text-[#374151] bg-white">Any destination</option>
            {districts.map((d) => (
              <option key={d} value={d} className="text-[#374151] bg-white">{d}</option>
            ))}
          </select>
        </SearchField>

        {/* Check-in */}
        <SearchField id="hsearch-checkin" label="Check-in" icon={CalendarDays}>
          <input
            id="hsearch-checkin"
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => { setCheckIn(e.target.value); setError('') }}
            className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer [color-scheme:dark]"
          />
        </SearchField>

        {/* Check-out */}
        <SearchField id="hsearch-checkout" label="Check-out" icon={CalendarDays}>
          <input
            id="hsearch-checkout"
            type="date"
            value={checkOut}
            min={checkIn || tomorrow}
            onChange={(e) => { setCheckOut(e.target.value); setError('') }}
            className="w-full bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer [color-scheme:dark]"
          />
        </SearchField>

        {/* Guests */}
        <SearchField id="hsearch-guests" label="Guests" icon={Users}>
          <input
            id="hsearch-guests"
            type="number"
            value={guests}
            min={1}
            max={10}
            onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
            className="w-full bg-transparent text-sm font-medium text-white focus:outline-none"
          />
        </SearchField>

        {/* Submit */}
        <div className="flex items-center p-3 sm:p-4">
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 bg-white text-[#111827] hover:bg-[#F3F4F6] font-semibold"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search Stays
          </Button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-500/20 border-t border-white/10">
          <p role="alert" className="text-xs text-red-200">
            {error}
          </p>
        </div>
      )}
    </form>
  )
}

// ─── Helper: individual search field ─────────────────────────────────────
function SearchField({
  id,
  label,
  icon: Icon,
  compact = false,
  children,
}: {
  id: string
  label: string
  icon: React.ElementType
  compact?: boolean
  children: React.ReactNode
}) {
  return (
    <div className={compact ? 'flex items-center gap-3 rounded-lg border border-[#9CA3AF]/20 px-4 py-3' : 'flex items-center gap-3 px-4 py-4'}>
      <Icon
        className={`h-4 w-4 shrink-0 ${compact ? 'text-[#374151]' : 'text-white/70'}`}
        aria-hidden="true"
      />
      <div className="flex-1 min-w-0">
        <label
          htmlFor={id}
          className={`block text-xs font-medium mb-0.5 ${
            compact ? 'text-[#374151]' : 'text-white/70'
          }`}
        >
          {label}
        </label>
        {children}
      </div>
    </div>
  )
}
