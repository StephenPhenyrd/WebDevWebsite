/*
import Header from "../components/Header"
import Button from "../components/Button"
import Link from "next/link"
import Item from "../components/Item"
import "./authview.css"



const initialItems = [
    <Item title="1785" barRating="3.9" drinkChoice="Electric Lemonade" drinkRating="3.8" review="Freshman Bar. DJ was good."/>,
    <Item title="Magnolia's" barRating="4.8" drinkChoice="Georgia Peach" drinkRating="4.5" review="Alumni Bar. Drinks were solid, pool tables are a nice touch."/>,
    <Item title="Bourbon" barRating="2.1" drinkChoice="Coors Light" drinkRating="4.0" review="Very crowded. Too many people for the amount of bartenders."/>
  ];

export default function Authview() {
    return(
    <>
    <Header>
            <Button><Link href="/additem">Add New Review</Link></Button>
            <Button><Link href="/logout">Logout</Link></Button>
        </Header> 
    <div className="form-background">
        <div className="background-wrapper">

            </div>
                <div>
        


                    <div className="item-container">   
                    {initialItems.map((item, index) => (
                    <div key={index}>
                    {item}
                    </div>
                    
            
                ))}
                
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
  _id: string;
  location: string;
  barRating: string;
  drinkChoice: string;
  drinkRating: string;
  review: string;
};

export default function Authview() {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews.");
        }
        const data = await response.json();
        console.log("Fetched Reviews:", data); // Debug log
        setReviews(data); // Update state with fetched reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []); // Run only once on component mount

  return (
    <>
      <Header>
        <Button>
          <Link href="/additem">Add New Review</Link>
        </Button>
        <Button>
          <Link href="/logout">Logout</Link>
        </Button>
      </Header>
      <div className="form-background">
        <div className="background-wrapper"></div>
        <div>
          <div className="item-container">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id}>
                  <Item
                    id={review._id}
                    title={review.location}
                    barRating={review.barRating}
                    drinkChoice={review.drinkChoice}
                    drinkRating={review.drinkRating}
                    review={review.review}
                    onDelete={(id) => console.log("Delete Review:", id)} // Replace with actual delete logic
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