import { Card } from "@/components/ui/card";
import aboutPhoto from "@/assets/about-photo-new.jpg";
import Image from "next/image";

const About = () => {
  return (
    <section className="py-20 bg-card" id="about">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
            <Image
              src={aboutPhoto}
              alt="Corax Dawai"
              className="relative rounded-2xl shadow-card w-full object-cover aspect-[4/5]"
              placeholder="blur"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About Corax
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Welcome to my corner of Amsterdam's vibrant cannabis culture. I'm Corax Dawai,
                your guide through the city's best coffeeshops, hidden gems, and the stories that
                make this scene unique.
              </p>
              <p>
                What started as a passion for exploring Amsterdam's coffeeshop culture on two wheels
                has evolved into a full-time journey of discovery. From reviewing the latest Cali drops
                to uncovering neighborhood favorites, I share honest experiences that help both locals
                and visitors navigate this incredible scene.
              </p>
              <p>
                Through my YouTube channel, Instagram, and live Twitch streams, I bring you along
                for the ride—literally. Whether it's a detailed strain review, a coffeeshop tour,
                or just cruising through Amsterdam's beautiful streets, my mission is simple:
                keep it real, keep it fun, and keep exploring.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <Card className="p-4 text-center bg-muted/50 border-border hover:border-primary transition-colors">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Shops Reviewed</div>
              </Card>
              <Card className="p-4 text-center bg-muted/50 border-border hover:border-primary transition-colors">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </Card>
              <Card className="p-4 text-center bg-muted/50 border-border hover:border-primary transition-colors">
                <div className="text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Community</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
