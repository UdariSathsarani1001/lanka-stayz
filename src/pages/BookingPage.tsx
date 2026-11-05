import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { getPropertyById } from '@/data/properties'
import BookingForm from '@/components/booking/BookingForm'
import { formatLKR } from '@/utils/currency'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BookingPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = Number(searchParams.get('guests') || 2)

  const property = id ? getPropertyById(id) : undefined

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#111827]">
              <MapPin className="h-9 w-9 text-white" aria-hidden="true" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#111827] mb-3">
            Property Not Found
          </h1>
          <p className="text-[#374151] mb-8 max-w-sm mx-auto leading-relaxed">
            We couldn't find the property associated with this booking request.
          </p>
          <Button asChild>
            <Link to="/stays">Browse all stays</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Page header */}
      <div className="bg-[#111827] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to={`/stays/${property.id}`}
            className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to property
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
            Booking Request
          </p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Request a Booking
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile property summary — shown above form on small screens */}
        <div className="lg:hidden mb-8">
          <PropertySummaryCard property={property} />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Booking form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white border border-[#9CA3AF]/20 shadow-sm p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#111827] mb-6">
                Your Details
              </h2>
              <BookingForm
                property={property}
                initialCheckIn={checkIn}
                initialCheckOut={checkOut}
                initialGuests={guests}
              />
            </div>
          </div>

          {/* Sidebar — desktop only */}
          <aside aria-label="Property summary" className="hidden lg:block">
            <div className="sticky top-24">
              <PropertySummaryCard property={property} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function PropertySummaryCard({
  property,
}: {
  property: ReturnType<typeof getPropertyById> & {}
}) {
  if (!property) return null
  return (
    <div className="rounded-2xl border border-[#9CA3AF]/20 bg-white shadow-sm overflow-hidden">
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={property.images[0]}
          alt={`${property.name} — ${property.type} in ${property.location}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{property.type}</Badge>
        </div>
        <h3 className="font-display text-lg font-bold text-[#111827] mb-1">
          {property.name}
        </h3>
        <p className="text-sm text-[#374151] mb-4">{property.location}, Sri Lanka</p>
        <div className="border-t border-[#9CA3AF]/20 pt-4 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-[#374151]">Price per night</span>
            <span className="font-semibold text-[#111827]">
              {formatLKR(property.pricePerNight)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#374151]">Max guests</span>
            <span className="font-semibold text-[#111827]">{property.maxGuests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#374151]">Check-in time</span>
            <span className="font-semibold text-[#111827]">{property.checkInTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#374151]">Check-out time</span>
            <span className="font-semibold text-[#111827]">{property.checkOutTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
