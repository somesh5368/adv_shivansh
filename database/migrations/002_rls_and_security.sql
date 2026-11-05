-- ==============================================================================
-- Migration: 002_rls_and_security.sql
-- Description: Row Level Security (RLS) policies for legal practice tables
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE advocate_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is the current authenticated user an admin?
-- Hardened with STABLE, SECURITY DEFINER and explicit search_path to prevent recursion and path spoofing
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

-- 1. advocate_profile Policies
-- Public can read profile
CREATE POLICY "Public can view advocate profile"
    ON advocate_profile
    FOR SELECT
    USING (true);

-- Only authenticated admin can update profile
CREATE POLICY "Admins can update advocate profile"
    ON advocate_profile
    FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can insert advocate profile"
    ON advocate_profile
    FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

-- 2. practice_areas Policies
-- Public can read published practice areas
CREATE POLICY "Public can view published practice areas"
    ON practice_areas
    FOR SELECT
    USING (is_published = true);

-- Admins can view all (published and unpublished)
CREATE POLICY "Admins can view all practice areas"
    ON practice_areas
    FOR SELECT
    TO authenticated
    USING (is_admin());

-- Admins can insert, update, delete practice areas
CREATE POLICY "Admins can manage practice areas"
    ON practice_areas
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 3. services Policies
-- Public can read published services under published practice areas
CREATE POLICY "Public can view published services"
    ON services
    FOR SELECT
    USING (
        is_published = true
        AND EXISTS (
            SELECT 1 FROM practice_areas
            WHERE practice_areas.id = services.practice_area_id
            AND practice_areas.is_published = true
        )
    );

-- Admins can manage all services
CREATE POLICY "Admins can view all services"
    ON services
    FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "Admins can manage services"
    ON services
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 4. articles Policies
-- Public can read published articles
CREATE POLICY "Public can view published articles"
    ON articles
    FOR SELECT
    USING (status = 'published');

-- Admins can view and manage all articles
CREATE POLICY "Admins can view all articles"
    ON articles
    FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "Admins can manage articles"
    ON articles
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 5. site_settings Policies
-- Public can view public site settings
CREATE POLICY "Public can view public site settings"
    ON site_settings
    FOR SELECT
    USING (is_public = true);

-- Admins can manage all site settings
CREATE POLICY "Admins can manage site settings"
    ON site_settings
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 6. admin_profiles Policies
-- Users can view their own admin profile (non-recursive)
CREATE POLICY "Users can view own admin profile"
    ON admin_profiles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- 7. enquiries Policies
-- Anyone (public/anon) can submit a contact enquiry
CREATE POLICY "Public can submit enquiries"
    ON enquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        length(full_name) > 1 AND
        length(email) > 4 AND
        length(message) > 5
    );

-- Only admins can view and manage enquiries
CREATE POLICY "Admins can view and manage enquiries"
    ON enquiries
    FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- 8. audit_logs Policies
-- Admins can view audit logs
CREATE POLICY "Admins can view audit logs"
    ON audit_logs
    FOR SELECT
    TO authenticated
    USING (is_admin());

-- Authenticated admins can create audit entries
CREATE POLICY "Admins can insert audit logs"
    ON audit_logs
    FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

