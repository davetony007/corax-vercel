/* eslint-disable */
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { coffeeshops, filterTags, CoffeeshopData } from "@/data/coffeeshops";
import ShopDetails from "@/components/ShopDetails";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useSearchParams, useRouter } from "next/navigation";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const previousFilterRef = useRef<string>("All");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Normalize URL param to match tag format
  const normalizeFilter = useMemo(() => (param: string | null) => {
    if (!param) return "All";
    if (param === "tourist-friendly") return "Tourist Friendly";
    if (param === "best-hash") return "Best Hash";
    if (param === "best-edibles") return "Best Edibles";
    if (param === "local-favorites") return "Local Favorite";
    return "All";
  }, []);

  const [activeFilter, setActiveFilter] = useState(normalizeFilter(searchParams.get("filter")));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState<CoffeeshopData | null>(null);

  // Sync state if URL changes
  useEffect(() => {
    const newFilter = normalizeFilter(searchParams.get("filter"));
    if (newFilter !== activeFilter) {
      setActiveFilter(newFilter);
    }
  }, [searchParams, normalizeFilter, activeFilter]);

  // Update URL when filter changes (optional, but good for deep linking from UI clicks)
  const handleFilterChange = (newFilter: string) => {
    setActiveFilter(newFilter);
    // Update URL without full reload
    const params = new URLSearchParams(searchParams.toString());

    // Reverse mapping for URL
    let urlValue = newFilter;
    if (newFilter === "Tourist Friendly") urlValue = "tourist-friendly";
    else if (newFilter === "Best Hash") urlValue = "best-hash";
    else if (newFilter === "Best Edibles") urlValue = "best-edibles";
    else if (newFilter === "Local Favorite") urlValue = "local-favorites";

    if (newFilter === "All") {
      params.delete("filter");
    } else {
      params.set("filter", urlValue);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filteredShops = useMemo(() => {
    return coffeeshops.filter(shop => {
      // 1. Text Search Filter
      if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
        return false;
      }

      // 2. Tag/Category Filter
      if (activeFilter === "All") return true;
      if (activeFilter === "Amsterdam Only") return shop.location === "Amsterdam";
      if (activeFilter === "Has Menu") return shop.menuImages && shop.menuImages.length > 0;
      if (activeFilter === "Has Review") return shop.detailedReview || shop.videoIds.length > 0;
      return shop.tags.includes(activeFilter);
    });
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Amsterdam
    map.current = L.map(mapContainer.current).setView([52.3676, 4.9041], 13);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Create custom icon
    // Add markers for filtered shops
    filteredShops.forEach((shop) => {
      const isApproved = shop.coraxApproved;
      // Green for standard, Blue for Corax Approved
      const markerColor = isApproved ? "hsl(217 91% 60%)" : "hsl(142 76% 36%)";

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: ${markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker(shop.coordinates, { icon: customIcon })
        .addTo(map.current!)
        .on("click", () => {
          // Don't zoom when clicking a marker - just select the shop
          setSelectedShop(shop);
        });

      markers.current.push(marker);
    });

    // Only fit bounds when the filter actually changes, not when clicking markers
    const filterChanged = previousFilterRef.current !== activeFilter;
    if (filterChanged && filteredShops.length > 0) {
      const bounds = L.latLngBounds(filteredShops.map(shop => shop.coordinates));
      map.current.fitBounds(bounds, { padding: [50, 50] });
      previousFilterRef.current = activeFilter;
    }

  }, [filteredShops, activeFilter]);

  const [desktopView, setDesktopView] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="py-20 bg-background" id="map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interactive Coffeeshop Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore reviewed coffeeshops across Amsterdam - click markers to see details
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="w-full md:w-auto relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Search coffeeshops..."
              className="pl-9 w-full md:w-64 bg-card border-border focus:ring-1 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggle (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2 bg-card border border-border p-1 rounded-lg">
            <Button
              variant={desktopView ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDesktopView(true)}
              className="text-xs"
            >
              Split View
            </Button>
            <Button
              variant={!desktopView ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDesktopView(false)}
              className="text-xs"
            >
              Full Map
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;

                    // Add user marker
                    if (map.current) {
                      L.marker([latitude, longitude], {
                        icon: L.divIcon({
                          className: "user-marker",
                          html: `<div style="background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>`,
                          iconSize: [20, 20],
                        })
                      }).addTo(map.current).bindPopup("You are here").openPopup();

                      map.current.setView([latitude, longitude], 15);
                    }

                    // Sort shops by distance (simple implementation)
                    // In a real app, we might want to update the filteredShops state
                    // For now, we just center the map
                  }, (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please enable location services.");
                  });
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
              className="gap-2 h-9 text-sm bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
            >
              <span className="text-base">📍</span> Find Near Me
            </Button>

            <Button
              variant={activeFilter === "Amsterdam Only" ? "default" : "outline"}
              onClick={() => handleFilterChange(activeFilter === "Amsterdam Only" ? "All" : "Amsterdam Only")}
              className="gap-2 h-9 text-sm"
            >
              <span className="text-base">🏙️</span> Amsterdam Only
            </Button>
            <Button
              variant={activeFilter === "Has Menu" ? "default" : "outline"}
              onClick={() => handleFilterChange(activeFilter === "Has Menu" ? "All" : "Has Menu")}
              className="gap-2 h-9 text-sm"
            >
              <span className="text-base">📜</span> Has Menu
            </Button>
            <Button
              variant={activeFilter === "Has Review" ? "default" : "outline"}
              onClick={() => handleFilterChange(activeFilter === "Has Review" ? "All" : "Has Review")}
              className="gap-2 h-9 text-sm"
            >
              <span className="text-base">⭐</span> Has Review
            </Button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filterTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeFilter === tag ? "default" : "outline"}
              className="cursor-pointer px-3 py-1 text-sm hover:scale-105 transition-transform"
              onClick={() => handleFilterChange(activeFilter === tag ? "All" : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className={`${desktopView ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <Card className="overflow-hidden border-border shadow-glow">
              <div
                ref={mapContainer}
                className="w-full h-[500px] lg:h-[600px]"
              />
            </Card>
          </div>

          {/* Desktop: Selected Shop Details Sidebar */}
          {desktopView && (
            <div className="hidden lg:block lg:col-span-1">
              {selectedShop ? (
                <Card className="border-border shadow-glow overflow-hidden sticky top-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <ShopDetails shop={selectedShop} />
                </Card>
              ) : (
                <Card className="border-border shadow-glow p-8 h-[600px] flex items-center justify-center sticky top-4">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-primary mx-auto" />
                    <p className="text-muted-foreground">
                      Click on a map marker to view coffeeshop details
                    </p>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Sheet for Shop Details (Also used in Desktop "Full Map" mode) */}
        <Sheet open={!!selectedShop && (!isDesktop || !desktopView)} onOpenChange={(open) => !open && setSelectedShop(null)}>
          {/* Hide sheet content on desktop if we are in Split View mode */}
          <SheetContent
            side="bottom"
            className={`h-[85vh] p-0 overflow-y-auto rounded-t-xl ${desktopView ? 'lg:hidden' : ''}`}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>{selectedShop?.name}</SheetTitle>
              <SheetDescription>Coffeeshop Details</SheetDescription>
            </SheetHeader>
            {selectedShop && <ShopDetails shop={selectedShop} />}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default InteractiveMap;
