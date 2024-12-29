import React, { forwardRef, useEffect, useState } from "react";
import styles from "./FormField.module.css";
import { profile, send } from "../../assets/icons";
import { validateEmail } from "../../utils/validate";
import notify from "../../utils/notify";

const FormField = forwardRef(
  ({ field, index, pointer, handleSend, response }, ref) => {
    const [value, setValue] = useState("");
    const type = field?.inputType === "tel" ? "number" : field?.inputType;

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const handleSendData = () => {
      let val = field.value || value;
      if (type === "email") {
        const isInvalid = validateEmail(val);
        if (isInvalid) {
          notify(isInvalid, "error");
          return;
        }
      } else if (type === "submit") {
        val = field.placeholder;
      } else {
        if (!val) {
          notify(`Please enter ${type}`, "error");
          return;
        }
      }

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
              onKeyDown={handleKeyDown}
              ref={ref}
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
          ref={ref}
        />
      );
    };

    switch (type) {
      case "bubble":
        return (
          <div className={styles.bubble} ref={ref}>
            <img src={profile} className={styles.profile} />
            <p>{field.placeholder}</p>
          </div>
        );
      case "image":
        return (
          <div className={styles.bubble} ref={ref}>
            <img src={profile} className={styles.profile} />
            <img src={field.placeholder} alt="image" className={styles.image} />
          </div>
        );
      case "submit":
        return (
          <button className={styles.submit} onClick={handleSendData} ref={ref}>
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
              <div className={styles.submitted} ref={ref}>{field.value || response}</div>
            )}
          </div>
        );
    }
  }
);

export default FormField;
