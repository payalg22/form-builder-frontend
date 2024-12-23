import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Landing, Login, Register, Settings } from "./pages/index";
import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, setTheme] = useState("dark");
  const { isDark } = useApp();

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={`main ${theme}`}>
      <ToastContainer theme={theme} />
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/:referenceid" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
