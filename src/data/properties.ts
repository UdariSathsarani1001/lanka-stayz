import type { Property } from '@/types/property.types'

export const properties: Property[] = [
  {
    id: 'colombo-city-suite',
    slug: 'colombo-city-suite',
    name: 'Colombo City Suite',
    location: 'Colombo',
    district: 'Colombo',
    type: 'Apartment',
    pricePerNight: 18000,
    maxGuests: 3,
    shortDescription:
      'A sleek, modern apartment in the heart of Colombo with panoramic city views and contemporary comforts.',
    description:
      'Experience the pulse of Colombo from this sophisticated city suite perched high above the skyline. The apartment features floor-to-ceiling windows that flood the space with natural light, a fully equipped kitchen, and a dedicated workspace. Explore the nearby Pettah Market, Galle Face Green, and world-class restaurants — all within easy reach. The building offers 24-hour security, a rooftop pool, and underground parking.',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Air Conditioning',
      'Swimming Pool',
      'Parking',
      'City View',
      'Kitchen',
      '24/7 Security',
      'Workspace',
      'Elevator',
      'Rooftop Access',
    ],
    checkInTime: '14:00',
    checkOutTime: '11:00',
  },
  {
    id: 'kandy-hillside-villa',
    slug: 'kandy-hillside-villa',
    name: 'Kandy Hillside Villa',
    location: 'Kandy',
    district: 'Kandy',
    type: 'Villa',
    pricePerNight: 22000,
    maxGuests: 5,
    shortDescription:
      'A serene hilltop villa surrounded by lush tropical gardens with sweeping views over the Kandy valley.',
    description:
      'Nestled in the misty hills above the ancient city of Kandy, this private villa offers an unforgettable retreat among Sri Lanka\'s lush heartland. Wake up to birdsong and panoramic valley views from the wrap-around veranda. The villa sleeps five comfortably across three bedrooms and is within a 20-minute drive of the sacred Temple of the Tooth Relic, Royal Botanic Gardens, and the vibrant Kandy city centre. A private garden, outdoor dining area, and infinity plunge pool complete the experience.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Air Conditioning',
      'Plunge Pool',
      'Parking',
      'Mountain View',
      'Kitchen',
      'Garden',
      'Outdoor Dining',
      'BBQ',
      'Hot Water',
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00',
  },
  {
    id: 'ella-nature-retreat',
    slug: 'ella-nature-retreat',
    name: 'Ella Nature Retreat',
    location: 'Ella',
    district: 'Ella',
    type: 'Boutique Hotel',
    pricePerNight: 25000,
    maxGuests: 4,
    shortDescription:
      'A boutique retreat perched above Ella\'s famous gap, surrounded by tea estates and misty mountain air.',
    description:
      'Perched at over 1,000 metres in the emerald highlands of Ella, this intimate boutique retreat is the perfect base for exploring Sri Lanka\'s most scenic hill country. Each suite features locally crafted furniture, private balconies overlooking the Ella Gap, and organic cotton linens. Spend your days hiking Little Adam\'s Peak, riding the famous Ella train, or simply watching clouds drift through the tea-covered valleys. Our resident chef prepares fresh Sri Lankan breakfasts each morning using ingredients sourced from the surrounding farms.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Mountain View',
      'Restaurant',
      'Breakfast Included',
      'Hot Water',
      'Balcony',
      'Hiking Trails',
      'Yoga Deck',
      'Laundry',
      'Airport Transfers',
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00',
  },
  {
    id: 'galle-heritage-house',
    slug: 'galle-heritage-house',
    name: 'Galle Heritage House',
    location: 'Galle',
    district: 'Galle',
    type: 'Holiday Home',
    pricePerNight: 30000,
    maxGuests: 6,
    shortDescription:
      'A beautifully restored Dutch colonial house within the iconic Galle Fort, steps from the ramparts.',
    description:
      'Step into living history at this impeccably restored Dutch colonial house set within the UNESCO-listed Galle Fort. Original 17th-century stone walls and timber beams blend seamlessly with bespoke period-inspired furniture, a private courtyard, and a rooftop terrace with direct views over the ancient ramparts to the Indian Ocean beyond. Accommodating up to six guests across three en-suite bedrooms, it is ideal for families or groups seeking a refined cultural experience. The fort\'s galleries, restaurants, boutiques, and famous lighthouse are all within easy walking distance.',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Air Conditioning',
      'Rooftop Terrace',
      'Courtyard',
      'Ocean View',
      'Kitchen',
      'Historic Architecture',
      'Daily Housekeeping',
      'Concierge',
      'Parking Nearby',
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00',
  },
  {
    id: 'mirissa-ocean-villa',
    slug: 'mirissa-ocean-villa',
    name: 'Mirissa Ocean Villa',
    location: 'Mirissa',
    district: 'Mirissa',
    type: 'Villa',
    pricePerNight: 28000,
    maxGuests: 5,
    shortDescription:
      'A stunning beachfront villa where the tropical garden meets the golden sands of Mirissa Beach.',
    description:
      'Fall asleep to the sound of waves at this exquisite beachfront villa on Sri Lanka\'s legendary southern coast. Mirissa Ocean Villa sits directly on a secluded stretch of Mirissa Beach, with a private infinity pool that merges with the horizon and a shaded day-bed terrace overlooking the sea. The villa sleeps five across two sun-drenched bedrooms and a stylish open-plan living space. Between December and April, whale-watching boat trips depart just minutes away. The village\'s celebrated seafood restaurants, surf breaks, and coconut palm-lined beach are at your doorstep.',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Air Conditioning',
      'Infinity Pool',
      'Beach Access',
      'Ocean View',
      'Kitchen',
      'Snorkelling Equipment',
      'Outdoor Shower',
      'Sun Loungers',
      'BBQ',
    ],
    checkInTime: '14:00',
    checkOutTime: '11:00',
  },
  {
    id: 'nuwara-eliya-cottage',
    slug: 'nuwara-eliya-cottage',
    name: 'Nuwara Eliya Tea Cottage',
    location: 'Nuwara Eliya',
    district: 'Nuwara Eliya',
    type: 'Cottage',
    pricePerNight: 20000,
    maxGuests: 4,
    shortDescription:
      'A charming colonial-era cottage wrapped in tea-estate greenery in the cool highlands of Little England.',
    description:
      'Tucked into the slopes of a working tea estate above Nuwara Eliya, this intimate colonial-style cottage is a timeless escape from the tropical heat. Stone fireplaces, hardwood floors, and a private garden verandah create the perfect atmosphere for cool highland evenings. Known as "Little England" for its cool climate, winding country lanes, and rolling greens, Nuwara Eliya offers hiking on Horton Plains, visits to Victoria Park, and guided tea factory tours. The cottage sleeps four and includes a daily chef-prepared breakfast — timed to the golden hour.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
    ],
    amenities: [
      'Wi-Fi',
      'Fireplace',
      'Garden',
      'Breakfast Included',
      'Mountain View',
      'Kitchen',
      'Parking',
      'Hiking Trails',
      'Tea Estate Access',
      'Hot Water',
    ],
    checkInTime: '14:00',
    checkOutTime: '11:00',
  },
]

export const getPropertyById = (id: string): Property | undefined =>
  properties.find((p) => p.id === id || p.slug === id)

export const getPropertyBySlug = (slug: string): Property | undefined =>
  properties.find((p) => p.slug === slug)

export const getAllDistricts = (): string[] => {
  const districts = properties.map((p) => p.district)
  return ['All', ...Array.from(new Set(districts)).sort()]
}
