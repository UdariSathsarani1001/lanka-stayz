import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const destinations = [
  {
    name: 'Mirissa',
    tagline: 'Beaches & Whale Watching',
    image: 'https://images.unsplash.com/photo-1590123715493-4cfe0b2a9e80?w=800&q=80',
    filter: 'Mirissa',
  },
  {
    name: 'Ella',
    tagline: 'Tea Estates & Mountain Trails',
    image: 'https://images.unsplash.com/photo-1572971756467-e84c96fd7dc6?w=800&q=80',
    filter: 'Ella',
  },
  {
    name: 'Galle',
    tagline: 'Heritage Fort & Coastal Culture',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    filter: 'Galle',
  },
  {
    name: 'Colombo',
    tagline: 'City Energy & Modern Comfort',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80',
    filter: 'Colombo',
  },
  {
    name: 'Kandy',
    tagline: 'Ancient Temples & Lush Valleys',
    image: 'https://images.unsplash.com/photo-1578895122474-6e503dc32bc8?w=800&q=80',
    filter: 'Kandy',
  },
  {
    name: 'Nuwara Eliya',
    tagline: 'Cool Highlands & Colonial Charm',
    image: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=800&q=80',
    filter: 'Nuwara Eliya',
  },
]

export default function DestinationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#374151] mb-2">
            Where Will You Go?
          </p>
          <h2 className="font-display text-3xl font-bold text-[#111827] sm:text-4xl">
            Explore by Destination
          </h2>
          <p className="mt-3 text-[#374151] max-w-md">
            Sri Lanka packs extraordinary diversity into a small island. Pick a region and
            find your perfect stay.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {destinations.map((dest) => (
            <Link
              key={dest.name}
              to={`/stays?destination=${dest.filter}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
            >
              <img
                src={dest.image}
                alt={`${dest.name}, Sri Lanka — ${dest.tagline}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-white/75 mt-0.5">{dest.tagline}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
