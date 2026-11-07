import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardVariant } from '@/lib/motion'

const testimonials = [
  {
    name: 'Sarah & James',
    location: 'United Kingdom',
    property: 'Mirissa Ocean Villa',
    rating: 5,
    quote:
      'The most incredible beachfront villa we have ever stayed in. Waking up to that ocean view every morning was something we will never forget. Lanka Stayz made the whole booking process effortless.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
  },
  {
    name: 'Thomas Müller',
    location: 'Germany',
    property: 'Ella Nature Retreat',
    rating: 5,
    quote:
      'The hill-country views from our balcony were breathtaking. The retreat staff went above and beyond, and the Sri Lankan breakfasts were extraordinary. We have already booked our return trip.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
  },
  {
    name: 'Priya Sharma',
    location: 'India',
    property: 'Galle Heritage House',
    rating: 5,
    quote:
      'Staying inside Galle Fort in this beautifully restored colonial house was a dream. The rooftop terrace at sunset was absolutely magical. The attention to detail in the property is remarkable.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-[#9CA3AF]'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#111827]" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mb-2">
            Guest Stories
          </p>
          <h2 id="testimonials-heading" className="font-display text-3xl font-bold text-white sm:text-4xl">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-[#9CA3AF] max-w-lg mx-auto">
            Real experiences from guests who discovered their perfect Sri Lankan stay through Lanka Stayz.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              variants={cardVariant}
              whileHover={{
                y: -4,
                backgroundColor: 'rgba(255,255,255,0.08)',
                transition: { duration: 0.25 },
              }}
            >
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>
              <blockquote className="flex-1 mb-6">
                <p className="text-[#F3F4F6]/80 leading-relaxed text-sm">
                  "{t.quote}"
                </p>
              </blockquote>
              <p className="text-xs text-[#9CA3AF] mb-4">
                Stayed at: <span className="text-[#F3F4F6]">{t.property}</span>
              </p>
              <figcaption className="flex items-center gap-3 border-t border-white/10 pt-4">
                <img
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{t.location}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
