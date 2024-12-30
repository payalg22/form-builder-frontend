import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import {
  userIcon,
  view,
  hide,
  email,
  logoutIcon,
  lock,
} from "../../assets/index";
import { getUser, updateUser } from "../../services/user";
import { validateUpdate } from "../../utils/validate";
import { logout } from "../../utils/session";
import notify from "../../utils/notify";
import { useApp } from "../../context/AppContext";

const Field = ({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { type, placeholder, value, onChange, error, icon } = field;
  const inputType = type === "password" && isVisible ? "text" : type;

  const handleViewPass = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div
        className={
          error ? `${styles.error} ${styles.inputbox}` : styles.inputbox
        }
      >
        <img src={icon} />
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <img
            className={styles.show}
            src={isVisible ? hide : view}
            onClick={handleViewPass}
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default function Settings() {
  const { user } = useApp();
  const [formData, setFormData] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    oldPassword: false,
    newPassword: false,
  });
  // const [user, setUser] = useState();

  //useEffect(getUserDetails, []);

  useEffect(() => {
    setError({
      name: false,
      email: false,
      oldPassword: false,
      newPassword: false,
    });
  }, [formData]);

  const fields = [
    {
      type: "text",
      placeholder: "Name",
      value: formData.name,
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
      },
      error: error.name,
      icon: userIcon,
    },
    {
      type: "text",
      placeholder: "Update email",
      value: formData.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
      },
      error: error.email,
      icon: email,
    },
    {
      type: "password",
      placeholder: "Old Password",
      value: formData.oldPassword,
      onChange: (e) => {
        setFormData({ ...formData, oldPassword: e.target.value });
      },
      error: error.oldPassword,
      icon: lock,
    },
    {
      type: "password",
      placeholder: "New Password",
      value: formData.newPassword,
      onChange: (e) => {
        setFormData({ ...formData, newPassword: e.target.value });
      },
      error: error.newPassword,
      icon: lock,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name !== user.name ||
      formData.email !== user.email ||
      formData.newPassword ||
      formData.oldPassword
    ) {
      const isValid = validateUpdate(formData);
      if (isValid !== true) {
        setError(isValid);
        return;
      }
      const res = await updateUser(formData);
      if (res.status === 201) {
        setFormData({
          oldPassword: "",
          newPassword: "",
          name: res.name,
          email: res.email,
          _id: res._id,
        });
        notify("Changes Saved", "success");
      } else if (res.status === 401) {
        setError({ ...error, oldPassword: res.data.message });
      } else if (res.status === 400) {
        setError({ ...error, newPassword: res.data.message });
      } else {
        notify("Something went wrong", "error");
      }
      return;
    }

    notify("No changes to save", "info");
    return;
  };

  return (
    <div className={styles.container}>
      <p>Settings</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {fields.map((item, idx) => {
          return <Field key={idx} field={item} />;
        })}
        <input type="submit" className={styles.submit} value="Update" />
      </form>
      <div className={styles.logout} onClick={logout}>
        <img src={logoutIcon} />
        <span>Log out</span>
      </div>
    </div>
  );
}
