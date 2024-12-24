import React, { useEffect, useState } from "react";
import styles from "./ShareModal.module.css";
import { useApp } from "../../context/AppContext";
import { validateEmail } from "../../utils/validate";
import Popup from "reactjs-popup";
import notify from "../../utils/notify";
import { shareWorkspace } from "../../services/workspace";
import { closeIcon } from "../../assets/index";

export default function ShareModal({ ele, id }) {
  const { isDark } = useApp();
  const [shareTo, setShareTo] = useState({
    email: "",
    role: "edit",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [shareTo]);

  const handleClose = () => {
    setShareTo({
      email: "",
      role: "edit",
    });
    setError(false);
  };

  const handleShareByEmail = async (e, close) => {
    e.preventDefault();
    const isErrEmail = validateEmail(shareTo.email.trim());
    if (isErrEmail) {
      setError(isErrEmail);
      return;
    }
    const data = {
      email: shareTo.email.trim(),
      isEditor: shareTo.role === "edit" ? true : false,
    };
    const res = await shareWorkspace(id, data);
    console.log(res);
    if (res.status === 200) {
      close();
      notify("Shared successfully", "success");
    } else if (res.status === 500) {
      close();
      notify("Something went wrong", "error");
    } else if (res.status === 400) {
      close();
      notify("User already added", "info");
    } else {
      setError(res.data.message);
    }
  };

  const handleShareByLink = (e, close) => {
    e.preventDefault();
    const base = window.location.origin;
    const role = shareTo.role === "edit" ? true : false;
    const link = `${base}/share/${id}/${role}`;
    navigator.clipboard.writeText(link);
    notify("Link Copied", "success");
    close();
  };

  return (
    <Popup trigger={ele} modal onClose={handleClose}>
      {(close) => (
        <form
          className={
            (isDark ? styles.dark : styles.light) + ` ${styles.container}`
          }
        >
          <div>
            <img src={closeIcon} className={styles.close} onClick={close} />
            <label>Invite by Email</label>
            <select
              className={styles.edit}
              value={shareTo.role}
              onChange={(e) => setShareTo({ ...shareTo, role: e.target.value })}
            >
              <option value={"edit"}>Edit</option>
              <option value={"view"}>View</option>
            </select>
          </div>
          <div>
            <input
              className={styles.input + " " + (error && styles.error)}
              type="text"
              value={shareTo.email}
              placeholder={`Enter email id`}
              onChange={(e) =>
                setShareTo({ ...shareTo, email: e.target.value })
              }
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <button
            className={styles.done}
            onClick={(e) => handleShareByEmail(e, close)}
          >
            Send Invite
          </button>
          <label>Invite by link</label>
          <button onClick={(e) => handleShareByLink(e, close)}>
            Copy link
          </button>
        </form>
      )}
    </Popup>
  );
}
