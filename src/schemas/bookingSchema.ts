import { z } from 'zod'

export const createBookingSchema = (maxGuests: number) =>
  z
    .object({
      guestName: z
        .string()
        .trim()
        .min(2, 'Please enter your full name (at least 2 characters).'),
      email: z
        .string()
        .trim()
        .email('Please enter a valid email address.'),
      contactNumber: z
        .string()
        .trim()
        .regex(
          /^(\+94|0)?[1-9][0-9]{8}$/,
          'Please enter a valid Sri Lankan phone number (e.g. 0771234567 or +94771234567).',
        ),
      checkIn: z.string().min(1, 'Please select a check-in date.'),
      checkOut: z.string().min(1, 'Please select a check-out date.'),
      guests: z
        .number()
        .int()
        .min(1, 'At least 1 guest is required.')
        .max(maxGuests, `Maximum ${maxGuests} guests allowed for this property.`),
      specialRequests: z.string().optional(),
    })
    .refine(
      (data) => {
        if (!data.checkIn || !data.checkOut) return true
        return new Date(data.checkOut) > new Date(data.checkIn)
      },
      {
        message: 'Check-out date must be after check-in date.',
        path: ['checkOut'],
      },
    )

export type BookingFormData = {
  guestName: string
  email: string
  contactNumber: string
  checkIn: string
  checkOut: string
  guests: number
  specialRequests?: string
}
