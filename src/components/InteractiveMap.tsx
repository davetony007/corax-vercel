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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter } from "next/navigation";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useTour } from "@/context/TourContext";

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
    if (param === "amsterdam-only") return "Amsterdam Only";
    if (param === "has-menu") return "Has Menu";
    if (param === "has-review") return "Has Review";
    if (param === "my-tour") return "My Tour";
    return "All";
  }, []);

  const [activeFilter, setActiveFilter] = useState(normalizeFilter(searchParams.get("filter")));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShop, setSelectedShop] = useState<CoffeeshopData | null>(null);
  const { tour } = useTour();
  const routingControlRef = useRef<any>(null);
  const [startFromCentraal, setStartFromCentraal] = useState(false);

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
    else if (newFilter === "Amsterdam Only") urlValue = "amsterdam-only";
    else if (newFilter === "Has Menu") urlValue = "has-menu";
    else if (newFilter === "Has Review") urlValue = "has-review";
    else if (newFilter === "My Tour") urlValue = "my-tour";

    if (newFilter === "All") {
      params.delete("filter");
    } else {
      params.set("filter", urlValue);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Optimize Tour Order (Nearest Neighbor)
  const sortedTour = useMemo(() => {
    if (tour.length < 2) return tour;

    const unvisited = [...tour];
    const optimized = [];

    // Determine start point
    let currentPoint: L.LatLng;
    if (startFromCentraal) {
      currentPoint = L.latLng(52.379189, 4.899431); // Centraal
    } else {
      // Start with the first added shop if Centraal is disabled
      const first = unvisited.shift()!;
      optimized.push(first);
      currentPoint = L.latLng(first.coordinates[0], first.coordinates[1]);
    }

    // Greedy Nearest Neighbor
    while (unvisited.length > 0) {
      let nearestIdx = -1;
      let minDist = Infinity;

      unvisited.forEach((shop, idx) => {
        const dist = currentPoint.distanceTo(L.latLng(shop.coordinates[0], shop.coordinates[1]));
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = idx;
        }
      });

      if (nearestIdx !== -1) {
        const nextShop = unvisited.splice(nearestIdx, 1)[0];
        optimized.push(nextShop);
        currentPoint = L.latLng(nextShop.coordinates[0], nextShop.coordinates[1]);
      }
    }

    return optimized;
  }, [tour, startFromCentraal]);

  const filteredShops = useMemo(() => {
    return coffeeshops.filter(shop => {
      // 1. Text Search Filter
      if (searchQuery && !shop.name.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
        return false;
      }

      // 2. Tag/Category Filter
      if (activeFilter === "All") return true;
      if (activeFilter === "My Tour") return tour.some(t => t.id === shop.id);
      if (activeFilter === "Amsterdam Only") return shop.location === "Amsterdam";
      if (activeFilter === "Has Menu") return shop.menuImages && shop.menuImages.length > 0;
      if (activeFilter === "Has Review") return shop.detailedReview || shop.videoIds.length > 0;
      return shop.tags.includes(activeFilter);
    });
  }, [activeFilter, searchQuery, tour]);

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
      const isInTour = tour.some(t => t.id === shop.id);

      // Tour = Red, Corax = Blue, Standard = Green
      let markerColor = "hsl(142 76% 36%)"; // Default Green
      if (isInTour) markerColor = "#ef4444"; // Red for Tour
      else if (isApproved) markerColor = "hsl(217 91% 60%)"; // Blue for Approved

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background: ${markerColor}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; position: relative;">
          ${isInTour ? `<div style="position: absolute; -top: 5px; -right: 5px; background: #ef4444; color: white; font-size: 10px; font-weight: bold; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid white;">${sortedTour.findIndex(t => t.id === shop.id) + 1}</div>` : ''}
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

  }, [activeFilter, searchQuery, tour]);

  // Handle Tour Routing
  useEffect(() => {
    if (!map.current) return;

    const waypoints = sortedTour.map(shop => L.latLng(shop.coordinates[0], shop.coordinates[1]));

    // Add Centraal Station as start if enabled and we have shops
    if (startFromCentraal && sortedTour.length > 0) {
      // Amsterdam Centraal coords: 52.379189, 4.899431
      waypoints.unshift(L.latLng(52.379189, 4.899431));
    }

    if (!routingControlRef.current) {
      // Initialize control if it doesn't exist
      // @ts-ignore - Leaflet Routing Machine types workaround
      routingControlRef.current = L.Routing.control({
        waypoints: [], // Start empty
        router: new (L.Routing as any).OSRMv1({
          serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1',
          profile: 'driving' // specialized server treats default profile as its main routing type (foot)
        }),
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoutes: true,
        show: false, // Hide the turn-by-turn panel
        lineOptions: {
          styles: [{ color: '#ef4444', opacity: 0.8, weight: 6 }],
          extendToWaypoints: true,
          missingRouteTolerance: 10
        } as any,
        createMarker: function () { return null; } // Don't create extra markers, we have our own
      }).addTo(map.current);
    }

    // Update waypoints safely
    if (routingControlRef.current) {
      if (sortedTour.length > 1 || (startFromCentraal && sortedTour.length > 0)) {
        routingControlRef.current.setWaypoints(waypoints);
      } else {
        routingControlRef.current.setWaypoints([]); // Clear route if < 2 stops
      }
    }

    // Cleanup on unmount only
    return () => {
      // We keep the control alive during re-renders to avoid race conditions
      // Only remove if map is destroyed or component unmounts completely
      if (!map.current && routingControlRef.current) {
        routingControlRef.current = null;
      }
    };
  }, [sortedTour, startFromCentraal]);

  const [desktopView, setDesktopView] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section className="py-20 bg-background" id="map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interactive Coffeeshop Map
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore reviews, browse menus, and <strong>build your own Walking Tour</strong>. <br className="hidden md:inline" />
            Add shops to your list and follow the <span className="text-red-500 font-semibold">Red Route 🚩</span> found on the map!
          </p>
        </div>

        {/* Controls Bar - Redesigned Layout */}
        <div className="flex flex-col gap-4 mb-6">

          {/* Row 1: Search & View */}
          <div className="flex items-center justify-between gap-4">
            <div className="w-full md:w-auto relative group flex-1 md:flex-none">
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
                className="pl-9 w-full md:w-80 bg-card border-border focus:ring-1 focus:ring-primary/50"
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
          </div>

          {/* Row 2: Tool Bar (Tour & Location) */}
          <div className="flex flex-wrap items-center gap-4 py-2 border-y border-border/40">

            {/* Tour Controls */}
            <div className="flex items-center gap-4 border-r border-border/40 pr-4">
              <Button
                variant={activeFilter === "My Tour" ? "default" : "outline"}
                onClick={() => handleFilterChange(activeFilter === "My Tour" ? "All" : "My Tour")}
                className={`gap-2 h-9 text-sm ${activeFilter === "My Tour" ? "bg-red-600 hover:bg-red-700 hover:text-white" : "border-red-200 text-red-600 hover:bg-red-50"}`}
              >
                <span className="text-base">🚩</span> My Tour ({tour.length})
              </Button>

              <div className="flex items-center gap-2">
                <Switch
                  id="start-centraal"
                  checked={startFromCentraal}
                  onCheckedChange={setStartFromCentraal}
                />
                <Label htmlFor="start-centraal" className="text-sm text-muted-foreground cursor-pointer select-none">
                  Start from Centraal 🚆
                </Label>
              </div>
            </div>

            {/* Location */}
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
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
                  }, (error) => {
                    console.error("Error getting location:", error);
                    alert("Could not get your location. Please enable location services.");
                  });
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
              className="gap-2 h-9 text-sm bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-200"
            >
              <span className="text-base">📍</span> Find Near Me
            </Button>
          </div>

          {/* Row 3: Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <Button variant={activeFilter === "Amsterdam Only" ? "default" : "outline"} onClick={() => handleFilterChange(activeFilter === "Amsterdam Only" ? "All" : "Amsterdam Only")} className="gap-2 h-8 text-xs">
              <span className="text-sm">🏙️</span> Ams Only
            </Button>
            <Button variant={activeFilter === "Has Menu" ? "default" : "outline"} onClick={() => handleFilterChange(activeFilter === "Has Menu" ? "All" : "Has Menu")} className="gap-2 h-8 text-xs">
              <span className="text-sm">📜</span> Has Menu
            </Button>
            <Button variant={activeFilter === "Has Review" ? "default" : "outline"} onClick={() => handleFilterChange(activeFilter === "Has Review" ? "All" : "Has Review")} className="gap-2 h-8 text-xs">
              <span className="text-sm">⭐</span> Reviewed
            </Button>
            {filterTags.map((tag) => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "secondary"}
                onClick={() => handleFilterChange(activeFilter === tag ? "All" : tag)}
                className={`h-8 text-xs ${activeFilter === tag ? "" : "bg-secondary/50 hover:bg-secondary border border-border"}`}
              >
                {tag}
              </Button>
            ))}
          </div>
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
