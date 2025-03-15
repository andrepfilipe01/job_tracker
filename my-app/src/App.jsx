import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import JobForm from './components/jobForm';
import JobList from './components/jobList';

function App() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobApplications');
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Error parsing saved jobs', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (jobData) => {
    if (editingJob) {
      
      setJobs(jobs.map(job => 
        job.id === jobData.id ? jobData : job
      ));
      setEditingJob(null);
    } else {
    
      setJobs([jobData, ...jobs]);
    }
    
    setShowForm(false);
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="job-list-header">
        <h2>Your Job Applications</h2>
        <button 
          className="add-job-btn" 
          onClick={() => {
            setEditingJob(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add New Job'}
        </button>
      </div>
      
      {showForm && (
        <JobForm 
          onAddJob={handleAddJob} 
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
          initialData={editingJob}
        />
      )}
      
      <JobList 
        jobs={jobs} 
        onDeleteJob={handleDeleteJob}
        onEditJob={handleEditJob}
      />
    </div>
  );
}

export default App;