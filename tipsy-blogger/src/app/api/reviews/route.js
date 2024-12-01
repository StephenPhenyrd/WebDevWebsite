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