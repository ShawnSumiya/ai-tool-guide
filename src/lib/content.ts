import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category?: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
  thumbnail?: string;
  tags?: string[];
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'tools');

export function getAllTools(): Tool[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  const tools = files.map((file) => getToolBySlug(file.replace(/\.md$/, '')));
  // 最終更新順（降順）でソート
  return tools.sort((a, b) => {
    const dateA = a.updatedAt || a.createdAt || '';
    const dateB = b.updatedAt || b.createdAt || '';
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    // Dateオブジェクトに変換して比較（降順：新しい順）
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();
    return timeB - timeA;
  });
}

export function getToolBySlug(slug: string): Tool {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(source);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    category: data.category,
    url: data.url,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    thumbnail: data.thumbnail,
    tags: data.tags,
    content,
  };
}
