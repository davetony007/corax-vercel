import { MetadataRoute } from 'next'
import { coffeeshops } from '@/data/coffeeshops'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://budstuntman.pages.dev'

    // Static routes
    const routes = [
        '',
        '/explore',
        '/videos',
        '/insta',
        '/support',
        '/guides',
        '/guides/first-time-guide-2026',
        '/guides/best-hash-amsterdam-2026',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic shop routes
    const shopRoutes = coffeeshops.map((shop) => {
        const slug = shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return {
            url: `${baseUrl}/shop/${shop.id}/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    })

    return [...routes, ...shopRoutes]
}
