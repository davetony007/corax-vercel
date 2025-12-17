import { Metadata } from "next";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import MapWrapper from "@/components/MapWrapper";
import ExplainerSection from "@/components/ExplainerSection";
import ShopList from "@/components/ShopList";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Map (2026): Find Best Weed & Hash",
    description: "Interactive Amsterdam coffeeshop map. Filter for tourist-friendly spots, best hash, strong edibles, and local favorites for your 2026 trip.",
    alternates: {
        canonical: "https://corax-amsterdam.vercel.app/explore",
    },
    openGraph: {
        url: "https://corax-amsterdam.vercel.app/explore",
    },
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
                        "url": "https://corax-amsterdam.vercel.app/explore",
                        "description": "Interactive Amsterdam coffeeshop map with filters for tourist-friendly shops, best cannabis, hash and waterhash, edibles, local favorites and historic spots for 2026 trips.",
                        "isPartOf": {
                            "@type": "WebSite",
                            "name": "Bud Stuntman",
                            "url": "https://corax-amsterdam.vercel.app/"
                        }
                    })
                }}
            />
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Can tourists still buy cannabis in Amsterdam in 2026?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, tourists over 18 with valid ID can still buy cannabis in Amsterdam coffeeshops in 2026. While some local restrictions exist in other Dutch cities, Amsterdam remains open to visitors."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is the difference between hash and waterhash?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Traditional hash is dry-sifted kief pressed into bricks (often from Morocco), while waterhash (ice-o-lator) uses ice water extraction for a much purer, stronger, and often solventless concentrate product."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Which coffeeshops are best for first-time visitors?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "For first-timers, look for 'Tourist Friendly' shops on our map like 1e Hulp, Siberie, or Tweede Kamer. These spots have patient staff, clear menus, and a welcoming atmosphere."
                                }
                            }
                        ]
                    })
                }}
            />
            <Navigation />

            <div className="container mx-auto px-4 py-8 space-y-12">
                <div className="space-y-4 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Amsterdam Coffeeshop Map (2026)
                    </h1>
                </div>

                <MapWrapper />

                <ExplainerSection />

                <ShopList />

                {/* FAQ Display Section */}
                <section className="max-w-3xl mx-auto py-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Frequent Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-2">Can tourists still buy cannabis in Amsterdam in 2026?</h3>
                            <p className="text-muted-foreground">
                                Yes, tourists over 18 with valid ID can still buy cannabis in Amsterdam coffeeshops in 2026. While some local restrictions exist in other Dutch cities (like the wietpas in border towns), Amsterdam remains open to visitors.
                            </p>
                        </div>
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-2">What is the difference between hash and waterhash?</h3>
                            <p className="text-muted-foreground">
                                Traditional hash (like classic Moroccan) is dry-sifted kief pressed into bricks using heat. Waterhash (or ice-o-lator) uses ice water and fine mesh bags to extract trichomes. The result is a much purer, stronger, and cleaner product—often fully meltable.
                            </p>
                        </div>
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <h3 className="font-bold text-lg mb-2">Which coffeeshops are best for first-time visitors?</h3>
                            <p className="text-muted-foreground">
                                If it's your first time, avoid the loud, rushed spots in the Red Light District. Look for "Tourist Friendly" tags on our map—places like 1e Hulp, Siberie, or Tweede Kamer offer patient budtenders who will explain the menu without rushing you.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            {/* Visual filters removed to avoid redundancy with MapWrapper controls, removed old Reviews component in favor of structured ShopList */}

            <Footer />
        </div>
    );
}
