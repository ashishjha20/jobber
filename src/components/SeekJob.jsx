import React, { useEffect, useState, useContext } from "react";
import { EmailContext } from "../context/EmailContext"; // Import the EmailContext
import './YourJobs.css';
import { useNavigate } from "react-router-dom";

const SeekJob = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [error, setError] = useState(''); // State to store any errors
    const [message, setMessage] = useState(''); // State to handle success/error messages
    const { emails } = useContext(EmailContext); // Get the email from context
    const navigate = useNavigate();

    // Function to apply for a job
    const ApplyJob = async (job) => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/applyjobs', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: job._id,
                    email: emails,
                }),
            });


            if (!response.ok) {
                throw new Error("Failed to update interested candidates");
            }

            const data = await response.json();
            setMessage(data.message || "Successfully applied!"); // Show success message
            setError(''); // Clear the error message if any
        } catch (error) {
            setError(error.message); // Show error message
            setMessage(''); // Clear the success message if any
        }
    };

    // Function to fetch jobs from the database
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/yourjobs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch jobs data");
            }

            const result = await response.json();
            // Filter only those jobs where `marked` is false
            const unmarkedJobs = result.data.filter(job => !job.marked);
            setJobs(unmarkedJobs); // Set the unmarked jobs
            setError(''); // Clear error if fetch successful
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch job data when the component mounts
    useEffect(() => {
        if (emails) {
            fetchJobs();
        }
    }, [emails]);

    return (
        <div className="container">
            {/* Display success or error message */}
            {message && <p className="text-center text-green-500">{message}</p>}
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error if exists */}

            {jobs.length === 0 ? (
                <p className="text-center text-green-500 text-lg">No jobs available.</p>
            ) : (
                <div className="job-list mt-6">
                    <h2 className="text-3xl font-bold text-green-500 mb-4 text-center">Available Jobs</h2>
                    <ul className="space-y-4">
                        {jobs.map((job, index) => (
                            <li key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                                <p className="text-green-500 text-xl"><strong>Job Title:</strong> {job.jobTitle}</p>
                                <p className="text-lg"><strong>Description:</strong> {job.description}</p>
                                <p className="text-lg"><strong>Salary:</strong> {job.salary ? job.salary : 'Not provided'}</p>
                                <p className="text-lg"><strong>Role:</strong> {job.role}</p>
                                <p className="text-lg"><strong>Work Type:</strong> {job.workType}</p>
                                <p className="text-lg"><strong>Requirements:</strong> {job.requirements && job.requirements.length > 0 ? job.requirements.join(', ') : 'No specific requirements'}</p>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600"
                                    onClick={() => ApplyJob(job)}
                                >
                                    Apply Now
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SeekJob;
