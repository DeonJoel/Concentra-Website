# Concentra Website Frontend (Portal)

A high-performance, responsive React frontend for Concentra Precision Technologies' B2B web application. Built with Next.js App Router and Tailwind CSS, this portal includes a public product catalogue and a secure internal admin terminal for managing content, HR, and RFQ pipelines.

## 🚀 What’s included

- Public-facing B2B website with product, services, company, and quote request pages
- Secure admin terminal under `/hq-command-77x`
- Dynamic RFQ detail pages at `/hq-command-77x/dashboard/rfq/[id]`
- Built-in backend proxy for local FastAPI integration
- Modern Next.js App Router architecture with reusable UI components

## 📌 Key Features

- **Next.js App Router:** Fast server-side rendering, layout nesting, and route groups
- **Tailwind CSS:** Responsive utility-first styling with custom brand theming
- **Admin Dashboard:** Protected admin experience for analytics, RFQs, content, and users
- **API Proxying:** `src/proxy.ts` handles backend requests and avoids local CORS issues
- **Modular Components:** Shared and home-specific components for easy maintenance

## 🛠 Prerequisites

Install the following before setup:

- Node.js v18.17.0 or higher
- npm, yarn, pnpm, or bun
- Git

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/concentra-portal.git
cd concentra-portal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

- Public site: `http://localhost:3000`
- Admin portal: `http://localhost:3000/hq-command-77x`

## 🔧 Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_API_URL="http://localhost:8000"
```

> Add any additional public keys or analytics values as needed.

## 📜 Available Scripts

- `npm run dev` — Start development server with HMR
- `npm run build` — Build the app for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint checks

## 📁 Project Structure

```
concentra-portal/
├── public/                     # Static assets (images, SVGs, icons)
│   ├── blueprint-placeholder.png
│   └── *.svg
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/           # Route Group: Public-facing B2B website
│   │   │   ├── company/        # About, Certifications, Facilities
│   │   │   ├── products/       # Spindles, Tool Holding, Cutting Tools, etc.
│   │   │   ├── services/       # Machining, Grinding, Balancing, etc.
│   │   │   └── request-quote/  # Public RFQ submission forms
│   │   ├── hq-command-77x/     # Secure Admin Terminal (Restricted Access)
│   │   │   ├── dashboard/      # Protected dashboards (Analytics, RFQ, CMS)
│   │   │   └── page.tsx        # Secure Login Entry Point
│   │   ├── globals.css         # Global Tailwind directives
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Reusable UI Components
│   │   ├── home/               # HeroSlider, CtaBanner, GlobalReach, etc.
│   │   └── shared/             # Navbar, Footer, CADViewer, GridOverlay
│   ├── lib/                    # Utility functions (e.g., Tailwind class mergers)
│   │   └── utils.ts
│   └── proxy.ts                # API routing proxy for backend communication
├── next.config.ts              # Next.js configuration and rewrites
├── tailwind.config.ts          # Tailwind theme and brand colors
└── package.json                # Project dependencies and scripts
```

## 🔗 Backend Integration

This frontend is designed to work with the Concentra Website Backend (FastAPI).

To use the admin functions and RFQ workflows:

1. Start the backend on `http://localhost:8000`
2. Confirm `NEXT_PUBLIC_API_URL` matches the backend URL
3. Verify proxy settings in `src/proxy.ts` or `next.config.ts`

## 🚀 Deployment Notes

- For production, build with `npm run build`
- Host on Vercel, Netlify, or any platform supporting Next.js
- Ensure backend API is accessible from the deployed frontend

## 📚 Additional Resources

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS Docs: https://tailwindcss.com/docs
- Vercel Deploy: https://vercel.com/docs

---

Made for Concentra Precision Technologies with a secure public site and admin portal.

```
concentra-portal
├─ AGENTS.md
├─ CLAUDE.md
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ blueprint-placeholder.png
│  ├─ Concentra_LOGO.png
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (public)
│  │  │  ├─ admin
│  │  │  │  └─ enquiries
│  │  │  │     └─ page.tsx
│  │  │  ├─ careers
│  │  │  │  └─ page.tsx
│  │  │  ├─ company
│  │  │  │  ├─ about
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ certifications
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ facilities
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  └─ quality
│  │  │  │     └─ page.tsx
│  │  │  ├─ contact-us
│  │  │  │  └─ page.tsx
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ products
│  │  │  │  ├─ cutting-tools
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ gauges
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ page.tsx
│  │  │  │  ├─ precision-components
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ special-purpose-machines
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ spindles
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ tool-holding
│  │  │  │     └─ page.tsx
│  │  │  ├─ request-quote
│  │  │  │  ├─ enquiry
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  └─ services
│  │  │     ├─ balancing
│  │  │     │  └─ page.tsx
│  │  │     ├─ cast-iron
│  │  │     │  └─ page.tsx
│  │  │     ├─ grinding
│  │  │     │  └─ page.tsx
│  │  │     ├─ horizontal-machining
│  │  │     │  └─ page.tsx
│  │  │     ├─ page.tsx
│  │  │     ├─ turning
│  │  │     │  └─ page.tsx
│  │  │     └─ vertical-machining
│  │  │        └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ favicon1.ico
│  │  ├─ globals.css
│  │  └─ hq-command-77x
│  │     ├─ dashboard
│  │     │  ├─ analytics
│  │     │  │  └─ page.tsx
│  │     │  ├─ careers
│  │     │  │  └─ page.tsx
│  │     │  ├─ contact
│  │     │  │  └─ page.tsx
│  │     │  ├─ content
│  │     │  │  └─ page.tsx
│  │     │  ├─ layout.tsx
│  │     │  ├─ page.tsx
│  │     │  ├─ rfq
│  │     │  │  └─ [id]
│  │     │  │     └─ page.tsx
│  │     │  └─ users
│  │     │     └─ page.tsx
│  │     ├─ layout.tsx
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ home
│  │  │  ├─ CtaBanner.tsx
│  │  │  ├─ GlobalReach.tsx
│  │  │  ├─ HeroSlider.tsx
│  │  │  ├─ OurExpertise.tsx
│  │  │  ├─ QualityCertificates.tsx
│  │  │  └─ TrustedBy.tsx
│  │  └─ shared
│  │     ├─ Breadcrumb.tsx
│  │     ├─ CADViewer.tsx
│  │     ├─ Footer.tsx
│  │     ├─ GridOverlay.tsx
│  │     ├─ Navbar.tsx
│  │     └─ NavDropdowns.tsx
│  ├─ lib
│  │  └─ utils.ts
│  └─ proxy.ts
└─ tsconfig.json
```
