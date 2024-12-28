import React, { useState } from "react";
import styles from "./FormField.module.css";
import { profile, send } from "../../assets/icons";

export default function FormField({
  field,
  index,
  pointer,
  handleSend,
  response,
}) {
  const [value, setValue] = useState("");
  const type = field?.inputType === "tel" ? "number" : field?.inputType;
  const isBubble = type === "bubble" || type === "image";

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSendData = () => {
    const val = isBubble ? field.placeholder : value;
    const data = { label: field.label, value: val };
    handleSend(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendData();
    }
  };

  const renderInput = (type) => {
    return type === "rating" ? (
      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((rate, idx) => (
          <div
            key={idx}
            onClick={() => setValue(rate)}
            className={rate === value ? styles.selected : styles.rate}
          >
            {rate}
          </div>
        ))}
      </div>
    ) : (
      <input
        type={field.inputType}
        value={field.value || value}
        onChange={field.onchange || handleChange}
        onKeyDown={handleKeyDown}
        placeholder={field.placeholder}
        className={styles.input}
      />
    );
  };

  switch (type) {
    case "bubble":
      return (
        <div className={styles.bubble}>
          <img src={profile} className={styles.profile} />
          <p>{field.placeholder}</p>
        </div>
      );
    case "image":
      return (
        <div className={styles.bubble}>
          <img src={profile} className={styles.profile} />
          <img src={field.placeholder} alt="image" className={styles.image} />
        </div>
      );
    case "submit":
      return (
        <button className={styles.submit} onClick={handleSendData}>
          {field.placeholder}
        </button>
      );
    default:
      return (
        <div className={styles.field}>
          {index === pointer ? (
            <div className={styles.inputbox}>
              {renderInput(type)}
              <img
                src={send}
                onClick={handleSendData}
                className={styles.send}
              />
            </div>
          ) : (
            <div className={styles.submitted}>{field.value || response}</div>
          )}
        </div>
      );
  }
}
