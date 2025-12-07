import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'],
        },
        sitemap: 'https://corax-amsterdam-explorer-main.pages.dev/sitemap.xml',
    };
}
