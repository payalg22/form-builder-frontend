import React, { useEffect, useState } from "react";
import styles from "./FormWorkspace.module.css";
import { useParams } from "react-router-dom";
import { getForm } from "../../services/form";
import notify from "../../utils/notify";
import Loading from "../../components/common/Loading";
import NavBar from "../../components/workspace/NavBar";

export default function FormWorkspace() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currView, setCurrView] = useState("Flow");

  useEffect(() => {
    getForm(id, "edit")
      .then((res) => {
        console.log(res);
        if (res._id) {
          setFormData(res);
        } else {
          notify(res.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCurrView = (view) => {
    setCurrView(view);
  };

  const handleSaveForm = (name) => {
    console.log(name);
  };

  const handleShareForm = () => {
    const base = window.location.origin;
    const link = `${base}/form/view/${id}`;
    navigator.clipboard.writeText(link);
    notify("Link Copied", "success");
    close();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <NavBar
            name={formData.name}
            currView={currView}
            handleView={handleCurrView}
            handleSave={handleSaveForm}
            handleShare={handleShareForm}
          />
        </div>
      )}
    </>
  );
}
