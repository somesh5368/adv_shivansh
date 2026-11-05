import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { Article, ArticleStatus } from '../types/index.js';
import { INITIAL_ARTICLES } from './dataStore.js';
import { logger } from '../utils/logger.js';

let memArticles = [...INITIAL_ARTICLES];

export class ArticleRepository {
  static async getAll(publishedOnly = true): Promise<Article[]> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const articles = publishedOnly
        ? memArticles.filter((a) => a.status === 'published')
        : memArticles;
      return articles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    try {
      let query = (publishedOnly ? supabasePublic : supabaseAdmin).from('articles').select('*');
      if (publishedOnly) {
        query = query.eq('status', 'published');
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return publishedOnly
          ? memArticles.filter((a) => a.status === 'published')
          : memArticles;
      }
      return data as Article[];
    } catch (err) {
      logger.error({ err }, 'Error querying articles');
      return memArticles;
    }
  }

  static async getBySlug(slug: string, publishedOnly = true): Promise<Article | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return (
        memArticles.find(
          (a) => a.slug === slug && (!publishedOnly || a.status === 'published')
        ) || null
      );
    }

    try {
      let query = (publishedOnly ? supabasePublic : supabaseAdmin)
        .from('articles')
        .select('*')
        .eq('slug', slug);

      if (publishedOnly) {
        query = query.eq('status', 'published');
      }

      const { data, error } = await query.single();
      if (error || !data) {
        return (
          memArticles.find(
            (a) => a.slug === slug && (!publishedOnly || a.status === 'published')
          ) || null
        );
      }
      return data as Article;
    } catch (err) {
      logger.error({ err }, 'Error fetching article by slug');
      return (
        memArticles.find(
          (a) => a.slug === slug && (!publishedOnly || a.status === 'published')
        ) || null
      );
    }
  }

  static async getById(id: string): Promise<Article | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return memArticles.find((a) => a.id === id) || null;
    }

    try {
      const { data, error } = await supabaseAdmin.from('articles').select('*').eq('id', id).single();
      if (error || !data) {
        return memArticles.find((a) => a.id === id) || null;
      }
      return (data as Article) || null;
    } catch {
      return memArticles.find((a) => a.id === id) || null;
    }
  }

  static async create(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
    const newRecord: Article = {
      ...article,
      id: `c0000000-0000-0000-0000-${Date.now().toString().slice(-12)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memArticles.unshift(newRecord);
      return newRecord;
    }

    try {
      const { data, error } = await (supabaseAdmin.from('articles') as any)
        .insert(article)
        .select()
        .single();
      if (error || !data) throw error;
      return data as Article;
    } catch {
      memArticles.unshift(newRecord);
      return newRecord;
    }
  }

  static async update(id: string, updates: Partial<Article>): Promise<Article | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const idx = memArticles.findIndex((a) => a.id === id);
      if (idx === -1) return null;
      memArticles[idx] = {
        ...memArticles[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return memArticles[idx];
    }

    try {
      const { data, error } = await (supabaseAdmin.from('articles') as any)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        const idx = memArticles.findIndex((a) => a.id === id);
        if (idx === -1) return null;
        memArticles[idx] = {
          ...memArticles[idx],
          ...updates,
          updated_at: new Date().toISOString(),
        };
        return memArticles[idx];
      }
      return data as Article;
    } catch {
      const idx = memArticles.findIndex((a) => a.id === id);
      if (idx === -1) return null;
      memArticles[idx] = {
        ...memArticles[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return memArticles[idx];
    }
  }

  static async setStatus(id: string, status: ArticleStatus): Promise<Article | null> {
    const updates: Partial<Article> = {
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };
    return this.update(id, updates);
  }

  static async delete(id: string): Promise<boolean> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memArticles = memArticles.filter((a) => a.id !== id);
      return true;
    }

    try {
      const { error } = await supabaseAdmin.from('articles').delete().eq('id', id);
      if (error) {
        memArticles = memArticles.filter((a) => a.id !== id);
        return true;
      }
      return true;
    } catch {
      memArticles = memArticles.filter((a) => a.id !== id);
      return true;
    }
  }
}
