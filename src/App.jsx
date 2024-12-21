import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Landing, Login, Register } from "./pages/index";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login/:referenceid" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
