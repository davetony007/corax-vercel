import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { coffeeshops, CoffeeshopData } from "@/data/coffeeshops";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCoffeeshopsForVideo(videoId: string): CoffeeshopData[] {
  return coffeeshops.filter(shop =>
    shop.videoIds.includes(videoId) || shop.shortIds.includes(videoId)
  );
}
