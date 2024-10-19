import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    email: "",
    salary: "",
    role: "",
    workType: "",
    description: "",
    requirements: "",
  });

  const [message, setMessage] = useState(""); // To show success or error message
  const [error, setError] = useState(""); // To handle errors
  const navigate=useNavigate();


  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/v1/createJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {

        navigate("/yourjobs")
        setMessage(result.message); // Display success message
        setFormData({
          jobTitle: "",
          company: "",
          email: "",
          salary: "",
          role: "",
          workType: "",
          description: "",
          requirements: "",
        }); // Reset form
      } else {
        setError(result.message); // Display error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Job</h2>

      {/* Display Success or Error Messages */}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="company">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Company Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="salary">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Work Type */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="workType">
            Work Type (e.g., Remote, Onsite)
          </label>
          <input
            type="text"
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="description">
            Job Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="requirements">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
