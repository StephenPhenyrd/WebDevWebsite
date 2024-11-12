import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Link from 'next/link';
import './addpage.css';

const Page: React.FC = () => {
  return (
    <>
      <Header>
        <Button>
          <Link href="/authview">Login</Link>
        </Button>
        <Button>
          <Link href="/additem">Sign Up</Link>
        </Button>
      </Header>

      <div className="form-background">
        <div className="background-wrapper">
          
        </div>
        <div className="form-container">
          <h1 className="form-title">THE TIPSY BLOGGER</h1>
          <form className="form-fields">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" />

            <label htmlFor="barRating">Bar Rating:</label>
            <input type="number" id="barRating" name="barRating" />

            <label htmlFor="drinkOfChoice">Drink of Choice:</label>
            <input type="text" id="drinkOfChoice" name="drinkOfChoice" />

            <label htmlFor="drinkRating">Drink Rating:</label>
            <input type="number" id="drinkRating" name="drinkRating" />

            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" />

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
