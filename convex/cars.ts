import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createCar = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    status: v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("maintenance"),
    ),
    image: v.id("_storage"),
    year: v.number(),
    mileage: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.number(),
    doors: v.number(),
    features: v.array(v.string()),
    description: v.string(),
    images: v.array(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const newCarId = await ctx.db.insert("cars", 
    {
        name:args.name,
        category:args.category,
        price:args.price,
        status:args.status,
        image:args.image,
        year:args.year,
        mileage:args.mileage,
        fuelType:args.fuelType,
        transmission:args.transmission,
        seats:args.seats,
        doors:args.doors,
        features:args.features,
        description:args.description,
        images:args.images,
    });
    return newCarId;
  },
});

export const fetchCars = query({
  args: {},
  handler: async (ctx, args) => {
    const cars = await ctx.db
    .query("cars")
    .collect()

    return cars
  },
});

export const fetchCarId = query({
    args: {
        id:v.id("cars")
    },
    handler: async (ctx, args) => {
      const cars = await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .first()
  
      return cars
    },
});

// export const updateCar = mutation({
//   args: {
//     id:v.id("cars"),
//     name: v.string(),
//     category: v.string(),
//     price: v.number(),
//     status: v.union(
//         v.literal("available"),
//         v.literal("rented"),
//         v.literal("maintenance"),
//     ),
//     image: v.string(),
//     year: v.number(),
//     mileage: v.number(),
//     fuelType: v.string(),
//     transmission: v.string(),
//     seats: v.number(),
//     doors: v.number(),
//     features: v.array(v.string()),
//     description: v.string(),
//     images: v.array(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const {id} = args
//     const carFound = await ctx.db
//       .query("cars")
//       .filter((q) => q.eq(q.field("_id"),id))
//       .first()
//     await ctx.db.patch(id,{...carFound,...args})
//   },
// });

export const deleteCar = mutation({
  args: {
    id:v.id("cars"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});