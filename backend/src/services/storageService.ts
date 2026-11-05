import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/apiError.js';
import { logger } from '../utils/logger.js';
import { env, isDev, isTest } from '../config/env.js';

export type StorageBucket = 'profile-images' | 'site-assets' | 'article-images';

const ALLOWED_MIME_TYPES: Record<StorageBucket, string[]> = {
  'profile-images': ['image/jpeg', 'image/png', 'image/webp'],
  'site-assets': ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  'article-images': ['image/jpeg', 'image/png', 'image/webp'],
};

const MAX_FILE_SIZES: Record<StorageBucket, number> = {
  'profile-images': 5 * 1024 * 1024, // 5MB
  'site-assets': 10 * 1024 * 1024,   // 10MB
  'article-images': 8 * 1024 * 1024,  // 8MB
};

export class StorageService {
  /**
   * Validates file MIME type and byte size
   */
  static validateFile(bucket: StorageBucket, file: { mimetype: string; size: number }) {
    const allowed = ALLOWED_MIME_TYPES[bucket];
    if (!allowed || !allowed.includes(file.mimetype)) {
      throw ApiError.badRequest(
        `Invalid file type '${file.mimetype}'. Allowed types for ${bucket}: ${allowed.join(', ')}`
      );
    }

    const maxSize = MAX_FILE_SIZES[bucket];
    if (file.size > maxSize) {
      throw ApiError.badRequest(
        `File size exceeds limit (${(maxSize / (1024 * 1024)).toFixed(1)}MB)`
      );
    }
  }

  /**
   * Upload an image buffer to the specified bucket
   */
  static async uploadImage(
    bucket: StorageBucket,
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string
  ): Promise<{ path: string; publicUrl: string }> {
    this.validateFile(bucket, { mimetype: mimeType, size: fileBuffer.length });

    // Clean filename and make unique
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniquePath = `${Date.now()}-${sanitizedName}`;

    if (env.SUPABASE_URL.includes('placeholder-project') || isTest) {
      logger.info({ bucket, path: uniquePath }, '[Storage-Dev] Simulated image upload');
      return {
        path: uniquePath,
        publicUrl: `/assets/images/simulated-${uniquePath}`,
      };
    }

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(uniquePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error || !data) {
      logger.error({ error, bucket, uniquePath }, 'Supabase Storage upload error');
      throw ApiError.internal(`Failed to upload file to storage: ${error?.message}`);
    }

    const { data: publicData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      publicUrl: publicData.publicUrl,
    };
  }

  /**
   * Delete an image from storage
   */
  static async deleteImage(bucket: StorageBucket, path: string): Promise<boolean> {
    if (!path) return false;

    if (env.SUPABASE_URL.includes('placeholder-project') || isTest) {
      logger.info({ bucket, path }, '[Storage-Dev] Simulated image delete');
      return true;
    }

    const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);
    if (error) {
      logger.error({ error, bucket, path }, 'Supabase Storage delete error');
      return false;
    }
    return true;
  }

  /**
   * Retrieve the public URL for an asset
   */
  static getPublicUrl(bucket: StorageBucket, path: string): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
      return path;
    }
    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * List files in a bucket
   */
  static async listFiles(bucket: StorageBucket) {
    if (env.SUPABASE_URL.includes('placeholder-project') || isTest) {
      return [
        {
          name: 'profile-advocate.jpg',
          id: 'mock-1',
          metadata: { size: 450230, mimetype: 'image/jpeg' },
          created_at: new Date().toISOString(),
        },
        {
          name: 'civil-disputes-banner.webp',
          id: 'mock-2',
          metadata: { size: 310500, mimetype: 'image/webp' },
          created_at: new Date().toISOString(),
        },
      ];
    }

    const { data, error } = await supabaseAdmin.storage.from(bucket).list('', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      logger.error({ error, bucket }, 'Supabase Storage list error');
      throw ApiError.internal(`Failed to list storage items: ${error.message}`);
    }

    return data.map((item) => ({
      ...item,
      publicUrl: this.getPublicUrl(bucket, item.name),
    }));
  }
}

