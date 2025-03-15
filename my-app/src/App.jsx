import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import JobForm from './components/jobForm';
import JobList from './components/jobList';
import api from './api/jobs';

function App() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/jobs');
        setJobs(response.data);
      }catch (error){
        console.error('Error fetching jobs', error);
      }
    };
    fetchPosts();
  }, []); 

  const handleAddJob = async (jobData) => {
  // If we're editing an existing job
  if (editingJob) {
    const updatedJob = { 
      id: editingJob.id,
      company: jobData.company,
      location: jobData.location, 
      position: jobData.position,
      date: jobData.date, 
      status: jobData.status || "Pending", 
      job_link: jobData.jobLink
    };
    
    try {
      const response = await api.put(`/jobs/${editingJob.id}`, updatedJob);
      setJobs(jobs.map(job => job.id === editingJob.id ? response.data : job));
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job', error);
    }
  } 
  // If we're adding a new job
  else {
    const id = Date.now().toString();
    const newJob = { 
      id,
      company: jobData.company,
      location: jobData.location, 
      position: jobData.position,
      date: jobData.date, 
      status: "Pending", 
      job_link: jobData.jobLink
    };
    
    try {
      const response = await api.post('/jobs', newJob);
      const allJobs = [...jobs, response.data];
      setJobs(allJobs);
    } catch (error) {
      console.error('Error adding job', error);
    }
  }
  
  setShowForm(false);
};

const handleDeleteJob = async (id) => {
  try {
    const response = await api.delete(`/jobs/${id}`);
    console.log("API delete response:", response);
    
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  } catch (error) {
    console.error('Error deleting job', error);
  }
};

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const jobToUpdate = jobs.find((job) => job.id === id);
      if (!jobToUpdate) return;
  
      const updatedJob = { ...jobToUpdate, status: newStatus };
  
      const response = await api.put(`/jobs/${id}`, updatedJob);
  
      if (response.status === 200) {
        setJobs(jobs.map((job) => (job.id === id ? response.data : job)));
      }
    } catch (error) {
      console.error('Error updating job status', error);
    }
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
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default App;