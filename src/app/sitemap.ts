import { MetadataRoute } from 'next'
import { coffeeshops } from '@/data/coffeeshops'
import guidesData from '@/data/guides.json'
import strainsData from '@/data/strains.json'

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
        '/strains',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic guide routes
    const guideRoutes = guidesData.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic strain routes
    const strainRoutes = strainsData.map((strain) => ({
        url: `${baseUrl}/strains/${strain.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
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

    return [...routes, ...guideRoutes, ...strainRoutes, ...shopRoutes]
}
