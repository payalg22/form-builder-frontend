import React, { useState } from "react";
import styles from "./Toggle.module.css";
import { useApp } from "../../context/AppContext";

export default function Toggle() {
  const { isDark, toggleTheme } = useApp();
  const [theme, setTheme] = useState(isDark ? "dark" : "light");

  const handleTheme = () => {
    const val = theme === "dark" ? "light" : "dark";
    setTheme(val);
    toggleTheme();
  };

  return (
    <div
      className={
        styles.container + " " + (theme === "dark" ? styles.dark : styles.light)
      }
    >
      <p>Light</p>
      <div className={styles.bar} onClick={handleTheme}>
        <div className={styles.toggle}></div>
      </div>
      <p>Dark</p>
    </div>
  );
}
