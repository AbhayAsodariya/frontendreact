import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-gray-800 dark:bg-white dark:text-gray-800 text-white h-screen flex flex-col transition-all duration-300`}
    >
      <div className="p-4 text-xl font-bold flex items-center justify-between">
        <span className={`${collapsed ? "hidden" : "block"}`}>
          Data Management
        </span>
        <button
          onClick={toggleSidebar}
          className="text-white dark:text-gray-800 focus:outline-none"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-6 w-6" />
          ) : (
            <ChevronLeftIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link
              to="/"
              className="flex items-center p-4 hover:bg-gray-700 transition-colors"
            >
              <HomeIcon className="h-6 w-6 mr-3" />
              <span className={`${collapsed ? "hidden" : "block"}`}>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="flex items-center p-4 hover:bg-gray-700 transition-colors"
            >
              <UserGroupIcon className="h-6 w-6 mr-3" />
              <span className={`${collapsed ? "hidden" : "block"}`}>
                Add Data
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
