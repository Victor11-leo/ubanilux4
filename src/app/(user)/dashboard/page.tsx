import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, Car, CreditCard, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function UserDashboardPage() {
  // Mock data for upcoming bookings
  const upcomingBookings = [
    {
      id: "BK002",
      car: "BMW X5",
      startDate: "2023-10-18",
      endDate: "2023-10-25",
      status: "Upcoming",
      image: "/placeholder.svg?height=80&width=120",
    },
  ]

  return (
    <>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John! Here's an overview of your rental activity.</p>
          </div>
          <Button asChild>
            <Link href="/user/cars">Rent a Car</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">You have 1 active rental</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">You have 1 upcoming booking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">Across 3 bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">You have 2 unread messages</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled car rentals</CardDescription>
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
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/user/bookings/${booking.id}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">No upcoming bookings</h3>
                  <p className="text-sm text-muted-foreground">You don't have any upcoming car rentals.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/user/cars">Browse Cars</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent car rental activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Car className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You booked a Tesla Model 3</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Payment processed for BMW X5</p>
                    <p className="text-sm text-muted-foreground">5 days ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">You received a message from support</p>
                    <p className="text-sm text-muted-foreground">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

