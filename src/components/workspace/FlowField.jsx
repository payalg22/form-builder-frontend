import React, { forwardRef, useEffect, useState } from "react";
import styles from "./FlowField.module.css";
import { remove } from "../../assets/index";

const FlowField = forwardRef(({ field, handleChange, handleDelete }, ref) => {
  const { placeholder, label, inputType, _id, error } = field;
  const [isError, setIsError] = useState(error || false);

  //Check if image is accessible
  const isValidImg = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false); 
      img.src = url;
    });
};

  const handleIsErr = async (e) => {
    if (!e.target.value) {
      setIsError("Required Field");
    } else if (inputType === "image") {
      const url = e.target.value;
        const isValid = await isValidImg(url);  
        !isValid && setIsError("Image URL not accessible");
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
            ref={ref}
          />
          {isError && <p className={styles.error}>{isError}</p>}
        </>
      ) : (
        <p className={styles.hint} ref={ref}>
          Hint : User will
          {inputType === "date"
            ? ` select a date`
            : ` input ${inputType} on his form`}
        </p>
      )}
    </div>
  );
});

export default FlowField;
