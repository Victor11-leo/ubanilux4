import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for bookings
const activeBookings = [
  {
    id: "BK001",
    car: "Tesla Model 3",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    status: "Active",
    total: 750,
    image: "/placeholder.svg?height=80&width=120",
  },
]

const upcomingBookings = [
  {
    id: "BK002",
    car: "BMW X5",
    startDate: "2023-10-18",
    endDate: "2023-10-25",
    status: "Upcoming",
    total: 1400,
    image: "/placeholder.svg?height=80&width=120",
  },
]

const pastBookings = [
  {
    id: "BK003",
    car: "Mercedes C-Class",
    startDate: "2023-10-10",
    endDate: "2023-10-14",
    status: "Completed",
    total: 720,
    image: "/placeholder.svg?height=80&width=120",
  },
  {
    id: "BK004",
    car: "Toyota Camry",
    startDate: "2023-09-05",
    endDate: "2023-09-12",
    status: "Completed",
    total: 840,
    image: "/placeholder.svg?height=80&width=120",
  },
]

export default function UserBookingsPage() {
  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-muted-foreground">Manage your car rental bookings and reservations.</p>
          </div>
          <Button asChild>
            <Link href="/user/cars">Book a Car</Link>
          </Button>
        </div>
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Bookings</CardTitle>
                <CardDescription>Cars you are currently renting.</CardDescription>
              </CardHeader>
              <CardContent>
                {activeBookings.length > 0 ? (
                  <div className="space-y-4">
                    {activeBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 rounded-lg border p-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.car}
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{booking.car}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} to {booking.endDate}
                          </p>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${booking.total}</p>
                          <Button variant="outline" size="sm" className="mt-2" asChild>
                            <Link href={`/user/bookings/${booking.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No active bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any active car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled car rentals.</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 rounded-lg border p-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.car}
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{booking.car}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} to {booking.endDate}
                          </p>
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${booking.total}</p>
                          <div className="flex flex-col gap-2 mt-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/user/bookings/${booking.id}`}>View Details</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No upcoming bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any upcoming car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Bookings</CardTitle>
                <CardDescription>Your rental history.</CardDescription>
              </CardHeader>
              <CardContent>
                {pastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 rounded-lg border p-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.car}
                          width={120}
                          height={80}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-semibold">{booking.car}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} to {booking.endDate}
                          </p>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${booking.total}</p>
                          <div className="flex flex-col gap-2 mt-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/user/bookings/${booking.id}`}>View Details</Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                    <h3 className="text-lg font-semibold">No past bookings</h3>
                    <p className="text-sm text-muted-foreground">You don't have any past car rentals.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/user/cars">Browse Cars</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

