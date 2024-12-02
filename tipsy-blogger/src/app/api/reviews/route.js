/*
import { NextResponse } from "next/server";

// Mock database (replace with actual database logic)
const reviews = [];


export async function POST(request) {
  try {
    const body = await request.json();
    const { location, barRating, drink, drinkRating, review } = body;

    // Validate input
    if (!location || !barRating || !drink || !drinkRating || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new review
    const newReview = {
      id: reviews.length + 1, // Generate unique ID
      location,
      barRating,
      drink,
      drinkRating,
      review,
    };

    reviews.push(newReview);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit review", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Review ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("TipsyBlogger");

    const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Review not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete review", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, location, barRating, drink, drinkRating, review } = body;

    // Validate input
    if (!id || !location || !barRating || !drink || !drinkRating || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find and update the existing review
    const reviewIndex = reviews.findIndex((r) => r.id === id);
    if (reviewIndex === -1) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    reviews[reviewIndex] = { id, location, barRating, drink, drinkRating, review };
    return NextResponse.json(reviews[reviewIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update review", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("Returning reviews:", reviews); // Debug log
  return NextResponse.json(reviews, { status: 200 });
}
*/

import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb"; // Ensure this is the correct path to your MongoDB connection file

// POST: Add a new review
export async function POST(request) {
  try {
    const body = await request.json();
    const { location, barRating, drink, drinkRating, review } = body;

    // Validate input
    if (!location || !barRating || !drink || !drinkRating || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("TipsyProject");

    const newReview = {
      location,
      barRating,
      drink,
      drinkRating,
      review,
    };

    const result = await db.collection("reviews").insertOne(newReview);

    return NextResponse.json({ id: result.insertedId, ...newReview }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { message: "Failed to submit review", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a review by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    console.log("Attempting to delete review with ID:", id); // Debug log

    if (!id) {
      return NextResponse.json(
        { message: "Review ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("TipsyProject");

    const result = await db.collection("reviews").deleteOne({ _id: new ObjectId(id) });

    console.log("Delete Result:", result); // Debug log

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Review not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete review", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update an existing review
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, location, barRating, drink, drinkRating, review } = body;

    // Validate input
    if (!id || !location || !barRating || !drink || !drinkRating || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("TipsyProject");

    const result = await db.collection("reviews").updateOne(
      { _id: new ObjectId(id) },
      { $set: { location, barRating, drink, drinkRating, review } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { id, location, barRating, drink, drinkRating, review },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Failed to update review", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const client = await clientPromise;
    console.log("MongoDB client connected successfully"); // Debug log

    const db = client.db("TipsyProject"); // Replace with your actual database name
    console.log("Using database:", db.databaseName); // Debug log

    const reviews = await db
      .collection("reviews")
      .find({})
      .map((review) => ({
        id: review._id.toString(), // Convert ObjectId to string
        location: review.location,
        barRating: review.barRating,
        drink: review.drink,
        drinkRating: review.drinkRating,
        review: review.review,
      }))
      .toArray();

    console.log("Fetched reviews:", reviews); // Debug log

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to fetch reviews", error: error.message },
      { status: 500 }
    );
  }
}