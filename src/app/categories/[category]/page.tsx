import Link from 'next/link';
import { getAllTools } from '@/lib/content';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const cats = Array.from(new Set(getAllTools().map((t) => t.category).filter(Boolean)));
  return cats.map((c) => ({ category: String(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const description = `${category}カテゴリーのAIツール一覧。最新のツール情報をお届けします。`;
  
  return {
    title: `${category} | AI Tool Guide`,
    description,
    alternates: {
      canonical: `${siteUrl}/categories/${category}`,
    },
    openGraph: {
      title: `${category} | AI Tool Guide`,
      description,
      url: `${siteUrl}/categories/${category}`,
      type: 'website',
      images: [{
        url: `${siteUrl}/images/logos/website_logo.png`,
        width: 1200,
        height: 630,
        alt: 'AI Tool Guide',
      }],
      siteName: 'AI Tool Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} | AI Tool Guide`,
      description,
      images: [`${siteUrl}/images/logos/website_logo.png`],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const tools = getAllTools().filter((t) => t.category === category);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-medium">ホーム</span>
          </Link>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {category}
          </h1>
          <p className="text-gray-600 mt-2">
            {tools.length}件のツールが見つかりました
          </p>
        </div>
      </div>

      {/* Tools Grid */}
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
  );
}
