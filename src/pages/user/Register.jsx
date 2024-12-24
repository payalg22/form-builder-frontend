import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../../components/user/User";
import { register } from "../../services/auth";
import { validateSignUp } from "../../utils/validate";
import { isLoggedUser } from "../../utils/session";
import notify from "../../utils/notify";
import { useApp } from "../../context/AppContext";

export default function Register() {
  const { id, role } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const { setToken } = useApp();
  const navigate = useNavigate();
  const path = id && role ? `/login/${id}/${role}` : "/login";

  useEffect(() => {
    setError({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  }, [user]);

  useEffect(() => {
    if (isLoggedUser()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateSignUp(user);
    if (validation === true) {
      const res = await register(user);
      if (res.status === 201) {
        const token = res.data.token;
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
        if (res.status === 400) {
          setError({ ...error, email: res.data.message });
        } else {
          notify("Something went wrong", "error");
        }
      }
    } else {
      setError(validation);
    }
  };

  const fields = [
    {
      label: "Username",
      type: "text",
      placeholder: "Enter a username",
      value: user.name,
      onChange: (e) => {
        setUser({ ...user, name: e.target.value });
      },
      error: error.name,
    },
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
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "**********",
      value: user.confirmPassword,
      onChange: (e) => {
        setUser({ ...user, confirmPassword: e.target.value });
      },
      error: error.confirmPassword,
    },
  ];

  return (
    <User isLogin={false} fields={fields} action={handleSubmit} path={path} />
  );
}
