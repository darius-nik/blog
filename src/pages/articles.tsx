import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Article = {
  title: string;
  content: string;
  image?: string;
  date?: string;
  tags?: string[];
  url?: string;
  id?: string;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const articlesPerPage = 12;

  const router = useRouter();

  // دریافت مقالات
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/articles');
      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('خطا در دریافت مقالات:', error);
    } finally {
      setLoading(false);
    }
  };

  // فیلتر کردن مقالات
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = selectedCategory === "همه" || 
                           (article.tags && article.tags.includes(selectedCategory));
    
    return matchesSearch && matchesCategory;
  });

  // مرتب‌سازی مقالات
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      case "oldest":
        return new Date(a.date || "").getTime() - new Date(b.date || "").getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // محاسبه مقالات برای صفحه فعلی
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = sortedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // دریافت دسته‌بندی‌های منحصر به فرد
  const categories = ["همه", ...Array.from(new Set(articles.flatMap(article => article.tags || [])))];

  // تغییر صفحه
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  return (
    <>
      <Head>
        <title>مقالات - وبلاگ هوشمند</title>
        <meta name="description" content="مجموعه کامل مقالات با دسترسی رایگان" />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 relative overflow-hidden">
        {/* افکت‌های پس‌زمینه */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl animate-pulse-slow animation-delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">مقالات</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            مجموعه‌ای از بهترین مقالات با دسترسی رایگان برای همه
          </p>
          <div className="mt-8 animate-fade-in-up animation-delay-300">
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover-lift">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* فیلترها و جستجو */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up hover-lift">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* جستجو */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* دسته‌بندی */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* مرتب‌سازی */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="newest">جدیدترین</option>
                <option value="oldest">قدیمی‌ترین</option>
                <option value="title">بر اساس عنوان</option>
              </select>
            </div>
          </div>

          {/* آمار */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span className="animate-fade-in-left">{sortedArticles.length} مقاله یافت شد</span>
            <span className="animate-fade-in-right">صفحه {currentPage} از {totalPages}</span>
          </div>
        </div>

        {/* نمایش مقالات */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentArticles.map((article, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>

            {/* پیجینیشن */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 animate-fade-in-up animation-delay-500">
                <nav className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift"
                  >
                    قبلی
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover-lift ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover-lift"
                  >
                    بعدی
                  </button>
                </nav>
              </div>
            )}

            {currentArticles.length === 0 && (
              <div className="text-center py-20 animate-fade-in-up">
                <div className="text-gray-400 mb-4 animate-bounce-slow">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">مقاله‌ای یافت نشد</h3>
                <p className="text-gray-500">لطفاً فیلترهای جستجو را تغییر دهید</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-20 py-12 animate-fade-in-up animation-delay-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 وبلاگ هوشمند - تمام مقالات با دسترسی رایگان</p>
        </div>
      </footer>
    </>
  );
}

// کامپوننت کارت مقاله
function ArticleCard({ article }: { article: Article }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/article/${encodeURIComponent(article.title)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift"
    >
      {/* تصویر */}
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* برچسب رایگان */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse-slow">
              رایگان
            </span>
          </div>
        </div>
      )}

      {/* محتوا */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        {article.date && (
          <p className="text-sm text-gray-500 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(article.date).toLocaleDateString('fa-IR')}
          </p>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium hover:bg-blue-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.content.replace(/[#*`]/g, '').substring(0, 120)}...
        </p>

        <div className="flex items-center justify-between">
          <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
            مطالعه مقاله
          </span>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}