"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { SearchIcon, CarIcon } from "lucide-react"

export default function ReservationManagement() {
  const [reservationData, setReservationData] = useState({
    confirmationNumber: "",
    lastName: "",
    email: "",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would search for the reservation
    console.log("Searching for reservation:", reservationData)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
          <CarIcon className="h-4 w-4" />
          Manage an existing reservation
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Your Reservation</DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="confirmationNumber">Confirmation Number</Label>
                <Input
                  id="confirmationNumber"
                  placeholder="Enter confirmation number"
                  value={reservationData.confirmationNumber}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      confirmationNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={reservationData.lastName}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={reservationData.email}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <SearchIcon className="h-4 w-4 mr-2" />
                Find My Reservation
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
