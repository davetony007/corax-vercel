"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Video, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: MapPin },
    { path: "/videos", label: "Videos", icon: Video },
    { path: "/insta", label: "Instagram", icon: Instagram },
    { path: "/support", label: "Support", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Corax
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`gap-2 ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="icon"
                    className={isActive ? "bg-primary text-primary-foreground" : ""}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
