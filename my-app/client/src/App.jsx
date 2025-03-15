import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import JobForm from "./components/jobForm";
import JobList from "./components/jobList";
import api from "./api/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // Fetch Jobs from MongoDB
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/"); 
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobs();
  }, []);
  

  const handleAddJob = async (jobData) => {
    if (editingJob) {
      const updatedJob = {
        company: jobData.company,
        location: jobData.location,
        position: jobData.position,
        date: jobData.date,
        status: jobData.status || "Pending",
        job_link: jobData.jobLink,
      };

      try {
        const response = await api.put(`/${editingJob._id}`, updatedJob);
        setJobs(jobs.map((job) => (job._id === editingJob._id ? response.data : job)));
        setEditingJob(null);
      } catch (error) {
        console.error("Error updating job", error);
      }
    } else {
      // Adding a new job
      const newJob = {
        company: jobData.company,
        location: jobData.location,
        position: jobData.position,
        date: jobData.date,
        status: "Pending",
        job_link: jobData.jobLink,
      };

      try {
        const response = await api.post("/", newJob);
        setJobs([...jobs, response.data]);
      } catch (error) {
        console.error("Error adding job", error);
      }
    }

    setShowForm(false);
  };

  const handleDeleteJob = async (_id) => {
    console.log("🛠️ Attempting to delete job with _id:", _id); // Debugging log
  
    if (!_id) {
      console.error("❌ Error: _id is undefined. Check if JobItem is passing the correct _id.");
      return;
    }
  
    try {
      await api.delete(`/${_id}`);  // ✅ FIXED: Removed extra `/jobs`
      setJobs(jobs.filter((job) => job._id !== _id));
    } catch (error) {
      console.error("❌ Error deleting job", error);
    }
  };
  
  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const jobToUpdate = jobs.find((job) => job._id === _id);
      if (!jobToUpdate) return;

      const updatedJob = { ...jobToUpdate, status: newStatus };
      const response = await api.put(`/${_id}`, updatedJob);

      if (response.status === 200) {
        setJobs(jobs.map((job) => (job._id === _id ? response.data : job)));
      }
    } catch (error) {
      console.error("Error updating job status", error);
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
          {showForm ? "Cancel" : "Add New Job"}
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

      <JobList jobs={jobs} onDeleteJob={handleDeleteJob} onEditJob={handleEditJob} onStatusChange={handleStatusChange} />
    </div>
  );
}

export default App;
