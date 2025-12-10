import Link from "next/link";
import { Metadata } from "next";
import { coffeeshops } from "@/data/coffeeshops";
import ShopDetails from "@/components/ShopDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Generate static params for all shops to enable SSG/ISR
export async function generateStaticParams() {
    return coffeeshops.map((shop) => {
        const slug = shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
            id: shop.id,
            slug: slug,
        };
    });
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ id: string; slug: string }> }): Promise<Metadata> {
    const { id } = await params; // Nextjs 15 requires awaiting params
    const shop = coffeeshops.find((s) => s.id === id);

    if (!shop) {
        return {
            title: "Shop Not Found - Corax Amsterdam Explorer",
            robots: { index: false },
        };
    }

    const title = `${shop.name} Coffeeshop Reviews & Menu (2026)`;
    // Robust description generation to ensure optimal length (110-160 chars)
    // Structure: [Intro] [Details] [Call to Action]
    const ratingStr = shop.rating > 0 ? `Rated ${shop.rating}/5` : "Honest reviews";
    const tagsStr = shop.tags?.length > 0 ? `known for ${shop.tags.slice(0, 2).join(" & ")}` : "in Amsterdam";
    const description = `Read our honest review of ${shop.name} (${shop.location}). ${ratingStr} and ${tagsStr}. Check the latest menu, prices, and explore our 2026 guide.`;

    const canonicalUrl = `https://budstuntman.pages.dev/shop/${shop.id}/${shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

    return {
        title,
        description,
        keywords: [
            shop.name,
            `${shop.name} Amsterdam`,
            "Amsterdam coffeeshop",
            "coffeeshop menu",
            "weed prices",
            "cannabis reviews",
            shop.location,
            ...(shop.tags || [])
        ].join(", "),
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            type: "article",
            title,
            description,
            images: [
                {
                    url: shop.image,
                    width: 1200,
                    height: 630,
                    alt: `${shop.name} Coffeeshop Amsterdam`,
                }
            ],
            url: canonicalUrl,
            siteName: "Corax Dawai",
            locale: "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [shop.image],
        },
    };
}

export default async function ShopPage({ params }: { params: Promise<{ id: string; slug: string }> }) {
    const { id } = await params; // Nextjs 15 requires awaiting params
    const shop = coffeeshops.find((s) => s.id === id);

    if (!shop) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold mb-4">Coffeeshop Not Found</h1>
                    <p className="text-muted-foreground mb-8">
                        The coffeeshop you are looking for does not exist or has been removed.
                    </p>
                    <Button asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Map
                        </Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const canonicalUrl = `https://budstuntman.pages.dev/shop/${shop.id}/${shop.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    const description = `Read honest reviews for ${shop.name} in ${shop.location}.`;

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "name": shop.name,
                        "image": shop.image,
                        "description": description,
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": shop.address,
                            "addressLocality": "Amsterdam",
                            "addressCountry": "NL"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": shop.coordinates[0],
                            "longitude": shop.coordinates[1]
                        },
                        "url": canonicalUrl,
                        "priceRange": "€€",
                        ...(shop.rating > 0 && {
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": shop.rating,
                                "bestRating": "5",
                                "worstRating": "1",
                                "ratingCount": "1" // Placeholder
                            }
                        })
                    })
                }}
            />

            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Map
                        </Link>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {shop.name}
                    </h1>
                    <ShopDetails shop={shop} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
