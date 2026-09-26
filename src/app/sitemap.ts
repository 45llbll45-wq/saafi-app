import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo-config';
import { TOOLS_LIST } from '@/data/tools-data';
import { BLOG_POSTS } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.domain;

  // الصفحات الثابتة الأساسية
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // صفحات الأدوات المالية الـ 5
  const toolPages: MetadataRoute.Sitemap = TOOLS_LIST.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // صفحات المقالات الـ 10
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticPages, ...toolPages, ...blogPages];
}
