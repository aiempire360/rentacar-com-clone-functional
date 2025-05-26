"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import CarCard from "@/components/car-card"
import { cars } from "@/lib/data"
import { filterCars, sortCars } from "@/lib/utils"
import type { SearchFilters } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { FilterIcon, SortAscIcon } from "lucide-react"
import Link from "next/link"

export default function CarsPage() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get("location") || "",
    pickupDate: searchParams.get("pickupDate") || "",
    returnDate: searchParams.get("returnDate") || "",
    carType: "all",
    fuelType: "all",
    brand: "all",
    minPrice: 0,
    maxPrice: 200,
  })

  const filteredAndSortedCars = useMemo(() => {
    const filtered = filterCars(cars, filters)
    return sortCars(filtered, sortBy)
  }, [filters, sortBy])

  const brands = Array.from(new Set(cars.map((car) => car.brand)))
  const carTypes = Array.from(new Set(cars.map((car) => car.type)))
  const fuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RentACar.com
          </Link>
        </div>
      </header>

      {/* Location Hero Section */}
      {filters.location && (
        <section className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute inset-0">
            <img
              src={`/placeholder.svg?height=200&width=1200&text=${encodeURIComponent(filters.location + " Car Rental Location")}`}
              alt={`${filters.location} car rental`}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">Car Rentals in {filters.location}</h1>
              <p className="text-lg opacity-90">Find the perfect vehicle for your trip</p>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FilterIcon className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Info */}
                {filters.location && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Searching in:</p>
                    <p className="text-blue-600">{filters.location}</p>
                    {filters.pickupDate && filters.returnDate && (
                      <p className="text-sm text-gray-600">
                        {filters.pickupDate} to {filters.returnDate}
                      </p>
                    )}
                  </div>
                )}

                {/* Car Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Car Type</label>
                  <Select value={filters.carType} onValueChange={(value) => setFilters({ ...filters, carType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {carTypes.map((type) => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Brand</label>
                  <Select value={filters.brand} onValueChange={(value) => setFilters({ ...filters, brand: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fuel Type Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Fuel Type</label>
                  <Select
                    value={filters.fuelType}
                    onValueChange={(value) => setFilters({ ...filters, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fuel Types</SelectItem>
                      {fuelTypes.map((fuel) => (
                        <SelectItem key={fuel} value={fuel} className="capitalize">
                          {fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ${filters.minPrice} - ${filters.maxPrice}
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500">Min Price</label>
                      <Slider
                        value={[filters.minPrice || 0]}
                        onValueChange={(value) => setFilters({ ...filters, minPrice: value[0] })}
                        max={200}
                        step={5}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Max Price</label>
                      <Slider
                        value={[filters.maxPrice || 200]}
                        onValueChange={(value) => setFilters({ ...filters, maxPrice: value[0] })}
                        max={200}
                        step={5}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      carType: "all",
                      fuelType: "all",
                      brand: "all",
                      minPrice: 0,
                      maxPrice: 200,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Available Cars</h1>
                <p className="text-gray-600">{filteredAndSortedCars.length} cars found</p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SortAscIcon className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cars Grid */}
            {filteredAndSortedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedCars.map((car) => (
                  <CarCard key={car.id} car={car} searchParams={searchParams} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500 mb-4">No cars found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      ...filters,
                      carType: "all",
                      fuelType: "all",
                      brand: "all",
                      minPrice: 0,
                      maxPrice: 200,
                    })
                  }
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
