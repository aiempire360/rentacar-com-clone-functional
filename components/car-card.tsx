"use client"

import type { Car } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, UsersIcon, CarIcon, FuelIcon } from "lucide-react"
import Link from "next/link"

interface CarCardProps {
  car: Car
  searchParams?: URLSearchParams
}

export default function CarCard({ car, searchParams }: CarCardProps) {
  const bookingUrl = searchParams ? `/cars/${car.id}?${searchParams.toString()}` : `/cars/${car.id}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2 bg-green-600">Available</Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{car.name}</h3>
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{car.rating}</span>
            <span className="text-sm text-gray-500">({car.reviews})</span>
          </div>
        </div>

        <p className="text-gray-600 mb-3 capitalize">
          {car.type} • {car.brand}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <UsersIcon className="h-4 w-4" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <CarIcon className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <FuelIcon className="h-4 w-4" />
            <span className="capitalize">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{car.doors} doors</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-green-600">{formatCurrency(car.pricePerDay)}</span>
            <span className="text-gray-500">/day</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={bookingUrl} className="w-full">
          <Button className="w-full">View Details & Book</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
