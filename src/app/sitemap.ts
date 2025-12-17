import { MetadataRoute } from 'next'
import { coffeeshops } from '@/data/coffeeshops'
import guidesData from '@/data/guides.json'
import strainsData from '@/data/strains.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://corax-amsterdam.vercel.app'

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
        url: `${baseUrl}${route}/`,
        lastModified: new Date(),
    }))

    // Dynamic guide routes
    const guideRoutes = guidesData.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}/`,
        lastModified: new Date(),
    }))

    // Dynamic strain routes
    const strainRoutes = strainsData.map((strain) => ({
        url: `${baseUrl}/strains/${strain.slug}/`,
        lastModified: new Date(),
    }))

    // Dynamic shop routes
    const shopRoutes = coffeeshops.map((shop) => {
        const slug = shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        return {
            url: `${baseUrl}/shop/${shop.id}/${slug}/`,
            lastModified: new Date(),
        }
    })

    return [...routes, ...guideRoutes, ...strainRoutes, ...shopRoutes]
}
