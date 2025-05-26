"use client"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { cars } from "@/lib/data"
import { calculateDays, formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckIcon, ArrowLeftIcon, CalendarIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"

export default function CarDetailsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const carId = params.id as string
  const car = cars.find((c) => c.id === carId)

  const location = searchParams.get("location") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const returnDate = searchParams.get("returnDate") || ""

  const rentalDays = pickupDate && returnDate ? calculateDays(pickupDate, returnDate) : 1
  const totalPrice = car ? car.pricePerDay * rentalDays : 0

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <p className="text-gray-600 mb-4">The car you're looking for doesn't exist.</p>
          <Link href="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleBookNow = () => {
    const bookingParams = new URLSearchParams({
      carId: car.id,
      location: location || car.location,
      pickupDate: pickupDate || "",
      returnDate: returnDate || "",
      totalPrice: totalPrice.toString(),
    })

    router.push(`/booking?${bookingParams.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/cars" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Cars
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RentACar.com
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-600">Available</Badge>

                  {/* Image overlay with car type */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium capitalize">
                      {car.type} • {car.brand}
                    </span>
                  </div>
                </div>

                {/* Additional car images */}
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <img
                      src={`/placeholder.svg?height=80&width=120&text=${encodeURIComponent(car.name + " Interior")}`}
                      alt={`${car.name} interior`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                    <img
                      src={`/placeholder.svg?height=80&width=120&text=${encodeURIComponent(car.name + " Side View")}`}
                      alt={`${car.name} side view`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                    <img
                      src={`/placeholder.svg?height=80&width=120&text=${encodeURIComponent(car.name + " Rear View")}`}
                      alt={`${car.name} rear view`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                    <img
                      src={`/placeholder.svg?height=80&width=120&text=${encodeURIComponent(car.name + " Dashboard")}`}
                      alt={`${car.name} dashboard`}
                      className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book This Car</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Rental Details */}
                {location && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <MapPinIcon className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Pickup Location</p>
                      <p className="font-semibold">{location}</p>
                    </div>
                  </div>
                )}

                {pickupDate && returnDate && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Rental Period</p>
                        <p className="font-semibold">
                          {pickupDate} to {returnDate}
                        </p>
                        <p className="text-sm text-gray-600">{rentalDays} days</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Daily Rate</span>
                    <span>{formatCurrency(car.pricePerDay)}</span>
                  </div>
                  {rentalDays > 1 && (
                    <div className="flex justify-between">
                      <span>Number of Days</span>
                      <span>{rentalDays}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleBookNow} disabled={!pickupDate || !returnDate}>
                  {pickupDate && returnDate ? "Book Now" : "Select Dates to Book"}
                </Button>

                {(!pickupDate || !returnDate) && (
                  <p className="text-sm text-gray-500 text-center">Please search with dates to book this car</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
