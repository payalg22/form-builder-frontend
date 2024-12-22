import axios from "axios";
import { handleApiRes } from "./help";

const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export async function getWorkspace() {
  try {
    const response = await axios.get(`${API_URL}/workspace`, {
      headers: {
        Authorization: token,
      },
    });
    return handleApiRes(response);
  } catch (error) {
    return handleApiRes(error.response);
  }
}

export async function getWorkspaceData(id) {
  try {
    const response = await axios.get(`${API_URL}/workspace/data/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return handleApiRes(response);
  } catch (error) {
    return handleApiRes(error.response);
  }
}
