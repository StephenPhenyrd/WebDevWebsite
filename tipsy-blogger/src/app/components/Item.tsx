"use client";
import styles from "./Item.module.css";
import { useRouter } from "next/navigation";

interface DummyProps {
  title: string;
  barRating: string;
  drinkChoice: string;
  drinkRating: string;
  review: string;
  id: string; // Add `id` for Edit/Delete operations
  onDelete: (id: string) => void; // Prop for delete handler
}

export default function Item(props: DummyProps) {
  const router = useRouter();

  const handleEditClick = () => {
    // Navigate to the Add Item page with pre-filled values for editing
    router.push(
      `/additem?id=${props.id}&location=${encodeURIComponent(props.title)}&barRating=${encodeURIComponent(
        props.barRating
      )}&drinkChoice=${encodeURIComponent(props.drinkChoice)}&drinkRating=${encodeURIComponent(
        props.drinkRating
      )}&review=${encodeURIComponent(props.review)}`
    );
  };

  const handleDeleteClick = async () => {
    try {      

      const response = await fetch(`/api/reviews`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: props.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the review.");
      }

      const result = await response.json();
      console.log("Deleted review:", result);
      router.push('/');
      router.push('/authview');
    } catch (error) {
      console.error("Error deleting the review:", error);
    }
  };

  return (
    <div className={styles.card}>
      <h3>
        <strong>Location: </strong>
        {props.title}
      </h3>
      <p>
        <strong>Bar Rating: </strong>
        {props.barRating}
      </p>
      <p>
        <strong>Drink of Choice: </strong>
        {props.drinkChoice}
      </p>
      <p>
        <strong>Drink Rating: </strong>
        {props.drinkRating}
      </p>
      <p>
        <strong>Overall Review: </strong>
        {props.review}
      </p>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {/* Edit Button */}
        <button className={styles.button} onClick={handleEditClick}>
          ✏️ Edit
        </button>
        {/* Delete Button */}
        <button className={styles.button} onClick={handleDeleteClick}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
  



