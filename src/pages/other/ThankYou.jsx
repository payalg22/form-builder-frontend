import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Thank You!</p>
      <p className={styles.subheading}>Your response has been submitted</p>
      <div>
        <button onClick={() => navigate(-1)} className={styles.btn}>
          Submit another response
        </button>
        <button onClick={() => navigate("/")} className={styles.btn}>
          Create your own formBot
        </button>
      </div>
    </div>
  );
}
