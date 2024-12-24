import React from "react";
import styles from "./FormStack.module.css";
import { add } from "../../assets/index";
import DeletePopup from "./DeletePopup";
import NewItemModal from "./NewItemModal";

export default function FormStack({ isEditor }) {

  return (
    <div className={styles.container}>
      {isEditor && (
        <NewItemModal ele={<div className={styles.newform}>
          <img src={add} />
          <p>Create a typebot</p>
        </div>} item={"Form"} />
      )}
      <div className={styles.form}>
        <div className={styles.delete}>
          <DeletePopup item={"form"} />
        </div>
        <p>Form</p>
      </div>
    </div>
  );
}
