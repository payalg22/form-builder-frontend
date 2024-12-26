import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Landing, Login, Register, Settings } from "./pages/index";
import { useEffect, useState } from "react";
import { useApp } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import ShareWorkspace from "./pages/share/ShareWorkspace";
import FormWorkspace from "./pages/workspace/FormWorkspace";

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
            <Route path="/login/:id?/:role?" element={<Login />} />
            <Route path="/register/:id?/:role?" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/share/:id/:role" element={<ShareWorkspace />} />
            <Route path="/form">
              <Route path="edit/:id" element={<FormWorkspace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
