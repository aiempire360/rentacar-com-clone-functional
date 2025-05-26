"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cars } from "@/lib/data"
import { formatCurrency, calculateDays } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, CreditCardIcon } from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const carId = searchParams.get("carId") || ""
  const location = searchParams.get("location") || ""
  const pickupDate = searchParams.get("pickupDate") || ""
  const returnDate = searchParams.get("returnDate") || ""
  const totalPrice = Number.parseFloat(searchParams.get("totalPrice") || "0")

  const car = cars.find((c) => c.id === carId)
  const rentalDays = calculateDays(pickupDate, returnDate)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Booking</h1>
          <p className="text-gray-600 mb-4">Please select a car to book.</p>
          <Link href="/cars">
            <Button>Back to Cars</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate booking ID
    const bookingId = "BK" + Date.now().toString().slice(-8)

    // Store booking in localStorage (in a real app, this would be sent to a server)
    const booking = {
      id: bookingId,
      carId: car.id,
      carName: car.name,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      pickupDate,
      returnDate,
      pickupLocation: location,
      totalPrice,
      rentalDays,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    existingBookings.push(booking)
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    // Redirect to confirmation page
    router.push(`/confirmation?bookingId=${bookingId}`)
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={`/cars/${carId}?${searchParams.toString()}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Car Details
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
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5" />
                      Payment Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isSubmitting}>
                    {isSubmitting ? "Processing..." : `Complete Booking - ${formatCurrency(totalPrice)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Car Info */}
                <div className="flex gap-3">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{car.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {car.type} • {car.brand}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Rental Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Pickup Location</p>
                      <p className="font-semibold">{location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Rental Period</p>
                      <p className="font-semibold">
                        {pickupDate} to {returnDate}
                      </p>
                      <p className="text-sm text-gray-600">{rentalDays} days</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Daily Rate</span>
                    <span>{formatCurrency(car.pricePerDay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of Days</span>
                    <span>{rentalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
