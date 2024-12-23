import React from "react";
import styles from "./FormStack.module.css";
import { add, remove } from "../../assets/index";

export default function FormStack({isEditor}) {
  return (
    <div className={styles.container}>
     {isEditor && <div className={styles.newform}>
        <img src={add} />
        <p>Create a typebot</p>
      </div>}
      <div className={styles.form}>
        <img src={remove} className={styles.delete} />
        <p>Form</p>
      </div>
    </div>
  );
}
