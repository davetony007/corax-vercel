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
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Amsterdam Coffeeshop Map",
                        "url": "https://budstuntman.pages.dev/explore",
                        "description": "Interactive Amsterdam coffeeshop map with filters for tourist-friendly shops, best cannabis, hash and waterhash, edibles, local favorites and historic spots for 2026 trips.",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Bud Stuntman",
                            "url": "https://budstuntman.pages.dev/"
                        }
                    })
                }}
            />
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Amsterdam Coffeeshop Map (2026)
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        Welcome to the ultimate <strong>Amsterdam Coffeeshop Map for 2026</strong>. Use the filters below to find exactly what you need—whether that's "Tourist Friendly" spots for first-timers, "Best Hash" for connoisseurs, or verified "Best Edibles". Each location is reviewed for quality, vibe, and safety.
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
