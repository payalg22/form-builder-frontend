import React from "react";
import styles from "./Form.module.css";

function FormField({ field }) {
  const { type, placeholder, label, value, onChange, error } = field;
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default function Form({ fields, onAction, submit }) {
  return (
    <form className={styles.form} onSubmit={onAction}>
      {fields.map((field, idx) => {
        return <FormField key={idx} field={field} />;
      })}
      <input type="submit" value={submit} className={styles.submit} />
    </form>
  );
}
