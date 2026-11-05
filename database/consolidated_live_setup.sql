-- ==============================================================================
-- Consolidated Setup Script for Advocate Shivansh Kumar Pandey Legal Suite
-- Execute this script once in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard/project/nqipsneodzbnnntvfygb/sql)
-- It creates:
--   1. Extensions & Normalized Tables
--   2. Hardened Row Level Security (RLS) Policies (non-recursive)
--   3. Storage Buckets (profile-images, site-assets, article-images) & Storage Policies
--   4. Authentic Initial Seed Data (Advocate Profile, 7 Practice Areas, Services, Articles, Settings)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PART 1: EXTENSIONS & TABLES
-- ------------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.advocate_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    designation TEXT NOT NULL,
    tagline TEXT NOT NULL,
    biography TEXT NOT NULL,
    qualifications TEXT NOT NULL,
    enrolment_number TEXT,
    enrolment_council TEXT,
    image_path TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    office_address TEXT NOT NULL,
    office_timings TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.practice_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    image_path TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_practice_areas_slug ON practice_areas(slug);
CREATE INDEX IF NOT EXISTS idx_practice_areas_display_order ON practice_areas(display_order);

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practice_area_id UUID NOT NULL REFERENCES practice_areas(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_service_slug_per_area UNIQUE (practice_area_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_services_practice_area ON services(practice_area_id);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);

CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image_path TEXT,
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    meta_title TEXT,
    meta_description TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_public BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(setting_key);

CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_user_id ON admin_profiles(user_id);

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'reviewed', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_user_id UUID,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_advocate_profile_updated_at') THEN
        CREATE TRIGGER trg_advocate_profile_updated_at BEFORE UPDATE ON public.advocate_profile FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_practice_areas_updated_at') THEN
        CREATE TRIGGER trg_practice_areas_updated_at BEFORE UPDATE ON public.practice_areas FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_services_updated_at') THEN
        CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_articles_updated_at') THEN
        CREATE TRIGGER trg_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_site_settings_updated_at') THEN
        CREATE TRIGGER trg_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_admin_profiles_updated_at') THEN
        CREATE TRIGGER trg_admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- PART 2: ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.advocate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is current user an admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.admin_profiles
        WHERE user_id = auth.uid()
    );
$$;

-- advocate_profile policies
DROP POLICY IF EXISTS "Public can view advocate profile" ON public.advocate_profile;
CREATE POLICY "Public can view advocate profile" ON public.advocate_profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update advocate profile" ON public.advocate_profile;
CREATE POLICY "Admins can update advocate profile" ON public.advocate_profile FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert advocate profile" ON public.advocate_profile;
CREATE POLICY "Admins can insert advocate profile" ON public.advocate_profile FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- practice_areas policies
DROP POLICY IF EXISTS "Public can view published practice areas" ON public.practice_areas;
CREATE POLICY "Public can view published practice areas" ON public.practice_areas FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins can view all practice areas" ON public.practice_areas;
CREATE POLICY "Admins can view all practice areas" ON public.practice_areas FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage practice areas" ON public.practice_areas;
CREATE POLICY "Admins can manage practice areas" ON public.practice_areas FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- services policies
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (
    is_published = true
    AND EXISTS (
        SELECT 1 FROM public.practice_areas
        WHERE public.practice_areas.id = public.services.practice_area_id
        AND public.practice_areas.is_published = true
    )
);

DROP POLICY IF EXISTS "Admins can view all services" ON public.services;
CREATE POLICY "Admins can view all services" ON public.services FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- articles policies
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles" ON public.articles FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins can view all articles" ON public.articles;
CREATE POLICY "Admins can view all articles" ON public.articles FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can manage articles" ON public.articles;
CREATE POLICY "Admins can manage articles" ON public.articles FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- site_settings policies
DROP POLICY IF EXISTS "Public can view public site settings" ON public.site_settings;
CREATE POLICY "Public can view public site settings" ON public.site_settings FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- admin_profiles policies (Non-recursive)
DROP POLICY IF EXISTS "Users can view own admin profile" ON public.admin_profiles;
CREATE POLICY "Users can view own admin profile" ON public.admin_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- enquiries policies
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT TO anon, authenticated
WITH CHECK (
    length(full_name) > 1 AND
    length(email) > 4 AND
    length(message) > 5
);

DROP POLICY IF EXISTS "Admins can view and manage enquiries" ON public.enquiries;
CREATE POLICY "Admins can view and manage enquiries" ON public.enquiries FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- audit_logs policies
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.audit_logs;
CREATE POLICY "Admins can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (public.is_admin());

-- ------------------------------------------------------------------------------
-- PART 3: STORAGE BUCKETS & POLICIES
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('profile-images', 'profile-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('site-assets', 'site-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('article-images', 'article-images', true, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view profile-images" ON storage.objects;
CREATE POLICY "Public can view profile-images" ON storage.objects FOR SELECT USING (bucket_id = 'profile-images');

DROP POLICY IF EXISTS "Public can view site-assets" ON storage.objects;
CREATE POLICY "Public can view site-assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');

DROP POLICY IF EXISTS "Public can view article-images" ON storage.objects;
CREATE POLICY "Public can view article-images" ON storage.objects FOR SELECT USING (bucket_id = 'article-images');

DROP POLICY IF EXISTS "Admins can upload profile-images" ON storage.objects;
CREATE POLICY "Admins can upload profile-images" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'profile-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can upload site-assets" ON storage.objects;
CREATE POLICY "Admins can upload site-assets" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-assets' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can upload article-images" ON storage.objects;
CREATE POLICY "Admins can upload article-images" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'article-images' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update images" ON storage.objects;
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('profile-images', 'site-assets', 'article-images') AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete images" ON storage.objects;
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id IN ('profile-images', 'site-assets', 'article-images') AND public.is_admin());

-- ------------------------------------------------------------------------------
-- PART 4: SEED DATA
-- ------------------------------------------------------------------------------
INSERT INTO public.advocate_profile (
    id, full_name, designation, tagline, biography,
    qualifications, enrolment_number, enrolment_council,
    image_path, email, phone, office_address, office_timings
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Shivansh Kumar Pandey',
    'Advocate',
    'Civil, Family & Taxation Law Expert',
    'Advocate Shivansh Kumar Pandey is a dedicated legal professional practicing at the Civil Court, Gorakhpur, Uttar Pradesh. Committed to upholding constitutional principles and the highest standards of the Indian legal profession, Adv. Pandey provides authoritative counsel and representation across civil disputes, family law, comprehensive taxation and corporate compliances.',
    '[Degree / Qualifications Pending Client Verification]',
    '[Enrolment Number Pending Client Verification]',
    'Bar Council of Uttar Pradesh',
    '/assets/images/advocate-placeholder.jpg',
    'advshiv43@gmail.com',
    '+91 9198106052',
    'Chamber No. [Pending Client Verification], Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India',
    'Monday – Saturday: 10:00 AM – 5:00 PM (By Prior Appointment)'
) ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    tagline = EXCLUDED.tagline,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone;

-- Practice Areas
INSERT INTO public.practice_areas (id, title, slug, short_description, full_description, display_order, is_published)
VALUES 
('b0000000-0000-0000-0000-000000000001', 'Civil Litigation', 'civil-litigation', 'Strategic legal representation in title disputes, contract enforcement, writ petitions, and appellate matters before judicial forums.', 'Civil litigation encompasses disputes concerning private rights, property ownership, contractual obligations, and statutory remedies. We provide rigorous research, meticulous drafting of plaints and written statements, and dedicated representation before Civil Courts, Revenue Courts, and Appellate authorities.', 1, true),
('b0000000-0000-0000-0000-000000000002', 'Family Law', 'family-law', 'Sensitive, confidential, and steadfast legal support in matrimonial disputes, custody proceedings, maintenance, and domestic matters.', 'Family and matrimonial disputes require a balanced combination of legal acumen and empathetic professionalism. We assist clients through mutual and contested divorce proceedings, maintenance and alimony petitions under Section 125 CrPC and personal laws, child custody and guardianship matters.', 2, true),
('b0000000-0000-0000-0000-000000000003', 'Taxation & GST', 'taxation-gst', 'Comprehensive direct and indirect taxation advisory, ITR filing, GST registration, assessment proceedings, and compliance audits.', 'Navigating the evolving landscape of Indian taxation law demands rigorous compliance and forward-looking advisory. We provide structured guidance on Income Tax filings, advance tax planning, GST registration, monthly and annual GST return filings, and handling show-cause notices.', 3, true),
('b0000000-0000-0000-0000-000000000004', 'Business Registration', 'business-registration', 'End-to-end statutory registration for MSME/Udyam, partnership firms, private limited companies, and LLP incorporations.', 'Establishing a business venture with a sound legal foundation is crucial for long-term growth and investor confidence. We assist entrepreneurs and commercial entities through MSME / Udyam registration, partnership deed drafting and filings, and company incorporations.', 4, true),
('b0000000-0000-0000-0000-000000000005', 'ESI & Labour Welfare', 'esi-labour-welfare', 'Guidance on statutory labour law compliance, Employee Provident Fund (PF) registration, ESI matters, and monthly return filings.', 'Compliance with statutory employment welfare regulations protects employers from penal liabilities while safeguarding worker rights. We assist enterprises with EPF and ESI registrations, monthly return filings, and responses to departmental inspections.', 5, true),
('b0000000-0000-0000-0000-000000000006', 'Trademark & Intellectual Property', 'trademark-ipr', 'Protection of intellectual property assets, brand name registration, logo trademarks, trademark objection responses, and copyright filings.', 'Your brand identity and intellectual property are invaluable business assets. We offer comprehensive trademark availability searches, class classification, application filing, objection responses, and copyright registrations.', 6, true),
('b0000000-0000-0000-0000-000000000007', 'Government-Sponsored Schemes', 'government-schemes', 'Legal documentation, detailed project report (DPR) preparation, and loan assistance under PMEGP, MUDRA, and Startup India initiatives.', 'Accessing sovereign financial schemes requires structured documentation and compliance with departmental guidelines. We assist MSMEs with project profile preparation, DPR compilation, and regulatory documentation for PMEGP, MUDRA, and Startup India schemes.', 7, true)
ON CONFLICT (slug) DO NOTHING;

-- Services
INSERT INTO public.services (practice_area_id, title, slug, description, display_order, is_published) VALUES
('b0000000-0000-0000-0000-000000000001', 'Property Disputes', 'property-disputes', 'Legal representation in title suits, boundary disputes, partition suits, and injunction proceedings before Civil Courts.', 1, true),
('b0000000-0000-0000-0000-000000000001', 'Contracts & Agreements', 'contracts-agreements', 'Drafting, legal vetting, and litigation regarding breach of contract, specific performance, and commercial accords.', 2, true),
('b0000000-0000-0000-0000-000000000001', 'Writs & Constitutional Remedies', 'writs-constitutional', 'Filing and representation in writ petitions under Articles 226/227 for the enforcement of fundamental and legal rights.', 3, true),
('b0000000-0000-0000-0000-000000000001', 'Appeals & Revisions', 'appeals-revisions', 'Handling first appeals, second appeals, and civil revisions before District and High Court appellate benches.', 4, true),
('b0000000-0000-0000-0000-000000000002', 'Divorce Proceedings', 'divorce-proceedings', 'Counsel and legal representation in mutual consent divorce petitions and contested matrimonial proceedings.', 1, true),
('b0000000-0000-0000-0000-000000000002', 'Child Custody & Visitation', 'child-custody', 'Legal guidance regarding the welfare of minors, guardianship rights, and interim and permanent custody orders.', 2, true),
('b0000000-0000-0000-0000-000000000002', 'Alimony & Maintenance', 'alimony-maintenance', 'Representation in claims for interim and permanent maintenance under Section 125 CrPC and personal status statutes.', 3, true),
('b0000000-0000-0000-0000-000000000002', 'Domestic Violence Matters', 'domestic-violence-matters', 'Legal assistance and defense in proceedings under the Protection of Women from Domestic Violence Act (PWDVA).', 4, true),
('b0000000-0000-0000-0000-000000000003', 'ITR Filing & Assessment', 'itr-filing-assessment', 'Filing of individual, firm, and corporate income tax returns with rigorous audit trail verification.', 1, true),
('b0000000-0000-0000-0000-000000000003', 'Tax Planning & Advisory', 'tax-planning-advisory', 'Lawful optimization of tax obligations for professionals, traders, and corporate entities within statutory exemptions.', 2, true),
('b0000000-0000-0000-0000-000000000003', 'GST Registration', 'gst-registration', 'End-to-end documentation, application submission, and departmental clearance for fresh GSTIN issuance.', 3, true),
('b0000000-0000-0000-0000-000000000003', 'GST Compliance & Notice Handling', 'gst-compliance-notices', 'Periodic GSTR-1, GSTR-3B filings, annual reconciliations, and drafting responses to departmental audit queries.', 4, true),
('b0000000-0000-0000-0000-000000000004', 'MSME / Udyam Registration', 'udyam-registration', 'Online certification and benefits entitlement documentation under the Micro, Small and Medium Enterprises Act.', 1, true),
('b0000000-0000-0000-0000-000000000004', 'Partnership Firm Registration', 'firm-registration', 'Drafting of formal Partnership Deeds, notary attestations, and registration with the Registrar of Firms.', 2, true),
('b0000000-0000-0000-0000-000000000004', 'Company Incorporation (Pvt Ltd / LLP)', 'company-incorporation', 'Name reservation, DSC, DIN, SPICe+ e-filings, MOA/AOA drafting, and MCA Certificate of Incorporation procurement.', 3, true),
('b0000000-0000-0000-0000-000000000005', 'PF Registration & Setup', 'pf-registration-setup', 'Employer establishment registration with the EPFO, universal account number (UAN) generation, and portal setup.', 1, true),
('b0000000-0000-0000-0000-000000000005', 'Monthly Returns (PF & ESI)', 'monthly-returns', 'Monthly wage computation, electronic challan cum return (ECR) generation, and timely deposit verification.', 2, true),
('b0000000-0000-0000-0000-000000000005', 'Labour Compliance Advisory', 'labour-compliance', 'Advisory on Shops & Commercial Establishments Act, minimum wages compliance, register maintenance, and inspections.', 3, true),
('b0000000-0000-0000-0000-000000000006', 'Trademark Registration', 'trademark-registration', 'Trademark search, class selection, filing Form TM-A, and monitoring trademark journal publications.', 1, true),
('b0000000-0000-0000-0000-000000000006', 'Brand Name Protection', 'brand-name-protection', 'Strategic legal counsel on brand distinctiveness, cease & desist notices, and passing-off remedies.', 2, true),
('b0000000-0000-0000-0000-000000000006', 'Logo & Device Registration', 'logo-registration', 'Filing and safeguarding stylized device marks and visual brand emblems against infringement.', 3, true),
('b0000000-0000-0000-0000-000000000006', 'Copyright Registration', 'copyright-registration', 'Statutory registration of literary, dramatic, musical, artistic works, and digital assets under Copyright Act.', 4, true),
('b0000000-0000-0000-0000-000000000007', 'Project Reports (DPR)', 'project-reports', 'Drafting technically sound Detailed Project Reports compliant with banking and institutional credit guidelines.', 1, true),
('b0000000-0000-0000-0000-000000000007', 'PMEGP Application Assistance', 'pmegp-assistance', 'Eligibility verification, online portal documentation, and margin money subsidy guidance under PMEGP.', 2, true),
('b0000000-0000-0000-0000-000000000007', 'MUDRA Loan Advisory', 'mudra-loan-advisory', 'Documentation preparation for Shishu, Kishore, and Tarun loan categories under the Pradhan Mantri MUDRA scheme.', 3, true),
('b0000000-0000-0000-0000-000000000007', 'Startup India Loan & Seed Assistance', 'startup-india-assistance', 'DPIIT recognized startup application facilitation, tax exemption documentation, and credit guarantee navigation.', 4, true)
ON CONFLICT (practice_area_id, slug) DO NOTHING;

-- Initial Articles
INSERT INTO public.articles (
    id, title, slug, excerpt, content,
    cover_image_path, category, status, meta_title, meta_description, published_at
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'Understanding the Essentials of Civil Title Disputes in Uttar Pradesh',
    'understanding-civil-title-disputes-up',
    'A practical explainer on evidentiary requirements, revenue records (Khatauni), and declaratory injunction suits under the Specific Relief Act.',
    '<h2>Introduction to Title Disputes</h2><p>In civil litigation involving immovable property, the question of title and lawful possession stands paramount. Under Indian jurisprudence, possession is considered prima facie evidence of ownership against all but the true owner.</p><h3>Key Statutory Frameworks</h3><p>Title and boundary disputes in Uttar Pradesh are governed primarily by:</p><ul><li><strong>Specific Relief Act, 1963:</strong> Provisions concerning Declaratory Decrees (Section 34) and Permanent Injunctions (Section 38).</li><li><strong>Code of Civil Procedure, 1908:</strong> Procedural rules governing the institution of suits, framing of issues, and evidentiary scrutiny.</li><li><strong>U.P. Revenue Code, 2006:</strong> Special provisions governing agricultural holdings, mutation entries, and demarcations.</li></ul><h3>Evidentiary Value of Revenue Entries</h3><p>It is well settled through authoritative pronouncements of the Supreme Court of India that revenue entries (such as Khatauni or Khasra) are maintained primarily for fiscal purposes and do not confer absolute title by themselves. Rather, substantive title must be substantiated through registered conveyances, partition decrees, or inheritance genealogies.</p>',
    '/assets/images/article-civil.jpg',
    'Civil Litigation',
    'published',
    'Understanding Civil Title Disputes in Uttar Pradesh | Legal Guide',
    'Comprehensive legal overview on property title suits, revenue records, and declaratory decrees under Indian Civil Law.',
    timezone('utc'::text, now())
), (
    'c0000000-0000-0000-0000-000000000002',
    'A Practical Guide to GST Compliance and Notice Resolutions for Small Businesses',
    'guide-gst-compliance-notice-resolution',
    'An overview of critical deadlines, common causes for departmental audit notices, and systematic methods for filing replies under the CGST Act.',
    '<h2>The Importance of Timely GST Compliance</h2><p>For small and medium enterprises, maintaining synchronized compliance across GSTR-1 (outward supplies), GSTR-3B (summary returns), and GSTR-2B (input tax credit reconciliation) is vital to preventing mismatch notices under Section 61 of the CGST Act.</p><h3>Common Triggers for Departmental Notices</h3><ul><li><strong>ITC Mismatch:</strong> Discrepancies between input tax claimed in GSTR-3B versus supplies auto-populated in GSTR-2B.</li><li><strong>E-Way Bill Inconsistencies:</strong> Turnover variations between reported outward supplies and generated e-way documents.</li><li><strong>Non-filing or Delayed Filing:</strong> Suspension of GSTIN after persistent non-compliance for specified tax periods.</li></ul><h3>Procedure for Responding to Scrutiny Notices</h3><p>Upon receipt of Form GST ASMT-10, the taxpayer must formulate a point-by-point factual submission supported by invoices, payment vouchers, and bank verification certificates within the statutory thirty-day timeline.',
    '/assets/images/article-taxation.jpg',
    'Taxation & GST',
    'published',
    'Guide to GST Compliance & Notice Resolution | Legal Resources',
    'Learn how small businesses can navigate GST notices, reconcile ITC, and maintain statutory tax compliance effectively.',
    timezone('utc'::text, now())
) ON CONFLICT (slug) DO NOTHING;

-- Default Site Settings
INSERT INTO public.site_settings (setting_key, setting_value, is_public) VALUES
('general_contact', '{
    "phone": "+91 9198106052",
    "email": "advshiv43@gmail.com",
    "location": "Civil Court, Gorakhpur, Uttar Pradesh, India",
    "office_address": "Chamber No. [Pending Client Verification], Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India",
    "timings": "Monday – Saturday: 10:00 AM – 5:00 PM (By Prior Appointment)"
}'::jsonb, true),
('bar_council_disclaimer', '{
    "statutory_text": "As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any manner. By accessing this website (advshivpandey.in or equivalent), the user acknowledges that the information provided herein is solely for informational and educational purposes at the user’s voluntary request, and does not create an advocate-client relationship. No material on this website constitutes legal advice or solicitation."
}'::jsonb, true)
ON CONFLICT (setting_key) DO NOTHING;

-- Automatic Chamber Administrator Assignment Trigger
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
    IF LOWER(NEW.email) IN ('advshiv43@gmail.com', 'spandey5368@gmail.com') THEN
        INSERT INTO public.admin_profiles (user_id, display_name, role)
        VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Advocate Shivansh Kumar Pandey'),
            'super_admin'
        )
        ON CONFLICT (user_id) DO UPDATE
        SET role = 'super_admin';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();

-- If users already exist in auth.users, backfill them into admin_profiles immediately
INSERT INTO public.admin_profiles (user_id, display_name, role)
SELECT id, 'Advocate Shivansh Kumar Pandey', 'super_admin'
FROM auth.users
WHERE LOWER(email) IN ('advshiv43@gmail.com', 'spandey5368@gmail.com')
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';

