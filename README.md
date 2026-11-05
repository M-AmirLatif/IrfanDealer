# Umri Properties – Real Estate Listing Portal (v1)

A modern, mobile-first real estate portal designed for **IRFAN UMRI**, licensed property dealer in Kasur, Punjab, Pakistan. Built with **React 19, Vite, Tailwind CSS, and Lucide Icons**.

This frontend portal is engineered with full Pakistan market conventions (Lakh/Crore price display, Marla/Kanal land units, direct WhatsApp and phone CTAs, and a decoupled service layer ready for drop-in backend integration).

---

## 1. Features & Highlights

- **Mobile-First UX for Pakistani Users**:
  - Base styles tested at 360px and 390px mobile screens (Android mid-range optimized).
  - Minimum 48px touch targets for all buttons and interactive controls.
  - One-tap direct **Call Now** (`tel:`) and **WhatsApp** (`wa.me`) buttons on every listing card, header, footer, dealer profile, and sticky mobile action bar.
- **Pakistan-Specific Real Estate Utilities**:
  - **Pakistani Currency**: Automatically converts prices into Lakh and Crore (`PKR 1.25 Crore`, `PKR 45 Lakh`, `PKR 35,000 / month`). Also shows exact comma grouping (`1,25,00,000`).
  - **Punjab Land Measurements**: Real estate calculations for Marla, Kanal, and Sq. Ft (1 Marla = 272.25 sq ft; 1 Kanal = 20 Marla = 5,445 sq ft).
  - **Phone Number Validation**: Strictly accepts authentic Pakistani mobile formats (`0300 1234567` or `+923001234567`).
- **Comprehensive Search & Dynamic Filtering**:
  - Filter by **Buy** vs. **Rent**, debounced keyword/code search, multi-select localities, property types, price presets, bedrooms, bathrooms, and size in Marla/Kanal.
  - **URL Query-Synced State**: Filter state lives in the URL query string (`/properties?listingType=sale&area=lahore-road&type=house&minPrice=5000000`), making links 100% shareable on WhatsApp.
  - Responsive **bottom-sheet filter drawer** on mobile; sticky filter sidebar on desktop.
- **Media & Gallery Architecture**:
  - Touch-swipe image gallery with thumbnail strip.
  - Fullscreen Lightbox supporting touch-swipe, arrow navigation, keyboard controls (`←`, `→`, `Esc`), and image counter.
  - Reusable `VideoPlayer` with a high-performance click-to-load **YouTube facade thumbnail** (zero heavy iframes until tapped) and HTML5 MP4 player support.
- **Decoupled Architecture & Future Multi-Dealer Ready**:
  - Designed for 5 dealers: contains 1 active dealer (Irfan Umri) and 4 pre-configured placeholder dealers. Simply flip `isActive: true` in data to demo multi-dealer mode without any code changes.
  - Zero raw data imports in components—all data operations go through simulated async service layers (`propertyService`, `areaService`, `dealerService`, `inquiryService`).

---

## 2. Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (ESM, strict JSDoc typing via `src/data/schema.js`)
- **Styling**: Tailwind CSS 3.4 (with customized emerald & gold Pakistani palette)
- **Routing**: React Router 7 (`createBrowserRouter`, lazy code splitting with `Suspense`)
- **Icons**: `lucide-react`
- **Code Formatter**: Prettier

---

## 3. Project Folder Structure

```text
propertyDealingIrfan/
├── public/
│   ├── favicon.svg               # SVG house/key emblem in emerald & gold
│   └── _redirects                # Netlify SPA fallback redirect
├── src/
│   ├── app/
│   │   ├── router.jsx            # React Router v7 routes & code-splitting
│   │   ├── Layout.jsx            # Global Layout (Header, Footer, FloatingWhatsApp)
│   │   └── ErrorBoundary.jsx     # Global React error boundary
│   ├── components/
│   │   ├── ui/                   # Reusable design system primitives
│   │   │   ├── Button.jsx        # Primary, secondary, whatsapp, outline, ghost
│   │   │   ├── Badge.jsx         # Sale, rent, featured, video badges
│   │   │   ├── Chip.jsx          # Interactive & removable filter chips
│   │   │   ├── Card.jsx          # Rounded-2xl container with soft shadows
│   │   │   ├── Input.jsx         # Accessible input with tel/numeric inputMode
│   │   │   ├── Select.jsx        # Dropdown select
│   │   │   ├── Modal.jsx         # Accessible modal with focus trap & Esc close
│   │   │   ├── Drawer.jsx        # Mobile bottom sheet & slide drawer
│   │   │   ├── Tabs.jsx          # Segmented pill switcher
│   │   │   └── Skeleton.jsx      # Shimmer loading cards & text
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Desktop & mobile nav with phone/working hours
│   │   │   ├── Footer.jsx        # Comprehensive footer with links & disclaimer
│   │   │   └── FloatingWhatsApp.jsx # Fixed bottom-right chat bubble
│   │   ├── property/
│   │   │   ├── PropertyCard.jsx  # Reusable listing card with 3:2 ratio & CTAs
│   │   │   ├── PropertyGrid.jsx  # Responsive grid with skeleton states
│   │   │   ├── PropertyGallery.jsx # Touch gallery & thumbnail strip
│   │   │   ├── Lightbox.jsx      # Fullscreen image viewer
│   │   │   ├── VideoPlayer.jsx   # YouTube facade & MP4 player
│   │   │   ├── PropertySpecs.jsx # Key facts grid (Beds, Baths, Marla, etc.)
│   │   │   ├── AmenitiesList.jsx # Infrastructure features checklist
│   │   │   ├── ContactCard.jsx   # Sticky desktop dealer contact box
│   │   │   ├── CallbackModal.jsx # Instant callback form modal
│   │   │   ├── PriceTag.jsx      # Lakh/Crore and full price display
│   │   │   └── StickyMobileBar.jsx # Fixed mobile bottom contact bar
│   │   ├── search/
│   │   │   ├── HeroSearch.jsx    # Homepage search bar
│   │   │   ├── FilterPanel.jsx   # Desktop & mobile filter controls
│   │   │   ├── FilterDrawer.jsx  # Mobile bottom-sheet filter drawer
│   │   │   ├── ActiveFilterChips.jsx # Removable active filter tags
│   │   │   ├── ResultsHeader.jsx # Result count, view mode & sorting
│   │   │   └── SortSelect.jsx    # Price / date / size sorting dropdown
│   │   ├── area/
│   │   │   └── AreaCard.jsx      # Locality card with live listing count
│   │   ├── dealer/
│   │   │   └── DealerCard.jsx    # Dealer bio, credentials & contact CTAs
│   │   └── common/
│   │       ├── BrandLogo.jsx     # Emerald & gold brand emblem
│   │       ├── Breadcrumbs.jsx   # Schema-ready breadcrumb trail
│   │       ├── SectionHeading.jsx# Section title with badge & action link
│   │       ├── EmptyState.jsx    # Friendly empty state with direct help CTA
│   │       ├── ShareButton.jsx   # Web Share API + copy link fallback
│   │       └── ScrollToTop.jsx   # Scroll restoration on route change
│   ├── constants/
│   │   └── routes.js             # Route path definitions & navigation items
│   ├── data/
│   │   ├── schema.js             # JSDoc schema specifications
│   │   ├── siteConfig.js         # Centralized phone, WhatsApp, address & hours
│   │   ├── areas.js              # 12 Kasur localities (Lahore Rd, Model Town, etc.)
│   │   ├── dealers.js            # Irfan Umri (active) + 4 placeholder dealers
│   │   ├── propertyTypes.js      # Taxonomy of houses, plots, shops, agri land
│   │   ├── amenities.js          # Sui gas, WAPDA, sewerage, security, etc.
│   │   ├── testimonials.js       # Customer quotes
│   │   └── properties.js         # 48 realistic dummy property listings
│   ├── hooks/
│   │   ├── useListingFilters.js  # URL search-params synchronized filter state
│   │   ├── useAsync.js           # Async data-fetching hook
│   │   ├── useDebounce.js        # Debounce text search
│   │   └── useDocumentTitle.js   # Dynamic document title and meta description
│   ├── pages/
│   │   ├── Home.jsx              # 11-section homepage
│   │   ├── Properties.jsx        # Filterable listing inventory
│   │   ├── PropertyDetails.jsx   # Comprehensive listing page
│   │   ├── Areas.jsx             # Kasur localities overview
│   │   ├── AreaDetails.jsx       # Locality profile & filtered listings
│   │   ├── Dealers.jsx           # Dealer directory (single/multi-dealer mode)
│   │   ├── DealerProfile.jsx     # Profile & portfolio of a specific dealer
│   │   ├── About.jsx             # Agency background, values & services
│   │   ├── Contact.jsx           # Office details, map card & inquiry form
│   │   └── NotFound.jsx          # Friendly 404 error page
│   ├── services/
│   │   ├── propertyService.js    # Async property queries with simulated delay
│   │   ├── areaService.js        # Area queries & computed average rates
│   │   ├── dealerService.js      # Dealer queries & inventory count
│   │   └── inquiryService.js     # Contact inquiries & callback requests
│   ├── styles/
│   │   └── index.css             # Tailwind directives & focus ring standards
│   └── utils/
│       ├── formatPrice.js        # Lakh/Crore and full Pakistani comma numbers
│       ├── formatSize.js         # Marla / Kanal / Sq. Ft conversions
│       ├── linkUtils.js          # WhatsApp & tel: generator, phone validation
│       ├── timeAgo.js            # Relative time formatting
│       ├── filterProperties.js   # Pure filtering logic
│       ├── sortProperties.js     # Pure sorting logic
│       └── slugify.js            # URL slug generator
├── vercel.json                   # Vercel SPA rewrites configuration
├── .env.example                  # Environment variable blueprint
├── tailwind.config.js            # Tailwind theme tokens & design system
└── package.json
```

---

## 4. Getting Started

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm (version 9+)

### Installation
```bash
# 1. Clone repository or navigate to project directory
cd propertyDealingIrfan

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Available Scripts
- `npm run dev` - Starts the Vite development server with hot-module replacement.
- `npm run build` - Creates an optimized production build in `/dist`.
- `npm run preview` - Previews the production build locally on port 5173.
- `npm run format` - Formats all JavaScript, JSX, JSON, and CSS files via Prettier.
- `npm run lint` - Runs linter verification.

---

## 5. Configuration & Content Customization

### Changing Dealer Phone, WhatsApp, and Brand Info
All contact numbers, office addresses, and brand descriptions are strictly centralized in `src/data/siteConfig.js`. **Never edit hard-coded phone numbers in JSX components.**

To update:
1. Open `src/data/siteConfig.js`.
2. Update `phoneDisplay` (`+92 301 6803398`), `phoneRaw` (`+923016803398`), or `whatsappNumber` (`923016803398`).
3. Changes will immediately cascade across the global Header, Mobile Drawer, Footer, Contact Page, and Floating WhatsApp button.

### How to Add a New Property Listing
Properties are defined in `src/data/properties.js`. To add a listing, append an object matching the JSDoc schema defined in `src/data/schema.js`:

```javascript
{
  id: "p049",
  code: "P049",
  slug: "7-marla-corner-house-lahore-road-kasur-p049",
  title: "7 Marla Corner Double Storey House on Lahore Road",
  description: "Architect-designed home with porcelain tiles...",
  listingType: "sale", // 'sale' | 'rent'
  propertyType: "house", // 'house' | 'plot' | 'flat' | 'shop' | 'commercial' | 'agricultural' | 'farmhouse' | 'office'
  price: 18500000, // PKR
  priceUnit: "total", // 'total' for sale, 'per_month' for rent
  isPriceNegotiable: true,
  securityDeposit: null, // rent only
  areaId: "lahore-road", // matches id in areas.js
  address: "Street 8, Block C, Lahore Road, Kasur",
  location: { lat: 31.135, lng: 74.455 },
  nearby: [{ label: "School", distance: "200 m" }],
  size: createSize(7, "marla"), // computes areaSqft automatically (1905.75)
  bedrooms: 4,
  bathrooms: 4,
  kitchens: 2,
  floors: 2,
  parking: 1,
  furnishing: "unfurnished",
  yearBuilt: 2024,
  facing: "Corner / East",
  condition: "Brand New",
  amenities: ["gas", "electricity", "water", "sewerage", "corner-plot"],
  documents: "Clear Registry & Intiqal Available",
  coverImage: "https://...",
  images: [{ url: "https://...", alt: "Front Elevation" }],
  video: { type: "youtube", url: "dQw4w9WgXcQ", poster: "https://..." },
  isFeatured: true,
  status: "available", // 'available' | 'sold' | 'rented'
  dealerId: "irfan-umri",
  createdAt: "2026-11-02T10:00:00Z",
  updatedAt: "2026-11-02T10:00:00Z",
  views: 1
}
```

### Enabling Multi-Dealer Mode (5 Authorized Dealers)
The portal already includes 4 additional placeholder dealers configured in `src/data/dealers.js`:
- Malik Tariq Mehmood (Pattoki & Chunian specialist)
- Sheikh Adnan Rasheed (Commercial & shops specialist)
- Chaudhry Waqas Gujjar (Societies & modern houses)
- Mian Kamran Javed (Legal verification & plots)

To activate multi-dealer mode:
1. Open `src/data/dealers.js`.
2. Change `isActive: false` to `isActive: true` on any or all dealers.
3. The dealers will automatically appear on `/dealers`, their profiles will be live at `/dealers/:dealerSlug`, and assigning their `id` to any property will route all Call and WhatsApp buttons directly to that dealer!

---

## 6. Deployment Guide

### Deploying on Vercel
1. Push your repository to GitHub or GitLab.
2. Import the project into Vercel.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. The included `vercel.json` ensures all deep URLs (`/properties/p001`, `/areas/lahore-road`) route to `index.html` without 404 errors.
6. Click **Deploy**.

### Deploying on Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. The included `public/_redirects` file (`/* /index.html 200`) ensures single-page application routing works on all deep links and page refreshes.

---

## 7. Dealer Admin Panel & Supabase Backend

Umri Properties is integrated with **Supabase (PostgreSQL + Auth + Storage)** providing a dedicated, single-dealer management panel for **Irfan Umri**:

- **Portal URL**: `/admin` (or `/admin/login`)
- **Dealer Credentials**:
  - Email: `irfan@umriproperties.pk`
  - Default Password: `UmriProperties2026!` (changeable in Supabase Auth)
- **Dealer Capabilities**:
  - **Upload New Listings**: Add properties for both Sale and Rent with full specifications, custom code, Lakh/Crore preview, Pakistani land units (Marla/Kanal/Sq Ft), and amenities.
  - **Multi-Photo & Video Upload**: Directly uploads multiple high-res photos and video walkthroughs (.mp4/.webm or YouTube links) into Supabase's `property-media` cloud storage bucket.
  - **Live Cover Photo Selection**: Click the star ⭐ on any uploaded photo to set it as the cover image.
  - **Edit & Update**: Update prices, change descriptions, modify amenities, or toggle "Featured on Homepage".
  - **Quick Status Control**: Switch status between `Available`, `Under Offer (Biana)`, `Sold`, `Rented`, or `Inactive (Draft)`.
  - **Delete Listings**: Permanently remove listings with confirmation dialog.
- **Public Visitors**:
  - Regular website visitors do not need to register or log in. All published listings are publicly accessible via Supabase Row-Level Security (RLS).
  - Viewing listings increments the view counter in real-time.
  - Offline fallback: If network connection to Supabase is unavailable, the site gracefully falls back to static dataset without breaking.

---

## 8. Deployment Guide

The application architecture is explicitly prepared for an easy transition to a full backend (FastAPI / Node.js / Laravel / Django) with zero UI rewriting:

1. **Service Layer Swap**:
   - In `src/services/propertyService.js`, replace the in-memory array operations with standard `fetch()` or `axios()` calls:
     ```javascript
     export async function getProperties(params) {
       const res = await fetch(`${API_BASE_URL}/properties?${new URLSearchParams(params)}`);
       return await res.json();
     }
     ```
   - Keep the return signature `{ items, total, page, pageSize }` identical.
2. **TanStack Query (React Query)**:
   - The custom `useAsync` hook shares the exact `{ data, loading, error, refetch }` pattern with `useQuery()`. Migrating to TanStack Query requires changing only the hook invocation.
3. **Authentication & Dealer Dashboard**:
   - Add JWT/cookie auth routes (`/login`, `/dealer-portal`).
   - Create a dashboard for Irfan Umri and the 4 other dealers to create, edit, upload photos, and mark listings as "sold" or "rented".
4. **Cloud Media Storage**:
   - Connect image uploads to AWS S3, Cloudinary, or Cloudflare R2 with image optimization webhooks.
5. **Urdu Localization (i18n)**:
   - All user-facing strings are cleanly separated and structured; ready for `i18next` integration with right-to-left (RTL) CSS support.
