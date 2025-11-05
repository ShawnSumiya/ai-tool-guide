import { notFound } from 'next/navigation';
import { getAllTools, getToolBySlug } from '@/lib/content';
import Adsense from '@/components/Adsense';
import Link from 'next/link';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkHtml from 'remark-html';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const url = `${siteUrl}/tools/${slug}`;
  
  return {
    title: `${tool.title} | AI Tool Guide`,
    description: tool.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      type: 'article',
      images: tool.thumbnail ? [
        {
          url: tool.thumbnail.startsWith('http') ? tool.thumbnail : `${siteUrl}${tool.thumbnail}`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ] : [
        {
          url: `${siteUrl}/images/logos/website_logo.png`,
          width: 1200,
          height: 630,
          alt: 'AI Tool Guide',
        },
      ],
      siteName: 'AI Tool Guide',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.description,
      images: tool.thumbnail ? [
        tool.thumbnail.startsWith('http') ? tool.thumbnail : `${siteUrl}${tool.thumbnail}`
      ] : [
        `${siteUrl}/images/logos/website_logo.png`
      ],
    },
    keywords: tool.tags?.join(', '),
    category: tool.category,
  };
}

async function processMarkdown(content: string) {
  const trimmed = content.trim();
  
  // HTMLが既に含まれている場合は、そのまま返す（HTMLコンテンツ）
  if (trimmed.startsWith('<') || trimmed.includes('<div') || trimmed.includes('<h1') || trimmed.includes('<section')) {
    // HTMLのみのコンテンツはそのまま返す
    return content;
  }
  
  // MarkdownとHTMLが混在している場合の処理
  if (content.includes('<') && content.includes('>')) {
    try {
      // HTMLとMarkdownが混在している場合の処理
      const processedContent = await remark()
        .use(remarkRehype)
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);
      const result = processedContent.toString();
      // 結果が有効な場合は返す、そうでない場合は元のコンテンツを返す
      return result && result.trim().length > 0 ? result : content;
    } catch (error) {
      console.error('Rehype processing error:', error);
      // HTMLをそのまま返す（フォールバック）
      return content;
    }
  }
  
  // 通常のMarkdown処理
  try {
    const processedContent = await remark().use(remarkHtml).process(content);
    return processedContent.toString();
  } catch (error) {
    console.error('Markdown processing error:', error);
    return content;
  }
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const slugs = new Set(getAllTools().map((t) => t.slug));
  if (!slugs.has(slug)) return notFound();
  const tool = getToolBySlug(slug);
  
  // デバッグ: コンテンツが空でないか確認
  if (!tool.content || tool.content.trim().length === 0) {
    console.error(`Content is empty for slug: ${slug}`);
    return (
      <article className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">コンテンツが見つかりません</h1>
        <p>スラッグ: {slug}</p>
      </article>
    );
  }
  
  let htmlContent: string;
  try {
    htmlContent = await processMarkdown(tool.content);
    // デバッグ用（本番では削除）
    console.log('Content length:', tool.content.length);
    console.log('HTML length:', htmlContent.length);
  } catch (error) {
    console.error('Error processing markdown:', error);
    // エラー時はコンテンツをそのまま使用
    htmlContent = tool.content;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tool.title,
    description: tool.description,
    image: tool.thumbnail
      ? (tool.thumbnail.startsWith('http') ? tool.thumbnail : `${siteUrl}${tool.thumbnail}`)
      : `${siteUrl}/images/logos/website_logo.png`,
    datePublished: tool.createdAt || new Date().toISOString(),
    dateModified: tool.updatedAt || tool.createdAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'AI Tool Guide',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Tool Guide',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logos/website_logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tools/${slug}`,
    },
    keywords: tool.tags?.join(', '),
    articleSection: tool.category,
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium">一覧に戻る</span>
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-bold border border-blue-200">
            {tool.category}
          </span>
          {tool.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight break-words">
          {tool.title}
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          {tool.description}
        </p>
        <div className="h-2 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      <Adsense className="my-8" />

      {/* Content */}
      {htmlContent && htmlContent.trim().length > 0 ? (
        <div 
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-black prose-headings:text-gray-900
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t-2 prose-h2:border-gray-200
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-700
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-ul:my-6 prose-li:text-gray-700
            prose-li:marker:text-blue-600 prose-li:marker:font-bold
            prose-ul:list-disc prose-ul:pl-8
            prose-ol:list-decimal prose-ol:pl-8
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            prose-code:text-purple-700 prose-code:bg-purple-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto
            prose-a:text-blue-600 prose-a:font-medium prose-a:hover:text-blue-800 prose-a:underline-offset-2
            prose-hr:border-t-2 prose-hr:border-gray-200 prose-hr:my-12
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">⚠️ コンテンツが空です。ファイルを確認してください。</p>
          <p className="text-sm text-yellow-600 mt-2">コンテンツ長: {tool.content.length}文字</p>
        </div>
      )}

      {/* Back to Top */}
      <div className="mt-16 pt-8 border-t-2 border-gray-200">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl group"
        >
          <span>🏠</span>
          <span>ホームに戻る</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </article>
  );
}
