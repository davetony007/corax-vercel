import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Youtube, Award, ThumbsUp, ExternalLink } from "lucide-react";
import { CoffeeshopData } from "@/data/coffeeshops";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

interface ShopDetailsProps {
    shop: CoffeeshopData;
}

const formatDate = (url: string) => {
    const match = url.match(/(\d{2})-(\d{2})-(\d{2})\.\w+$/);
    if (!match) return null;
    const [_, day, month, year] = match;
    const date = new Date(`20${year}-${month}-${day}`);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const ShopDetails = ({ shop }: ShopDetailsProps) => {
    return (
        <div className="h-full bg-card">
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={shop.image}
                    alt={`${shop.name} Coffeeshop Amsterdam`}
                    className="w-full h-full object-cover"
                />
                {(shop.coraxApproved || shop.recommended) && (
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {shop.coraxApproved && (
                            <Badge className="bg-primary text-primary-foreground border-primary flex items-center gap-1 shadow-lg backdrop-blur-sm">
                                <Award className="w-3 h-3 fill-current" />
                                Corax Approved
                            </Badge>
                        )}
                        {shop.recommended && (
                            <Badge variant="secondary" className="bg-background/90 text-foreground flex items-center gap-1 shadow-lg backdrop-blur-sm">
                                <ThumbsUp className="w-3 h-3" />
                                Recommended
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-xl text-foreground mb-1">{shop.name}</h3>
                        <div className="flex items-center text-muted-foreground text-sm">
                            <MapPin className="w-3 h-3 mr-1" />
                            {shop.address}
                        </div>
                    </div>
                    {shop.rating > 0 && (
                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-bold text-primary">{shop.rating}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${shop.coordinates[0]},${shop.coordinates[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-md text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        <MapPin className="w-4 h-4" />
                        Directions
                    </a>
                    <a
                        href={`https://www.coffeeshopmenus.org/${shop.name.replace(/\s+/g, '')}/Menus/${shop.name.replace(/\s+/g, '')}.html`} // Crude approximation, actual linking might need the map url logic
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 h-9 rounded-md text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        More Info
                    </a>
                </div>

                {shop.description && (
                    <div className="prose prose-sm dark:prose-invert">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {shop.description}
                        </p>
                    </div>
                )}

                {shop.detailedReview && (
                    <div className="bg-muted/50 p-3 rounded-md border border-border">
                        <h4 className="font-semibold text-foreground text-sm mb-1">Our Take</h4>
                        <p className="text-muted-foreground text-sm">
                            {shop.detailedReview}
                        </p>
                    </div>
                )}

                {/* Transcript Reviews Section */}
                {shop.reviews && shop.reviews.length > 0 && (
                    <div className="pt-3 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Award className="w-4 h-4 text-primary" />
                            Strain Reviews
                        </h4>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {shop.reviews.map((review, idx) => (
                                <div key={idx} className="bg-muted/30 p-3 rounded-md space-y-2 border border-border/50">
                                    <div className="flex items-start justify-between gap-2">
                                        <h5 className="font-medium text-foreground text-sm">{review.strain}</h5>
                                        {review.videoId && (
                                            <a
                                                href={`https://www.youtube.com/watch?v=${review.videoId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs flex items-center gap-1 text-primary hover:underline"
                                            >
                                                <Youtube className="w-3 h-3" />
                                                Watch
                                            </a>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-xs leading-relaxed italic">
                                        "{review.approval}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {shop.strainReviews && shop.strainReviews.length > 0 && (
                    <div className="pt-3 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-3">Strain Reviews</h4>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {shop.strainReviews.map((strain, idx) => (
                                <div key={idx} className="bg-muted/30 p-3 rounded-md space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h5 className="font-medium text-foreground text-sm">{strain.name}</h5>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {strain.price && (
                                                <Badge variant="outline" className="text-xs">{strain.price}</Badge>
                                            )}
                                            {strain.rating && (
                                                <Badge variant="secondary" className="text-xs">★ {strain.rating}</Badge>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-xs leading-relaxed">
                                        {strain.notes}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    {shop.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {(shop.videoIds.length > 0 || shop.shortIds.length > 0) && (
                    <div className="space-y-2 pt-3 border-t border-border">
                        <div className="flex items-center gap-2 mb-2">
                            <Youtube className="w-5 h-5 text-primary" />
                            <span className="font-semibold">Featured Content</span>
                        </div>

                        {shop.videoIds.length > 0 && (
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                    {shop.videoIds.length} video review{shop.videoIds.length > 1 ? 's' : ''}
                                </p>
                                <a
                                    href={`https://www.youtube.com/watch?v=${shop.videoIds[0]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full h-9 rounded-md px-3 text-sm bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 font-semibold transition-all duration-300"
                                >
                                    <Youtube className="w-4 h-4" />
                                    Watch Latest Review
                                </a>
                            </div>
                        )}

                        {shop.shortIds.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                +{shop.shortIds.length} short{shop.shortIds.length > 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                )}

                {shop.menuImages && shop.menuImages.length > 0 && (
                    <div className="pt-3 border-t border-border">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-foreground">Menu</h4>
                            <span className="text-xs text-muted-foreground">
                                {shop.menuImages.length > 1 ? 'Comparing latest vs previous' : 'Latest menu'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {shop.menuImages.map((img, idx) => {
                                const dateStr = formatDate(img);
                                return (
                                    <Dialog key={idx}>
                                        <DialogTrigger asChild>
                                            <div className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border cursor-pointer hover:shadow-glow transition-all duration-300">
                                                {/* Badge Overlay */}
                                                <div className="absolute top-2 left-2 z-10">
                                                    {idx === 0 ? (
                                                        <Badge className="bg-primary text-primary-foreground hover:bg-primary font-bold shadow-sm">
                                                            Latest {dateStr && `(${dateStr})`}
                                                        </Badge>
                                                    ) : idx === 1 ? (
                                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground font-medium shadow-sm border border-border/50">
                                                            Previous {dateStr && `(${dateStr})`}
                                                        </Badge>
                                                    ) : null}
                                                </div>

                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                                                <img
                                                    src={img}
                                                    alt={`${shop.name} Menu ${idx === 0 ? '(Latest)' : '(Previous)'}`}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-black/95 border-border/20">
                                            <DialogTitle className="sr-only">
                                                {shop.name} Menu {idx === 0 ? '(Latest)' : '(Previous)'}
                                            </DialogTitle>
                                            <div className="w-full h-full flex items-center justify-center p-4 relative">
                                                <div className="absolute top-4 left-4 z-50">
                                                    {idx === 0 ? (
                                                        <Badge className="bg-primary text-primary-foreground text-lg px-4 py-1">
                                                            Latest Menu {dateStr && `(${dateStr})`}
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="text-lg px-4 py-1">
                                                            Previous Menu {dateStr && `(${dateStr})`}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <img
                                                    src={img}
                                                    alt={`${shop.name} Menu ${idx + 1}`}
                                                    className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDetails;
