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