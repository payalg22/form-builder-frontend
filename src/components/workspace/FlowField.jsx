import React, { useEffect, useState } from "react";
import styles from "./FlowField.module.css";
import { remove } from "../../assets/index";

export default function FlowField({ field, handleChange, handleDelete }) {
  const { placeholder, label, inputType, _id, error } = field;
  const [isError, setIsError] = useState(error || false);

  const handleIsErr = (e) => {
    if (!e.target.value) {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsError(error);
  }, [error]);

  useEffect(() => {
    setIsError(false);
  }, [placeholder]);

  return (
    <div className={styles.container}>
      <img
        src={remove}
        className={styles.delete}
        onClick={() => handleDelete(_id, inputType)}
      />
      <p>{label}</p>
      {inputType === "bubble" ||
      inputType === "image" ||
      inputType === "submit" ? (
        <>
          <input
            className={styles.input}
            type="text"
            value={placeholder}
            placeholder={
              inputType === "image" ? "Click to add link" : "Click here to edit"
            }
            onChange={(e) => {
              handleChange(_id, e.target.value);
            }}
            onBlur={handleIsErr}
          />
          {isError && <p className={styles.error}>Required field</p>}
        </>
      ) : (
        <p className={styles.hint}>
          Hint : User will
          {inputType === "date"
            ? ` select a date`
            : ` input ${inputType} on his form`}
        </p>
      )}
    </div>
  );
}
