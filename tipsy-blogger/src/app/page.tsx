import Header from "./components/Header";
import Button from "./components/Button";
import Link from "next/link";
import React from 'react';
import styles from './components/IntroCard.module.css';
import IntroCard from "./components/IntroCard";
import Item from "./components/Item"

// Dummy array with initial items
const initialItems = [
  <Item image="" title="1785" text="Great Drinks!"/>,
  <Item image="" title="Magnolia's" text="Amazing Environment"/>,
  <Item image="" title="Bourbon" text="Fun People"/>
];

export default function Home() {
  return (
    <div className="background">
      {/* Header component with navigation buttons */}
      <Header>
        <Button><Link href="/authview">Login</Link></Button>
        <Button><Link href="/additem">Sign Up</Link></Button>
      </Header>
      <IntroCard />

      
      {/* IntroCard section to display item components 
      <div>
        {initialItems.map((item, index) => (
          <div key={index} className={styles.intro}>
            <img src={item.image} alt={item.title} style={{ width: '100%' }} />
            <div className={styles.container}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
*/}
    </div>
    
    
  );
}
