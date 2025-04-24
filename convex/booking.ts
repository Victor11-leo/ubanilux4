import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createBooking = mutation({
  args: {
    userId: v.string(),
    carId: v.id("cars"),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
        v.literal("approved"),
        v.literal("denied"),
        v.literal("pending"),
        v.literal("cancelled"),
    ),
    paymentStatus: v.union(
        v.literal("paid"),
        v.literal("pending"),
        v.literal("failed"),
    ),
    paymentRef: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newBookingId = await ctx.db.insert("bookings", 
    {
        userId:args.userId,
        carId:args.carId,
        startDate:args.startDate,
        endDate:args.endDate,
        status:args.status,
        paymentStatus:args.paymentStatus,
        paymentRef:args.paymentRef,
        
    });
    return newBookingId;
  },
});

export const fetchBookings = query({
  args: {},
  handler: async (ctx, args) => {
    const bookings = await ctx.db
    .query("bookings")
    .collect()

    return bookings
  },
});

export const fetchBookingId = mutation({
    args: {
        id:v.id("bookings")
    },
    handler: async (ctx, args) => {
      const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .first()
  
      return bookings
    },
});

export const updateBooking = mutation({
  args: {
    id:v.id("bookings"),
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
  },
  handler: async (ctx, args) => {
    const {id} = args
    const bookingFound = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("_id"),id))
      .first()
    await ctx.db.patch(id,{...bookingFound,...args})
  },
});

export const deleteBooking = mutation({
  args: {
    id:v.id("bookings"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});