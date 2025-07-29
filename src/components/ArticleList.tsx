import React, { useState } from "react";

type Article = {
  title: string;
  content: string;
  image?: string;
  date?: string;
  tags?: string[];
  url?: string;
};

type Props = {
  articles: Article[];
  onSelect: (article: Article) => void;
};

export default function ArticleList({ articles, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    (a.tags && a.tags.join(" ").toLowerCase().includes(query.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="جستجو در مقالات..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
          <div
            key={i}
            onClick={() => onSelect(article)}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-200 cursor-pointer group"
          >
            {article.image && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              {article.date && (
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-600 text-sm line-clamp-3">
                {article.content.substring(0, 150)}...
              </p>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  ادامه مطلب →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          مقاله‌ای یافت نشد.
        </div>
      )}
    </div>
  );
} 