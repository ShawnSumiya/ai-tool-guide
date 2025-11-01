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
  return files.map((file) => getToolBySlug(file.replace(/\.md$/, '')));
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
