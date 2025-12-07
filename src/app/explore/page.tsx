import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

import MapWrapper from "@/components/MapWrapper";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Map – Filters for Best Cannabis, Hash, Edibles & Tourist‑Friendly Spots",
    description: "Use this interactive Amsterdam coffeeshop map to filter for tourist‑friendly shops, best hash and waterhash, strong edibles, local favorites and historic spots for your 2026 trip.",
    alternates: {
        canonical: "https://corax-amsterdam-explorer-main.pages.dev/explore",
    }
};

export default function Explore() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "https://corax-amsterdam-explorer-main.pages.dev/"
                            }, {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Explore",
                                "item": "https://corax-amsterdam-explorer-main.pages.dev/explore"
                            }]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Amsterdam Coffeeshop Map",
                            "description": "Interactive Amsterdam coffeeshop map with filters for tourist-friendly spots, best cannabis, hash, edibles and local favorites.",
                            "url": "https://corax-amsterdam-explorer-main.pages.dev/explore"
                        }
                    ])
                }}
            />
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Amsterdam Coffeeshop Map (2026)
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        Explore Amsterdam coffeeshops on an interactive map with filters for <strong>tourist‑friendly vibes</strong>, best <strong>cannabis</strong>, <strong>hash</strong> and <strong>waterhash</strong>, strong <strong>edibles</strong>, <strong>local favorites</strong> and <strong>historic legends</strong> so you can build a relaxed 2026 itinerary in minutes.
                    </p>
                </div>
            </div>

            <MapWrapper />

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto text-center">
                    <a href="?filter=tourist-friendly" className="p-4 bg-card border rounded-lg hover:border-primary transition-colors">
                        <h3 className="font-bold text-foreground">Tourist Friendly</h3>
                        <p className="text-sm text-muted-foreground">Relaxed spots perfect for first-timers</p>
                    </a>
                    <a href="?filter=best-hash" className="p-4 bg-card border rounded-lg hover:border-primary transition-colors">
                        <h3 className="font-bold text-foreground">Best Hash</h3>
                        <p className="text-sm text-muted-foreground">Top-tier isolator and traditional hash</p>
                    </a>
                    <a href="?filter=best-edibles" className="p-4 bg-card border rounded-lg hover:border-primary transition-colors">
                        <h3 className="font-bold text-foreground">Best Edibles</h3>
                        <p className="text-sm text-muted-foreground">Strong and tested cakes & pastries</p>
                    </a>
                    <a href="?filter=local-favorites" className="p-4 bg-card border rounded-lg hover:border-primary transition-colors">
                        <h3 className="font-bold text-foreground">Local Favorites</h3>
                        <p className="text-sm text-muted-foreground">Hidden gems where locals go</p>
                    </a>
                </div>
            </div>
            <Reviews />

            <Footer />
        </div>
    );
}
