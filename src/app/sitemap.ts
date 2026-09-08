import type { MetadataRoute } from 'next'
import { site } from '@/config/site'

const siteUrl = 'https://debayansportfolio.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...site.studio.items.map((p) => {
      const slug = (p as { slug: string }).slug
      return {
        url: `${siteUrl}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    }),
  ]
}
