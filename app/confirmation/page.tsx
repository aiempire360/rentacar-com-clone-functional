"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircleIcon, CalendarIcon, MapPinIcon, CarIcon, PrinterIcon, MailIcon } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    if (bookingId) {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const foundBooking = bookings.find((b: any) => b.id === bookingId)
      setBooking(foundBooking)
    }
  }, [bookingId])

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-4">We couldn't find your booking confirmation.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-4">
                Your car rental has been successfully booked. We've sent a confirmation email to {booking.customerEmail}
                .
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Booking Reference</p>
                <p className="text-2xl font-bold text-green-600">{booking.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{booking.customerName}</p>
                  <p className="text-gray-600">{booking.customerEmail}</p>
                  <p className="text-gray-600">{booking.customerPhone}</p>
                </div>
              </div>

              <Separator />

              {/* Car Information */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CarIcon className="h-4 w-4" />
                  Vehicle Details
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{booking.carName}</p>
                  <p className="text-gray-600">Booking ID: {booking.id}</p>
                </div>
              </div>

              <Separator />

              {/* Rental Information */}
              <div>
                <h3 className="font-semibold mb-2">Rental Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Pickup Location</p>
                      <p className="font-semibold">{booking.pickupLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Rental Period</p>
                      <p className="font-semibold">
                        {booking.pickupDate} to {booking.returnDate}
                      </p>
                      <p className="text-sm text-gray-600">{booking.rentalDays} days</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Summary */}
              <div>
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Total Amount Paid</span>
                    <span className="font-bold text-green-600">{formatCurrency(booking.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Payment Status</span>
                    <span className="text-green-600 font-semibold">Confirmed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1">
              <PrinterIcon className="h-4 w-4 mr-2" />
              Print Confirmation
            </Button>
            <Button variant="outline" className="flex-1">
              <MailIcon className="h-4 w-4 mr-2" />
              Email Confirmation
            </Button>
            <Link href="/" className="flex-1">
              <Button className="w-full">Book Another Car</Button>
            </Link>
          </div>

          {/* Important Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Pickup Instructions:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Arrive at the pickup location 15 minutes before your scheduled time</li>
                    <li>Bring a valid driver's license and credit card</li>
                    <li>Present this confirmation (printed or on mobile device)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Cancellation Policy:</h4>
                  <p className="text-gray-600">
                    Free cancellation up to 24 hours before pickup time. Cancellations within 24 hours may incur
                    charges.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Contact Information:</h4>
                  <p className="text-gray-600">
                    For any questions or changes, call us at (555) 123-4567 or email support@rentacar.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
