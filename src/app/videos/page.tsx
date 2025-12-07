import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import VideoGallery from "@/components/VideoGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Amsterdam Coffeeshop Reviews & Videos – Best Smoking Spots & Tours (2026)",
    description: "Watch in‑depth Amsterdam coffeeshop review videos, walking tours and shorts covering the best smoking spots, hash, edibles and neighborhoods to visit in 2026.",
    alternates: {
        canonical: "https://corax-amsterdam-explorer-main.pages.dev/videos",
    }
};

export default function Videos() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Amsterdam Coffeeshop Reviews & Videos
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Browse long‑form reviews, walking tours and shorts that show real Amsterdam coffeeshop experiences, including first impressions, menus, neighborhood context and honest thoughts about value, quality and vibe.
                    </p>
                </div>
            </div>

            <VideoGallery />

            <Footer />
        </div>
    );
}
