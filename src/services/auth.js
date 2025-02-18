import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function register(data) {
  try {
    const response = await axios.post(`${API_URL}/user/register`, data, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(data) {
  try {
    const response = await axios.post(`${API_URL}/user/login`, data, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}