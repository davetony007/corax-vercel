import { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Check, Info, Flame, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Best Hash in Amsterdam (2026) – The Ultimate Connoisseur’s Guide",
    description: "Looking for the best hash in Amsterdam? From old-school Moroccan gold to 6-star Piatella and Static Sift. Our 2026 guide lists the top shops and prices.",
    alternates: {
        canonical: "https://budstuntman.pages.dev/guides/best-hash-amsterdam-2026",
    },
    openGraph: {
        title: "Best Hash in Amsterdam (2026) – The Ultimate Guide",
        description: "Old school bricks vs. New school extracts. Find the best hash in Amsterdam with our 2026 expert guide.",
        type: "article",
        url: "https://budstuntman.pages.dev/guides/best-hash-amsterdam-2026",
        images: ["/og-image.png"],
    },
};

export default function BestHashGuide() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Best Hash in Amsterdam (2026) – The Ultimate Connoisseur’s Guide",
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
                        datePublished: "2025-01-15",
                        dateModified: "2025-01-15",
                        description:
                            "A comprehensive guide to finding the best hash in Amsterdam in 2026. Covers traditional Moroccan imports, new school filtrations, and price guides.",
                    }),
                }}
            />
            <Navigation />

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm font-medium mb-4">
                        Connoisseur Series
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                        The Search for the <span className="text-amber-500">Best Hash in Amsterdam</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Amsterdam is the hash capital of the world. But the game has changed. Whether you want a €12 Moroccan brick or a €100 gram of Piatella, here is where to look.
                    </p>
                </div>

                {/* Intro Alert */}
                <div className="bg-card border-l-4 border-amber-500 p-6 rounded-r-lg mb-12 shadow-sm">
                    <h3 className="flex items-center text-lg font-bold mb-2">
                        <Flame className="w-5 h-5 mr-2 text-amber-500" />
                        Old School vs. New School
                    </h3>
                    <p className="text-muted-foreground">
                        The menu is split in 2026. <strong>"Old School"</strong> is traditional imported brick hash (Morocco, Lebanon, Nepal). <strong>"New School"</strong> is locally processed Frozen Sift, Static Sift, and Piatella. Know what you're buying.
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    {/* Main Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">

                        {/* Section 1: Traditional Imports */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-amber-500/20 text-amber-500 w-8 h-8 rounded-full flex items-center justify-center text-lg">1</span>
                                Traditional Imports
                            </h2>
                            <p className="text-lg text-muted-foreground mt-4">
                                This is the heritage of Amsterdam. Imported directly from the Rif Mountains of Morocco or the fields of Lebanon. Perfect for rolling into a joint with tobacco or herbal mix.
                            </p>
                            <div className="space-y-6 mt-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Top Pick: Bluebird</h3>
                                    <p className="text-muted-foreground">
                                        Famous for their "Ketama Gold" and "Polm". Prices are reasonable (€12-15), and the quality is consistent. A true Amsterdam classic.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Top Pick: Katsu</h3>
                                    <p className="text-muted-foreground">
                                        A local favorite in De Pijp. Their "Black Bombay" and various Moroccan Polms are legendary. The menu is huge, so ask for a recommendation.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Top Pick: Boerejongens</h3>
                                    <p className="text-muted-foreground">
                                        For value, you can't beat their "White Choco Block". It's a modern hybrid block hash that tastes incredible and burns clean.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: The New Wave (Extracts) */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-amber-500/20 text-amber-500 w-8 h-8 rounded-full flex items-center justify-center text-lg">2</span>
                                The New Wave: Static & Piatella
                            </h2>
                            <p className="text-lg text-muted-foreground mt-4">
                                This is for the heavy hitters. Using advanced filtration (static tech, fresh frozen material), these products are 3x-4x stronger than traditional hash.
                            </p>
                            <div className="space-y-6 mt-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Top Pick: Family First</h3>
                                    <p className="text-muted-foreground">
                                        The absolute temple of terps. They carry <strong>Piatella</strong> (cold-cured full melt) and Static Sift that bubbles at room temperature. Bring your wallet (€30-100/g).
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-foreground">Top Pick: Green Place</h3>
                                    <p className="text-muted-foreground">
                                        Another heavy hitter near the center. Great selection of "Cali" style dry sift and semi-dry products.
                                    </p>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                                    <div className="flex items-start gap-4">
                                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-foreground">Warning: Potency</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Modern extracts can range from 50% to 80% THC. Do NOT treat this like old-school hash. Use a tiny amount.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Texture Guide */}
                        <section>
                            <h2 className="text-3xl font-bold flex items-center gap-2">
                                <span className="bg-amber-500/20 text-amber-500 w-8 h-8 rounded-full flex items-center justify-center text-lg">3</span>
                                Know Your Textures
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                <Card className="p-4 border-l-4 border-l-yellow-600">
                                    <h3 className="font-bold mb-2">Blonde / Pollen</h3>
                                    <p className="text-sm text-muted-foreground">Sandy, light color. Crumbles easily without heat. Usually uplifting.</p>
                                </Card>
                                <Card className="p-4 border-l-4 border-l-amber-900">
                                    <h3 className="font-bold mb-2">Dark / Afghan</h3>
                                    <p className="text-sm text-muted-foreground">Black, sticky, pliable. Needs to be rolled into a "snake". Heavy body effect.</p>
                                </Card>
                                <Card className="p-4 border-l-4 border-l-amber-400">
                                    <h3 className="font-bold mb-2">Filtered / Dry Sift</h3>
                                    <p className="text-sm text-muted-foreground">Clean, melts when touched with flame. Very strong aroma.</p>
                                </Card>
                                <Card className="p-4 border-l-4 border-l-white">
                                    <h3 className="font-bold mb-2">Piatella / Rosin</h3>
                                    <p className="text-sm text-muted-foreground">Greasy, almost wet. Must be kept in a fridge. The highest grade possible.</p>
                                </Card>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <div className="bg-muted/30 p-8 rounded-2xl text-center space-y-6">
                            <h3 className="text-2xl font-bold">Find The Goods</h3>
                            <p className="text-muted-foreground">
                                Use our map to filter for "Best Hash" shops specifically.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/explore?filter=best-hash">
                                    <Button size="lg" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white">
                                        View Best Hash Map
                                    </Button>
                                </Link>
                                <Link href="/guides/first-time-guide-2026">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Read First-Time Guide
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <Card className="p-6 bg-card sticky top-24">
                            <h3 className="font-bold text-xl mb-4">Hash Price Index (2026)</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between border-b pb-2">
                                    <span>Standard Polm</span>
                                    <span className="font-mono text-primary">€10 - €14</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Super Polm</span>
                                    <span className="font-mono text-primary">€15 - €20</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Ice-o-Lator</span>
                                    <span className="font-mono text-primary">€20 - €40</span>
                                </li>
                                <li className="flex justify-between border-b pb-2">
                                    <span>Top Shelf Static</span>
                                    <span className="font-mono text-primary">€50 - €120</span>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <Link href="/explore">
                                    <Button className="w-full" variant="secondary">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        Find Shops
                                    </Button>
                                </Link>
                            </div>
                        </Card>

                        <div className="bg-amber-500/5 rounded-xl p-6 border border-amber-500/10">
                            <h3 className="font-bold mb-2 text-amber-600">Pro Tip</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                If you're spending more than €30/gram, ask to smell it first. Top shops will always let you inspect the jar.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
