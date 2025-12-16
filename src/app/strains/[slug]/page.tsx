import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Leaf, Dna, Clock, Zap } from 'lucide-react';
import strainsData from '@/data/strains.json';

// Define the interface for our strain data
interface Strain {
    slug: string;
    name: string;
    descriptor: string;
    h1?: string;
    intro?: string;
    quickFacts?: {
        [key: string]: string;
    };
    image?: string; // URL to the hero image for this strain
    imageAlt?: string; // [NEW] SEO alt text for the image
    sections?: {
        title: string;
        content: string;
    }[];
}

export async function generateStaticParams() {
    return strainsData.map((strain) => ({
        slug: strain.slug,
    }));
}


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const strain = strainsData.find((s) => s.slug === slug) as Strain | undefined;

    if (!strain) {
        return {
            title: 'Strain Not Found',
        };
    }

    return {
        title: `${strain.name} | Amsterdam Coffeeshop Directory`,
        description: strain.descriptor,
    };
}

export default async function StrainPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const strain = strainsData.find((s) => s.slug === slug) as Strain | undefined;

    if (!strain) {
        notFound();
    }

    // Fallback for strains that haven't been fully populated yet
    const isPopulated = !!strain.h1;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="container mx-auto px-4 py-12 flex-grow max-w-6xl">
                <nav className="flex items-center text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                    <Link href="/strains" className="hover:text-primary transition-colors">Strains</Link>
                    <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
                    <span className="text-foreground font-medium truncate">{strain.name}</span>
                </nav>

                {isPopulated ? (
                    <article>
                        <header className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-widest px-3 py-1">
                                        Strain Profile
                                    </Badge>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display tracking-tight">
                                    {strain.h1}
                                </h1>

                                <div className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl prose-strong:text-primary">
                                    <ReactMarkdown>{strain.intro || ''}</ReactMarkdown>
                                </div>
                            </div>

                            <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                                <Link href={strain.image || '/images/hero_bud.png'} target="_blank">
                                    <img
                                        src={strain.image || '/images/hero_bud.png'}
                                        alt={strain.imageAlt || `${strain.name} bud`}
                                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                                {/* Radial gradient background for the bud to sit on */}
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full opacity-50"></div>
                            </div>
                        </header>

                        {strain.quickFacts && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                                {Object.entries(strain.quickFacts).map(([key, value]) => (
                                    <Card key={key} className="p-4 bg-card border-border border-l-4 border-l-primary/70">
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-bold mb-1">
                                            {key}
                                        </div>
                                        <div className="text-foreground font-semibold">
                                            {value}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}

                        <div className="space-y-16 max-w-4xl mx-auto">
                            {strain.sections?.map((section, index) => (
                                <section key={index} className="prose prose-invert prose-lg max-w-none">
                                    <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                        {section.title}
                                    </h2>
                                    <div className="text-slate-300 leading-8 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-primary">
                                        <ReactMarkdown>{section.content}</ReactMarkdown>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </article>
                ) : (
                    <div className="text-center py-20">
                        <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                        <h1 className="text-3xl font-bold text-white mb-4">{strain.name}</h1>
                        <p className="text-xl text-muted-foreground mb-8">{strain.descriptor}</p>
                        <div className="p-6 bg-yellow-900/20 border border-yellow-700/50 rounded-lg max-w-xl mx-auto">
                            <p className="text-yellow-200">
                                Detailed profile coming soon. This strain is part of our upcoming content expansion.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
