import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore Stays', to: '/stays' },
  { label: 'About Us', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const handleAnchorLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        window.location.href = href
        return
      }
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  const navbarBg = isHome
    ? scrolled
      ? 'bg-[#111827]/95 backdrop-blur-md shadow-sm'
      : 'bg-transparent'
    : 'bg-[#111827] shadow-sm'

  const textColor = 'text-[#F3F4F6]'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        navbarBg,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Lanka Stayz home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
              <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className={cn('text-lg font-semibold tracking-tight', textColor)}>
              Lanka<span className="font-light"> Stayz</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.to.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleAnchorLink(e, link.to)}
                  className={cn(
                    'text-sm transition-colors hover:text-white',
                    textColor,
                    'opacity-80 hover:opacity-100',
                  )}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'text-sm transition-colors',
                      textColor,
                      isActive ? 'opacity-100 font-medium' : 'opacity-80 hover:opacity-100',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-white text-[#111827] hover:bg-[#F3F4F6] font-medium"
            >
              <Link to="/stays">Browse Stays</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={cn(
              'md:hidden p-2 rounded-md transition-colors',
              textColor,
              'hover:bg-white/10',
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#111827] border-t border-white/10"
        >
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) =>
              link.to.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleAnchorLink(e, link.to)}
                  className="px-3 py-2 rounded-md text-sm text-[#F3F4F6] opacity-80 hover:opacity-100 hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 rounded-md text-sm text-[#F3F4F6] transition-colors',
                      isActive
                        ? 'bg-white/10 opacity-100 font-medium'
                        : 'opacity-80 hover:opacity-100 hover:bg-white/10',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
            <div className="pt-2 border-t border-white/10 mt-2">
              <Button asChild size="sm" className="w-full bg-white text-[#111827] hover:bg-[#F3F4F6]">
                <Link to="/stays">Browse Stays</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
