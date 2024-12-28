import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PublishForm.module.css";
import Toggle from "../../components/common/Toggle";
import { getForm } from "../../services/form";
import { profile, send } from "../../assets/icons";
import FormField from "../../components/publish/FormField";
import Loading from "../../components/common/Loading";

export default function PublishForm() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [form, setForm] = useState([]); //stores complete form
  const [resId, setResId] = useState(); //stores response _id
  const [response, setResponse] = useState([]); //stores responses
  const [pointer, setPointer] = useState(-1); //points to index of last displayed field
  const [dataPointer, setDataPointer] = useState(1);

  useEffect(() => {
    getForm(id, "view").then((data) => {
      if (data._id) {
        console.log(data);
        setForm(data.fields);
        setIsLoading(false);
        //setFlow([data.fields[0]]);
      }
    });
  }, []);

  useEffect(() => {
    console.log(pointer);
    console.log(form.slice(0, pointer + 1));
    const type = form[pointer]?.inputType;
    if (type === "bubble" || type === "image") {
      setResponse([...response, form[pointer]]);
      setPointer(pointer + 1);
    }
  }, [pointer]);

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

  const handleSubmit = (val) => {
    if (form[pointer].inputType === "submit") {
      console.log(response);
      //TODO : connect to backend and "Thank you" page
    } else {
      console.log(val);
      setResponse([...response, val]);
      setPointer(pointer + 1);
    }
  };

  const handleUserData = () => {
    setDataPointer(dataPointer + 1);
    if (dataPointer === 2) {
        //TODO: new response api and store resposne id in resId
      console.log("Hit new response api", userData);
      setPointer(0);
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
