import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";
import {
  back,
  rightcircle,
  bottomcircle,
  triangle,
  triangletop,
  google,
} from "../../assets/index";
import Form from "./Form";

export default function User({ isLogin, fields, action, path }) {
  const navigate = useNavigate();
  const label = isLogin ? "Log In" : "Sign Up";
  const link = isLogin ? "Register Now" : "Login";
  const display = isLogin ? "Don't" : "Already";

  return (
    <div className={styles.container}>
      <img src={rightcircle} className={styles.right} />
      <div className={styles.triangle}>
        <img src={triangle} className={styles.left} />
        <img src={triangletop} className={styles.top} />
      </div>
      <div className={styles.main}>
        <img src={back} className={styles.back} onClick={() => navigate(-1)} />
        <form className={styles.form} onSubmit={action}>
          <Form fields={fields} />
          <input type="submit" className={styles.submit} value={label} />
          <p>OR</p>
          <div className={styles.submit}>
            <img src={google} className={styles.google} />
            <p>{label} with Google</p>
          </div>
          <p className={styles.footer}>
            {display} have an account?{" "}
            <span onClick={() => navigate(path)}>{link}</span>
          </p>
        </form>
      </div>
      <img src={bottomcircle} className={styles.bottom} />
    </div>
  );
}
