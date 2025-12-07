import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Youtube, Award, ThumbsUp, ExternalLink } from "lucide-react";
import { CoffeeshopData } from "@/data/coffeeshops";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

interface ShopDetailsProps {
    shop: CoffeeshopData;
}

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
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-none shadow-lg gap-1">
                                <Award className="w-3 h-3" /> Corax Approved
                            </Badge>
                        )}
                        {shop.recommended && !shop.coraxApproved && (
                            <Badge className="bg-green-500 hover:bg-green-600 text-white border-none shadow-lg gap-1">
                                <ThumbsUp className="w-3 h-3" /> Recommended
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{shop.name}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{shop.location}</span>
                    </div>
                    {shop.address && (
                        <div className="text-sm text-muted-foreground mb-3">
                            {shop.address}
                        </div>
                    )}
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < shop.rating
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-muted-foreground text-sm">
                    {shop.description}
                </p>

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

                {shop.detailedReview && (
                    <div className="pt-3 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-2">Corax's Review</h4>
                        <p className="text-muted-foreground text-sm">
                            {shop.detailedReview}
                        </p>
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
                        <h4 className="font-semibold text-foreground mb-3">Menu</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {shop.menuImages.map((img, idx) => (
                                <Dialog key={idx}>
                                    <DialogTrigger asChild>
                                        <div className="aspect-[3/4] overflow-hidden rounded-md border border-border cursor-pointer hover:opacity-90 transition-opacity">
                                            <img
                                                src={img}
                                                alt={`${shop.name} Menu ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-black/90 border-none">
                                        <DialogTitle className="sr-only">Menu {idx + 1}</DialogTitle>
                                        <div className="w-full h-full flex items-center justify-center p-4">
                                            <img
                                                src={img}
                                                alt={`${shop.name} Menu ${idx + 1}`}
                                                className="max-w-full max-h-[85vh] object-contain"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDetails;
