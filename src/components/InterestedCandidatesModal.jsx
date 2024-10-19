import React from 'react';
import './Modal.css'; // Custom styles for modal

const InterestedCandidatesModal = ({ job, onClose, onJobAssigned }) => {
    if (!job) return null; // If no job is selected, return nothing

    // Function to handle marking the job as assigned
    const AssignHandler = async (job, candidateEmail) => {
        try {
            // First, mark the job as assigned (set `marked` to true)
            const assignJobResponse = await fetch(`http://localhost:4000/api/v1/markjob/${job._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ marked: true }), // Update job as marked
            });
    
            if (!assignJobResponse.ok) {
                throw new Error('Failed to assign the job');
            }
            
            console.log(candidateEmail);
            // Second, update the user's `jobsInterested` field
            const updateUserJobsResponse = await fetch('http://localhost:4000/api/v1/yourwork', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: candidateEmail, // Email of the candidate
                    jobId: job._id, // The job ID to add to the user's jobsInterested array
                }),
            });
    
            if (!updateUserJobsResponse.ok) {
                throw new Error('Failed to update user\'s interested jobs');
            }
    
            const updatedUser = await updateUserJobsResponse.json();
    
            // Trigger the callback to inform the parent component if needed
            // onJobAssigned(updatedJob);
    
            console.log("Job successfully assigned and user updated:", updatedUser);
        } catch (error) {
            console.error('Error assigning job or updating user:', error);
        }
    };
    

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2 className="text-2xl font-bold mb-4 text-green-500">Interested Candidates</h2>
                <p className="mb-4"><strong>Job Title:</strong> {job.jobTitle}</p>
                <ul>
                    {job.interestedCandidateEmails && job.interestedCandidateEmails.length > 0 ? (
                        job.interestedCandidateEmails.map((email, index) => (
                            <div key={index}>
                                <li className="text-lg">
                                    {email}
                                </li>
                                {/* Assign button to mark the job */}
                                <button onClick={() => AssignHandler(job,email)} className="mt-2 bg-green-500 text-white py-1 px-3 rounded">
                                    Assign
                                </button>
                                <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">View Rating</button>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg text-red-500">No interested candidates yet.</p>
                    )}
                </ul>
                <button onClick={onClose} className="mt-6 bg-red-500 text-white py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default InterestedCandidatesModal;
