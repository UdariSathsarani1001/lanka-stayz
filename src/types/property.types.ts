export type PropertyType =
  | 'Villa'
  | 'Apartment'
  | 'Boutique Hotel'
  | 'Holiday Home'
  | 'Cottage'

export type Property = {
  id: string
  slug: string
  name: string
  location: string
  district: string
  type: PropertyType
  pricePerNight: number
  maxGuests: number
  shortDescription: string
  description: string
  images: string[]
  amenities: string[]
  checkInTime: string
  checkOutTime: string
}
