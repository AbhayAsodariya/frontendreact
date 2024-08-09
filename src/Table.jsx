import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function Table() {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DB_URL}/person`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`); // Navigate to the EditData component with item ID
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DB_URL}/person/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete item.");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("name")}
            >
              Name {getSortArrow("name")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("age")}
            >
              Age {getSortArrow("age")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("work")}
            >
              Work {getSortArrow("work")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("mobile")}
            >
              Mobile {getSortArrow("mobile")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("email")}
            >
              Email {getSortArrow("email")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("address")}
            >
              Address {getSortArrow("address")}
            </th>
            <th
              className="p-2 border border-gray-200 cursor-pointer"
              onClick={() => requestSort("salary")}
            >
              Salary {getSortArrow("salary")}
            </th>
            <th className="p-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="even:bg-gray-50 dark:even:bg-gray-800"
            >
              <td className="p-2 border border-gray-200">{item.name}</td>
              <td className="p-2 border border-gray-200">{item.age}</td>
              <td className="p-2 border border-gray-200">{item.work}</td>
              <td className="p-2 border border-gray-200">{item.mobile}</td>
              <td className="p-2 border border-gray-200">{item.email}</td>
              <td className="p-2 border border-gray-200">{item.address}</td>
              <td className="p-2 border border-gray-200">{item.salary}</td>
              <td className="p-2 border border-gray-200 flex space-x-2">
                <button
                  onClick={() => handleEditClick(item._id)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
