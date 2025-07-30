import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import GenerateArticleButton from "../components/GenerateArticleButton";
import MarkdownEditor from "../components/MarkdownEditor";
import ArticleList from "../components/ArticleList";

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
};

export default function Home({ articles: initialArticles }: Props) {
  const [selected, setSelected] = useState<Article | null>(null);
  const [generated, setGenerated] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);

  // دریافت مقالات از API
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

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <Head>
        <title>وبلاگ هوشمند </title>
        <meta name="description" content="وبلاگ با قابلیت تولید مقاله با هوش مصنوعی و مارک‌داون" />
      </Head>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-8 relative overflow-hidden">
        {/* افکت‌های پس‌زمینه */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-300"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold text-center mb-2 animate-fade-in-up">وبلاگ هوشمند</h1>
          <p className="text-center text-primary-100 animate-fade-in-up animation-delay-200">داریوش ابراهیمی نیک</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-gradient">خوش آمدید به وبلاگ هوشمند</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            مجموعه‌ای از بهترین مقالات با دسترسی رایگان، همراه با قابلیت تولید مقاله با هوش مصنوعی
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <Link href="/articles" className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium hover-lift hover-glow">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              مشاهده همه مقالات
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium hover-lift hover-glow">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              تولید مقاله جدید
            </button>
          </div>
        </section>

        {/* AI Article Generation Section */}
        <section className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-gradient-purple">تولید مقاله با هوش مصنوعی</h2>
            <p className="text-gray-600">با کلیک روی دکمه زیر، یک مقاله نمونه تولید کنید</p>
          </div>
          <div className="flex justify-center">
            <GenerateArticleButton onGenerate={setGenerated} />
          </div>
        </section>

        {/* Generated Article Display */}
        {generated && (
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8 animate-fade-in-up hover-lift">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-gradient-blue">{generated.title}</h2>
            <MarkdownEditor value={generated.content} readOnly />
            <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200 animate-fade-in-up animation-delay-200">
              <p className="text-sm text-primary-700">
                این مقاله به صورت ازمایشی تولید شده و میتونید api هوش مصنوعی مورد نظر استفاده کنید (داریوش ابراهیمی نیک)
              </p>
            </div>
          </section>
        )}

        {/* Featured Articles Section */}
        <section className="mb-12 animate-fade-in-up animation-delay-400">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 text-gradient-green">مقالات ویژه</h2>
            <Link href="/articles" className="text-blue-600 hover:text-blue-700 font-medium hover-scale transition-all duration-300">
              مشاهده همه مقالات →
            </Link>
          </div>
          <ArticleList articles={articles.slice(0, 6)} onSelect={setSelected} />
        </section>

        {/* Selected Article Display */}
        {selected && (
          <section className="mt-12 bg-white rounded-lg shadow-lg p-8 animate-fade-in-up hover-lift">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-gradient">{selected.title}</h2>
              {selected.image && (
                <div className="mb-6">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-64 object-cover rounded-lg hover-scale transition-transform duration-300"
                  />
                </div>
              )}
            </div>
            <MarkdownEditor value={selected.content} readOnly />
            {selected.url && (
              <div className="mt-4">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 hover-lift transition-all duration-300"
                >
                  مشاهده منبع اصلی
                </a>
              </div>
            )}
          </section>
        )}

        {/* Features Section */}
        <section className="mt-20 bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up animation-delay-500 hover-lift">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 text-gradient">ویژگی‌های وبلاگ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300 hover-rotate">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">مقالات رایگان</h3>
              <p className="text-gray-600">دسترسی رایگان به اکثر مقالات با کیفیت بالا</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300 hover-rotate">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">هوش مصنوعی</h3>
              <p className="text-gray-600">تولید مقاله با استفاده از ChatGPT و هوش مصنوعی</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300 hover-rotate">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">طراحی زیبا</h3>
              <p className="text-gray-600">رابط کاربری مدرن و تجربه کاربری عالی</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16 animate-fade-in-up animation-delay-500">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">© 2024 وبلاگ هوشمند - ساخته شده با Next.js و Tailwind CSS</p>
        </div>
      </footer>
    </>
  );
}

// برای SSR - مقالات اولیه
export async function getStaticProps() {
  return {
    props: {
      articles: []
    }
  };
}
