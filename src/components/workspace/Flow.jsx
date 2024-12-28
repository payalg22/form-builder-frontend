import React from "react";
import styles from "./Flow.module.css";
import SidePanel from "./SidePanel";
import { flag, flagLight } from "../../assets/index";
import FlowField from "./FlowField";
import { useApp } from "../../context/AppContext";

export default function Flow({
  formFlow,
  handleAddElement,
  handleDeleteField,
  handleBubble,
}) {
  const { isDark } = useApp();
  const flagIcon = isDark ? flag : flagLight;

  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <SidePanel handleAddElement={handleAddElement} />
      </div>
      <div className={styles.workspace}>
        <div className={styles.start}>
          <img src={flagIcon} />
          <p>Start</p>
        </div>
        {formFlow.map((field) => {
          return (
            <FlowField
              key={field._id}
              field={field}
              handleChange={handleBubble}
              handleDelete={handleDeleteField}
            />
          );
        })}
      </div>
    </div>
  );
}
