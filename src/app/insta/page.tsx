import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InstagramFeed from "@/components/InstagramFeed";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Daily Updates: Instagram Feed",
    description: "Daily cannabis culture updates from Amsterdam. Follow Corax for the latest menu drops, smoke spots, and community vibes. Stay connected with the real local scene.",
    alternates: {
        canonical: "https://budstuntman.pages.dev/insta",
    }
};

export default function Instagram() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-8">
                    Instagram Feed
                </h1>
            </div>

            <InstagramFeed />

            <Footer />
        </div>
    );
}
