import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise, { connectMongoDB } from "../../lib/mongodb"; 
import Review from "../../models/Review";// Adjust path to your MongoDB connection setup


await connectMongoDB();
// GET: Fetch all reviews
/*
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cluster0"); // Database name
    const reviews = await db
      .collection("reviews")
      .find({})
      .map((review) => ({
        id: review._id.toString(),
        location: review.location,
        barRating: review.barRating,
        drink: review.drink,
        drinkRating: review.drinkRating,
        review: review.review,
      }))
      .toArray();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch reviews", error: error.message },
      { status: 500 }
    );
  }
}
*/

export async function GET() {
    try {
      await connectMongoDB();
  
      const reviews = await Review.find(); // Fetch all reviews
      return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
      console.error("GET Error:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch reviews.", error: error.message },
        { status: 500 }
      );
    }
  }

  export async function POST(req) {
    try {
      console.log("Processing Review Submission");
        
      
      // Parse the request body
      const body = await req.json();
      const { location, barRating, drinkChoice, drinkRating, review } = body;
  
      // Validate required fields
      if (!location || !barRating || !drinkChoice || !drinkRating || !review) {
        console.error("Validation Error: Missing fields");
        return NextResponse.json(
          { message: "All fields are required." },
          { status: 400 }
        );
      }
  
      // Connect to MongoDB
      await connectMongoDB();
      console.log("Connected to MongoDB");
  
      // Create and save the review
      const newReview = await Review.create({
        location,
        barRating,
        drinkChoice,
        drinkRating,
        review,
      });
  
      console.log("Created Review:", newReview);
  
      // Respond with the created review
      return NextResponse.json(
        { message: "Review submitted successfully.", review: newReview },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error occurred while submitting review:", error.message);
      return NextResponse.json(
        { message: "Error occurred while submitting review." },
        { status: 500 }
      );
    }
  }


// PUT: Update an existing review
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, location, barRating, drink, drinkRating, review } = body;

    if (!id || !location || !barRating || !drink || !drinkRating || !review) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Cluster0");

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
    console.error("PUT Error:", error.message);
    return NextResponse.json(
      { message: "Failed to update review", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a review by ID
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
    const db = client.db("Cluster0");

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
    console.error("DELETE Error:", error.message);
    return NextResponse.json(
      { message: "Failed to delete review", error: error.message },
      { status: 500 }
    );
  }
}