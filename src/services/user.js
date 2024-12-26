import axios from "axios";
import { handleApiRes } from "./help";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUser() {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    });
    return handleApiRes(response);
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function updateUser(details) {
  const token = localStorage.getItem("token");
  const data = JSON.stringify(details);
  try {
    const response = await axios.put(`${API_URL}/user/update`, data, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
}

export async function setTheme(theme) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_URL}/user/theme/${theme}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
}
