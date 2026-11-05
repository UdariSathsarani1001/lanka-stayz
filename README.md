# Lanka Stayz

A responsive accommodation discovery and booking-request prototype for **Lanka Stayz**, a fictional platform showcasing villas, holiday homes, apartments, boutique hotels and cottages across Sri Lanka.

Built as a frontend-only prototype for a Web Developer Practical Technical Assessment.

---

## Features

- **Homepage** with hero section, destination search, featured properties, destinations showcase, and About Us section
- **Explore Stays** page with destination filtering, result count, and empty state
- **Property Details** page with image gallery (lightbox), full amenities list, and booking panel
- **Booking Request Form** with full validation (React Hook Form + Zod v4) and on-screen confirmation
- **Responsive design** across mobile, tablet, and desktop
- **Cool Slate design system** with Playfair Display serif headings and Inter sans-serif body text
- Six sample properties across Colombo, Kandy, Ella, Galle, Mirissa, and Nuwara Eliya

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| Vite 8 | Build tooling and dev server |
| TypeScript | Type-safe components and data |
| Tailwind CSS v4 | Responsive styling |
| shadcn/ui (manual) | Accessible UI primitives |
| React Router v7 | Client-side routing |
| React Hook Form | Form state management |
| Zod v4 | Schema validation |
| @hookform/resolvers | Zod ↔ React Hook Form bridge |
| Lucide React | Icons |
| class-variance-authority | Component variant styling |
| clsx + tailwind-merge | Class merging utility |

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/stays` | Explore Stays (with `?destination=` filter support) |
| `/stays/:id` | Property Details |
| `/booking/:id` | Booking Request Form |
| `/#about` | About Us section (homepage anchor) |
| `/#contact` | Contact section / Footer |

---

## Deployment

Live URL: *(add Vercel URL after deployment)*

The project is configured for static deployment on Vercel. Push to GitHub and import into Vercel — no additional build configuration is required.

---

## Notes

- All property data is fictional and stored locally in `src/data/properties.ts`.
- Property images are sourced from [Unsplash](https://unsplash.com) for demonstration purposes only.
- No backend, database, live availability engine, user accounts, or payment processing is included.
- The booking form is a UI demonstration only — no data is stored or transmitted.
