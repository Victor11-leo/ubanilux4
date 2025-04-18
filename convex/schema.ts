import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
  cars: defineTable({
    name: v.string(),
    category: v.string(),
    price: v.number(),
    status: v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("maintenance"),
    ),
    image: v.union(v.id("_storage"),v.string()),
    year: v.number(),
    mileage: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.optional(v.number()),
    doors: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    description: v.string(),
    images: v.array(v.union(v.id("_storage"),v.string())),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
  }),
  bookings: defineTable({
    userId: v.id("users"),
    carId: v.id("cars"),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
        v.literal("active"),
        v.literal("upcoming"),
        v.literal("completed"),
        v.literal("cancelled"),
    ),
    paymentStatus: v.union(
        v.literal("paid"),
        v.literal("pending"),
        v.literal("failed"),
    ),
    paymentRef: v.optional(v.string()),
  }),
});