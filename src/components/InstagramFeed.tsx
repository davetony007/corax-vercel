"use client";

import { Instagram, ExternalLink } from "lucide-react";
import { instagramPosts } from "@/data/instagram";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const InstagramFeed = () => {
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 9, instagramPosts.length));
  };

  return (
    <section className="py-20 bg-background" id="instagram">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Follow the Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Daily updates, behind-the-scenes content, and community highlights on Instagram
          </p>
          <a
            href="https://www.instagram.com/corax_amsterdam/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base bg-gradient-primary text-primary-foreground hover:shadow-glow hover:scale-105 font-semibold transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            Follow @corax_amsterdam
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {instagramPosts.slice(0, visibleCount).map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/5] w-full bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg block"
            >
              {post.image ? (
                <>
                  <img
                    src={post.image}
                    alt={post.caption || "Instagram post"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <Instagram className="w-8 h-8 text-white mb-2" />
                    {post.caption && (
                      <p className="text-white font-medium text-sm line-clamp-3 mb-2">
                        {post.caption}
                      </p>
                    )}
                    <span className="text-primary text-sm font-semibold">View on Instagram</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-card to-muted text-center group-hover:bg-muted/80 transition-colors relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Instagram className="w-8 h-8 text-primary" />
                  </div>
                  {post.caption && (
                    <p className="text-foreground font-medium text-sm line-clamp-2 mb-2 px-2">
                      {post.caption}
                    </p>
                  )}
                  <p className="text-muted-foreground text-xs mb-2">View Post</p>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < instagramPosts.length && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="lg"
              className="min-w-[200px] hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
            >
              Load More
            </Button>
          </div>
        )}

        {/* Stories Highlight */}
        <div className="max-w-5xl mx-auto mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Story Highlights</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {['Behind the Scenes', 'Coffeeshop Tours', 'Strain Reviews', 'Fan Meets'].map((highlight) => (
              <a
                key={highlight}
                href="https://www.instagram.com/stories/corax_amsterdam/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-10 rounded-full px-6 text-sm border border-primary/30 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                {highlight}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
