import axios from "axios";
import { handleApiRes } from "./help";

const API_URL = import.meta.env.VITE_API_URL;

export async function getWorkspace() {
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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

export async function createFolder(data) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_URL}/workspace/folder/new`, data, {
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

export async function deleteFolder(wrkspc, folder) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${API_URL}/workspace/folder/${wrkspc}/${folder}`,
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

export async function shareWorkspace(id, data) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(`${API_URL}/workspace/share/${id}`, data, {
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
  