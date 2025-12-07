import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Twitch } from "lucide-react";

const Support = () => {
  return (
    <section className="py-20 bg-card" id="support">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Support?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Support keeps reviews independent, pays for trips, editing and hosting, and makes it possible to publish honest guides without paid placements from coffeeshops or brands.
          </p>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ways to Support
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Ko-Fi */}
          <Card className="bg-card border-border hover:border-accent hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-accent" />
              </div>
              <CardTitle>Support on Ko-Fi</CardTitle>
              <CardDescription>One-time support</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                One-time support to keep the caffeine and content flowing. Every bit helps fuel the next review trip!
              </p>
              <a
                href="https://ko-fi.com/corax_dawai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Coffee className="w-5 h-5" />
                Support
              </a>
            </CardContent>
          </Card>

          {/* Twitch Subscribe */}
          <Card className="bg-card border-secondary hover:border-secondary hover:shadow-card transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Twitch className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle>Twitch Subscribe</CardTitle>
              <CardDescription>Monthly support</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Subscribe on Twitch for emotes, ad-free viewing, and to support the live streams directly.
              </p>
              <a
                href="https://www.twitch.tv/corax_dawai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 rounded-lg px-8 text-base w-full border border-primary/30 bg-transparent text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                <Twitch className="w-5 h-5" />
                Subscribe
              </a>
            </CardContent>
          </Card>

          {/* Patreon */}
          <Card className="bg-card border-primary hover:border-primary hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Become a Patron</CardTitle>
              <CardDescription>Exclusive perks</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Join the inner circle for early access, voting rights on reviews, and exclusive behind-the-scenes content.
              </p>
              <a
                href="https://www.patreon.com/cw/CoraX_Dawai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:shadow-[0_0_30px_rgba(255,107,0,0.6)]"
              >
                <Heart className="w-5 h-5" />
                Join Patreon
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Support;
