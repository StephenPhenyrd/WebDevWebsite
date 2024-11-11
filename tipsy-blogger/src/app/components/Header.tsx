import styles from "./Header.module.css"
import Button from "../components/Button"
import Link from "next/link"
import { ButtonHTMLAttributes } from "react";



export default function Header(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <div className={styles.header}>
            Hello
            {props.children}
        </div>
    );
}