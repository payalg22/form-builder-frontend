import { Link } from "react-router-dom";
import styles from "./index.module.css";
import React from "react";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.subheading}>Oops! Page not found.</p>
      <p className={styles.msg}>
        The page you are looking for might be invalid, have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/" className={styles.btn}>
        Go to Homepage
      </Link>
      </div>
    </div>
  );
}
