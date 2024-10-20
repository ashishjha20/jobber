import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { EmailContext } from "../context/EmailContext";
import { useNavigate } from "react-router-dom";
import InterestedCandidatesModal from './InterestedCandidatesModal'; // Import the modal component
import jobifyLogo from '../images/JOBIFY LOGO FULL.png';

const YourJobs = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [error, setError] = useState(''); // State to store any errors
    const [selectedJob, setSelectedJob] = useState(null); // State to control which job's interested candidates to show
    const [showMarked, setShowMarked] = useState(false); // State to toggle between showing all and marked jobs
    const [jobStatuses, setJobStatuses] = useState({}); // Track each job's status ("accepted" or "issueRaised")
    const { emails } = useContext(EmailContext);
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (!emails) {
                    console.error("Email is undefined in context");
                    return;
                }

                const response = await axios.get(`http://localhost:4000/api/v1/getuser/${emails}`);

                if (response.status === 200) {
                    const userData = response.data.data;
                    const { amount } = userData;

                    setAmount(amount);
                } else {
                    console.error("Failed to fetch user data:", response.status);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (emails) {
            fetchUserDetails();
        } else {
            console.error("No email found in context, unable to fetch user details.");
        }
    }, [emails]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/yourjobs', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("Failed to fetch jobs data");

                const result = await response.json();
                const filteredJobs = result.data.filter(job => job.email === emails);
                setJobs(filteredJobs);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError(error.message);
            }
        };

        if (emails) {
            fetchJobs();
        }
    }, [emails]);

    function AddJobHandler() {
        navigate("/addjobs");
    }

    function InterestedHandler(job) {
        setSelectedJob(job);
    }

    function closeModal() {
        setSelectedJob(null);
    }

    function toggleShowMarked() {
        setShowMarked(!showMarked);
    }

    // Handle Accept button click
    const handleAccept = async (jobId) => {
        try {
            // Make a PUT request to mark job as accepted (without changing issue)
            await axios.put(`http://localhost:4000/api/v1/jobs/${jobId}`, {
                issue: false, // Only mark issue if Raise Issue is clicked
            });

            setJobStatuses((prevStatuses) => ({
                ...prevStatuses,
                [jobId]: "accepted",
            }));
        } catch (error) {
            console.error("Error accepting job:", error);
        }
    };

    // Handle Raise Issue button click
    const handleRaiseIssue = async (jobId) => {
        try {
            // Make a PUT request to mark issue as true for the given job
            await axios.put(`http://localhost:4000/api/v1/markjob1/${jobId}`, {
                issue: true, // Mark issue as true
            });

            setJobStatuses((prevStatuses) => ({
                ...prevStatuses,
                [jobId]: "issueRaised",
            }));
        } catch (error) {
            console.error("Error raising issue for job:", error);
        }
    };

    return (
        <div>
            <header>
                <div className="container">
                    <div className="logo">
                        <img className="img" src={jobifyLogo} alt="Jobify Logo" />
                    </div>
                    <nav>
                        <ul></ul>
                    </nav>
                    <div className="header-buttons">
                        <a href="#" className="connect-wallet">Your Wallet : ${amount}</a>
                    </div>
                </div>
            </header>
            <div className="container">
                {error && <p className="text-red-500 text-center">{error}</p>}

                {jobs.length === 0 ? (
                    <div>
                    <p className="text-center text-green-500 text-lg">No jobs available. Please click on Add Job button to add jobs.</p>
                     <button
                            onClick={AddJobHandler}
                            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Job
                        </button></div>
                ) : (
                    <div className="job-list mt-6">
                       
                        <h2 className="text-3xl font-bold text-green-500 mb-4 text-center">Your Jobs</h2>
                        <div id="topbuttons">
                        <button id="button1"
                            onClick={toggleShowMarked}
                            className="mb-6 bg-purple-500 text-white py-2 px-4 rounded"
                        >
                            {showMarked ? "Show Unassigned Jobs" : "Show Assigned Jobs"}
                        </button>
                        <button id="button1"
                            onClick={AddJobHandler}
                            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Job
                        </button>
                        </div>

                        <ul className="space-y-4">
                            {jobs
                                .filter(job => showMarked ? job.marked : !job.marked)
                                .map((job, index) => {
                                    const createdDate = new Date(job.createdDate);
                                    const deadlineDate = new Date(createdDate);
                                    deadlineDate.setDate(createdDate.getDate() + job.deadline);

                                    const formattedDeadline = deadlineDate.toLocaleDateString();
                                    const currentDate = new Date(); // Get current date

                                    const isPastDeadline = currentDate > deadlineDate;

                                    return (
                                        <li key={index} className="bg-gray-800 p-6 rounded-lg shadow-md">
                                            <p className="text-green-500 text-xl"><strong>Job Title:</strong> {job.jobTitle}</p>
                                            <p className="text-lg"><strong>Description:</strong> {job.description}</p>
                                            <p className="text-lg"><strong>Salary:</strong> {job.salary ? job.salary : 'Not provided'}</p>
                                            <p className="text-lg"><strong>Role:</strong> {job.role}</p>
                                            <p className="text-lg"><strong>Work Type:</strong> {job.workType}</p>
                                            <p className="text-lg"><strong>Requirements:</strong> {job.requirements && job.requirements.length > 0 ? job.requirements.join(', ') : 'No specific requirements'}</p>
                                            <p className="text-lg"><strong>Deadline:</strong> {formattedDeadline}</p>

                                            {isPastDeadline && job.marked && (
                                               <div className="mt-4 button-container" id="teri">
                                               {/* Conditionally render buttons or labels based on job status */}
                                               {jobStatuses[job._id] === "accepted" ? (
                                                   <p className="text-green-500">Accepted</p>
                                               ) : jobStatuses[job._id] === "issueRaised" ? (
                                                   <p className="text-red-500">Issue Raised</p>
                                               ) : (
                                                   <div id= "maki">
                                                       <button
                                                           className="bg-green-500 text-white py-2 px-4 rounded"
                                                           onClick={() => handleAccept(job._id)}
                                                       >
                                                         <p>Accept</p>
                                                       </button>
                                                       <button 
                                                           className="bg-red-500 text-white py-2 px-4 rounded"
                                                           onClick={() => handleRaiseIssue(job._id)}
                                                       >
                                                           <p>Raise Issue</p>
                                                       </button>
                                                   </div>
                                               )}
                                           </div>
                                           
                                            )}

                                            {!job.marked && (
                                                <button
                                                    onClick={() => InterestedHandler(job)}
                                                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                                                >
                                                    View Interested Candidates
                                                </button>
                                            )}
                                        </li>
                                    );
                                })}
                        </ul>

                       
                    </div>
                )}

                {selectedJob && (
                    <InterestedCandidatesModal job={selectedJob} onClose={closeModal} />
                )}
            </div>
        </div>
    );
};

export default YourJobs;
