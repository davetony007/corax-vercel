import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import guides from "@/data/guides.json";

interface Guide {
    id: string;
    slug: string;
    title: string;
    metaDescription: string;
    h1: string;
    intro: string;
    author: string;
    datePublished: string;
    sections: { title: string; content: string }[];
    sidebarStats: { label: string; value: string }[];
}

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);
    if (!guide) return { title: "Guide Not Found" };

    return {
        title: guide.title,
        description: guide.metaDescription,
        alternates: {
            canonical: `https://budstuntman.pages.dev/guides/${guide.slug}`,
        },
        openGraph: {
            title: guide.title,
            description: guide.metaDescription,
            type: "article",
            url: `https://budstuntman.pages.dev/guides/${guide.slug}`,
            images: ["/og-image.png"],
        },
    };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: guide.title,
                        image: ["https://budstuntman.pages.dev/og-image.png"],
                        author: {
                            "@type": "Person",
                            name: guide.author || "Corax Dawai",
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
                        datePublished: guide.datePublished || "2025-01-01",
                        dateModified: new Date().toISOString().split("T")[0],
                        description: guide.metaDescription,
                    }),
                }}
            />
            <Navigation />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Guides
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-12 text-center space-y-4">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        Amsterdam Guide 2026
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                        {guide.h1}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {guide.intro}
                    </p>
                </div>

                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    {/* Main Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none space-y-12">

                        {guide.sections.map((section, idx) => (
                            <section key={idx}>
                                {section.title && (
                                    <h2 className="text-3xl font-bold flex items-center gap-2">
                                        <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-lg">
                                            {idx + 1}
                                        </span>
                                        {section.title}
                                    </h2>
                                )}
                                <div className="mt-4 text-muted-foreground">
                                    <ReactMarkdown
                                        components={{
                                            h4: ({ node, ...props }) => <h4 className="text-xl font-bold text-[#39ff14] mt-8 mb-3" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold text-green-400" {...props} />
                                        }}
                                    >
                                        {section.content}
                                    </ReactMarkdown>
                                </div>
                            </section>
                        ))}

                        {/* Call to Action */}
                        <div className="bg-muted/30 p-8 rounded-2xl text-center space-y-6">
                            <h3 className="text-2xl font-bold">Ready to Explore?</h3>
                            <p className="text-muted-foreground">
                                Check out the map to find the best spots mentioned in this guide.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/explore">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        Open Map
                                    </Button>
                                </Link>
                                <Link href="/videos">
                                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                        Watch Reviews
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <Card className="p-6 bg-card sticky top-24">
                            <h3 className="font-bold text-xl mb-4">Quick Stats</h3>
                            <ul className="space-y-3 text-sm">
                                {guide.sidebarStats && guide.sidebarStats.map((stat, idx) => (
                                    <li key={idx} className="flex justify-between border-b pb-2">
                                        <span>{stat.label}</span>
                                        <span className="font-mono text-primary">{stat.value}</span>
                                    </li>
                                ))}
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
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
