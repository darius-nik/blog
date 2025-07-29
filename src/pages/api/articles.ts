import type { NextApiRequest, NextApiResponse } from 'next';

type Article = {
  title: string;
  content: string;
  image?: string;
  date?: string;
  tags?: string[];
  url?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ articles: Article[] }>
) {
  try {
    let articles: Article[] = [];

    // تلاش برای دریافت مقالات از News API
    try {
      const NEWS_API_KEY = process.env.NEWS_API_KEY || 'demo';
      
      if (NEWS_API_KEY !== 'demo') {
        // ابتدا مقالات عمومی انگلیسی دریافت کن (چون مقالات ایران موجود نیست)
        let newsResponse = await fetch(
          `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=20&language=en`
        );
        
        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          if (newsData.articles && newsData.articles.length > 0) {
            articles = newsData.articles.map((article: any) => ({
              title: article.title,
              content: article.description || article.content || 'توضیحات موجود نیست',
              image: article.urlToImage,
              date: article.publishedAt,
              url: article.url,
              tags: ['خبر', 'بین‌المللی', article.source?.name || 'منبع']
            }));
          }
        }

        // اگر مقالات عمومی نبود، مقالات ایران را امتحان کن
        if (articles.length === 0) {
          newsResponse = await fetch(
            `https://newsapi.org/v2/top-headlines?country=ir&apiKey=${NEWS_API_KEY}&pageSize=20&language=fa`
          );
          
          if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            if (newsData.articles && newsData.articles.length > 0) {
              articles = newsData.articles.map((article: any) => ({
                title: article.title,
                content: article.description || article.content || 'توضیحات موجود نیست',
                image: article.urlToImage,
                date: article.publishedAt,
                url: article.url,
                tags: ['خبر', 'فارسی', article.source?.name || 'منبع']
              }));
            }
          }
        }
      }
    } catch (error) {
      console.log('خطا در دریافت از News API:', error);
    }

    // اگر News API کار نکرد، از منابع دیگر استفاده کن
    if (articles.length === 0) {
      try {
        // تلاش برای دریافت مقالات از GNews API (رایگان)
        const gnewsResponse = await fetch(
          'https://gnews.io/api/v4/top-headlines?country=ir&lang=fa&max=20&apikey=demo'
        );
        
        if (gnewsResponse.ok) {
          const gnewsData = await gnewsResponse.json();
          if (gnewsData.articles && gnewsData.articles.length > 0) {
            articles = gnewsData.articles.map((article: any) => ({
              title: article.title,
              content: article.description || article.content,
              image: article.image,
              date: article.publishedAt,
              url: article.url,
              tags: ['خبر', 'فارسی', article.source?.name || 'منبع']
            }));
          }
        }
      } catch (error) {
        console.log('خطا در دریافت از GNews API:', error);
      }
    }

    // اگر هیچ API کار نکرد، پیام خالی برگردان
    if (articles.length === 0) {
      return res.status(200).json({ articles: [] });
    }

    // اضافه کردن تصاویر از Unsplash اگر API key موجود باشد
    try {
      const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
      
      if (UNSPLASH_API_KEY) {
        const imageResponse = await fetch(
          `https://api.unsplash.com/photos/random?query=technology&count=${articles.length}&client_id=${UNSPLASH_API_KEY}`
        );
        
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          articles = articles.map((article, index) => ({
            ...article,
            image: imageData[index]?.urls?.regular || article.image
          }));
        }
      }
    } catch (error) {
      console.log('خطا در دریافت تصاویر از Unsplash:', error);
    }

    // مرتب‌سازی مقالات بر اساس تاریخ (جدیدترین اول)
    articles.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime());

    // برگرداندن 6 مقاله آخر
    const latestArticles = articles.slice(0, 6);

    res.status(200).json({ articles: latestArticles });
  } catch (error) {
    console.error('خطا در دریافت مقالات:', error);
    res.status(500).json({ articles: [] });
  }
} 