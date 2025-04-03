"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/global/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export default function AddCarPage() {
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl)
  const createCar = useMutation(api.cars.createCar)

  const [images, setImages] = useState([])
  const [imageStorage, setImageStorage] = useState([])

  // Mock function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {      
      const newImages = [...images]
      for (let i = 0; i < e.target.files.length; i++) {
        newImages.push(e.target.files)
      }
      setImages(newImages)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const storageIds = []
    for (let i= 0; i<images.length ;i++)
    {
      const postUrl = await generateUploadUrl()
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": images[i]},
        body: images[i],
      });
      const { storageId } = await result.json();      
      storageIds.push(storageId)
    }

    // createCar({

    // })

  }

  return (
    <DashboardLayout isAdmin={true}>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/cars">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Add New Car</h1>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Car Details</CardTitle>
            <CardDescription>Enter the details of the new car you want to add to your inventory.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name</Label>
                <Input id="name" placeholder="e.g. Tesla Model 3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Day ($)</Label>
                <Input id="price" type="number" placeholder="e.g. 150" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" placeholder="e.g. 2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input id="mileage" type="number" placeholder="e.g. 5000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter car description and features..."
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Car Images</Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-lg border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Car image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
                <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer text-sm font-medium text-primary hover:underline"
                    >
                      Upload Images
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/admin/cars">Cancel</Link>
            </Button>
            <Button>Add Car</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )
}

