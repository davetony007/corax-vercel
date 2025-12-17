"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CoffeeshopData } from "@/data/coffeeshops";
import { toast } from "sonner";

interface TourContextType {
    tour: CoffeeshopData[];
    addToTour: (shop: CoffeeshopData) => void;
    removeFromTour: (shopId: string) => void;
    clearTour: () => void;
    isInTour: (shopId: string) => boolean;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
    const [tour, setTour] = useState<CoffeeshopData[]>([]);

    // Load tour from local storage on mount
    useEffect(() => {
        const savedTour = localStorage.getItem("corax-tour");
        if (savedTour) {
            try {
                setTour(JSON.parse(savedTour));
            } catch (e) {
                console.error("Failed to parse tour from local storage", e);
            }
        }
    }, []);

    // Save tour to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("corax-tour", JSON.stringify(tour));
    }, [tour]);

    const addToTour = (shop: CoffeeshopData) => {
        if (tour.some((s) => s.id === shop.id)) {
            toast.info(`${shop.name} is already in your tour!`);
            return;
        }
        setTour((prev) => [...prev, shop]);
        toast.success(`${shop.name} added to your tour!`);
    };

    const removeFromTour = (shopId: string) => {
        setTour((prev) => prev.filter((s) => s.id !== shopId));
        toast.success("Removed from tour");
    };

    const clearTour = () => {
        setTour([]);
        toast.success("Tour cleared");
    };

    const isInTour = (shopId: string) => {
        return tour.some((s) => s.id === shopId);
    };

    return (
        <TourContext.Provider value={{ tour, addToTour, removeFromTour, clearTour, isInTour }}>
            {children}
        </TourContext.Provider>
    );
}

export function useTour() {
    const context = useContext(TourContext);
    if (context === undefined) {
        throw new Error("useTour must be used within a TourProvider");
    }
    return context;
}
