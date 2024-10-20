import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddJobs.css';

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    email: "",
    salary: "",
    role: "",
    workType: "",
    description: "",
    requirements: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        navigate("/yourjobs");
        setMessage(result.message);
        setFormData({
          jobTitle: "",
          company: "",
          email: "",
          salary: "",
          role: "",
          workType: "",
          description: "",
          requirements: "",
          deadline: "",
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div id="add-job-container" className="max-w-md mx-auto p-6 rounded-lg">
      <h2 id="add-job-title" className="text-2xl font-bold text-center mb-4">Add New Job</h2>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} id="add-job-form">
        {/* Left-side fields */}
        <div id="left-side-fields">
          <div id="job-title-field" className="mb-4">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div id="company-field" className="mb-4">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>

          <div id="email-field" className="mb-4">
            <label htmlFor="email">Company Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div id="salary-field" className="mb-4">
            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>

          <div id="role-field" className="mb-4">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Right-side fields */}
        <div id="right-side-fields">
          <div id="deadline-field" className="mb-4">
            <label htmlFor="deadline">Deadline (in days)</label>
            <input
              type="number"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              required
            />
          </div>

          <div id="work-type-field" className="mb-4">
            <label htmlFor="workType">Work Type</label>
            <input
              type="text"
              name="workType"
              value={formData.workType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div id="description-field" className="mb-4">
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            ></textarea>
          </div>

          <div id="requirements-field" className="mb-4">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div id="submit-button-container">
          <button type="submit" id="submit-button">Add Job</button>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
