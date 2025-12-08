import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info, Flame, BookOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Guides (2026): Tips & Insiders",
    description: "Expert guides for navigating Amsterdam's coffeeshop scene. From first-time tips to finding the best hash, our deep dives help you smoke like a local.",
    alternates: {
        canonical: "https://budstuntman.pages.dev/guides",
    },
    openGraph: {
        title: "Amsterdam Coffeeshop Guides (2026): Tips & Insiders",
        description: "Expert guides for navigating Amsterdam's coffeeshop scene. Tips, etiquette, and best product lists.",
        type: "website",
        url: "https://budstuntman.pages.dev/guides",
        images: ["/og-image.png"],
    },
};

const guides = [
    {
        title: "First-Time Guide (2026)",
        description: "21 things nobody tells you about rules, IDs, scams, and finding the best weed safely.",
        href: "/guides/first-time-guide-2026",
        icon: Info,
        color: "text-primary",
        badge: "Essential",
    },
    {
        title: "Best Hash in Amsterdam",
        description: "From old-school Moroccan gold to 6-star Piatella and Static Sift. The ultimate connoisseur's list.",
        href: "/guides/best-hash-amsterdam-2026",
        icon: Flame,
        color: "text-amber-500",
        badge: "Connoisseur",
    },
    // Future guides can be added here
];

export default function GuidesHub() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Amsterdam Coffeeshop Guides",
                        description: "Expert guides for navigating Amsterdam's coffeeshop scene.",
                        url: "https://budstuntman.pages.dev/guides",
                        mainEntity: {
                            "@type": "ItemList",
                            itemListElement: guides.map((guide, index) => ({
                                "@type": "ListItem",
                                position: index + 1,
                                url: `https://budstuntman.pages.dev${guide.href}`,
                                name: guide.title,
                                description: guide.description,
                            })),
                        },
                    }),
                }}
            />
            <Navigation />

            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                        The <span className="text-primary">Knowledge</span> Drop
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Don't just smoke. Learn. From etiquette to extracts, these guides will level up your Amsterdam experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guides.map((guide) => {
                        const Icon = guide.icon;
                        return (
                            <Link key={guide.href} href={guide.href} className="group">
                                <Card className="h-full p-6 border-border group-hover:border-primary transition-all duration-300 hover:shadow-glow flex flex-col">
                                    <div className="mb-4 flex justify-between items-start">
                                        <div className={`p-3 rounded-xl bg-card border shadow-sm ${guide.color}`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <span className="px-2 py-1 bg-muted rounded text-xs font-medium uppercase tracking-wider">
                                            {guide.badge}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {guide.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-6 flex-grow">
                                        {guide.description}
                                    </p>
                                    <div className="flex items-center text-sm font-bold text-primary">
                                        Read Guide <BookOpen className="w-4 h-4 ml-2" />
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
