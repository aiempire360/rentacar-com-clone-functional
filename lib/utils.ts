import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Car, SearchFilters } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterCars(cars: Car[], filters: SearchFilters): Car[] {
  return cars.filter((car) => {
    // Location filter
    if (filters.location && car.location.toLowerCase() !== filters.location.toLowerCase()) {
      return false
    }

    // Car type filter
    if (filters.carType && filters.carType !== "all" && car.type !== filters.carType) {
      return false
    }

    // Fuel type filter
    if (filters.fuelType && filters.fuelType !== "all" && car.fuelType !== filters.fuelType) {
      return false
    }

    // Brand filter
    if (filters.brand && filters.brand !== "all" && car.brand !== filters.brand) {
      return false
    }

    // Price range filter
    if (filters.minPrice && car.pricePerDay < filters.minPrice) {
      return false
    }

    if (filters.maxPrice && car.pricePerDay > filters.maxPrice) {
      return false
    }

    return car.available
  })
}

export function sortCars(cars: Car[], sortBy: string): Car[] {
  const sortedCars = [...cars]

  switch (sortBy) {
    case "price-low":
      return sortedCars.sort((a, b) => a.pricePerDay - b.pricePerDay)
    case "price-high":
      return sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay)
    case "rating":
      return sortedCars.sort((a, b) => b.rating - a.rating)
    case "name":
      return sortedCars.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sortedCars
  }
}

export function calculateDays(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays || 1
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
