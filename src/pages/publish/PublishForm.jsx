import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./PublishForm.module.css";
import Toggle from "../../components/common/Toggle";
import { getForm } from "../../services/form";
import { profile, send } from "../../assets/icons";
import FormField from "../../components/publish/FormField";
import Loading from "../../components/common/Loading";
import { addResponse, newResponse } from "../../services/response";
import notify from "../../utils/notify";

export default function PublishForm() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [form, setForm] = useState([]); //stores complete form
  const [resId, setResId] = useState(); //stores response _id
  const [response, setResponse] = useState([]); //stores responses
  const [pointer, setPointer] = useState(-1); //points to index of last displayed field
  const [dataPointer, setDataPointer] = useState(1);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    getForm(id, "view").then((data) => {
      if (data._id) {
        setForm(data.fields);
        setIsLoading(false);
        inputRef.current?.focus();
      } else if (data.status === 404 || data.status === 400) {
        navigate("*");
      } else {
        notify("Something went wrong. Please try again later", "error");
      }
    });
  }, []);

  useEffect(() => {
    const curr = form[pointer];
    const type = curr?.inputType;
    if (type === "bubble" || type === "image") {
      const bubble = { label: curr.label, value: curr.placeholder };
      setResponse([...response, bubble]);
      const field = { field: bubble };
      addResponse(field, resId).then(() => {
        setPointer(pointer + 1);
      });
    }
  }, [pointer]);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.scrollIntoView();
  }, [pointer, dataPointer]);

  const dataFields = [
    {
      inputType: "bubble",
      placeholder: "Please provide your details to proceed",
    },
    {
      inputType: "text",
      value: userData.name,
      placeholder: "Please enter your name",
      onchange: (e) => {
        setUserData({ ...userData, name: e.target.value });
      },
    },
    {
      inputType: "email",
      value: userData.email,
      placeholder: "Please enter your email",
      onchange: (e) => {
        setUserData({ ...userData, email: e.target.value });
      },
    },
  ];

  const handleSubmit = async (val) => {
    const field = { field: val };
    setResponse([...response, val]);
    const res = await addResponse(field, resId);
    if (form[pointer].inputType === "submit" || pointer + 1 === form.length) {
      navigate("/thank-you");
    } else {
      setPointer(pointer + 1);
    }
  };

  const handleUserData = async () => {
    setDataPointer(dataPointer + 1);
    if (dataPointer === 2) {
      const res = await newResponse(userData, id);
      if (res.status === 201) {
        setResId(res.data.id);
        setPointer(0);
      } else {
        notify(res.data.message, "error");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Toggle />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.main}>
          {dataFields.slice(0, dataPointer + 1).map((field, idx) => {
            return (
              <FormField
                key={idx}
                index={idx}
                field={field}
                pointer={dataPointer}
                handleSend={handleUserData}
                ref={idx === dataPointer ? inputRef : null}
              />
            );
          })}
          {form.slice(0, pointer + 1).map((field, idx) => {
            return (
              <FormField
                key={idx}
                index={idx}
                field={field}
                pointer={pointer}
                handleSend={handleSubmit}
                response={response[idx]?.value}
                ref={idx === pointer ? inputRef : null}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
