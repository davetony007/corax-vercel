import Link from "next/link";
import { Youtube, Instagram, Twitch, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Corax Dawai</h3>
            <p className="text-muted-foreground">
              Exploring Amsterdam's coffeeshop culture, one review at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 font-medium italic">
              Plan your Amsterdam coffeeshop trip in one place.
            </p>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                  Explore Map
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/insta" className="text-muted-foreground hover:text-primary transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@Corax_Dawai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-muted hover:bg-primary hover:shadow-glow flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
                <span className="font-medium text-muted-foreground group-hover:text-primary-foreground">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/corax_amsterdam/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-muted hover:bg-primary hover:shadow-glow flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
                <span className="font-medium text-muted-foreground group-hover:text-primary-foreground">Instagram</span>
              </a>
              <a
                href="https://www.twitch.tv/corax_dawai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-muted hover:bg-secondary hover:shadow-glow flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <Twitch className="w-5 h-5 text-muted-foreground group-hover:text-secondary-foreground" />
                <span className="font-medium text-muted-foreground group-hover:text-secondary-foreground">Twitch</span>
              </a>
              <Link
                href="/support"
                className="px-4 py-2 rounded-full bg-muted hover:bg-accent hover:shadow-glow flex items-center justify-center gap-2 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-accent-foreground" />
                <span className="font-medium text-muted-foreground group-hover:text-accent-foreground">Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {currentYear} Corax Dawai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
