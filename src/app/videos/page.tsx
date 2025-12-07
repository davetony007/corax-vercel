import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import VideoGallery from "@/components/VideoGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Reviews & Videos – Best Smoking Spots & Tours (2026)",
    description: "Watch in‑depth Amsterdam coffeeshop review videos, walking tours and shorts covering the best smoking spots, hash, edibles and neighborhoods to visit in 2026.",
    alternates: {
        canonical: "https://corax-amsterdam-explorer-main.pages.dev/videos",
    }
};

export default function Videos() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": "Amsterdam Coffeeshop Reviews & Videos",
                        "url": "https://budstuntman.pages.dev/videos",
                        "description": "Collection of Amsterdam coffeeshop review videos, walking tours and shorts covering the best smoking spots, hash, edibles and neighborhoods for 2026 travelers.",
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
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Amsterdam Coffeeshop Reviews & Videos
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                        Explore our library of <strong>100+ videos</strong>, featuring long‑form reviews, walking tours, and shorts. Designed for <strong>25+ travelers</strong>, we cover everything from first impressions and full menu breakdowns to neighborhood guides—giving you honest insights on value, quality, and vibe.
                    </p>
                </div>
            </div>

            <VideoGallery />

            <Footer />
        </div>
    );
}
