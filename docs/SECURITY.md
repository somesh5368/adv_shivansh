# Security Architecture & Verification Checklist

This application adheres to rigorous security standards designed specifically for legal practice management systems under Indian jurisdictional standards and modern cloud architectures.

---

## 1. Key Security Measures Implemented

### Server-Side Administrator Verification
- **Principle:** Never trust client-supplied tokens or frontend-claimed roles.
- **Implementation:**
  1. The client receives a JWT signed by Supabase Auth upon successful authentication.
  2. The client transmits the JWT in the `Authorization: Bearer <token>` header to the Express backend.
  3. Express middleware (`authMiddleware`) verifies the token authenticity with Supabase Auth.
  4. The second-stage middleware (`adminMiddleware`) queries the database `admin_profiles` table to confirm that `auth.users.id` is explicitly mapped to an administrator role (`super_admin` or `admin`).
  5. Requests from unlisted users or unauthorized clients are rejected with `403 Forbidden`.

### Row Level Security (RLS)
- Enabled on all 8 application tables (`advocate_profile`, `practice_areas`, `services`, `articles`, `site_settings`, `admin_profiles`, `enquiries`, `audit_logs`).
- Public / Anon access is strictly read-only for published content (`is_published = true` or `status = 'published'`).
- Mutating operations (`INSERT`, `UPDATE`, `DELETE`) require authenticated status verified against `is_admin()`.
- Public users can only insert into `enquiries` with length validations, but cannot select or view other inquiries.

### Storage Bucket Policies
- Buckets: `profile-images`, `site-assets`, `article-images`.
- Public read access for public asset rendering.
- Mutation (upload, replace, delete) restricted to authenticated users present in `admin_profiles`.
- File size caps: 5MB for profile photos, 8MB for article covers, 10MB for site assets.
- MIME type restriction: Only `image/jpeg`, `image/png`, `image/webp` (and `image/svg+xml` for assets). Executable binaries (`.exe`, `.sh`, `.php`, `.js`) are rejected at both Multer and Supabase Storage layers.

### Rich-Text HTML Sanitization
- In `backend/src/utils/sanitize.ts`, rich-text content from article drafting is processed with `sanitize-html` before database persistence.
- Strips script tags, iframes, inline event handlers (`onload`, `onerror`), and forces `rel="noopener noreferrer nofollow"` and `target="_blank"` on external hyperlinks.

### HTTP Security Headers & Network Protection
- **Helmet:** Configures Content Security Policy (CSP), hides `X-Powered-By: Express`, and enforces `X-Content-Type-Options: nosniff`.
- **CORS:** Restricts cross-origin requests to configured origins (`FRONTEND_ORIGIN`).
- **Rate Limiting:**
  - Standard endpoints: 100 requests per 15-minute window.
  - Sensitive endpoints (`/api/public/enquiries`, `/api/auth/verify-session`): 15 requests per 15-minute window.

### Secret Isolation
- `SUPABASE_SERVICE_ROLE_KEY`, `BREVO_API_KEY`, and database connection strings are never bundled into frontend assets.
- Next.js environment is strictly restricted to `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_API_BASE_URL`.

### Privacy & Confidentiality Safeguards
- Non-confidential contact forms: Disclaimers explicitly advise clients not to submit privileged evidence over the web form.
- Audit logs record privileged actions while omitting passwords, OTPs, session tokens, or sensitive body contents.

---

## 2. Production Security Checklist

| Check | Status | Verification Method |
|---|---|---|
| PostgreSQL RLS Enabled on All Tables | PASS | Verified in `database/migrations/002_rls_and_security.sql` |
| Storage Bucket Upload RLS Policies | PASS | Verified in `database/migrations/003_storage_buckets_policies.sql` |
| Express Admin Token Verification | PASS | Unit tested in `backend/tests/api.test.ts` (returns 401/403) |
| Helmet HTTP Headers Active | PASS | Verified in `backend/src/app.ts` |
| CORS Origin Restriction | PASS | Configured in `backend/src/app.ts` |
| Rate Limiter on Public & Auth APIs | PASS | Tested with `express-rate-limit` |
| Rich Text HTML Sanitization | PASS | Verified via `sanitizeRichText` filter |
| No Service Role Secret on Client | PASS | Isolated in `backend/.env.example` |
| No OTP / Passwords Logged | PASS | Audit logs and structured logger exclude secrets |
| Input Validation on All Mutating Routes | PASS | Zod schemas attached to Express routes |

