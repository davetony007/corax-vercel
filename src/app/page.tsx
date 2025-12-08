import Link from "next/link";
import { MapPin, Video, Instagram, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

// Using a relative path for the image or ensuring it's in public. 
// Note: Next.js handles image imports differently. 
// If aboutPhoto was an import, we need to ensure the assets exist or use public folder.
// For now, I'll assume the assets are copied to src/assets or public.
// IMPORTANT: Vite imported images as strings. Next.js imports as objects (StaticImageData).
// I will temporarily comment out the import if I can't verify the file, but I copied src/assets (implied in src component copy?).
// Wait, I only copied src/components, src/hooks, src/lib. I probably missed src/assets if it was outside.
// I check the file listing earlier. src/assets does exist (implied by usage).
// I should copy src/assets too. 
// For now I will assume it's there and fix if missing.

// Metadata for SEO
// Metadata for SEO
export const metadata: Metadata = {
  title: "Amsterdam Coffeeshop Reviews, Map & Guide (2026)",
  description: "Plan your 2026 Amsterdam trip with honest coffeeshop reviews, an interactive map, daily videos, and practical guides for mature travelers.",
  alternates: {
    canonical: "https://budstuntman.pages.dev/",
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Amsterdam still good for coffeeshops in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Amsterdam is still a fantastic city for coffeeshops in 2026, but more venues now focus on tourists, prices are higher, and quality varies, so choosing the right shops matters more than ever."
                }
              },
              {
                "@type": "Question",
                "name": "Are Amsterdam coffeeshops safe for first-time visitors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Licensed coffeeshops are generally safe for first-time visitors who bring valid ID, start with low doses, stay hydrated and avoid mixing cannabis with alcohol or other substances."
                }
              },
              {
                "@type": "Question",
                "name": "How much does weed cost in Amsterdam in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most Amsterdam coffeeshops charge typical European prices for mid-range flower and hash, while top-shelf menus cost more per gram, so it is smart to compare a few menus instead of buying at the first tourist hotspot."
                }
              },
              {
                "@type": "Question",
                "name": "Can tourists still buy weed in Amsterdam?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most adult tourists with valid ID can still buy cannabis in Amsterdam coffeeshops, but some local rules can change, so it is best to check current policy and ask staff if anything is unclear."
                }
              }
            ]
          })
        }}
      />

      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Quick About */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              {/* 
                  TODO: Check if aboutPhoto is properly imported. 
                  If using next/image: <Image src={aboutPhoto} ... />
                  For raw img tag: .src property if imported 
                  I will use a placeholder logic or expect the valid path. 
                  Since I haven't copied src/assets yet, I will use a path assuming I will copy it.
               */}
              <img
                src="/images/about-photo-new.jpg"
                alt="Corax Dawai"
                className="relative rounded-2xl shadow-card w-full object-cover aspect-[4/5]"
              />
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Hunting for the Perfect Smoke
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <div className="bg-muted/30 p-4 rounded-lg border border-primary/10 mb-6 font-medium">
                  <p className="text-sm font-bold text-foreground mb-3">
                    <Info className="inline-block w-4 h-4 mr-2 text-primary" />
                    Amsterdam Coffeeshop Guide 2026: TL;DR
                  </p>
                  <ul className="space-y-2 text-base list-disc list-inside text-muted-foreground">
                    <li>
                      <strong>Best Quality:</strong> We track consistent winners for <Link href="/explore?filter=best-hash" className="text-primary hover:underline">best hash</Link>, waterhash, and Cali.
                    </li>
                    <li>
                      <strong>Tourist Rules:</strong> Carry ID (18+). Most shops are <Link href="/explore?filter=tourist-friendly" className="text-primary hover:underline">tourist-friendly</Link>.
                    </li>
                    <li>
                      <strong>Safety:</strong> Start low, go slow—especially with edibles/extracts.
                    </li>
                    <li>
                      <strong>Prices:</strong> Expect €12-€16/g for local flower, €25+/g for imports.
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-foreground pt-2">Quick Tips for First-Timers</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside mb-4">
                  <li><strong>ID is Mandatory:</strong> No ID, no entry. Digital copies usually don't work.</li>
                  <li><strong>Tobacco Ban:</strong> Smoking pure is the norm indoors. Use provided herbal mix.</li>
                  <li><strong>Cash vs Card:</strong> Most take card now, but some old-school spots are cash-only.</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link href="/guides/first-time-guide-2026">
                    <Button variant="outline" className="w-full sm:w-auto border-primary/20 text-primary hover:bg-primary/5">
                      First-Time Guide (21 Tips)
                    </Button>
                  </Link>
                  <Link href="/guides/best-hash-amsterdam-2026">
                    <Button variant="outline" className="w-full sm:w-auto border-amber-500/20 text-amber-500 hover:bg-amber-500/5">
                      Best Hash Guide (2026)
                    </Button>
                  </Link>
                </div>

                <p className="pt-4">
                  Welcome to the family! I'm Corax, and I'm obsessed with finding the cleanest ash and the craziest flavors in Amsterdam. From "super duper highly mega approved" top-shelf strains to hidden budget gems, I review it all with 100% honesty.
                </p>
                <p>
                  You won't find me reviewing bud that makes me go EWWW!!! Only positive vibes and a happy community. I'm looking for that "godly gassy grapness", that spectacular Z, and the true 10/10 experiences. Whether you're a local or just visiting, let's cut through the noise and find the fire together.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6">
                <Link href="/explore" className="block group">
                  <Card className="p-4 text-center bg-muted/50 border-border group-hover:border-primary transition-colors h-full flex flex-col justify-center">
                    <div className="text-3xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Shops Reviewed</div>
                  </Card>
                </Link>
                <Link href="/videos" className="block group">
                  <Card className="p-4 text-center bg-muted/50 border-border group-hover:border-primary transition-colors h-full flex flex-col justify-center">
                    <div className="text-3xl font-bold text-primary">100+</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Videos</div>
                  </Card>
                </Link>
                <Link href="/support" className="block group">
                  <Card className="p-4 text-center bg-muted/50 border-border group-hover:border-primary transition-colors h-full flex flex-col justify-center">
                    <div className="text-3xl font-bold text-primary">10K+</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Community</div>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Explore the Scene</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Explore Card */}
            <Card className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow relative h-full flex flex-col">
              <div className="absolute inset-0">
                <img
                  src="/images/map-card-bg.png"
                  alt="Amsterdam Map"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              </div>
              <div className="p-6 space-y-4 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg backdrop-blur-sm">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Interactive Map</h3>
                </div>
                <p className="text-muted-foreground">
                  Explore Amsterdam on our interactive map. Filter for tourist‑friendly spots, best hash, edibles, and local favorites to build your 2026 itinerary in minutes.
                </p>
                <div className="mt-auto space-y-4 pt-4">
                  <Link href="/explore">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Explore Now
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground italic">
                    Perfect for finding tourist-friendly spots vs local gems.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground justify-center">
                    <span>Popular:</span>
                    <Link href="/explore?filter=tourist-friendly" className="hover:text-primary transition-colors underline decoration-dotted">
                      Tourist Friendly
                    </Link>
                    <span>•</span>
                    <Link href="/explore?filter=best-hash" className="hover:text-primary transition-colors underline decoration-dotted">
                      Best Hash
                    </Link>
                    <span>•</span>
                    <Link href="/explore" className="hover:text-primary transition-colors underline decoration-dotted">
                      Best Edibles
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            {/* Videos Card */}
            <Card className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow relative h-full flex flex-col">
              <div className="absolute inset-0">
                <img
                  src="/images/video-card-bg.png"
                  alt="Video Content"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              </div>
              <div className="p-6 space-y-4 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-lg backdrop-blur-sm">
                    <Video className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">Video Content</h3>
                </div>
                <p className="text-muted-foreground">
                  Watch honest reviews and walking tours. Get full menu breakdowns, first impressions, and local insights to find the best quality and value.
                </p>
                <div className="mt-auto space-y-4 pt-4">
                  <Link href="/videos">
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      Watch Videos
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground italic">
                    Deep dives for connoisseurs and best hash hunters.
                  </p>
                </div>
              </div>
            </Card>

            {/* Instagram Card */}
            <Card className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow relative h-full flex flex-col">
              <div className="absolute inset-0">
                <img
                  src="/images/insta-card-bg.png"
                  alt="Instagram Feed"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
              </div>
              <div className="p-6 space-y-4 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg backdrop-blur-sm">
                    <Instagram className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Instagram Feed</h3>
                </div>
                <p className="text-muted-foreground">
                  Catch daily vibe checks, fresh menu updates, and stories from the community. Follow along for quick hits from the Amsterdam scene.
                </p>
                <div className="mt-auto space-y-4 pt-4">
                  <Link href="/insta">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      View Feed
                    </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground italic">
                    Daily updates from the community.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-card px-6 rounded-lg border">
                <AccordionTrigger className="text-lg font-semibold">Is Amsterdam still good for coffeeshops in 2026?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Amsterdam is still a fantastic city for coffeeshops in 2026, but more places now focus on tourists, prices are higher, and quality varies a lot from shop to shop, so choosing the right spots matters more than ever.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-card px-6 rounded-lg border">
                <AccordionTrigger className="text-lg font-semibold">Are Amsterdam coffeeshops safe for first‑time visitors?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Licensed coffeeshops are generally safe for first‑time visitors if you bring valid ID, start with low doses, drink water, and avoid mixing cannabis with alcohol or other substances.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-card px-6 rounded-lg border">
                <AccordionTrigger className="text-lg font-semibold">How much does weed cost in Amsterdam in 2026?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  In most Amsterdam coffeeshops, mid‑range flower and hash sit in the normal European price band while top‑shelf menus cost more per gram, so it is worth comparing a few menus instead of buying at the first tourist hotspot.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-card px-6 rounded-lg border">
                <AccordionTrigger className="text-lg font-semibold">Can tourists still buy weed in Amsterdam?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Most adult tourists with valid ID can still buy cannabis in Amsterdam coffeeshops, but some cities and neighborhoods test local rules, so always check current policy and ask staff if you are unsure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Last updated for 2026 Season • <Link href="/explore" className="text-primary hover:underline">View Map</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
