import React from 'react';
import JobItem from './JobItem';

function JobList({ jobs, onDeleteJob, onEditJob, onStatusChange }) {
  return (
    <div className="job-list-container">
      <table className="job-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Location</th>
            <th>Position</th>
            <th>Date Applied</th>
            <th>Job Link</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map(job => (
              <JobItem 
                key={job.id} 
                job={job} 
                onDelete={onDeleteJob}
                onEdit={onEditJob}
                onStatusChange={onStatusChange}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-message">
                No job applications yet. Add your first job application!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;