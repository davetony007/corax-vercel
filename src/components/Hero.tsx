"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Youtube, Instagram, Twitch, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-amsterdam.jpg";

const Hero = () => {
  const scrollToContent = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Amsterdam at night"
          fill
          priority
          className="object-cover scale-105 animate-slow-zoom"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center h-full pt-20">
        <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Amsterdam Coffeeshop
              <span className="block text-2xl md:text-5xl mt-4 text-primary">Reviews & Map (2026)</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-md max-w-2xl mx-auto">
              For chill 25+ travelers who want quality over chaos
            </p>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <p className="text-xl md:text-3xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Exploring the heart of Amsterdam's <span className="text-primary font-medium">Coffeeshop Culture</span>
          </p>

          <div className="flex items-center justify-center gap-3 text-sm md:text-base text-gray-300 font-medium tracking-wider uppercase">
            <span>Reviews</span>
            <span className="text-primary">•</span>
            <span>Travel</span>
            <span className="text-primary">•</span>
            <span>Lifestyle</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <a
              href="https://www.youtube.com/@Corax_Dawai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 h-14 px-8 text-lg bg-primary text-primary-foreground rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.6)]"
            >
              <Youtube className="w-6 h-6" />
              <span>Watch Now</span>
            </a>

            <a
              href="https://www.instagram.com/corax_amsterdam/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 h-14 px-8 text-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
