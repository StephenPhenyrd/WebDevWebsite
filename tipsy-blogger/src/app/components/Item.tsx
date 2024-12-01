
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
      <button className={styles.button} onClick={handleEditClick}>
      ✏️ Edit
      </button>
    </div>
  );
}
