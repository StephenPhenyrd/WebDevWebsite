/*
"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "next/link";
import Item from "../components/Item";
import "./authview.css";

// Define the type for a review
type Review = {
  id: number;
  location: string;
  barRating: string;
  drink: string;
  drinkRating: string;
  review: string;
};

export default function Authview() {
  // State to store fetched reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews(); // Fetch reviews on component mount
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <Header>
        <Button>
          <Link href="/additem">Add New Review</Link>
        </Button>
        <Button>
          <Link href="/">Logout</Link>
        </Button>
      </Header>
      <div className="form-background">
        <div className="background-wrapper"></div>
        <div>
          <div className="item-container">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <Item
                    //image="/path/to/image.jpg" // Replace this with actual image data if available
                    title={review.location}
                    text={review.review}
                    barRating={review.barRating} // Pass additional props as needed
                    drink={review.drink}
                    drinkRating={review.drinkRating}
                  />
                </div>
              ))
            ) : (
              <p>No reviews available. Add a new review to get started!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
*/

"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "next/link";
import Item from "../components/Item";
import "./authview.css";

type Review = {
  id: string;
  location: string;
  review: string;
  barRating?: string;
  drink?: string;
  drinkRating?: string;
};

export default function Authview() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Update state to remove the deleted review
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
      alert("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  return (
    <>
      <Header>
        <Button>
          <Link href="/additem">Add New Review</Link>
        </Button>
        <Button>
          <Link href="/">Logout</Link>
        </Button>
      </Header>
      <div className="form-background">
        <div className="background-wrapper"></div>
        <div>
          <div className="item-container">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id}>
                  <Item
                    id={review.id}
                    image="/path/to/image.jpg" // Replace with actual image path if applicable
                    title={review.location}
                    text={review.review}
                    barRating={review.barRating || ""}
                    drink={review.drink || ""}
                    drinkRating={review.drinkRating || ""}
                    onDelete={handleDelete} // Pass delete handler
                  />
                </div>
              ))
            ) : (
              <p>No reviews available. Add a new review to get started!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}