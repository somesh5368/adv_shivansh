-- ==============================================================================
-- Migration: 003_storage_buckets_policies.sql
-- Description: Supabase Storage Buckets configuration & Storage RLS policies
-- ==============================================================================

-- 1. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('profile-images', 'profile-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
    ('site-assets', 'site-assets', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('article-images', 'article-images', true, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Objects Policies
-- Public Read Access for all three public buckets
CREATE POLICY "Public can view profile-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'profile-images');

CREATE POLICY "Public can view site-assets"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'site-assets');

CREATE POLICY "Public can view article-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'article-images');

-- Admin Upload / Insert Access
CREATE POLICY "Admins can upload profile-images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'profile-images'
        AND EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can upload site-assets"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'site-assets'
        AND EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can upload article-images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'article-images'
        AND EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid()
        )
    );

-- Admin Update Access
CREATE POLICY "Admins can update images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id IN ('profile-images', 'site-assets', 'article-images')
        AND EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid()
        )
    );

-- Admin Delete Access
CREATE POLICY "Admins can delete images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id IN ('profile-images', 'site-assets', 'article-images')
        AND EXISTS (
            SELECT 1 FROM public.admin_profiles
            WHERE user_id = auth.uid()
        )
    );

