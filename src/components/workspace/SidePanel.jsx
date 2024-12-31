import React from "react";
import styles from "./SidePanel.module.css";
import { bubbleLabels, inputLabels } from "../../data/index";

function Label({ field, handleClick }) {
  const { icon, label } = field;
  return (
    <div
      className={styles.label}
      onClick={() => {
        handleClick(field);
      }}
    >
      <img src={icon} />
      <p>{label}</p>
    </div>
  );
}

export default function SidePanel({ handleAddElement }) {
  return (
    <div className={styles.container}>
      <p>Bubbles</p>
      <div className={styles.bubbles}>
        {bubbleLabels.map((field, idx) => {
          return (
            <Label key={idx} field={field} handleClick={handleAddElement} />
          );
        })}
      </div>
      <p>Inputs</p>
      <div className={styles.inputs}>
        {inputLabels.map((field, idx) => {
          return (
            <Label key={idx} field={field} handleClick={handleAddElement} />
          );
        })}
      </div>
    </div>
  );
}
