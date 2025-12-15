import Link from "next/link";
import { coffeeshops } from "@/data/coffeeshops";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

export default function ShopList() {
    // Sort shops to show "Corax Approved" or "Recommended" first for the list
    const sortedShops = [...coffeeshops].sort((a, b) => {
        if (a.coraxApproved && !b.coraxApproved) return -1;
        if (!a.coraxApproved && b.coraxApproved) return 1;
        return 0;
    });

    return (
        <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">Detailed Coffeeshop Directory</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedShops.map((shop) => (
                    <Card key={shop.id} className="flex flex-col h-full bg-card border-border hover:border-primary/50 transition-colors group">
                        <div className="p-6 flex-1 space-y-4">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                    {shop.name}
                                </h3>
                                {shop.coraxApproved && (
                                    <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap text-[10px]">
                                        Approved
                                    </Badge>
                                )}
                            </div>

                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{shop.address}, {shop.location}</span>
                            </div>

                            {shop.description && (
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {shop.description}
                                </p>
                            )}

                            {/* Render a snippet of a review if available for SEO content */}
                            {shop.reviews && shop.reviews.length > 0 && (
                                <div className="bg-muted/30 p-3 rounded-md text-xs italic text-muted-foreground border border-border/50">
                                    <span className="font-semibold not-italic block mb-1">Recent Review:</span>
                                    "{shop.reviews[0].strain}: {shop.reviews[0].score}"
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2">
                                {shop.tags.slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}
