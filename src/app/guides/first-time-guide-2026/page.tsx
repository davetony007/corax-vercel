import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, Info, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop First Time Guide (2026) – Rules, Prices & Etiquette",
    description: "The honest 2026 guide to Amsterdam coffeeshops for first-timers. 21 things nobody tells you about rules, IDs, scams, and finding the best weed safely.",
    alternates: {
        canonical: "https://budstuntman.pages.dev/guides/first-time-guide-2026",
    },
    openGraph: {
        title: "Amsterdam Coffeeshop First Time Guide (2026)",
        description: "Don't look like a tourist. Here are the real rules, prices, and etiquette for Amsterdam coffeeshops in 2026.",
        type: "article",
        url: "https://budstuntman.pages.dev/guides/first-time-guide-2026",
        images: ["/og-image.png"],
    },
};

export default function FirstTimeGuide() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Amsterdam Coffeeshop First Time Guide (2026)",
                        image: ["https://budstuntman.pages.dev/og-image.png"],
                        author: {
                            "@type": "Person",
                            name: "Corax Dawai",
                            url: "https://www.youtube.com/@CoraxDawai",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Bud Stuntman",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://budstuntman.pages.dev/favicon.ico",
                            },
                        },
                        datePublished: "2025-01-01",
                        dateModified: "2025-01-01",
                        description:
                            "The honest 2026 guide to Amsterdam coffeeshops for first-timers. Rules, prices, etiquette, and how to avoid tourist traps.",
                    }),
                }}
            />
            <Navigation />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        Essential Guide for 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                        21 Things Nobody Tells You About <span className="text-primary">Amsterdam Coffeeshops</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Forget what you saw in movies. Here is the honest, no-stress guide to buying, smoking, and chilling in Amsterdam like a local.
                    </p>
                </div>

                {/* Intro Alert */}
                <div className="bg-card border-l-4 border-primary p-6 rounded-r-lg mb-12 shadow-sm">
                    <h3 className="flex items-center text-lg font-bold mb-2">
                        <Info className="w-5 h-5 mr-2 text-primary" />
                        The Golden Rule
                    </h3>
                    <p className="text-muted-foreground">
                        <strong>Respect the locals.</strong> Amsterdam is a real city where people live and work. Don't smoke near schools, don't shout in the streets at 2 AM, and treat budtenders with the same respect you'd give a bartender.
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    {/* Main Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">

                        {/* Section 1: Entering & Buying */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-lg">1</span>
                                Entering & Buying
                            </h2>
                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">1. ID is Non-Negotiable</h3>
                                    <p className="text-muted-foreground">
                                        No matter if you look 18 or 80, you need valid ID. Passports are best. Digital photos of ID usually get rejected. No ID = No Entry.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">2. The "Menu" isn't Food</h3>
                                    <p className="text-muted-foreground">
                                        When you walk in, ask for the "Menu". This is the weed list. Don't sit down first; buy your product at the counter, <em>then</em> find a table.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">3. Cash is Still King (Sometimes)</h3>
                                    <p className="text-muted-foreground">
                                        While many spots now take card, legendary old-school shops often remain <strong>Cash Only</strong>. Always carry €50 in cash just in case.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">4. Don't Buy 5 Grams Immediately</h3>
                                    <p className="text-muted-foreground">
                                        The legal limit is 5g per person per day. Don't max it out at the first shop! Buy 1g, try it, and explore elsewhere. Variety is the spice of life.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Smoking Etiquette */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-lg">2</span>
                                Smoking Etiquette
                            </h2>
                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">5. The Tobacco Ban</h3>
                                    <p className="text-muted-foreground">
                                        Tobacco is legally banned indoors. Most shops provide a designated "herbal mix" (a tobacco substitute) for free. If you roll with tobacco, keep it discreet or sit in a designated smoking room (if they have one).
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">6. Hats & Sunglasses Off</h3>
                                    <p className="text-muted-foreground">
                                        It's a security thing. Take off your hat and sunglasses when entering. It shows respect and stops the bouncer from worrying.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">7. Don't Camp Without Buying</h3>
                                    <p className="text-muted-foreground">
                                        Coffeeshops are businesses. If you occupy a table for 2 hours, buy drinks and snacks. Don't bring outside food.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Safety & Traps */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-lg">3</span>
                                Safety & Avoiding Traps
                            </h2>
                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">8. Avoid "Cali" in Tourist Traps</h3>
                                    <p className="text-muted-foreground">
                                        If a shop in the center screams "CALI WEED" with neon lights, it's often overpriced mid-grade. For real top-shelf, check our <Link href="/explore?filter=best-hash" className="text-primary underline">Best Hash</Link> list.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">9. The Edible Warning</h3>
                                    <p className="text-muted-foreground">
                                        Dutch edibles are often stronger than you expect. Start with <strong>half</strong> a cake. Wait 90 minutes. Do NOT eat more because "you don't feel it yet."
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">10. Alcohol + Weed = Spinning</h3>
                                    <p className="text-muted-foreground">
                                        Keep them separate. Most coffeeshops don't serve alcohol, and bars don't let you smoke weed inside. Mixing them is the #1 reason tourists faint ("whitey").
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Local Secrets */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-lg">4</span>
                                Local Secrets
                            </h2>
                            <div className="space-y-6 mt-4">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">11. Ask the Budtender</h3>
                                    <p className="text-muted-foreground">
                                        "What are you smoking right now?" is the best question you can ask. They know what's fresh.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">12. Explore Outside the Center</h3>
                                    <p className="text-muted-foreground">
                                        Prices drop and quality rises when you leave the Red Light District. Visit De Pijp, West, or Oost for a "living room" vibe.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <div className="bg-muted/30 p-8 rounded-2xl text-center space-y-6">
                            <h3 className="text-2xl font-bold">Ready to Explore?</h3>
                            <p className="text-muted-foreground">
                                Now that you know the rules, find the perfect spot for your first session.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/explore?filter=tourist-friendly">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Find Tourist-Friendly Shops
                                    </Button>
                                </Link>
                                <Link href="/videos">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Watch Video Reviews
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <Card className="p-6 bg-card sticky top-24">
                            <h3 className="font-bold text-xl mb-4">Quick Stats (2026)</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between border-b pb-2">
                                    <span>Avg. Price (Gram)</span>
                                    <span className="font-mono text-primary">€12 - €16</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>"Cali" Price</span>
                                    <span className="font-mono text-primary">€25 - €35</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Legal Limit</span>
                                    <span className="font-mono text-primary">5g / day</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Age Limit</span>
                                    <span className="font-mono text-primary">18+ (ID Req)</span>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <Link href="/explore">
                                    <Button className="w-full" variant="secondary">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Open Map
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                            <h3 className="font-bold mb-2">Need a Recommendation?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Don't waste money on bad weed. Check our verified list of winners.
                            </p>
                            <Link href="/explore?filter=best-hash" className="text-sm font-bold text-primary hover:underline flex items-center">
                                View Best Hash Winners <Check className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
