import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Thank You!</p>
      <p className={styles.subheading}>Your response has been submitted</p>
      <Link to="/" className={styles.btn}>
        Go to Homepage
      </Link>
    </div>
  );
}
