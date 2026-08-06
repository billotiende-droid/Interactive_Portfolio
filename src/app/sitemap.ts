import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://billotiende.dev';
  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-08-05'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}