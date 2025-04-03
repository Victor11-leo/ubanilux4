import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

// Mock data for bookings
const bookings = [
  {
    id: "BK001",
    user: "John Doe",
    car: "Tesla Model 3",
    startDate: "2023-10-15",
    endDate: "2023-10-20",
    status: "Active",
    total: 750,
  },
  {
    id: "BK002",
    user: "Jane Smith",
    car: "BMW X5",
    startDate: "2023-10-18",
    endDate: "2023-10-25",
    status: "Upcoming",
    total: 1400,
  },
  {
    id: "BK003",
    user: "Robert Johnson",
    car: "Mercedes C-Class",
    startDate: "2023-10-10",
    endDate: "2023-10-14",
    status: "Completed",
    total: 720,
  },
  {
    id: "BK004",
    user: "Emily Davis",
    car: "Range Rover Sport",
    startDate: "2023-10-22",
    endDate: "2023-10-29",
    status: "Upcoming",
    total: 1750,
  },
  {
    id: "BK005",
    user: "Michael Wilson",
    car: "Toyota Camry",
    startDate: "2023-10-05",
    endDate: "2023-10-12",
    status: "Completed",
    total: 840,
  },
]

export default function AdminBookingsPage() {
  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">Manage all car rental bookings and reservations.</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>You have {bookings.length} total bookings.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Search bookings..." className="w-full" />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.user}</TableCell>
                    <TableCell>{booking.car}</TableCell>
                    <TableCell>{booking.startDate}</TableCell>
                    <TableCell>{booking.endDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          booking.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </TableCell>
                    <TableCell>${booking.total}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/bookings/${booking.id}`}>View</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

