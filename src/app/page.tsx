import Link from 'next/link';
import { getAllTools } from '@/lib/content';
import Adsense from '@/components/Adsense';

export default function HomePage() {
  const tools = getAllTools();
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-3">🎨 最新AIツールで創作をもっと自由に</h2>
          <p className="text-lg text-blue-100 max-w-2xl">
            無料で使える高性能AIツールを厳選。あなたの創造性を解き放つ、2026年最新のツールガイド
          </p>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <Adsense className="my-8" />

      {/* Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">📚 人気のツール</h3>
          <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {tools.length}件
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link 
              key={t.slug} 
              href={`/tools/${t.slug}`}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Gradient Top Bar */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-200">
                    {t.category}
                  </span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {t.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {t.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    🚀 <span className="font-medium">詳細を見る</span>
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-3">✨ おすすめツールを見つけよう</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          用途別・レベル別に最適なツールをピックアップ。初心者からプロまで、きっとあなたにぴったりのツールが見つかります。
        </p>
        <Link 
          href="/submit"
          className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
        >
          ツールを投稿する
        </Link>
      </div>
    </div>
  );
}
