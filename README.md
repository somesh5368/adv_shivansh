# Premium Advocate Website & Secure Admin Management System

A production-grade, full-stack practice website and administration content management system engineered for **Advocate Shivansh Kumar Pandey** (Civil, Family & Taxation Law Expert, Civil Court, Gorakhpur, Uttar Pradesh, India).

Built strictly in accordance with Bar Council of India professional standards and modern cloud architectures.

---

## 🏛️ Project Information

- **Client Name:** Shivansh Kumar Pandey
- **Designation:** Advocate
- **Professional Tagline:** Civil, Family & Taxation Law Expert
- **Forum / Location:** Civil Court, Gorakhpur, Uttar Pradesh, India
- **Official Phone:** +91 9198106052
- **Official Email:** [advshiv43@gmail.com](mailto:advshiv43@gmail.com)
- **Primary Disciplines:**
  1. **Civil Litigation:** Property Disputes, Contracts & Agreements, Writs, Appeals & Revisions
  2. **Family Law:** Divorce Proceedings, Child Custody & Visitation, Alimony & Maintenance, Domestic Violence Matters
  3. **Taxation & GST:** ITR Filing, Tax Planning & Advisory, GST Registration, GST Compliance & Notice Handling
  4. **Business Registration:** MSME / Udyam Registration, Firm Registration, Company Incorporation (Pvt Ltd / LLP)
  5. **ESI & Labour Welfare:** PF Registration & Setup, Monthly Returns, Labour Compliance Advisory
  6. **Trademark & Intellectual Property:** Trademark Registration, Brand Name Protection, Logo Registration, Copyright Registration
  7. **Government-Sponsored Schemes:** Project Reports (DPR), PMEGP Assistance, MUDRA Loan Advisory, Startup India Assistance

*Note: All Bar Council numbers, verified academic degrees, and office chamber numbers contain structured placeholders awaiting client verification.*

---

## 🛠️ Architecture & Tech Stack

```text
Visitor / Advocate Admin
         │
         ▼
Next.js 14+ Frontend (App Router, React, TypeScript, Tailwind CSS, Lucide, Framer Motion)
         │
         ▼
Node.js + Express Backend (TypeScript REST API, Zod, Helmet, Rate Limiter, Pino Logger)
         ├─────────────────────────────────────────┐
         ▼                                         ▼
Supabase PostgreSQL & Storage            Brevo (Sendinblue)
  • Auth JWT Verification                  • Custom SMTP for Supabase Auth OTP
  • Row Level Security (RLS)               • Transactional Notification REST API
  • Public Buckets (profile, site, article)
```

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Cormorant Garamond & Inter typography, Lucide React icons, Framer Motion.
- **Backend:** Node.js, Express.js, TypeScript, Zod request validation, Helmet HTTP headers, CORS origin allowlist, rate limiting, structured logging (`pino`), rich-text HTML sanitization (`sanitize-html`).
- **Database & Storage:** Supabase PostgreSQL with Row Level Security (RLS) on all 8 tables and Supabase Storage with MIME/size validation policies.
- **Authentication:** Supabase Auth as the single source of truth for identity and sessions; Express verifies tokens server-side and checks `admin_profiles`.
- **Email Delivery:** Brevo (Sendinblue) custom SMTP for Supabase Auth + Brevo Transactional Email REST API for application notifications.
- **Deployment Targets:** Frontend on Vercel, Backend on Render, Database & Storage on Supabase.

---

## 📂 Project Structure

```text
shivansh/
├── frontend/                     # Next.js 14 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/         # Public pages: /, /about, /practice-areas, /resources, /contact, /disclaimer
│   │   │   ├── admin/            # Secure admin pages: /admin, /profile, /practice-areas, /services, /articles, /media, /settings, /security
│   │   │   ├── layout.tsx        # Global layout & metadata
│   │   │   ├── globals.css       # Tailwind & luxury typography tokens
│   │   │   ├── sitemap.ts        # Dynamic XML sitemap
│   │   │   └── robots.ts         # SEO crawlers directive
│   │   ├── components/           # UI primitives, public layouts & admin components
│   │   ├── lib/                  # Backend API fetcher & Supabase client
│   │   └── types/                # Domain TypeScript definitions
│   └── package.json
├── backend/                      # Separate Express.js REST API
│   ├── src/
│   │   ├── config/               # Env validation (Zod), Supabase & Brevo clients
│   │   ├── controllers/          # Public, Admin, Auth, Health, Media controllers
│   │   ├── middleware/           # authMiddleware, adminCheck, errorHandler, rateLimiter, validateRequest
│   │   ├── repositories/         # Supabase PostgreSQL data access with fallback replica
│   │   ├── routes/               # Modular Express routers
│   │   ├── services/             # Storage, Email (Brevo), Audit services
│   │   ├── utils/                # Logger, HTML sanitizer, API error & response handlers
│   │   ├── app.ts                # Express application setup
│   │   └── server.ts             # Server entry point
│   ├── tests/                    # Vitest API test suite (11/11 tests passing)
│   └── package.json
├── database/
│   ├── migrations/               # PostgreSQL DDL migrations & RLS policies
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_and_security.sql
│   │   └── 003_storage_buckets_policies.sql
│   └── seeds/                    # Seed script with authentic practice areas
│       └── 001_seed_initial_data.sql
├── docs/                         # Detailed engineering documentation
│   ├── API.md                    # REST API endpoint reference
│   ├── DEPLOYMENT.md             # Vercel, Render, Supabase deployment guide
│   ├── SECURITY.md               # Security checklist and RLS verification
│   └── BREVO_SETUP.md            # Brevo SMTP & DNS records guide
└── README.md
```

---

## 🚀 Quickstart & Development

### 1. Prerequisites
- Node.js `v20+` or `v24+`
- npm `10+`

### 2. Install Dependencies
```bash
# Install backend dependencies
npm --prefix backend install

# Install frontend dependencies
npm --prefix frontend install
```

### 3. Environment Configuration
Copy environment templates:
```bash
# In backend/
cp backend/.env.example backend/.env

# In frontend/
cp frontend/.env.example frontend/.env
```

**Frontend (`frontend/.env`):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-anon-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-secret-key
BREVO_API_KEY=xkeysib-your-brevo-api-key
BREVO_SENDER_EMAIL=advshiv43@gmail.com
BREVO_SENDER_NAME="Adv. Shivansh Kumar Pandey"
```

### 4. Run the Backend Test Suite
```bash
npm --prefix backend run test
```
*Executes 11 automated unit and integration tests verifying health checks, public APIs, input validations, security 401/403 protections, and content management workflows.*

### 5. Build and Verify
```bash
# Compile and build the backend TypeScript code
npm --prefix backend run build

# Compile and generate static pages for the frontend (21 routes)
npm --prefix frontend run build
```

### 6. Start Development Servers
In two separate terminals:
```bash
# Terminal 1: Start Express API Server (runs on http://localhost:5000)
npm run dev:backend

# Terminal 2: Start Next.js App (runs on http://localhost:3000)
npm run dev:frontend
```

---

## 🔒 Security Highlights

1. **Two-Stage Authorization:** Every `/api/admin/*` endpoint verifies the Supabase Auth bearer JWT signature and confirms the user is listed in PostgreSQL `admin_profiles`.
2. **PostgreSQL RLS:** Row Level Security active on all tables with explicit read/write separation.
3. **Storage RLS:** Buckets `profile-images`, `site-assets`, and `article-images` only permit administrative insertions with MIME and size constraints.
4. **HTML Sanitization:** Prevents stored XSS attacks by sanitizing rich-text article bodies via `sanitize-html`.
5. **No Secret Leaks:** Supabase service-role secret and Brevo API credentials remain strictly confined to the backend server.
6. **Bar Council Ethics:** Zero promotional or exaggerated performance claims; statutory Bar Council of India disclaimer banner displayed on all public pages.

---

## 📖 Documentation Index

- [REST API Reference](docs/API.md)
- [Production Deployment Guide (Vercel + Render + Supabase)](docs/DEPLOYMENT.md)
- [Security Checklist & Policies](docs/SECURITY.md)
- [Brevo Custom SMTP & Transactional API Setup](docs/BREVO_SETUP.md)

---

## ⚖️ Legal Disclaimer
As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any manner. This application is designed solely for informational and educational purposes upon voluntary user request and does not constitute formal legal counsel or create an advocate-client relationship.

