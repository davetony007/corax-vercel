"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink, MapPin } from "lucide-react";
import { videos } from "@/data/videos";
import { shorts } from "@/data/shorts";
import { getCoffeeshopsForVideo } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { instagramPosts } from "@/data/instagram";
import { Instagram } from "lucide-react";

const VideoGallery = () => {
  const [visibleInstaCount, setVisibleInstaCount] = useState(9);
  const [visibleVideoCount, setVisibleVideoCount] = useState(6);
  const [visibleShortsCount, setVisibleShortsCount] = useState(12);

  const handleLoadMoreVideos = () => {
    setVisibleVideoCount((prev) => Math.min(prev + 6, videos.length));
  };

  const handleLoadMoreShorts = () => {
    setVisibleShortsCount((prev) => Math.min(prev + 12, shorts.length));
  };

  const handleLoadMoreInsta = () => {
    setVisibleInstaCount((prev) => Math.min(prev + 9, instagramPosts.length));
  };

  return (
    <section className="py-20 bg-card" id="videos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Content
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join me on my latest adventures exploring Amsterdam's cannabis scene
          </p>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mx-auto mb-12">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="shorts">Shorts</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-12">
            {/* Featured Video - Latest Upload */}
            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden shadow-glow bg-card border-border">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videos[0].videoId}`}
                    title={videos[0].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {videos[0].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {videos[0].description}
                  </p>
                </div>
              </Card>
            </div>

            {/* Latest Videos Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {videos.slice(0, visibleVideoCount).map((video) => {
                const linkedShops = getCoffeeshopsForVideo(video.videoId);

                return (
                  <Card key={video.id} className="group flex flex-col bg-card border-border hover:border-primary overflow-hidden transition-all duration-300 hover:shadow-glow">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-video overflow-hidden"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                        Watch
                      </div>
                    </a>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {video.title}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {video.description}
                      </p>

                      {linkedShops.length > 0 && (
                        <div className="mt-auto pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground mb-2 font-medium">Featured Shops:</p>
                          <div className="flex flex-wrap gap-2">
                            {linkedShops.map(shop => (
                              <span
                                key={shop.id}
                                className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/20 text-secondary-foreground text-xs hover:bg-secondary/30 transition-colors cursor-default"
                              >
                                <MapPin className="w-3 h-3 mr-1" />
                                {shop.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Load More Videos Button */}
            {visibleVideoCount < videos.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleLoadMoreVideos}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  Load More Videos
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="shorts">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {shorts.slice(0, visibleShortsCount).map((short) => (
                <a
                  key={short.id}
                  href={`https://www.youtube.com/shorts/${short.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="group cursor-pointer hover:shadow-glow transition-all duration-300 bg-card border-border hover:border-primary overflow-hidden">
                    <div className="aspect-[9/16] overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${short.videoId}/maxresdefault.jpg`}
                        alt={short.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${short.videoId}/hqdefault.jpg`;
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {short.title}
                      </h4>
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            {/* Load More Shorts Button */}
            {visibleShortsCount < shorts.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleLoadMoreShorts}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  Load More Shorts
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="instagram">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {instagramPosts.slice(0, visibleInstaCount).map((post, index) => (
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
            {visibleInstaCount < instagramPosts.length && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={handleLoadMoreInsta}
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] hover:bg-primary/10 hover:text-primary hover:border-primary transition-all duration-300"
                >
                  Load More
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@Corax_Dawai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base border border-primary/30 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
          >
            <Youtube className="w-5 h-5" />
            View All Videos
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
