'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SubmitPage() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, desc }),
      });
      const json = await res.json();
      setResult(json?.message ?? 'OK');
    } catch (err) {
      setResult('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium">ホーム</span>
        </Link>
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          📝 ツールを投稿
        </h1>
        <p className="text-gray-600 text-lg">
          あなたのお気に入りのAIツールをシェアしましょう
        </p>
        <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              ツール名 *
            </label>
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="例: 2026年版！無料で使えるAI画像生成ツール10選" 
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              公式URL *
            </label>
            <input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://example.com" 
              type="url"
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              概要説明 *
            </label>
            <textarea 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              placeholder="このツールの特徴や使いやすさなどを簡潔に説明してください" 
              rows={6}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none" 
              required
            />
          </div>

          <button 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                <span>処理中...</span>
              </span>
            ) : (
              <span>📤 投稿する</span>
            )}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">✓ {result}</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          💡 ヒント
        </h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 正確な情報と魅力的な説明を心がけましょう</li>
          <li>• 実際に使った体験談があると大歓迎です</li>
          <li>• 他のユーザーが参考にしやすい記事にしてください</li>
        </ul>
      </div>
    </div>
  );
}
