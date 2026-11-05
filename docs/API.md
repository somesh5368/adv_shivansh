# Advocate Practice Management Suite - API Documentation

The Advocate Legal Suite backend is an independent Node.js + Express REST application built with TypeScript, Zod request validation, Supabase PostgreSQL, Supabase Storage, and Brevo Transactional Email integration.

- **Base URL:** `http://localhost:5000/api` (Development) / `https://your-backend.onrender.com/api` (Production)
- **Standard Envelope:**
  ```json
  {
    "success": true,
    "message": "Operation successful",
    "data": { ... },
    "meta": { ... }
  }
  ```
- **Error Envelope:**
  ```json
  {
    "success": false,
    "message": "Error description",
    "errors": [ ... ]
  }
  ```

---

## 1. System & Health

### `GET /api/health`
Health check and environment status.
- **Access:** Public
- **Response `200`:**
  ```json
  {
    "success": true,
    "data": {
      "status": "healthy",
      "timestamp": "2026-11-05T07:15:36.000Z",
      "uptime": 124.5,
      "environment": "production",
      "services": {
        "database": "configured",
        "email": "configured"
      }
    }
  }
  ```

---

## 2. Authentication (`/api/auth`)

Authentication sessions are initiated via **Supabase Auth** on the frontend (Email/Password or Email OTP delivered via Brevo custom SMTP). The Express backend validates the resulting JWT and verifies role mappings in `admin_profiles`.

### `POST /api/auth/verify-session`
Validates an active Supabase access token and verifies administrator authorization.
- **Access:** Public (Strict Rate Limited: 15 req / 15 min)
- **Body:**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
  }
  ```
- **Response `200`:**
  ```json
  {
    "success": true,
    "data": {
      "user": { "id": "uuid", "email": "advshiv43@gmail.com", "role": "authenticated" },
      "adminProfile": { "id": "uuid", "display_name": "Advocate Shivansh Kumar Pandey", "role": "super_admin" }
    }
  }
  ```

### `GET /api/auth/me`
Retrieves currently authenticated user and administrator profile.
- **Access:** Authenticated (`Authorization: Bearer <token>`)

### `POST /api/auth/logout`
Logs an administrator logout event and records an audit trail.
- **Access:** Authenticated (`Authorization: Bearer <token>`)

---

## 3. Public Practice Endpoints (`/api/public`)

All public endpoints are rate-limited at 100 requests per 15 minutes.

### `GET /api/public/profile`
Retrieves verified practice profile for Adv. Shivansh Kumar Pandey.

### `GET /api/public/practice-areas`
Returns all published practice areas sorted by display order.

### `GET /api/public/practice-areas/:slug`
Returns full practice discipline details along with associated sub-services.
- **Params:** `slug` (e.g. `civil-litigation`, `family-law`, `taxation-gst`)

### `GET /api/public/services`
Returns all active sub-services across disciplines.

### `GET /api/public/articles`
Returns all published educational legal explainers.
- **Query Params:** `category` (optional filter)

### `GET /api/public/articles/:slug`
Returns single published article by slug.

### `GET /api/public/settings`
Returns public site settings (contact details, Bar Council disclaimer).

### `POST /api/public/enquiries`
Submits a non-confidential consultation request or enquiry and dispatches an immediate notification to the advocate via Brevo.
- **Access:** Public (Strict Rate Limited: 15 req / 15 min)
- **Body:**
  ```json
  {
    "full_name": "Rohan Sharma",
    "email": "rohan.sharma@example.com",
    "phone": "+91 9876543210",
    "subject": "Civil Title & Partition Consultation",
    "message": "Seeking appointment regarding property demarcation proceedings in Gorakhpur."
  }
  ```

---

## 4. Protected Administration Endpoints (`/api/admin`)

Every endpoint under `/api/admin/*` enforces:
1. Valid Supabase Bearer JWT token in `Authorization: Bearer <token>`.
2. Server-side verification that `auth.users.id` exists in PostgreSQL `admin_profiles`.
3. Immutable audit logging of mutations to `audit_logs`.

### Profile
- `GET /api/admin/profile` — Fetch advocate profile.
- `PUT /api/admin/profile` — Update biography, verified qualifications, Bar enrolment, contact numbers, and office timings.

### Practice Disciplines
- `GET /api/admin/practice-areas` — List all practice areas (published and unpublished).
- `GET /api/admin/practice-areas/:id` — Get single practice area by UUID.
- `POST /api/admin/practice-areas` — Create new practice discipline.
- `PUT /api/admin/practice-areas/:id` — Update discipline title, slug, short description, full description, display order, or publish status.
- `DELETE /api/admin/practice-areas/:id` — Delete practice area.

### Services
- `GET /api/admin/services` — List all sub-services (optional filter `?practice_area_id=<uuid>`).
- `POST /api/admin/services` — Create service and attach to practice area.
- `PUT /api/admin/services/:id` — Update service title, description, order, or publish state.
- `DELETE /api/admin/services/:id` — Delete service.

### Articles
- `GET /api/admin/articles` — List all articles (drafts & published).
- `GET /api/admin/articles/:id` — Retrieve article by UUID.
- `POST /api/admin/articles` — Create article (content automatically sanitized with `sanitize-html`).
- `PUT /api/admin/articles/:id` — Update article fields.
- `POST /api/admin/articles/:id/publish` — Publish article live and dispatch confirmation notification.
- `POST /api/admin/articles/:id/unpublish` — Revert article to draft status.
- `DELETE /api/admin/articles/:id` — Permanently delete article.

### Storage & Media
- `GET /api/admin/media?bucket=<bucket>` — List assets from `site-assets`, `profile-images`, or `article-images`.
- `POST /api/admin/media/upload` — Multipart form-data image upload. Validates MIME type (JPEG/PNG/WebP) and file size (max 5MB–10MB).
- `DELETE /api/admin/media/:bucket/:path` — Remove asset from Supabase Storage bucket.

### Settings, Security & Audit
- `GET /api/admin/settings` — List all site settings.
- `POST /api/admin/settings` — Upsert site setting key-value pair.
- `GET /api/admin/audit-logs` — Retrieve recent privileged admin actions from `audit_logs`.
- `GET /api/admin/enquiries` — List public practice enquiries.
- `PATCH /api/admin/enquiries/:id/status` — Update enquiry status (`unread`, `reviewed`, `archived`).
- `POST /api/admin/notifications/test` — Test Brevo transactional email pipeline.

