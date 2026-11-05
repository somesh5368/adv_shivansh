# Deployment Guide: Advocate Shivansh Legal Suite

This guide details the complete production deployment procedure for the Advocate Legal Practice Management application:
- **Frontend:** Vercel (Next.js 14 App Router)
- **Backend:** Render (Node.js + Express + TypeScript)
- **Database & Storage:** Supabase (PostgreSQL + Buckets)
- **Email Delivery:** Brevo (SMTP + REST API)

---

## 1. Supabase Setup (Database & Storage)

### Step 1: Create Supabase Project
1. Log in to [Supabase Console](https://supabase.com/dashboard) and create a new project.
2. Choose a strong database password and select your region (e.g. `ap-south-1` Mumbai for Indian clients).
3. Under **Project Settings > API**, note down:
   - `Project URL` (`SUPABASE_URL`)
   - `anon public` key (`SUPABASE_PUBLISHABLE_KEY`)
   - `service_role secret` key (`SUPABASE_SERVICE_ROLE_KEY` — *never expose on frontend!*)

### Step 2: Run SQL Migrations
In the Supabase SQL Editor, run the migration scripts located in `/database/migrations/` in sequential order:
1. `001_initial_schema.sql` — Creates tables, indexes, and automatic timestamp triggers.
2. `002_rls_and_security.sql` — Enables PostgreSQL Row Level Security (RLS) and defines role policies.
3. `003_storage_buckets_policies.sql` — Sets up `profile-images`, `site-assets`, and `article-images` buckets with RLS.
4. Run `/database/seeds/001_seed_initial_data.sql` to populate initial practice areas and advocate profile placeholders.

### Step 3: Register Admin User
1. In **Supabase Authentication > Users**, invite or create an administrator user with email: `advshiv43@gmail.com`.
2. Copy the resulting `user_id` (UUID).
3. In the SQL Editor, execute:
   ```sql
   INSERT INTO public.admin_profiles (user_id, display_name, role)
   VALUES ('<COPIED_AUTH_USER_UUID>', 'Advocate Shivansh Kumar Pandey', 'super_admin');
   ```

---

## 2. Brevo (Sendinblue) Configuration

### Step 1: API Key & Sender Setup
1. Log in to [Brevo](https://app.brevo.com/).
2. Under **Senders & IP**, add and verify:
   - Name: `Adv. Shivansh Kumar Pandey`
   - Email: `advshiv43@gmail.com`
3. Under **SMTP & API Keys**, generate a new API Key (`BREVO_API_KEY`).
4. Note your SMTP credentials:
   - Host: `smtp-relay.brevo.com`
   - Port: `587`
   - Login: Your Brevo account email
   - Password: Master SMTP key

### Step 2: Configure Custom SMTP in Supabase Auth
1. In Supabase Dashboard, navigate to **Project Settings > Authentication > Email Settings**.
2. Enable **Custom SMTP**.
3. Fill in the Brevo SMTP credentials from Step 1.
4. All Supabase Auth OTPs, verification emails, and password recovery emails will now be delivered via Brevo.

---

## 3. Backend Deployment (Render)

1. Push your repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/), create a new **Web Service**.
3. Select your repository and configure:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Health Check Path:** `/api/health`
4. Set Environment Variables:
   | Variable | Value | Description |
   |---|---|---|
   | `PORT` | `10000` | Port assigned by Render |
   | `NODE_ENV` | `production` | Production environment |
   | `FRONTEND_ORIGIN` | `https://your-domain.vercel.app` | Allowed CORS origin |
   | `SUPABASE_URL` | `https://your-id.supabase.co` | Supabase Project URL |
   | `SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` | Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Supabase service_role secret |
   | `BREVO_API_KEY` | `xkeysib-...` | Brevo API key |
   | `BREVO_SENDER_EMAIL` | `advshiv43@gmail.com` | Verified Brevo sender |
   | `BREVO_SENDER_NAME` | `Adv. Shivansh Kumar Pandey` | Verified Brevo sender name |
5. Deploy and verify that `GET https://your-backend.onrender.com/api/health` returns `status: "healthy"`.

---

## 4. Frontend Deployment (Vercel)

1. In [Vercel Dashboard](https://vercel.com/dashboard), import your GitHub repository.
2. Set **Root Directory** to `frontend`.
3. Framework Preset will auto-detect **Next.js**.
4. Set Environment Variables:
   | Variable | Value | Description |
   |---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-id.supabase.co` | Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` | Supabase anon key |
   | `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend.onrender.com/api` | Render backend URL |
5. Deploy.
6. Verify live pages:
   - Public: `/`, `/about`, `/practice-areas`, `/resources`, `/contact`, `/disclaimer`
   - Admin: `/admin/login`

