export interface Car {
  id: string
  name: string
  brand: string
  type: "economy" | "compact" | "midsize" | "fullsize" | "luxury" | "suv" | "convertible"
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  transmission: "manual" | "automatic"
  seats: number
  doors: number
  pricePerDay: number
  rating: number
  reviews: number
  image: string
  features: string[]
  available: boolean
  location: string
}

export interface SearchFilters {
  location: string
  pickupDate: string
  returnDate: string
  carType?: string
  fuelType?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
}

export interface Booking {
  id: string
  carId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  pickupDate: string
  returnDate: string
  pickupLocation: string
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled"
  createdAt: string
}
