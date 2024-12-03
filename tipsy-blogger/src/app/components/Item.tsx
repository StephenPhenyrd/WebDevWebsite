
/*
import styles from "./Item.module.css"
import Image from "next/image"

interface DummyProps {
    title: string;
    barRating: string;
    drinkChoice: string;
    drinkRating: string;
    review: string;

}

export default function Item(props: DummyProps) {
    return(
    <div className={styles.card}>
        <h3><strong>Location: </strong>{props.title}</h3>
        <p><strong>Bar Rating: </strong> {props.barRating}</p>
        <p><strong>Drink of Choice: </strong> {props.drinkChoice}</p>
        <p><strong>Drink Rating </strong> {props.drinkRating}</p>
        <p><strong>Overall Review: </strong> {props.review}</p>
    </div>
    );
}
*/

"use client";
import styles from "./Item.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DummyProps {
  image: string;
  title: string;
  text: string;
  id: string;
  barRating: string;
  drink: string;
  drinkRating: string;
  onDelete: (id: string) => void; // Prop for delete handler
}

export default function Item(props: DummyProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(
      `/additem?id=${props.id}&location=${encodeURIComponent(props.title)}&barRating=${encodeURIComponent(
        props.barRating
      )}&drink=${encodeURIComponent(props.drink)}&drinkRating=${encodeURIComponent(
        props.drinkRating
      )}&review=${encodeURIComponent(props.text)}`
    );
  };

  
  return (
    <div className={styles.card}>
      <Image src={props.image} alt="dummyPic" width="40" height="40" />
      <h3>
        <strong>Location: </strong>
        {props.title}
      </h3>
      <p>
        <strong>Review: </strong> {props.text}
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        
        <button className={styles.button} onClick={handleEditClick}>
          ✏️ Edit
        </button>
        
        <button className={styles.button} onClick={() => props.onDelete(props.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
  



}