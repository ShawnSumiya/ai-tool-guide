import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'AIアプリ・Webツール紹介サイト',
  description: 'AIで自動生成するアプリ/ツールのレビューと紹介。',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AIアプリ・Webツール紹介サイト',
    description: 'AIで自動生成するアプリ/ツールのレビューと紹介。',
    url: siteUrl,
    siteName: 'AI Tool Guide',
    type: 'website',
    images: [
      {
        url: '/images/logos/website_logo.png',
        width: 1200,
        height: 630,
        alt: 'AI Tool Guide',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  return (
    <html lang="ja">
      <head>
        {adsClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 antialiased">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <header className="mb-12">
            <Link href="/">
              <div className="group cursor-pointer">
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                  AI Tool Guide
                </h1>
                <p className="text-sm font-medium text-gray-600 mt-1 group-hover:text-gray-900 transition-colors">
                  🤖 最新のAIアプリ・Webツールを徹底紹介
                </p>
              </div>
            </Link>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </header>

          <main className="mb-16">{children}</main>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-gray-200">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} AI Tool Guide. All rights reserved.
                </div>
                <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
                  <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">ホーム</Link>
                  <Link href="/submit" className="text-gray-600 hover:text-blue-600 transition-colors">ツール投稿</Link>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">プライバシーポリシー</Link>
                <span className="text-gray-300">|</span>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">利用規約</Link>
                <span className="text-gray-300">|</span>
                <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">免責事項</Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
