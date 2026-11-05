'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { adminApi } from '@/lib/api';
import { Article } from '@/types';

export default function EditArticlePage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    adminApi
      .getArticleById(token, id)
      .then((data) => setArticle(data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-charcoal/60">
        Loading article details...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-8 text-center text-xs text-red-600">
        Article not found or access denied.
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title={`Edit: ${article.title}`}
        description="Update article contents, modify SEO tags, or change publication status."
      />
      <div className="p-8">
        <ArticleForm initialData={article} />
      </div>
    </div>
  );
}
