import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Tag, BookOpen } from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group bg-white border border-bone-dark hover:border-brass/80 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover rounded-xs">
      <div>
        {/* Category & Date */}
        <div className="flex items-center space-x-3 text-[11px] text-charcoal/60 mb-3.5 font-mono">
          <span className="inline-flex items-center text-brass font-bold uppercase tracking-wider">
            <Tag size={11} className="mr-1 text-brass" />
            {article.category}
          </span>
          <span>&bull;</span>
          <span className="inline-flex items-center text-charcoal/70">
            <Calendar size={11} className="mr-1 text-charcoal/50" />
            {formatDate(article.published_at || article.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3 line-clamp-2 leading-snug">
          <Link href={`/resources/${article.slug}`}>{article.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-[13px] text-charcoal/75 leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Action Link */}
      <div className="pt-4 border-t border-bone-dark flex items-center justify-between">
        <Link
          href={`/resources/${article.slug}`}
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-oxblood transition-colors"
        >
          <span>Read Legal Explainer</span>
          <ArrowRight
            size={14}
            className="ml-1.5 text-brass group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
}
