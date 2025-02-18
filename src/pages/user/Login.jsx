import React, { useEffect, useState } from "react";
import User from "../../components/user/User";
import { validateLogin } from "../../utils/validate";
import { isLoggedUser } from "../../utils/session";
import { login } from "../../services/auth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const { role, id } = useParams();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const { setToken } = useApp();
  const navigate = useNavigate();
  const path = id && role ? `/register/${id}/${role}` : "/register";
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    setError({
      email: false,
      password: false,
    });
  }, [user]);

  useEffect(() => {
    if (isLoggedUser()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLogin(user);
    if (validation === true) {
      const response = await login(user);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        setTimeout(() => {
          if (role && id) {
            navigate(`/share/${id}/${role}`);
          } else {
            navigate("/dashboard");
          }
        }, 1000);
      } else {
        setError({ email: true, password: response.data.message });
      }
    } else {
      setError(validation);
    }
  };

  const fields = [
    {
      label: "Email",
      type: "text",
      placeholder: "Enter your email",
      value: user.email,
      onChange: (e) => {
        setUser({ ...user, email: e.target.value });
      },
      error: error.email,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "**********",
      value: user.password,
      onChange: (e) => {
        setUser({ ...user, password: e.target.value });
      },
      error: error.password,
    },
  ];
  return (
    <User isLogin={true} fields={fields} action={handleSubmit} path={path} />
  );
}
