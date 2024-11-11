import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css"

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  
    return (
        <button className={styles.button}
          type="submit"
          onClick={props.onClick}
        >
          {props.children}
        </button>
      );
    };
    
    export default Button;