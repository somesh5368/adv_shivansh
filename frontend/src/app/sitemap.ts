import { MetadataRoute } from 'next';
import { publicApi } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://advshivpandey.in';

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic practice areas
  let practiceRoutes: MetadataRoute.Sitemap = [];
  try {
    const areas = await publicApi.getPracticeAreas().catch(() => []);
    practiceRoutes = (areas || []).map((area) => ({
      url: `${baseUrl}/practice-areas/${area.slug}`,
      lastModified: new Date(area.updated_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.85,
    }));
  } catch {}

  // Dynamic articles
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await publicApi.getArticles().catch(() => []);
    articleRoutes = (articles || []).map((article) => ({
      url: `${baseUrl}/resources/${article.slug}`,
      lastModified: new Date(article.updated_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));
  } catch {}

  return [...staticRoutes, ...practiceRoutes, ...articleRoutes];
}
