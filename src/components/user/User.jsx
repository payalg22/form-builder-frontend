import React from "react";
import styles from "./User.module.css";
import back from "../../assets/arrow_back.png";
import rightcircle from "../../assets/semicirlce.png";
import bottomcircle from "../../assets/semicircle_bottom.png";
import triangletop from "../../assets/triangle_front.png";
import triangle from "../../assets/triangle_back.png";

export default function User({ isLogin }) {
  return (
    <div className={styles.container}>
      <img src={rightcircle} className={styles.right} />
      <div className={styles.triangle}>
        <img src={triangle} className={styles.left} />
        <img src={triangletop} className={styles.top} />
      </div>
      <div className={styles.main}>
        <img src={back} className={styles.back} />
        <div className={styles.form}>
          <p>{isLogin ? "Login" : "Register"}</p>
        </div>
      </div>
      <img src={bottomcircle} className={styles.bottom} />
    </div>
  );
}
