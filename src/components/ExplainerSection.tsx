import { Card } from "@/components/ui/card";
import { Info, MapPin, Star, Leaf } from "lucide-react";

export default function ExplainerSection() {
    return (
        <div className="space-y-12">
            {/* Intro / Context */}
            <section className="bg-card border border-border rounded-xl p-8 shadow-glow">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-primary" />
                    How to Use This Map
                </h2>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">
                        Amsterdam has over 160 coffeeshops, but randomly walking into one is a gamble. Some are overpriced tourist traps, others are local-only spots with strict rules, and a few are hidden gems serving the world’s best cannabis.
                    </p>
                    <p className="mb-4">
                        This interactive map is your <strong>ultimate decision tool for 2026</strong>. Unlike generic maps that just show dots, we’ve qualified every single shop. We filter out the noise so you can find exactly what fits your vibe—whether that’s a safe, welcoming spot for your first time, or a connoisseur-grade dispensary with verified Cali genetics.
                    </p>
                    <p>
                        Use the filters above the map to instantly narrow down the city. Click any pin to see valid menus, verified reviews, and video walk-throughs.
                    </p>
                    <p className="mt-4 pt-4 border-t border-border/50">
                        <strong>New Tour Planner:</strong> Want to create your own journey? Click <strong>"Add to Tour"</strong> on any shop to build your custom itinerary. We'll draw a <span className="text-red-500 font-bold">Red Walking Route</span> connecting your stops, using the most efficient pedestrian paths (not car roads). Use the <strong>"My Tour"</strong> filter to hide everything else and follow your path!
                    </p>
                </div>
            </section>

            {/* Filter Descriptions */}
            <section className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-primary/20 bg-primary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Tourist Friendly
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Perfect for first-timers. These shops have patient staff who speak clear English, comfortable seating, and clear menus. They are accustomed to visitors and happy to answer questions without the "local attitude."
                    </p>
                </Card>

                <Card className="p-6 border-secondary/20 bg-secondary/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-secondary" />
                        Best Hash & Waterhash
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        For the connoisseurs. These spots specialize in extracts and traditional hasj. Expect to find Morocco's finest dry sift, filtered static tech, and proper solventless waterhash. Prices are higher, but the quality is world-class.
                    </p>
                </Card>

                <Card className="p-6 border-accent/20 bg-accent/5">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-accent" />
                        Best Edibles
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Stop gambling with weak grocery store muffins. These shops sell verified, potent edibles that actually work. We track shops with consistent dosing and fresh baked goods—from spacers to gourmet chocolates.
                    </p>
                </Card>

                <Card className="p-6 border-muted bg-muted/30">
                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <span className="text-lg">🏰</span>
                        Historic & Local Favorites
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Experience the authentic Dutch "gezellig" vibe. These are often older, established shops that locals love. They might not have the flashiest decor, but they offer great value, classic strains, and real Amsterdam history.
                    </p>
                </Card>
            </section>
        </div>
    );
}
