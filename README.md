# 🌟 وبلاگ هوشمند - Smart Blog

یک وبلاگ مدرن و زیبا با قابلیت تولید مقاله با هوش مصنوعی و دسترسی رایگان به مقالات

## ✨ ویژگی‌ها

### 🎨 طراحی زیبا
- **طراحی مدرن** با Tailwind CSS
- **فونت فارسی** Vazirmatn
- **انیمیشن‌های زیبا** و افکت‌های hover
- **رابط کاربری ریسپانسیو**
- **گرادیان‌های رنگی** و افکت‌های شیشه‌ای

### 📰 مقالات واقعی
- **مقالات زنده** از News API
- **دسترسی رایگان** به همه مقالات
- **جستجو و فیلتر** پیشرفته
- **دسته‌بندی مقالات** بر اساس تگ‌ها
- **مرتب‌سازی** (جدیدترین، قدیمی‌ترین)

### 🤖 هوش مصنوعی
- **تولید مقاله** با ChatGPT
- **ویرایشگر Markdown** پیشرفته
- **پیش‌نمایش زنده**

### 🚀 تکنولوژی‌ها
- **Next.js 14** - فریم‌ورک React
- **TypeScript** - تایپ‌اسکریپت
- **Tailwind CSS** - استایل‌دهی
- **News API** - مقالات واقعی
- **Vazirmatn Font** - فونت فارسی

## 🎯 صفحات

### 📱 صفحه اصلی (`/`)
- معرفی وبلاگ
- مقالات ویژه
- تولید مقاله با AI
- ویژگی‌های پروژه

### 📚 صفحه مقالات (`/articles`)
- نمایش همه مقالات
- جستجو و فیلتر
- دسته‌بندی
- پیجینیشن

### 📖 صفحه جزئیات (`/article/[slug]`)
- نمایش کامل مقاله
- مقالات مرتبط
- اشتراک‌گذاری
- زمان مطالعه

## 🛠️ نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- npm یا yarn

### مراحل نصب

```bash
# کلون کردن پروژه
git clone https://github.com/[username]/smart-blog.git
cd smart-blog

# نصب وابستگی‌ها
npm install

# تنظیم متغیرهای محیطی
echo NEWS_API_KEY=your_api_key_here > .env.local

# اجرای پروژه
npm run dev
```

### متغیرهای محیطی

فایل `.env.local` ایجاد کنید:

```env
# News API Key - از https://newsapi.org/ دریافت کنید
NEWS_API_KEY=your_api_key_here

# Unsplash API Key - اختیاری
UNSPLASH_API_KEY=your_unsplash_key_here
```

## 🎨 انیمیشن‌ها و افکت‌ها

### انیمیشن‌های موجود
- `fadeInUp` - ظاهر شدن از پایین
- `fadeInLeft/Right` - ظاهر شدن از چپ/راست
- `scaleIn` - بزرگ شدن تدریجی
- `slideInFromTop` - لغزش از بالا
- `pulse` - ضربان آهسته
- `bounce` - پرش
- `shimmer` - درخشش
- `floating` - شناور شدن

### افکت‌های hover
- `hover-lift` - بلند شدن کارت‌ها
- `hover-glow` - درخشش
- `hover-scale` - بزرگ شدن
- `hover-rotate` - چرخش

### گرادیان‌های رنگی
- `text-gradient` - متن رنگی
- `text-gradient-blue/purple/green` - رنگ‌های مختلف

## 📱 ریسپانسیو

پروژه کاملاً ریسپانسیو است و در تمام دستگاه‌ها به خوبی نمایش داده می‌شود:
- 📱 موبایل
- 📱 تبلت
- 💻 دسکتاپ
- 🖥️ تلویزیون

## 🌐 API ها

### News API
- مقالات واقعی از سراسر جهان
- پشتیبانی از زبان‌های مختلف
- بروزرسانی خودکار

### Unsplash API (اختیاری)
- تصاویر زیبا و با کیفیت
- تصاویر مرتبط با محتوا

## 🎯 ویژگی‌های ویژه

### دسترسی رایگان
- تمام مقالات رایگان
- بدون محدودیت
- کیفیت بالا

### جستجوی پیشرفته
- جستجو در عنوان
- جستجو در محتوا
- جستجو در تگ‌ها

### فیلتر و مرتب‌سازی
- فیلتر بر اساس دسته‌بندی
- مرتب‌سازی بر اساس تاریخ
- مرتب‌سازی بر اساس عنوان

## 🤝 مشارکت

از مشارکت شما استقبال می‌کنیم! لطفاً:

1. پروژه را Fork کنید
2. یک Branch جدید ایجاد کنید
3. تغییرات خود را Commit کنید
4. Pull Request ارسال کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 👨‍💻 توسعه‌دهنده

**Darius** - توسعه‌دهنده وب

## 🙏 تشکر

از کتابخانه‌ها و ابزارهای زیر تشکر می‌کنیم:
- Next.js
- Tailwind CSS
- Vazirmatn Font
- News API
- Unsplash API

---

⭐ اگر این پروژه را مفید یافتید، لطفاً ستاره بدهید!
