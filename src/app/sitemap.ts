import { MetadataRoute } from 'next';
import { coffeeshops } from '@/data/coffeeshops';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://corax-amsterdam-explorer-main.pages.dev';

    // Static routes
    const routes = [
        '',
        '/explore',
        '/videos',
        '/insta',
        '/support',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic shop routes
    const shopRoutes = coffeeshops.map((shop) => ({
        url: `${baseUrl}/shop/${shop.id}/${shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: shop.coraxApproved ? 0.9 : 0.6,
    }));

    return [...routes, ...shopRoutes];
}
