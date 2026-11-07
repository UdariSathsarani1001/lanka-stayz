import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { slideDown } from '@/lib/motion'

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

  return (
    <motion.header
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', navbarBg)}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/"
              className="flex items-center gap-2 group"
              aria-label="Lanka Stayz home"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#F3F4F6]">
                Lanka<span className="font-light"> Stayz</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.to.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.to}
                  onClick={(e) => handleAnchorLink(e, link.to)}
                  className="text-sm text-[#F3F4F6] opacity-80 hover:opacity-100 transition-opacity"
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
                      'text-sm text-[#F3F4F6] transition-opacity',
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
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button asChild size="sm" className="bg-white text-[#111827] hover:bg-[#F3F4F6] font-medium">
                <Link to="/stays">Browse Stays</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-md text-[#F3F4F6] hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu — animated slide-down */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-[#111827] border-t border-white/10 overflow-hidden"
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) =>
                link.to.startsWith('/#') ? (
                  <motion.a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => handleAnchorLink(e, link.to)}
                    className="px-3 py-2 rounded-md text-sm text-[#F3F4F6] opacity-80 hover:opacity-100 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'block px-3 py-2 rounded-md text-sm text-[#F3F4F6] transition-colors',
                          isActive
                            ? 'bg-white/10 opacity-100 font-medium'
                            : 'opacity-80 hover:opacity-100 hover:bg-white/10',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ),
              )}
              <motion.div
                className="pt-2 border-t border-white/10 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button asChild size="sm" className="w-full bg-white text-[#111827] hover:bg-[#F3F4F6]">
                  <Link to="/stays">Browse Stays</Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
