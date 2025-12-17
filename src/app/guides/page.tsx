import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info, Flame, BookOpen, Zap, Globe, Activity, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Guides (2026): Tips & Insiders",
    description: "Expert guides for navigating Amsterdam's coffeeshop scene. From first-time tips to finding the best hash, our deep dives help you smoke like a local.",
    alternates: {
        canonical: "https://corax-amsterdam.vercel.app/guides",
    },
    openGraph: {
        title: "Amsterdam Coffeeshop Guides (2026): Tips & Insiders",
        description: "Expert guides for navigating Amsterdam's coffeeshop scene. Tips, etiquette, and best product lists.",
        type: "website",
        url: "https://corax-amsterdam.vercel.app/guides",
        images: ["/og-image.png"],
    },
};

import guidesData from "@/data/guides.json";

const iconMap: { [key: string]: any } = {
    Info,
    Flame,
    BookOpen,
    Zap,
    Globe,
    Activity,
    Sparkles
};

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
                        url: "https://corax-amsterdam.vercel.app/guides",
                        mainEntity: {
                            "@type": "ItemList",
                            itemListElement: guidesData.map((guide, index) => ({
                                "@type": "ListItem",
                                position: index + 1,
                                url: `https://corax-amsterdam.vercel.app/guides/${guide.slug}`,
                                name: guide.title,
                                description: guide.metaDescription,
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
                    <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
                        You can also browse our full <Link href="/strains" className="text-primary hover:underline font-medium">Cannabis Strains Guide</Link>, organised by era and genetics.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guidesData.map((guide) => {
                        // Cast to any to access dynamic props added in JSON
                        const g = guide as any;
                        const Icon = iconMap[g.icon] || BookOpen;

                        return (
                            <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                                <Card className="h-full p-6 border-border group-hover:border-primary transition-all duration-300 hover:shadow-glow flex flex-col">
                                    <div className="mb-4 flex justify-between items-start">
                                        <div className={`p-3 rounded-xl bg-card border shadow-sm ${g.color || 'text-primary'}`}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        {g.badge && (
                                            <span className="px-2 py-1 bg-muted rounded text-xs font-medium uppercase tracking-wider">
                                                {g.badge}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {g.title}
                                    </h2>
                                    <p className="text-muted-foreground mb-6 flex-grow">
                                        {g.metaDescription}
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
