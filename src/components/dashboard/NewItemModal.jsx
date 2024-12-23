import React, { useState } from "react";
import styles from "./NewItemModal.module.css";
import Popup from "reactjs-popup";

export default function NewItemModal({ item, ele, isDark }) {
  const [newItem, setNewItem] = useState("");

  const handleChange = (e) => {
    setNewItem(e.target.value)
  }

  return (
    <Popup modal trigger={ele} overlayStyle={{ backgroundColor: "transparent" }} >
      {(close) => (
        <form className={(isDark ? styles.dark : styles.light) + ` ${styles.container}`}>
          <p>{`Create New ${item}`}</p>
          <input
          className={styles.input}
            type="text"
            value={newItem}
            placeholder={`Enter ${item.toLowerCase()} name`}
            onChange={handleChange}
          />
          <div>
            <button className={styles.done}>Done</button>
            <button onClick={close}>Cancel</button>
          </div>
        </form>
      )}
    </Popup>
  );
}
