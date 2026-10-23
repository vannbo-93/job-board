// /** @format */

// import mongoose from "mongoose";

// type Cache = {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// };
// const g = globalThis as unknown as { mongooseCache?: Cache };
// const cache: Cache = g.mongooseCache ?? { conn: null, promise: null };
// g.mongooseCache = cache;

// export async function dbConnect() {
//   const uri = process.env.MONGODB_URI;
//   if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local");

//   if (cache.conn) return cache.conn;
//   cache.promise ??= mongoose.connect(uri, { bufferCommands: false });

//   try {
//     cache.conn = await cache.promise;
//   } catch (error) {
//     cache.promise = null;
//     throw error;
//   }
//   return cache.conn;
// }
