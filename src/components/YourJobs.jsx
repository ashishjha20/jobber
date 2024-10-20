import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../context/EmailContext";
import { useNavigate } from "react-router-dom";
import InterestedCandidatesModal from './InterestedCandidatesModal'; // Import the modal component

const YourJobs = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [error, setError] = useState(''); // State to store any errors
    const [selectedJob, setSelectedJob] = useState(null); // State to control which job's interested candidates to show
    const [showMarked, setShowMarked] = useState(false); // State to toggle between showing all and marked jobs
    const { emails } = useContext(EmailContext);
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);

    
    useEffect(() => {
        // Function to fetch user details and update cnt
        const fetchUserDetails = async () => {
            try {
                // Check if the email is available
                if (!emails) {
                    console.error("Email is undefined in context");
                    return;
                }

                console.log("Fetching user details for:", emails);

                // Fetch user details from the API
                const response = await axios.get(`http://localhost:4000/api/v1/getuser/${emails}`);
                
                // Check if response is successful
                if (response.status === 200) {
                    console.log("User data fetched:", response.data); // Log full response

                    // Extract the necessary data from the response
                    const userData = response.data.data;
                    const { amount } = userData; // Extract amount

                    console.log("User amount:", amount); // Log the amount
                    
                    // Set the amount to display
                    setAmount(amount);
                } else {
                    console.error("Failed to fetch user data:", response.status);
                }

            } catch (error) {
                console.error("Error fetching user details:", error); // Log any errors
            }
        };

        // Call the fetchUserDetails function on component mount
        if (emails) {
            fetchUserDetails();
        } else {
            console.error("No email found in context, unable to fetch user details.");
        }

    }, [emails]);



    useEffect(() => {
        // Function to fetch jobs from the database
        const fetchJobs = async () => {
            try {
                console.log('Fetching jobs...');
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
                console.log('Fetched jobs:', result); // Log fetched jobs

                const filteredJobs = result.data.filter(job => job.email === emails);
                console.log('Filtered jobs:', filteredJobs); // Log filtered jobs

                setJobs(filteredJobs); // Set the filtered jobs
            } catch (error) {
                console.error('Error fetching jobs:', error); // Log the error if any
                setError(error.message);
            }
        };

        // Call fetchJobs when emails is available
        if (emails) {
            console.log('Email context available, fetching jobs for:', emails);
            fetchJobs();
        } else {
            console.log('No email in context yet.');
        }
    }, [emails]); // Re-run the effect when emails change

    // Navigate to add job page
    function AddJobHandler() {
        navigate("/addjobs");
    }

    // Handle displaying interested candidates
    function InterestedHandler(job) {
        console.log('Viewing interested candidates for job:', job); // Log selected job
        setSelectedJob(job); // Set the job to show its interested candidates in the modal
    }

    // Close the modal
    function closeModal() {
        console.log('Closing modal for job:', selectedJob); // Log job for which modal is closing
        setSelectedJob(null); // Close the modal by resetting selected job
    }

    // Toggle showing marked jobs
    function toggleShowMarked() {
        console.log('Toggling show marked:', !showMarked); // Log toggle action
        setShowMarked(!showMarked);
    }

    return (
        <div>
            {/* Add the Header here */}
            <header>
                <div className="container">
                    <div className="logo">
                        <img className="img" src="jobify logo full.png" alt="Jobify Logo" />
                    </div>
                    <nav>
                        <ul>
                            {/* <li><a href="#">Developers</a></li>
                        <li><a href="#">About</a></li> */}
                        </ul>
                    </nav>
                    <div className="header-buttons">
                        <a href="#" className="connect-wallet">Your Wallet : ${amount}</a>
           
                    </div>
                </div>
            </header>
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
                            {showMarked ? "Show Unassigned Jobs" : "Show Assigned Jobs"}
                        </button>

                        <ul className="space-y-4">
                            {jobs
                                .filter(job => showMarked ? job.marked : !job.marked) // Filter based on marked/unmarked status
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
        </div>
    );
};

export default YourJobs;
