import React from 'react';

function JobItem({ job, onDelete, onEdit, onStatusChange }) {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(job.id, newStatus);
  };

  return (
    <tr>
      <td>{job.company}</td>
      <td>{job.location}</td>
      <td>{job.position}</td>
      <td>{job.date}</td>
      <td>
        <a href={job.job_link} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </td>
      <td>
        <select value={job.status} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Interview">Interview</option>
        </select>
      </td>
      <td className="action-buttons">
        <button className="edit-btn" onClick={() => onEdit(job)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default JobItem;