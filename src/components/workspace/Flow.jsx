import React, { useEffect, useState } from "react";
import styles from "./Flow.module.css";
import SidePanel from "./SidePanel";
import { flag, flagLight, remove } from "../../assets/index";
import FlowField from "./FlowField";

export default function Flow({formFlow, handleAddElement, handleDeleteField, handleBubble}) {
//   const [formFlow, setFormFlow] = useState([]);
//   const [pointer, setPointer] = useState({});

//   const handleAddElement = (ele) => {
//     let addPointer = { ...pointer };
//     const type = ele.type;
//     addPointer[type] = type in pointer ? pointer[type] + 1 : 1;
//     setPointer(addPointer);
//     console.log(addPointer);

//     const newEle = {
//       _id: Date.now(),
//       label: `${type} ${addPointer[type]}`,
//       placeholder: ele.placeholder,
//       inputType: ele.type === "Phone" ? "tel" : ele.type.toLowerCase(),
//     };
//     newEle.inputType = ele.type === "Buttons" ? "submit" : newEle.inputType;
//     setFormFlow([...formFlow, newEle]);
//   };

//   const handleBubble = (id, placeholder) => {
//     setFormFlow(
//       formFlow.map((field) =>
//         field._id === id ? { ...field, placeholder: placeholder } : field
//       )
//     );
//   };

//   const handleDeleteField = (id) => {
//     setFormFlow(formFlow.filter((field) => field._id !== id));
//   };

  return (
    <div className={styles.container}>
      <div className={styles.sidepanel}>
        <SidePanel handleAddElement={handleAddElement} />
      </div>
      <div className={styles.workspace}>
        <div className={styles.start}>
          <img src={flagLight} />
          <p>Start</p>
        </div>
        {formFlow.map((field) => {
          return (
            <FlowField
              key={field._id}
              field={field}
              handleChange={handleBubble}
              handleDelete={handleDeleteField}
            />
          );
        })}
      </div>
    </div>
  );
}
