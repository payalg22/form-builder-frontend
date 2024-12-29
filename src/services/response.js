import axios from "axios";
import { handleApiRes } from "./help";

const API_URL = import.meta.env.VITE_API_URL;

export const newResponse = async (data, formId) => {
  try {
    const response = await axios.post(
      `${API_URL}/response/new/${formId}`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
};

export const addResponse = async (field, resId) => {
  try {
    const response = await axios.put(
      `${API_URL}/response/edit/${resId}`,
      field,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
};

export const getFormResponses = async (formId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${API_URL}/response/analytics/${formId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return handleApiRes(response);
  } catch (error) {
    return handleApiRes(error.response);
  }
};
