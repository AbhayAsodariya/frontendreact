import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditData() {
  const { id } = useParams(); // Get the ID from the route parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    work: "",
    mobile: "",
    address: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DB_URL}/person/person/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_DB_URL}/person/${id}`, // Use the ID in the URL for the PUT request
        formData // Send the form data for the update
      );
      if (response.status === 200) {
        alert("Successfully updated data.");
        navigate("/"); // Navigate back to the main page or table
      } else {
        alert("Failed to update data.");
      }
    } catch (error) {
      setError("An error occurred while updating data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border dark:text-black border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <input
          type="text"
          name="work"
          placeholder="[chef, manager, waiter] any one"
          value={formData.work}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Enter your mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Enter your salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:text-black rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default EditData;
