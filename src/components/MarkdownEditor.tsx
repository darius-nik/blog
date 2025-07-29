import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

export default function MarkdownEditor({ value, onChange, readOnly }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {!readOnly && (
        <textarea
          className="w-full lg:w-1/2 h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          placeholder="مقاله خود را اینجا بنویسید..."
        />
      )}
      <div className="w-full lg:w-1/2 min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-auto">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 