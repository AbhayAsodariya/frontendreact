import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddData() {
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

  const navigate = useNavigate();

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
      const response = await axios.post(
        `${process.env.REACT_APP_DB_URL}/person`,
        formData
      );
      
      if (response.status === 200) {
        navigate("/")
      } else {
        alert("Failed to save data.");
        console.log("hiii");
        
      }
    } catch (err) {
      // alert(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="work"
          placeholder="[chef, manager, waiter] any one"
          value={formData.work}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Enter your mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <input
          type="number"
          name="salary"
          placeholder="Enter your salary"
          value={formData.salary}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border text-black rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 mt-4 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default AddData;
