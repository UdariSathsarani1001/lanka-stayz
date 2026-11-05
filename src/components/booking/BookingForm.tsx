import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, AlertCircle, Info, CalendarDays } from 'lucide-react'
import type { Property } from '@/types/property.types'
import { createBookingSchema, type BookingFormData } from '@/schemas/bookingSchema'
import { formatLKR } from '@/utils/currency'
import { formatDate, calcNights, getTodayString, getTomorrowString } from '@/utils/date'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface BookingFormProps {
  property: Property
  initialCheckIn?: string
  initialCheckOut?: string
  initialGuests?: number
}

export default function BookingForm({
  property,
  initialCheckIn = '',
  initialCheckOut = '',
  initialGuests = 2,
}: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null)

  const schema = createBookingSchema(property.maxGuests)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      guestName: '',
      email: '',
      contactNumber: '',
      checkIn: initialCheckIn,
      checkOut: initialCheckOut,
      guests: Math.min(Math.max(1, initialGuests), property.maxGuests),
      specialRequests: '',
    },
  })

  const watchCheckIn = watch('checkIn')
  const watchCheckOut = watch('checkOut')
  const nights =
    watchCheckIn && watchCheckOut ? calcNights(watchCheckIn, watchCheckOut) : 0
  const totalCost = nights > 0 ? nights * property.pricePerNight : 0

  const onSubmit = (data: BookingFormData) => {
    setSubmittedData(data)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ─── Confirmation screen ─────────────────────────────────────────────────
  if (submitted && submittedData) {
    const confirmedNights = calcNights(submittedData.checkIn, submittedData.checkOut)
    return (
      <div className="space-y-6">
        {/* Success header */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-9 w-9 text-green-600" aria-hidden="true" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#111827] mb-2">
            Booking Request Submitted!
          </h2>
          <p className="text-[#374151]">
            Thank you,{' '}
            <strong className="text-[#111827]">{submittedData.guestName}</strong>. Your
            request for <strong className="text-[#111827]">{property.name}</strong> has
            been received.
          </p>
        </div>

        {/* Booking summary */}
        <div className="rounded-2xl border border-[#9CA3AF]/20 bg-white p-6">
          <h3 className="font-display text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#374151]" aria-hidden="true" />
            Booking Summary
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Property</dt>
              <dd className="font-semibold text-[#111827] text-right">{property.name}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Location</dt>
              <dd className="font-semibold text-[#111827]">{property.location}, Sri Lanka</dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Guest name</dt>
              <dd className="font-semibold text-[#111827]">{submittedData.guestName}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Email</dt>
              <dd className="font-semibold text-[#111827]">{submittedData.email}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Contact</dt>
              <dd className="font-semibold text-[#111827]">{submittedData.contactNumber}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Check-in</dt>
              <dd className="font-semibold text-[#111827]">
                {formatDate(submittedData.checkIn)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Check-out</dt>
              <dd className="font-semibold text-[#111827]">
                {formatDate(submittedData.checkOut)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-2 border-b border-[#9CA3AF]/10">
              <dt className="text-[#374151]">Guests</dt>
              <dd className="font-semibold text-[#111827]">{submittedData.guests}</dd>
            </div>
            {confirmedNights > 0 && (
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-[#374151]">
                  {confirmedNights} night{confirmedNights > 1 ? 's' : ''} ×{' '}
                  {formatLKR(property.pricePerNight)}
                </dt>
                <dd className="font-bold text-lg text-[#111827]">
                  {formatLKR(confirmedNights * property.pricePerNight)}
                </dd>
              </div>
            )}
          </dl>

          {submittedData.specialRequests && (
            <div className="mt-4 pt-4 border-t border-[#9CA3AF]/20">
              <p className="text-xs font-medium text-[#374151] mb-1">Special requests</p>
              <p className="text-sm text-[#111827]">{submittedData.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Demo disclaimer */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-0.5">
              Demonstration only
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Your booking request has been submitted successfully. This is a
              demonstration prototype — no real reservation has been created, no
              payment has been processed, and no booking details have been stored.
              A confirmation would normally be sent to{' '}
              <strong>{submittedData.email}</strong>.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ─── Booking form ─────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label={`Booking request form for ${property.name}`}
    >
      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl bg-[#F3F4F6] border border-[#9CA3AF]/30 p-4 mb-8">
        <Info className="h-4 w-4 text-[#374151] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-[#374151]">
          This is a <strong className="text-[#111827]">demonstration booking form</strong>.
          No real reservation will be made and no payment will be taken.
        </p>
      </div>

      <div className="space-y-5">
        {/* Guest name */}
        <FormField
          id="guestName"
          label="Full Name"
          required
          error={errors.guestName?.message}
        >
          <Input
            id="guestName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Amal Perera"
            className={cn(errors.guestName && 'border-red-500 focus-visible:ring-red-500')}
            aria-required="true"
            aria-invalid={!!errors.guestName}
            aria-describedby={errors.guestName ? 'guestName-error' : undefined}
            {...register('guestName')}
          />
        </FormField>

        {/* Email */}
        <FormField
          id="email"
          label="Email Address"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. amal@example.com"
            className={cn(errors.email && 'border-red-500 focus-visible:ring-red-500')}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </FormField>

        {/* Contact number */}
        <FormField
          id="contactNumber"
          label="Contact Number"
          required
          error={errors.contactNumber?.message}
          hint="Sri Lankan format: 0771234567 or +94771234567"
        >
          <Input
            id="contactNumber"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 0771234567"
            className={cn(
              errors.contactNumber && 'border-red-500 focus-visible:ring-red-500',
            )}
            aria-required="true"
            aria-invalid={!!errors.contactNumber}
            aria-describedby={
              errors.contactNumber ? 'contactNumber-error' : 'contactNumber-hint'
            }
            {...register('contactNumber')}
          />
        </FormField>

        {/* Dates row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            id="checkIn"
            label="Check-in Date"
            required
            error={errors.checkIn?.message}
          >
            <Input
              id="checkIn"
              type="date"
              min={getTodayString()}
              className={cn(errors.checkIn && 'border-red-500 focus-visible:ring-red-500')}
              aria-required="true"
              aria-invalid={!!errors.checkIn}
              aria-describedby={errors.checkIn ? 'checkIn-error' : undefined}
              {...register('checkIn')}
            />
          </FormField>

          <FormField
            id="checkOut"
            label="Check-out Date"
            required
            error={errors.checkOut?.message}
          >
            <Input
              id="checkOut"
              type="date"
              min={watchCheckIn || getTomorrowString()}
              className={cn(errors.checkOut && 'border-red-500 focus-visible:ring-red-500')}
              aria-required="true"
              aria-invalid={!!errors.checkOut}
              aria-describedby={errors.checkOut ? 'checkOut-error' : undefined}
              {...register('checkOut')}
            />
          </FormField>
        </div>

        {/* Nights / cost preview */}
        {nights > 0 && totalCost > 0 && (
          <div className="rounded-xl bg-[#F3F4F6] border border-[#9CA3AF]/20 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#374151]">
                {nights} night{nights > 1 ? 's' : ''} × {formatLKR(property.pricePerNight)}
              </span>
              <span className="font-bold text-[#111827] text-base">{formatLKR(totalCost)}</span>
            </div>
          </div>
        )}

        {/* Guests */}
        <FormField
          id="guests"
          label={`Number of Guests (max ${property.maxGuests})`}
          required
          error={errors.guests?.message}
          hint={`This property accommodates up to ${property.maxGuests} guests.`}
        >
          <Input
            id="guests"
            type="number"
            min={1}
            max={property.maxGuests}
            className={cn(errors.guests && 'border-red-500 focus-visible:ring-red-500')}
            aria-required="true"
            aria-invalid={!!errors.guests}
            aria-describedby={errors.guests ? 'guests-error' : 'guests-hint'}
            {...register('guests', { valueAsNumber: true })}
          />
        </FormField>

        {/* Special requests */}
        <div>
          <Label htmlFor="specialRequests">Special Requests (optional)</Label>
          <textarea
            id="specialRequests"
            rows={3}
            placeholder="e.g. Early check-in, dietary requirements, accessibility needs..."
            className="mt-1.5 flex w-full resize-none rounded-md border border-[#9CA3AF] bg-white px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F2937] focus-visible:ring-offset-2"
            {...register('specialRequests')}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full bg-[#1F2937] text-white hover:bg-[#111827] font-semibold"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Booking Request'}
        </Button>

        <p className="text-center text-xs text-[#374151]">
          * Required fields. By submitting you confirm this is a demonstration request only.
        </p>
      </div>
    </form>
  )
}

// ─── Helper: form field wrapper ────────────────────────────────────────────
function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-[#374151]">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
