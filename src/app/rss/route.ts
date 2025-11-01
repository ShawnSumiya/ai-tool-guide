import { NextResponse } from 'next/server';
import RSS from 'rss';
import { getAllTools } from '@/lib/content';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const feed = new RSS({
    title: 'AI Tool Guide',
    description: 'AIアプリ/ツール紹介のRSSフィード',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss`,
    language: 'ja',
  });

  const tools = getAllTools();
  tools.forEach((t) => {
    feed.item({
      title: t.title,
      description: t.description,
      url: `${siteUrl}/tools/${t.slug}`,
      date: t.updatedAt || t.createdAt || new Date().toISOString(),
    });
  });

  const xml = feed.xml({ indent: true });
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=UTF-8' },
  });
}
