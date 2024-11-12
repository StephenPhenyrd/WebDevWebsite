import Header from "./components/Header";
import Button from "./components/Button";
import Link from "next/link";
import React from 'react';
import styles from './components/IntroCard.module.css';

// Dummy array with initial items
const initialItems = [
  {
    image: 'https://via.placeholder.com/150',
    title: 'Item 1',
    text: 'Description for Item 1',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Item 2',
    text: 'Description for Item 2',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Item 3',
    text: 'Description for Item 3',
  },
];

export default function Home() {
  return (
    <div className="background">
      {/* Header component with navigation buttons */}
      <Header>
        <Button><Link href="/authview">Login</Link></Button>
        <Button><Link href="/additem">Sign Up</Link></Button>
      </Header>

      {/* IntroCard section to display item components */}
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
    </div>
  );
}
