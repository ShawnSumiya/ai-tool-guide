import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  title: 'ツール投稿 | AI Tool Guide',
  description: 'あなたのお気に入りのAIツールをシェアしましょう。ユーザーの投稿によって、より良いAIツールガイドを作り上げていきます。',
  alternates: { canonical: `${siteUrl}/submit` },
  openGraph: {
    title: 'ツール投稿 | AI Tool Guide',
    description: 'あなたのお気に入りのAIツールをシェアしましょう。',
    url: `${siteUrl}/submit`,
    siteName: 'AI Tool Guide',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



