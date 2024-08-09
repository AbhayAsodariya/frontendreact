import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import "./index.css";
import Table from "./Table";
import AddData from "./AddData";
import EditData from "./EditData";
import Sidebar from "./Sidebar";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div
        className={`flex min-h-screen ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="p-4 text-black dark:text-white border-b-2 font-semibold text-center flex justify-between items-center">
            <h1 className="text-2xl">Data Management App</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded focus:outline-none"
            >
              {darkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </header>
          <main className="p-4 flex-1">
            <Routes>
              <Route path="/" element={<Table />} />
              <Route path="/add" element={<AddData />} />
              <Route path="/edit/:id" element={<EditData />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
