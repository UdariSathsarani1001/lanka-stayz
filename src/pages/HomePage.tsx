import HeroSection from '@/components/home/HeroSection'
import FeaturedStays from '@/components/home/FeaturedStays'
import DestinationsSection from '@/components/home/DestinationsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import AboutSection from '@/components/home/AboutSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedStays />
      <DestinationsSection />
      <TestimonialsSection />
      <AboutSection />
    </>
  )
}
