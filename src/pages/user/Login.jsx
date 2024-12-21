import React, { useEffect, useState } from "react";
import User from "../../components/user/User";
import { validateLogin } from "../../utils/validate";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setError({
      email: false,
      password: false,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const validation = validateLogin(user);
    if (validation === true) {
      const response = await login(user);
      if (response.status === 200) {
        const token = response.data.token;
        console.log(token);
        //   localStorage.setItem("token", token);
        //   const userData = await getUser();
        //   setUserInfo(userData.data);
        navigate("/home");
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
  return <User isLogin={true} fields={fields} action={handleSubmit} />;
}
