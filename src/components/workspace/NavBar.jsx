import React, { useState } from "react";
import styles from "./NavBar.module.css";
import Toggle from "../common/Toggle";
import { useNavigate } from "react-router-dom";
import { closeIcon } from "../../assets/index";

export default function NavBar({
  name,
  handleView,
  handleSave,
  currView,
  handleShare,
}) {
  const [formName, setFormName] = useState(name);
  const navigate = useNavigate();

  const handleName = (e) => {
    setFormName(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {currView === "Flow" && (
          <input
            type="text"
            value={formName}
            placeholder="Enter Form Name"
            className={styles.input}
            onChange={handleName}
          />
        )}
      </div>
      <div className={styles.view}>
        {["Flow", "Response"].map((option, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                handleView(option);
              }}
              className={currView === option ? styles.selected : null}
            >
              {option}
            </div>
          );
        })}
      </div>
      <div className={styles.menu}>
        <Toggle />
        <button className={styles.share} onClick={handleShare}>
          Share
        </button>
        <button className={styles.save} onClick={() => handleSave(formName)}>
          Save
        </button>
        <img
          src={closeIcon}
          className={styles.close}
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
