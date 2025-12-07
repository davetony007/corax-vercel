"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { coffeeshops } from "@/data/coffeeshops";

const Reviews = () => {
  // Get top-rated coffeeshops with detailed reviews
  const featuredReviews = coffeeshops
    .filter(shop => shop.detailedReview)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="py-20 bg-background" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Honest reviews of Amsterdam's best coffeeshops, from hidden gems to legendary spots
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredReviews.map((shop) => (
            <Card
              key={shop.id}
              className="group hover:shadow-glow transition-all duration-300 overflow-hidden bg-card border-border hover:border-primary cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-semibold">{shop.rating}</span>
                </div>
                {shop.menuImages && shop.menuImages.length > 0 && (
                  <div
                    className="absolute bottom-4 right-4 w-12 h-16 rounded-md overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform z-10 bg-black/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(shop.menuImages![0], '_blank');
                    }}
                    title="View Menu"
                  >
                    <img
                      src={shop.menuImages[0]}
                      alt="Menu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {shop.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {shop.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-muted-foreground text-sm">
                  {shop.detailedReview || shop.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {shop.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {shop.strainReviews && shop.strainReviews.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      {shop.strainReviews.length} strain review{shop.strainReviews.length > 1 ? 's' : ''} available
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
