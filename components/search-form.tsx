"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, SearchIcon, ClockIcon, DollarSignIcon } from "lucide-react"
import { locations } from "@/lib/data"
import ReservationManagement from "./reservation-management"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "Brazil",
]

const loyaltyPrograms = [
  "Budget Fastbreak",
  "Avis Preferred",
  "Hertz Gold Plus",
  "Enterprise Plus",
  "National Emerald Club",
  "Alamo Insiders",
]

const timeOptions = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
]

export default function SearchForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    pickupLocation: "New York", // Updated default value
    dropoffLocation: "New York", // Updated default value
    sameLocation: true,
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "12:00 PM",
    dropoffTime: "12:00 PM",
    age: "25+",
    country: "United States",
    loyaltyProgram: "",
    loyaltyNumber: "",
    offers: "",
  })

  const [showPromo, setShowPromo] = useState(true)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "pickupLocation" && prev.sameLocation ? { dropoffLocation: value } : {}),
    }))
  }

  const handleSameLocationToggle = () => {
    setFormData((prev) => ({
      ...prev,
      sameLocation: !prev.sameLocation,
      dropoffLocation: !prev.sameLocation ? prev.pickupLocation : "",
    }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.pickupLocation || !formData.pickupDate || !formData.dropoffDate) {
      alert("Please fill in all required fields")
      return
    }

    const searchParams = new URLSearchParams({
      location: formData.pickupLocation,
      pickupDate: formData.pickupDate,
      returnDate: formData.dropoffDate,
      pickupTime: formData.pickupTime,
      dropoffTime: formData.dropoffTime,
      age: formData.age,
      country: formData.country,
      ...(formData.loyaltyProgram && { loyaltyProgram: formData.loyaltyProgram }),
      ...(formData.loyaltyNumber && { loyaltyNumber: formData.loyaltyNumber }),
    })

    router.push(`/cars?${searchParams.toString()}`)
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Promotional Banner */}
      {showPromo && (
        <div className="relative bg-gray-800 text-white p-4 rounded-lg overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/placeholder.svg?height=100&width=800&text=Budget+Car+Rental+Deals"
              alt="Car rental deals"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DollarSignIcon className="h-8 w-8 bg-white text-gray-800 rounded-full p-1" />
              <div>
                <p className="text-lg font-semibold">Save up to 25% off weekly car rental rates with Budget.</p>
                <button className="text-sm underline hover:no-underline">Click to apply offer and view T&Cs</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                Apply
              </Button>
              <button onClick={() => setShowPromo(false)} className="text-white hover:text-gray-300 text-xl">
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Search Form */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Location and Date Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Pickup Location
                </label>
                <Select
                  value={formData.pickupLocation}
                  onValueChange={(value) => handleInputChange("pickupLocation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter Pickup Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pickup Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Pickup Date
                </label>
                <Input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                  min={today}
                />
              </div>

              {/* Pickup Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Pickup Time
                </label>
                <Select value={formData.pickupTime} onValueChange={(value) => handleInputChange("pickupTime", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dropoff Row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Dropoff Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  Dropoff Location
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sameLocation"
                      checked={formData.sameLocation}
                      onChange={handleSameLocationToggle}
                      className="rounded"
                    />
                    <label htmlFor="sameLocation" className="text-sm">
                      Return to same location
                    </label>
                  </div>
                  {!formData.sameLocation && (
                    <Select
                      value={formData.dropoffLocation}
                      onValueChange={(value) => handleInputChange("dropoffLocation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Dropoff Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Dropoff Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Dropoff Date
                </label>
                <Input
                  type="date"
                  value={formData.dropoffDate}
                  onChange={(e) => handleInputChange("dropoffDate", e.target.value)}
                  min={formData.pickupDate || today}
                />
              </div>

              {/* Dropoff Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  Dropoff Time
                </label>
                <Select value={formData.dropoffTime} onValueChange={(value) => handleInputChange("dropoffTime", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Options Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Age */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25+">25+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Country of Residence</label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loyalty Program */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Loyalty Program</label>
                <Select
                  value={formData.loyaltyProgram}
                  onValueChange={(value) => handleInputChange("loyaltyProgram", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Loyalty Program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem> {/* Updated value prop */}
                    {loyaltyPrograms.map((program) => (
                      <SelectItem key={program} value={program}>
                        {program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Loyalty Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Loyalty Number</label>
                <Input
                  placeholder="Enter loyalty number"
                  value={formData.loyaltyNumber}
                  onChange={(e) => handleInputChange("loyaltyNumber", e.target.value)}
                  disabled={!formData.loyaltyProgram}
                />
              </div>

              {/* Offers/Membership */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Offers / Membership</label>
                <Select value={formData.offers} onValueChange={(value) => handleInputChange("offers", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select offers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem> {/* Updated value prop */}
                    <SelectItem value="aaa">AAA Discount</SelectItem>
                    <SelectItem value="costco">Costco Member</SelectItem>
                    <SelectItem value="military">Military Discount</SelectItem>
                    <SelectItem value="senior">Senior Discount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
              <ReservationManagement />

              <Button type="submit" className="px-8 py-3" size="lg">
                <SearchIcon className="h-4 w-4 mr-2" />
                Select My Car
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
