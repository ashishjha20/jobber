import React, { useEffect, useState, useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import './YourJobs.css';
import { useNavigate } from "react-router-dom";
import InterestedCandidatesModal from './InterestedCandidatesModal'; // Import the modal component

const YourJobs = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [error, setError] = useState(''); // State to store any errors
    const [selectedJob, setSelectedJob] = useState(null); // State to control which job's interested candidates to show
    const [showMarked, setShowMarked] = useState(false); // State to toggle between showing all and marked jobs
    const { emails } = useContext(EmailContext);
    const navigate = useNavigate();

    // Navigate to add job page
    function AddJobHandler() {
        navigate("/addjobs");
    }

    // Handle displaying interested candidates
    function InterestedHandler(job) {
        setSelectedJob(job); // Set the job to show its interested candidates in the modal
    }

    // Close the modal
    function closeModal() {
        setSelectedJob(null); // Close the modal by resetting selected job
    }

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
                console.log(response);
                throw new Error("Failed to fetch jobs data");
            }

            const result = await response.json();
            const filteredJobs = result.data.filter(job => job.email === emails);

            setJobs(filteredJobs); // Set the filtered jobs

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

    // Toggle showing marked jobs
    function toggleShowMarked() {
        setShowMarked(!showMarked);
    }

    return (
        <div className="container">
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error if exists */}

            {jobs.length === 0 ? (
                <p className="text-center text-green-500 text-lg">No jobs available. Please click on Add Job button to add jobs.</p>
            ) : (
                <div className="job-list mt-6">
                    <h2 className="text-3xl font-bold text-green-500 mb-4 text-center">Your Jobs</h2>

                    {/* Button to toggle between marked and all jobs */}
                    <button
                        onClick={toggleShowMarked}
                        className="mb-6 bg-purple-500 text-white py-2 px-4 rounded"
                    >
                        {showMarked ? "Show Assigned Jobs" : "Show Unassigned Jobs"}
                    </button>

                    <ul className="space-y-4">
                        {jobs
                            .filter(job => showMarked ? !job.marked : job.marked) // Filter based on marked/unmarked status
                            .map((job, index) => (
                                <div key={index}>
                                    <li className="bg-gray-800 p-6 rounded-lg shadow-md">
                                        <p className="text-green-500 text-xl"><strong>Job Title:</strong> {job.jobTitle}</p>
                                        <p className="text-lg"><strong>Description:</strong> {job.description}</p>
                                        <p className="text-lg"><strong>Salary:</strong> {job.salary ? job.salary : 'Not provided'}</p>
                                        <p className="text-lg"><strong>Role:</strong> {job.role}</p>
                                        <p className="text-lg"><strong>Work Type:</strong> {job.workType}</p>
                                        <p className="text-lg"><strong>Requirements:</strong> {job.requirements && job.requirements.length > 0 ? job.requirements.join(', ') : 'No specific requirements'}</p>
                                    </li>

                                    {/* Conditional rendering for "View Interested Candidates" button */}
                                    {!job.marked && (
                                        <button
                                            onClick={() => InterestedHandler(job)}
                                            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                                        >
                                            View Interested Candidates
                                        </button>
                                    )}
                                </div>
                            ))}
                    </ul>


                    <button
                        onClick={AddJobHandler}
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Job
                    </button>
                </div>
            )}

            {/* Modal for showing interested candidates */}
            {selectedJob && (
                <InterestedCandidatesModal job={selectedJob} onClose={closeModal} />
            )}
        </div>
    );
};

export default YourJobs;
