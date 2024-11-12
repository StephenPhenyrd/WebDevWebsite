import styles from "./Item.module.css"
import Image from "next/image"

interface DummyProps {
    image: string;
    title: string;
    text: string;
}

export default function Item(props: DummyProps) {
    return(
    <div className={styles.card}>
        <Image src={props.image} alt="dummyPic" width = "40" height = "40" />
        <h3><strong>Location: </strong>{props.title}</h3>
        <p><strong>Review: </strong> {props.text}</p>
    </div>
    );
}