/*
import mongoose from "mongoose"

export const connectMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully!');
      } catch (error) {
        console.error('Database connection failed:', error);
      }
    

}
*/

import mongoose from "mongoose";

const uri = process.env.MONGODB_URI; // Ensure this is set in your .env.local
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Global variable to maintain connection state during hot reloads in development
let isConnected = false;

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = connection.connections[0].readyState === 1;
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};


