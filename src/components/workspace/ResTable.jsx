import React from "react";
import styles from "./ResTable.module.css";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export default function ResTable({ fields, responses }) {
  const getDateTime = (submitted) => {
    const date = new Date(submitted);
    let time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const shortDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
    return `${shortDate}, ${time}`;
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.serial}></th>
          <th className={styles.time}>
            <CalendarTodayOutlinedIcon />
            <span> Submitted at</span>
          </th>
          {fields.map((field) => {
            return <th key={field._id}>{field.label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {responses.map((response, idx) => {
          const extraCells = fields.length - response.fields.length;

          return (
            <tr key={response._id}>
              <td className={styles.serial}>{idx + 1}</td>
              <td>{getDateTime(response.submittedAt)}</td>
              {response.fields.map((field) => {
                return <td key={field._id}>{field.value}</td>;
              })}
              {extraCells > 0 &&
                Array(extraCells)
                  .fill(null)
                  .map((_, idx) => <td key={idx}></td>)}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
