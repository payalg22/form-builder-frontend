import React, { useEffect, useState } from "react";
import styles from "./NewItemModal.module.css";
import Popup from "reactjs-popup";
import "./customePopup.style.css";
import { useApp } from "../../context/AppContext";

export default function NewItemModal({ ele, item, handleNew }) {
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState(false);
  const { isDark } = useApp();

  useEffect(() => {
    setError(false);
  }, [newItem]);

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    if (!newItem) {
      setError("Please enter a valid name");
    } else {
      const res = await handleNew(newItem);
      if (res === true) {
        close();
      } else if (!res) {
        close();
      } else {
        setError(res);
      }
    }
  };

  const handleClose = () => {
    setError(false);
    setNewItem("");
  };

  const positionStyle =
    item === "Folder"
      ? {
          top: "165px",
          left: "30px",
        }
      : {};

  return (
    <Popup trigger={ele} position={"right center"} onClose={handleClose}>
      {(close) => (
        <form
          className={
            (isDark ? styles.dark : styles.light) + ` ${styles.container}`
          }
          style={positionStyle}
        >
          <p>{`Create New ${item}`}</p>
          <div>
            <input
              className={styles.input + " " + (error && styles.error)}
              type="text"
              value={newItem}
              placeholder={`Enter ${item.toLowerCase()} name`}
              onChange={handleChange}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div>
            <button
              className={styles.done}
              onClick={(e) => handleSubmit(e, close)}
            >
              Done
            </button>
            <button onClick={close}>Cancel</button>
          </div>
        </form>
      )}
    </Popup>
  );
}
