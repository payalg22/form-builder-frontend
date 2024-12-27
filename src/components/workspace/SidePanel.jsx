import React from "react";
import styles from "./SidePanel.module.css";
import { bubbleLabels, inputLabels } from "../../data";

function Label({ label, handleClick }) {
  const { icon, type } = label;
  return (
    <div
      className={styles.label}
      onClick={() => {
        handleClick(label);
      }}
    >
      <img src={icon} />
      <p>{type === "Bubble" ? "Text" : type}</p>
    </div>
  );
}

export default function SidePanel({ handleAddElement }) {
  return (
    <div className={styles.container}>
      <p>Bubbles</p>
      <div className={styles.bubbles}>
        {bubbleLabels.map((label, idx) => {
          return (
            <Label key={idx} label={label} handleClick={handleAddElement} />
          );
        })}
      </div>
      <p>Inputs</p>
      <div className={styles.inputs}>
        {inputLabels.map((label, idx) => {
          return (
            <Label key={idx} label={label} handleClick={handleAddElement} />
          );
        })}
      </div>
    </div>
  );
}
