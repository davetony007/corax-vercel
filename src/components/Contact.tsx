"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
  };

  return (
    <section className="py-20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got a coffeeshop suggestion? Business inquiry? Let's connect!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Send a Message
              </CardTitle>
              <CardDescription>
                Fill out the form and I'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="space-y-6">
            <Card className="bg-card border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>Business Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interested in collaborations, sponsorships, or partnerships?
                  Let's discuss how we can work together to bring value to the community.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>Coffeeshop Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Know a hidden gem or new spot I should check out? Share your
                  recommendations and help shape future reviews!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle>Media Kit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Need my brand assets, stats, or press information?
                </p>
                <Button variant="outline" className="w-full">
                  Download Media Kit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
