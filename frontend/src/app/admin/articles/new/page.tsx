import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ArticleForm } from '@/components/admin/ArticleForm';

export default function NewArticlePage() {
  return (
    <div>
      <AdminHeader
        title="Create New Legal Article"
        description="Draft an educational legal resource with rich formatting and search metadata."
      />
      <div className="p-8">
        <ArticleForm />
      </div>
    </div>
  );
}
