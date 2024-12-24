import React from "react";
import styles from "./DeletePopup.module.css";
import Popup from "reactjs-popup";
import { remove } from "../../assets/index";
import "./customePopup.style.css";
import { useApp } from "../../context/AppContext";

export default function DeletePopup({ item, handleDelete }) {
  const { isDark } = useApp();
  return (
    <Popup
      trigger={<img src={remove} />}
      overlayStyle={{ backgroundColor: "transparent" }}
      position={"bottom"}
      tooltip={false}
    >
      {(close) => (
        <div
          className={
            (isDark ? styles.dark : styles.light) + ` ${styles.container}`
          }
        >
          <p>{`Are you sure you want to delete this ${item}?`}</p>
          <div>
            <button
              className={styles.done}
              onClick={() => {
                handleDelete();
                close();
              }}
            >
              Confirm
            </button>
            <button onClick={close}>Cancel</button>
          </div>
        </div>
      )}
    </Popup>
  );
}
