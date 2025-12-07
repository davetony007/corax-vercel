import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Support from "@/components/Support";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Support Corax Dawai – Independent Amsterdam Coffeeshop Journalism & Guides",
    description: "Support independent Amsterdam coffeeshop journalism, videos and guides by backing Corax Dawai via Patreon, Ko‑Fi or Twitch and help keep reviews honest and ad‑free.",
    alternates: {
        canonical: "https://corax-amsterdam-explorer-main.pages.dev/support",
    }
};

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 py-8">
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                        Support independent cannabis journalism
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Help keep the reviews honest, independent, and ad-free by supporting the journey on Patreon, Ko-Fi, or Twitch.
                    </p>
                </div>
            </div>

            <Support />
            <Contact />

            <Footer />
        </div>
    );
}
