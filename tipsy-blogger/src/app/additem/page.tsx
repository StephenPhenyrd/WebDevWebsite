"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Button from "../components/Button";
import Link from "next/link";
import "./addpage.css";

export default function Additem() {
  const searchParams = useSearchParams();

  // State for form fields
  const [locationValue, setLocationValue] = useState<string>(
    searchParams.get("location") || ""
  );
  const [ratingValue, setRatingValue] = useState<string>(
    searchParams.get("barRating") || ""
  );
  const [drinkValue, setDrinkValue] = useState<string>(
    searchParams.get("drink") || ""
  );
  const [drinkRatingValue, setDrinkRatingValue] = useState<string>(
    searchParams.get("drinkRating") || ""
  );
  const [reviewValue, setReviewValue] = useState<string>(
    searchParams.get("review") || ""
  );

  // State for handling loading state
  const [loading, setLoading] = useState(false);

  // Handlers for input fields
  const LocationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value);
  };
  const RatingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(event.target.value);
  };
  const DrinkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDrinkValue(event.target.value);
  };
  const DrinkRatingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDrinkRatingValue(event.target.value);
  };
  const ReviewHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewValue(event.target.value);
  };

  
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    const inputInfo = {
      id: searchParams.get("id") ? parseInt(searchParams.get("id") as string) : undefined,
      location: locationValue,
      barRating: ratingValue,
      drink: drinkValue,
      drinkRating: drinkRatingValue,
      review: reviewValue,
    };
  
    const method = inputInfo.id ? "PUT" : "POST"; // Use PUT for updates, POST for new reviews
    console.log("Submitting Review:", inputInfo, "Method:", method);
  
    try {
      const response = await fetch("/api/reviews", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputInfo),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit the review.");
      }
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      // Reset the form or redirect
      setDrinkValue("");
      setLocationValue("");
      setRatingValue("");
      setReviewValue("");
      setDrinkRatingValue("");
  
      alert(inputInfo.id ? "Review updated successfully!" : "Review submitted successfully!");
      window.location.href = "/authview"; // Redirect to reviews page
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit the review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  /*
  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
  
    const inputInfo = {
      id: searchParams.get("id") ? parseInt(searchParams.get("id") as string) : undefined,
      location: locationValue,
      barRating: ratingValue,
      drink: drinkValue,
      drinkRating: drinkRatingValue,
      review: reviewValue,
    };
  
    try {
      const method = inputInfo.id ? "PUT" : "POST"; // Use PUT for updates, POST for new reviews
      const response = await fetch("/api/reviews", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputInfo),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit the review.");
      }
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      alert(inputInfo.id ? "Review updated successfully!" : "Review submitted successfully!");
      window.location.href = "/authview"; // Redirect to the reviews page
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <>
      <Header>
        <Button>
          <Link href="/authview">Exit</Link>
        </Button>
        <Button>
          <Link href="/additem">Logout</Link>
        </Button>
      </Header>

      <div className="form-background">
        <div className="background-wrapper"></div>
        <div className="form-container">
          <h1 className="form-title">THE TIPSY BLOGGER</h1>
          <form className="form-fields" onSubmit={submitHandler}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={locationValue}
              onChange={LocationHandler}
            />

            <label htmlFor="barRating">Bar Rating:</label>
            <input
              type="number"
              id="barRating"
              name="barRating"
              value={ratingValue}
              onChange={RatingHandler}
            />

            <label htmlFor="drinkOfChoice">Drink of Choice:</label>
            <input
              type="text"
              id="drinkOfChoice"
              name="drinkOfChoice"
              value={drinkValue}
              onChange={DrinkHandler}
            />

            <label htmlFor="drinkRating">Drink Rating:</label>
            <input
              type="number"
              id="drinkRating"
              name="drinkRating"
              value={drinkRatingValue}
              onChange={DrinkRatingHandler}
            />

            <label htmlFor="review">Review:</label>
            <input
              id="review"
              name="review"
              value={reviewValue}
              onChange={ReviewHandler}
            />

            <button
              type="submit"
              className="submit-button"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
