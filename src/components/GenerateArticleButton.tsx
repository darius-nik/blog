import React from "react";

type Props = {
  onGenerate: (article: { title: string; content: string }) => void;
};

const fakeArticle = {
  title: "نمونه مقاله تولید شده با هوش مصنوعی",
  content: `# این یک مقاله نمونه است\n\nاین مقاله به صورت نمایشی توسط دکمه \"تولید مقاله\" ساخته شده است.\n\n- قابلیت نوشتن با Markdown\n- پیش‌نمایش زنده\n- جستجو و فیلتر مقالات\n`
};

export default function GenerateArticleButton({ onGenerate }: Props) {
  return (
    <button
      onClick={() => onGenerate(fakeArticle)}
      className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      تولید مقاله با AI
    </button>
  );
} 