import axios from "axios";
import { handleApiRes } from "./help";

const API_URL = import.meta.env.VITE_API_URL;

export async function getallForms(id) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/form/folder/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function createForm(data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/form/new`, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function getForm(id, mode) {
  try {
    const response = await axios.get(`${API_URL}/form`, {
      params: { mode, id },
    });
    return handleApiRes(response);
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function updateForm(data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.patch(
      `${API_URL}/form/edit/${data._id}`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function deleteForm(id) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(`${API_URL}/form/${id}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return handleApiRes(error.response);
  }
}
