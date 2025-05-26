import SearchForm from "@/components/search-form"
import CarCard from "@/components/car-card"
import { cars } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StarIcon, ShieldCheckIcon, ClockIcon, HeadphonesIcon, CheckIcon } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredCars = cars.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RentACar.com
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/cars" className="text-gray-600 hover:text-blue-600">
                Browse Cars
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Locations
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=600&width=1200&text=Luxury+Cars+on+Highway"
            alt="Cars on highway"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-800/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Rental Car</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Choose from thousands of cars at the best prices</p>
          </div>

          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RentACar.com?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center overflow-hidden">
              <div className="h-32 relative">
                <img
                  src="/placeholder.svg?height=128&width=300&text=Best+Price+Guarantee"
                  alt="Best prices"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <StarIcon className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Guaranteed lowest prices on car rentals</p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden">
              <div className="h-32 relative">
                <img
                  src="/placeholder.svg?height=128&width=300&text=Safety+First+Car+Inspection"
                  alt="Car safety inspection"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <ShieldCheckIcon className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Trusted & Safe</h3>
                <p className="text-gray-600">All cars are inspected and insured</p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden">
              <div className="h-32 relative">
                <img
                  src="/placeholder.svg?height=128&width=300&text=24/7+Customer+Service"
                  alt="24/7 customer service"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <ClockIcon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">24/7 Service</h3>
                <p className="text-gray-600">Round-the-clock customer support</p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden">
              <div className="h-32 relative">
                <img
                  src="/placeholder.svg?height=128&width=300&text=Easy+Online+Booking"
                  alt="Easy booking process"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <HeadphonesIcon className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">Simple and fast reservation process</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promotional Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Experience Premium Car Rentals</h2>
              <p className="text-gray-600 mb-6 text-lg">
                From economy cars for budget-conscious travelers to luxury vehicles for special occasions, we have the
                perfect car for every journey. All our vehicles are regularly maintained and thoroughly cleaned for your
                safety and comfort.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span>Free Cancellation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span>Unlimited Mileage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <span>24/7 Roadside Assistance</span>
                </div>
              </div>
              <Link href="/cars">
                <Button size="lg">Explore Our Fleet</Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600&text=Luxury+Car+Fleet+Showcase"
                alt="Car rental fleet"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Cars</h2>
            <Link href="/cars">
              <Button variant="outline">View All Cars</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64&text=Happy+Customer+1"
                    alt="Customer testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service and great prices! The car was clean and exactly as described. Will definitely use
                  RentACar.com again."
                </p>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Business Traveler</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64&text=Happy+Customer+2"
                    alt="Customer testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Perfect for our family vacation! The SUV had plenty of space and the booking process was incredibly
                  smooth."
                </p>
                <p className="font-semibold">Mike Chen</p>
                <p className="text-sm text-gray-500">Family Vacation</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64&text=Happy+Customer+3"
                    alt="Customer testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Amazing luxury car experience! The BMW was in perfect condition and made our anniversary trip extra
                  special."
                </p>
                <p className="font-semibold">Emily Rodriguez</p>
                <p className="text-sm text-gray-500">Special Occasion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Rental Destinations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=New+York+City+Skyline"
                  alt="New York car rentals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">New York</h3>
                  <p className="text-sm opacity-90">From $35/day</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=Los+Angeles+Hollywood+Sign"
                  alt="Los Angeles car rentals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Los Angeles</h3>
                  <p className="text-sm opacity-90">From $40/day</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=Miami+Beach+Ocean+Drive"
                  alt="Miami car rentals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">Miami</h3>
                  <p className="text-sm opacity-90">From $45/day</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 relative">
                <img
                  src="/placeholder.svg?height=200&width=300&text=San+Francisco+Golden+Gate+Bridge"
                  alt="San Francisco car rentals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">San Francisco</h3>
                  <p className="text-sm opacity-90">From $50/day</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RentACar.com</h3>
              <p className="text-gray-400">Your trusted partner for car rentals worldwide.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RentACar.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
