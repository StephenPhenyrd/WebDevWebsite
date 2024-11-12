'use client'
import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Link from 'next/link';
import './addpage.css';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { FormEvent } from 'react';

export default function Additem() {
  
  const [locationValue, setLocationValue] = useState<string>("");
  const [ratingValue,setRatingValue]= useState<string>('');
  const [drinkValue,setDrinkValue]=useState<string>('')
  const [drinkRatingValue, setdrinkRatingValue] = useState<string>('')
  const [reviewValue, setReviewValue] = useState<string>('')

  const LocationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value);
  }
  const RatingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(event.target.value);
  }
  const DrinkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDrinkValue(event.target.value);
  }
  const DrinkRatingHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setdrinkRatingValue(event.target.value);
  }
  const ReviewHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReviewValue(event.target.value);
  }
  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(inputInfo);
    setDrinkValue("")
    setLocationValue("")
    setRatingValue("")
    setReviewValue("")
    setdrinkRatingValue("")
  }
  

  const inputInfo =  {
    location: locationValue,
    barRating: ratingValue,
    drink: drinkValue,
    drinkRating: drinkRatingValue,
    review: reviewValue,

  }
 
    

  
  
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
        <div className="background-wrapper">
          
        </div>
        <div className="form-container">
          <h1 className="form-title">THE TIPSY BLOGGER</h1>
          <form className="form-fields">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" value={locationValue} onChange={LocationHandler}/>

            <label htmlFor="barRating">Bar Rating:</label>
            <input type="number" id="barRating" name="barRating" value={ratingValue} onChange={RatingHandler}/>

            <label htmlFor="drinkOfChoice">Drink of Choice:</label>
            <input type="text" id="drinkOfChoice" name="drinkOfChoice" value={drinkValue} onChange={DrinkHandler}/>

            <label htmlFor="drinkRating">Drink Rating:</label>
            <input type="number" id="drinkRating" name="drinkRating" value={drinkRatingValue} onChange={DrinkRatingHandler}/>

            <label htmlFor="review">Review:</label>
            <input id="review" name="review" value={reviewValue} onChange={ReviewHandler}/>

            <button type="submit" className="submit-button" onClick={submitHandler}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};


