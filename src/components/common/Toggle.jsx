import React, { useEffect, useState } from "react";
import styles from "./Toggle.module.css";
import { useApp } from "../../context/AppContext";

export default function Toggle() {
  const { toggleTheme } = useApp();

  return (
    <div className={styles.container}>
      <p>Light</p>
      <div className={styles.bar} onClick={toggleTheme}>
        <div className={styles.toggle}></div>
      </div>
      <p>Dark</p>
    </div>
  );
}
