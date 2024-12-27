import React, { useEffect, useState } from "react";
import styles from "./FormStack.module.css";
import { add } from "../../assets/index";
import DeletePopup from "./DeletePopup";
import NewItemModal from "./NewItemModal";
import { createForm, getallForms } from "../../services/form";
import notify from "../../utils/notify";
import { useNavigate } from "react-router-dom";

export default function FormStack({ isAuthorised, folder, owner }) {
  const [allForms, setallForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getForms();
  }, [folder]);

  const handleNewForm = async (name) => {
    const newForm = { folderId: folder, name, owner };
    console.log(newForm);
    const res = await createForm(newForm);
    console.log(res);
    if (res.status === 201) {
      await getForms();
      notify("Form created", "success");
      return true;
    } else if (res.status === 400) {
      return res.data.message;
    } else {
      notify(res.data.message, "error");
      return false;
    }
  };

  const handleOpenForm = (id) => {
    if (isAuthorised.owner) {
      navigate(`/form/edit/${id}`);
    }
  };

  async function getForms() {
    const res = await getallForms(folder);
    if (res.status === 200) {
      setallForms(res.data);
    } else {
      setallForms([]);
    }
  }

  return (
    <div className={styles.container}>
      {isAuthorised.editor && (
        <NewItemModal
          ele={
            <div className={styles.newform}>
              <img src={add} />
              <p>Create a typebot</p>
            </div>
          }
          item={"Form"}
          handleNew={handleNewForm}
        />
      )}
      {allForms.map((form) => {
        return (
          <div className={styles.form} key={form._id}>
            {isAuthorised.editor && (
              <div className={styles.delete}>
                <DeletePopup item={"form"} />
              </div>
            )}
            <p
              className={isAuthorised.owner ? styles.allowed : styles.blocked}
              onClick={() => handleOpenForm(form._id)}
            >
              {form.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
