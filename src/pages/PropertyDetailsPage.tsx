import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Users,
  Clock,
  Wifi,
  Waves,
  Wind,
  Car,
  ChefHat,
  Mountain,
  ArrowLeft,
  CalendarDays,
  Flame,
  TreePine,
  Coffee,
  Utensils,
  ShowerHead,
  Sun,
  Bike,
  CheckCircle2,
} from 'lucide-react'
import { getPropertyById } from '@/data/properties'
import { formatLKR } from '@/utils/currency'
import { getTodayString, getTomorrowString, calcNights } from '@/utils/date'
import PropertyGallery from '@/components/stays/PropertyGallery'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Map amenity names to icons
const amenityIconMap: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'Swimming Pool': Waves,
  'Infinity Pool': Waves,
  'Plunge Pool': Waves,
  'Air Conditioning': Wind,
  Parking: Car,
  Restaurant: ChefHat,
  'Mountain View': Mountain,
  'Ocean View': Mountain,
  'City View': Mountain,
  'Valley View': Mountain,
  Fireplace: Flame,
  Garden: TreePine,
  'Tea Estate Access': TreePine,
  'Hiking Trails': TreePine,
  'Breakfast Included': Coffee,
  Kitchen: Utensils,
  'Outdoor Dining': Utensils,
  BBQ: Utensils,
  'Outdoor Shower': ShowerHead,
  'Sun Loungers': Sun,
  'Yoga Deck': Bike,
}

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const property = id ? getPropertyById(id) : undefined

  const [checkIn, setCheckIn] = useState(getTodayString())
  const [checkOut, setCheckOut] = useState(getTomorrowString())
  const [guests, setGuests] = useState(2)
  const [dateError, setDateError] = useState('')

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#111827]">
              <MapPin className="h-9 w-9 text-white" aria-hidden="true" />
            </div>
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#374151] mb-3">
            Not Found
          </p>
          <h1 className="font-display text-2xl font-bold text-[#111827] mb-3">
            Property Not Found
          </h1>
          <p className="text-[#374151] mb-8 max-w-sm mx-auto leading-relaxed">
            We couldn't find the property you were looking for. It may have been
            removed or the URL may be incorrect.
          </p>
          <Button asChild>
            <Link to="/stays">Browse all stays</Link>
          </Button>
        </div>
      </div>
    )
  }

  const nights = calcNights(checkIn, checkOut)
  const totalCost = nights > 0 ? nights * property.pricePerNight : property.pricePerNight

  const handleCheckOutChange = (val: string) => {
    setCheckOut(val)
    if (checkIn && val && new Date(val) <= new Date(checkIn)) {
      setDateError('Check-out must be after check-in.')
    } else {
      setDateError('')
    }
  }

  const handleBookNow = () => {
    if (dateError) return
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) })
    navigate(`/booking/${property.id}?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Dark header band */}
      <div className="bg-[#111827] pt-16 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/stays"
            className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all stays
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Property header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="default">{property.type}</Badge>
              <div className="flex items-center gap-1 text-sm text-[#374151]">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{property.location}, Sri Lanka</span>
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-[#111827] sm:text-3xl lg:text-4xl">
              {property.name}
            </h1>
          </div>
          <div className="shrink-0">
            <div className="text-2xl font-bold text-[#111827]">
              {formatLKR(property.pricePerNight)}
            </div>
            <div className="text-sm text-[#374151]">per night</div>
          </div>
        </div>

        {/* Gallery — hidden on mobile (carousel shown below) */}
        <div className="mb-10 hidden md:block">
          <PropertyGallery images={property.images} propertyName={property.name} />
        </div>

        {/* Mobile carousel only */}
        <div className="mb-8 md:hidden">
          <MobileGallery images={property.images} propertyName={property.name} />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Quick stat pills */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatPill icon={Users} label="Max guests" value={String(property.maxGuests)} />
              <StatPill icon={Clock} label="Check-in" value={property.checkInTime} />
              <StatPill icon={Clock} label="Check-out" value={property.checkOutTime} />
              <StatPill
                icon={CalendarDays}
                label="Per night"
                value={formatLKR(property.pricePerNight)}
              />
            </div>

            {/* Description */}
            <section aria-labelledby="description-heading">
              <h2
                id="description-heading"
                className="font-display text-xl font-bold text-[#111827] mb-4"
              >
                About this stay
              </h2>
              <p className="text-[#374151] leading-relaxed">{property.description}</p>
            </section>

            {/* Amenities */}
            <section aria-labelledby="amenities-heading">
              <h2
                id="amenities-heading"
                className="font-display text-xl font-bold text-[#111827] mb-4"
              >
                Amenities
              </h2>
              <ul
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2"
                role="list"
              >
                {property.amenities.map((amenity) => {
                  const Icon = amenityIconMap[amenity] ?? CheckCircle2
                  return (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 rounded-lg bg-white border border-[#9CA3AF]/20 px-4 py-3 text-sm text-[#374151]"
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#1F2937]"
                        aria-hidden="true"
                      />
                      {amenity}
                    </li>
                  )
                })}
              </ul>
            </section>

            {/* House rules */}
            <section
              className="rounded-2xl border border-[#9CA3AF]/20 bg-white p-6"
              aria-labelledby="rules-heading"
            >
              <h2
                id="rules-heading"
                className="font-display text-lg font-bold text-[#111827] mb-4"
              >
                House Rules
              </h2>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#374151]">Check-in from</dt>
                  <dd className="font-semibold text-[#111827]">{property.checkInTime}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#374151]">Check-out by</dt>
                  <dd className="font-semibold text-[#111827]">{property.checkOutTime}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#374151]">Max guests</dt>
                  <dd className="font-semibold text-[#111827]">{property.maxGuests}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#374151]">Pets</dt>
                  <dd className="font-semibold text-[#111827]">On request</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-[#374151] border-t border-[#9CA3AF]/20 pt-4">
                This is a demonstration prototype. House rules are illustrative only.
              </p>
            </section>
          </div>

          {/* Booking sidebar */}
          <aside aria-label="Booking panel">
            <div className="sticky top-24 rounded-2xl border border-[#9CA3AF]/20 bg-white shadow-sm p-6">
              <div className="mb-4 pb-4 border-b border-[#9CA3AF]/20">
                <span className="text-2xl font-bold text-[#111827]">
                  {formatLKR(property.pricePerNight)}
                </span>
                <span className="text-sm text-[#374151] ml-1">/ night</span>
              </div>

              <h2 className="font-display text-lg font-bold text-[#111827] mb-4">
                Request a Booking
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="detail-checkin">Check-in</Label>
                  <Input
                    id="detail-checkin"
                    type="date"
                    value={checkIn}
                    min={getTodayString()}
                    className="mt-1.5"
                    onChange={(e) => {
                      setCheckIn(e.target.value)
                      setDateError('')
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="detail-checkout">Check-out</Label>
                  <Input
                    id="detail-checkout"
                    type="date"
                    value={checkOut}
                    min={checkIn || getTomorrowString()}
                    className="mt-1.5"
                    onChange={(e) => handleCheckOutChange(e.target.value)}
                  />
                  {dateError && (
                    <p className="mt-1 text-xs text-red-600" role="alert">
                      {dateError}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="detail-guests">
                    Guests (max {property.maxGuests})
                  </Label>
                  <Input
                    id="detail-guests"
                    type="number"
                    value={guests}
                    min={1}
                    max={property.maxGuests}
                    className="mt-1.5"
                    onChange={(e) =>
                      setGuests(
                        Math.min(
                          Math.max(1, Number(e.target.value)),
                          property.maxGuests,
                        ),
                      )
                    }
                  />
                </div>

                {/* Cost breakdown */}
                <div className="rounded-xl bg-[#F3F4F6] p-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#374151]">
                    <span>
                      {formatLKR(property.pricePerNight)} ×{' '}
                      {nights > 0
                        ? `${nights} night${nights > 1 ? 's' : ''}`
                        : '1 night'}
                    </span>
                    <span>{formatLKR(totalCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#111827] border-t border-[#9CA3AF]/30 pt-2">
                    <span>Estimated total</span>
                    <span>{formatLKR(totalCost)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBookNow}
                  disabled={!!dateError}
                  size="lg"
                  className="w-full bg-[#1F2937] text-white hover:bg-[#111827] font-semibold"
                >
                  Book Now / Request Booking
                </Button>

                <p className="text-center text-xs text-[#9CA3AF]">
                  No real reservation or payment will be made. This is a demo.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// Helper components
function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-white border border-[#9CA3AF]/20 p-4 text-center">
      <Icon className="h-5 w-5 text-[#374151] mx-auto mb-2" aria-hidden="true" />
      <div className="text-sm font-bold text-[#111827] truncate">{value}</div>
      <div className="text-xs text-[#374151] mt-0.5">{label}</div>
    </div>
  )
}

function MobileGallery({
  images,
  propertyName,
}: {
  images: string[]
  propertyName: string
}) {
  const [active, setActive] = useState(0)

  const prev = () =>
    setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () =>
    setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
      <img
        src={images[active]}
        alt={`${propertyName} — view ${active + 1} of ${images.length}`}
        className="h-full w-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Previous image"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Next image"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
      {/* Counter */}
      <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
        {active + 1} / {images.length}
      </div>
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
