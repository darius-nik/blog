import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MarkdownEditor from "../../components/MarkdownEditor";

type Article = {
  title: string;
  content: string;
  image?: string;
  date?: string;
  tags?: string[];
  url?: string;
};

export default function ArticleDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        const decodedSlug = decodeURIComponent(slug as string);
        const foundArticle = data.articles.find((a: Article) => a.title === decodedSlug);
        
        if (foundArticle) {
          setArticle(foundArticle);
          // مقالات مرتبط (همان دسته‌بندی)
          const related = data.articles
            .filter((a: Article) => 
              a.title !== foundArticle.title && 
              a.tags && 
              foundArticle.tags && 
              a.tags.some(tag => foundArticle.tags!.includes(tag))
            )
            .slice(0, 3);
          setRelatedArticles(related);
        } else {
          router.push('/articles');
        }
      }
    } catch (error) {
      console.error('خطا در دریافت مقاله:', error);
      router.push('/articles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{article.title} - وبلاگ هوشمند</title>
        <meta name="description" content={article.content.substring(0, 160)} />
        {article.image && <meta property="og:image" content={article.image} />}
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/articles" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            بازگشت به مقالات
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* مقاله اصلی */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* تصویر اصلی */}
          {article.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* برچسب رایگان */}
              <div className="absolute top-6 right-6">
                <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
                  دسترسی رایگان
                </span>
              </div>
            </div>
          )}

          {/* محتوای مقاله */}
          <div className="p-8">
            {/* عنوان و متادیتا */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                {article.date && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(article.date).toLocaleDateString('fa-IR')}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>زمان مطالعه: {Math.ceil(article.content.length / 500)} دقیقه</span>
                </div>
              </div>

              {/* تگ‌ها */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* محتوای مقاله */}
            <div className="prose prose-lg max-w-none">
              <MarkdownEditor value={article.content} readOnly />
            </div>

            {/* دکمه‌های اشتراک‌گذاری */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-gray-600 font-medium">اشتراک‌گذاری:</span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </button>
                  <button className="p-2 text-blue-800 hover:bg-blue-50 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>

                {article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    مشاهده منبع اصلی
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* مقالات مرتبط */}
        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">مقالات مرتبط</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <RelatedArticleCard key={index} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}

        {/* دعوت به عمل */}
        <section className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">از مقالات ما لذت بردید؟</h2>
          <p className="text-gray-600 mb-6">مقالات بیشتری با دسترسی رایگان در انتظار شماست</p>
          <Link href="/articles" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            مشاهده همه مقالات
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 وبلاگ هوشمند - تمام مقالات با دسترسی رایگان</p>
        </div>
      </footer>
    </>
  );
}

// کامپوننت کارت مقاله مرتبط
function RelatedArticleCard({ article }: { article: Article }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/article/${encodeURIComponent(article.title)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        {article.date && (
          <p className="text-sm text-gray-500 mb-2">
            {new Date(article.date).toLocaleDateString('fa-IR')}
          </p>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {article.content.replace(/[#*`]/g, '').substring(0, 80)}...
        </p>
      </div>
    </div>
  );
}