# Development Summary — Lanka Stayz

## Project Approach

The project is structured as a multi-page single-page application using React Router for client-side navigation. The component tree is organised by concern:

- `src/components/layout/` — Navbar, Footer, and MainLayout shell that wraps every page via a React Router `<Outlet>`
- `src/components/home/` — Hero, SearchBar, FeaturedStays, DestinationsSection, and AboutSection
- `src/components/stays/` — PropertyCard, PropertyGrid, DestinationFilter, and PropertyGallery
- `src/components/booking/` — BookingForm
- `src/components/ui/` — Manually authored shadcn/ui-style primitives (Button, Card, Input, Label, Select, Badge)
- `src/pages/` — One file per route: HomePage, StaysPage, PropertyDetailsPage, BookingPage
- `src/data/properties.ts` — Single source of truth for all six sample properties
- `src/types/` — Shared TypeScript types (`Property`, `PropertyType`)
- `src/schemas/` — Zod booking validation schema (parameterised by `maxGuests`)
- `src/utils/` — `formatLKR` currency formatter and date helpers

All property data is accessed via helper functions (`getPropertyById`, `getAllDistricts`) to avoid repeating lookup logic in page components.

## Design Approach

The visual system draws inspiration from the boutique-editorial quality of the Casa Vela reference and the calm, nature-led narrative flow of the Cabana Mountain reference, while using original Lanka Stayz content and the specified **Cool Slate** palette rather than the references' warm earthy tones.

Key design decisions:

- **Full-viewport hero** with a high-contrast dark overlay, confident serif headline in Playfair Display, and a frosted-glass search panel
- **Playfair Display** for headings (editorial, elegant) and **Inter** for all UI and body text (clean, readable)
- **Cool Slate palette** throughout: `#111827` for primary text and dark surfaces, `#1F2937` for buttons and navigation, `#374151` for secondary text, `#9CA3AF` for borders and muted states, `#F3F4F6` for backgrounds
- Large property photography with consistent 4:3 aspect ratios on cards and a 2×2+main grid on the details page
- Generous whitespace, restrained shadows, and subtle hover scale transitions to maintain the premium boutique tone

## Technologies Used

- **React** — component composition and UI state
- **Vite** — fast dev server and optimised production build
- **TypeScript** — typed property data, form schema, and component props
- **Tailwind CSS v4** — responsive, utility-first styling using the `@tailwindcss/vite` plugin
- **shadcn/ui** (manually authored primitives) — accessible Button, Card, Input, Label, Select, Badge components styled to the Cool Slate palette
- **React Router v7** — client-side routing with URL search params for filter state
- **React Hook Form** — performant form state management
- **Zod v4** — declarative form validation schema with custom cross-field refinement (checkout > checkin)
- **@hookform/resolvers** — bridges Zod schema with React Hook Form
- **Lucide React** — consistent iconography

## Implemented Functionality

- **Search from homepage** — destination, check-in/out dates, and guest count navigate to `/stays` with URL query params, pre-populating the listings page search bar
- **Destination filtering** — pill-button filter on the Stays page; syncs with URL `?destination=` param; shows result count and empty state
- **Property details** — full gallery with desktop grid view and lightbox, amenities list, sticky booking sidebar
- **Booking form validation** — required fields, email format, Sri Lankan phone format, date range check, guest count capped at `property.maxGuests`
- **Booking confirmation** — on valid submit, renders a success panel with the booking summary and a clear demo disclaimer
- **Responsive navigation** — hamburger menu on mobile with smooth open/close and accessible ARIA attributes

## Limitations

- No backend, server-side rendering, or API integration
- No persistent booking storage — data exists only in component state for the session
- No live availability engine — dates are informational only
- No user authentication or host management
- No payment processing
- Property images sourced from Unsplash for demonstration; usage terms should be confirmed before any commercial use

## Future Improvements

- **Production API** — REST or GraphQL backend to serve real property data
- **Database** — PostgreSQL or similar to persist properties, bookings, and user profiles
- **Authentication** — guest accounts and host dashboards (Clerk or Supabase Auth)
- **Live availability calendar** — real-time date blocking based on confirmed bookings
- **Booking management** — guest booking history, cancellation flow, and status tracking
- **Email notifications** — transactional email on booking request and confirmation (Resend or SendGrid)
- **Payment gateway** — Stripe or PayHere integration for Sri Lankan card and bank payments
- **Image optimisation** — self-hosted assets with next-gen formats (WebP/AVIF) and lazy-loading CDN
- **SEO** — server-side rendering or static generation (Next.js or Astro) with proper meta tags
- **Automated testing** — Vitest unit tests for utilities and schemas; Playwright end-to-end tests for critical paths
- **Additional filters** — property type, price range, guest capacity, and amenity filters on the Stays page
- **Map view** — interactive map of property locations
- **Reviews and ratings** — guest review system on property detail pages
