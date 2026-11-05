import { Link } from 'react-router-dom'
import { MapPin, Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#111827]">
            <MapPin className="h-9 w-9 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Error code */}
        <p className="text-xs font-semibold uppercase tracking-widest text-[#374151] mb-3">
          Error 404
        </p>

        {/* Headline */}
        <h1 className="font-display text-3xl font-bold text-[#111827] sm:text-4xl mb-4">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-[#374151] mb-8 leading-relaxed">
          The page you're looking for doesn't exist, may have moved, or the URL
          may be incorrect. Let's get you back to discovering Sri Lanka's finest stays.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/">
              <Home className="h-4 w-4" aria-hidden="true" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <Link to="/stays">
              <Search className="h-4 w-4" aria-hidden="true" />
              Browse Stays
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
