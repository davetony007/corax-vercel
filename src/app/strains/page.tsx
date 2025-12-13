import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Leaf, Dna } from 'lucide-react';
import strainsData from '@/data/strains.json';

export const metadata: Metadata = {
    title: 'Cannabis Strains Guide | Amsterdam Coffeeshop Directory',
    description: 'A comprehensive directory of significant cannabis strains, from historical landraces to modern commercial hybrids.',
};

export default function StrainsHub() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="container mx-auto px-4 py-12 flex-grow max-w-7xl">
                <header className="mb-16 max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight font-display">
                        Cannabis <span className="text-primary">Strains</span> Guide
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Welcome to our curated directory of significant cannabis varieties.
                        This index spans the history of modern breeding, from the foundational
                        landraces of the 1960s to the commercial powerhouses that define today's
                        legal markets.
                    </p>
                </header>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {strainsData.map((strain) => (
                            <Link
                                key={strain.slug}
                                href={`/strains/${strain.slug}`}
                                className="group block h-full"
                            >
                                <Card className="h-full p-6 bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow group-hover:-translate-y-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-background border border-border shadow-sm group-hover:border-primary/50 transition-colors">
                                            <Leaf className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-display">
                                        {strain.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {strain.descriptor}
                                    </p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
