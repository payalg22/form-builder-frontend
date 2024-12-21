import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Landing, Login, Register } from "./pages/index";
import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";

function App() {
  const [theme, setTheme] = useState("dark");
  const { isDark } = useApp();

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className={`main ${theme}`}>
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/:referenceid" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
