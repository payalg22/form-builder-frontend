import React, { useEffect, useRef, useState } from "react";
import styles from "./FormWorkspace.module.css";
import { useParams } from "react-router-dom";
import { getForm, updateForm } from "../../services/form";
import notify from "../../utils/notify";
import Loading from "../../components/common/Loading";
import NavBar from "../../components/workspace/NavBar";
import Flow from "../../components/workspace/Flow";
import Response from "../../components/workspace/Response";

export default function FormWorkspace() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currView, setCurrView] = useState("Flow");
  const [formFlow, setFormFlow] = useState([]);
  const [pointer, setPointer] = useState({});
  const [isNewField, setIsNewField] = useState(false);
  const fieldRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getForm(id, "edit")
      .then((res) => {
        res._id ? setFormData(res) : notify(res.data.message, "error");
        if (res.fields) {
          setFormFlow(res.fields);
          //TODO: Traverse thro exisitng list of fields to track pointer
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setPointer(
      formFlow.reduce((acc, field) => {
        const type = field.inputType;
        acc[type] = type in acc ? acc[type] + 1 : 2;
        return acc;
      }, {})
    );
  }, [formFlow]);

  useEffect(() => {
    if (isNewField) {
      fieldRef.current?.scrollIntoView();
      fieldRef.current?.focus();
      setIsNewField(false);
    }
  }, [isNewField]);

  const handleAddElement = (ele) => {
    if ("submit" in pointer) {
      notify("Fields can't be added after buttons", "warn");
      return;
    }
    const type = ele.type;
    let num = type in pointer ? pointer[type] : 1;
    const prefix = type === "bubble" || type === "image" ? "" : "Input ";
    let label = prefix + ele.label + " " + num;
    const checkIsEle = formFlow.find((field) => field.name === label);
    if (checkIsEle) {
      num += 1;
      label = ele.label + " " + num;
    }
    const newEle = {
      _id: Date.now(),
      label,
      placeholder: ele.placeholder,
      inputType: type,
    };
    setFormFlow([...formFlow, newEle]);
    setIsNewField(true);
  };

  const handleBubble = (id, placeholder) => {
    setIsNewField(false);
    setFormFlow(
      formFlow.map((field) =>
        field._id === id ? { ...field, placeholder: placeholder } : field
      )
    );
  };

  const handleDeleteField = (id, type) => {
    setFormFlow(formFlow.filter((field) => field._id !== id));
  };

  const handleCurrView = (view) => {
    setCurrView(view);
  };

  const handleFormError = (isErr) => {
    setError(isErr);
  }

  const handleSaveForm = async (name) => {
    const isError = formFlow.filter((field) => !field.placeholder);
    if (isError.length) {
      setFormFlow(
        formFlow.map((field) =>
          !field.placeholder ? { ...field, error: "Required Field" } : field
        )
      );
      notify("Please fill required fields", "error");
    } else if (error) {
        notify("Please provide valid image url", "error");
    } else {
      const fields = formFlow.map((field) => {
        return {
          label: field.label,
          placeholder: field.placeholder,
          inputType: field.inputType,
        };
      });
      const form = { ...formData, name, fields };
      const res = await updateForm(form);
      if (res.status === 201) {
        notify("Form Saved", "success");
      } else {
        notify(res.data.message, "error");
      }
    }
  };

  const handleShareForm = () => {
    const base = window.location.origin;
    const link = `${base}/form/publish/${id}`;
    navigator.clipboard.writeText(link);
    notify("Link Copied", "success");
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
          {currView === "Flow" ? (
            <Flow
              formFlow={formFlow}
              handleAddElement={handleAddElement}
              handleBubble={handleBubble}
              handleDeleteField={handleDeleteField}
              fieldRef={fieldRef}
              handleError={handleFormError}
            />
          ) : (
            <Response form={formData} />
          )}
        </div>
      )}
    </>
  );
}
