import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for job form
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [date, setDate] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [response, setResponse] = useState('')
  
  // State for job list
  const [jobs, setJobs] = useState([])
  
  // State to control form visibility
  const [showForm, setShowForm] = useState(false)

  // Load jobs from database on component mount
  useEffect(() => {
    // This is where you'd fetch your jobs from a database
    loadJobsFromDatabase()
  }, [])

  // Function to load jobs from database
  const loadJobsFromDatabase = async () => {
    try {
      // Replace this with your actual database fetch code
      // const response = await fetch('your-api-endpoint')
      // const data = await response.json()
      // setJobs(data)
      
      // For now, using mock data
      setJobs([
        { id: 1, company: 'Tech Corp', position: 'Frontend Developer', date: '2025-03-10', jobLink: 'https://example.com/job1' },
        { id: 2, company: 'DevCo', position: 'React Developer', date: '2025-03-12', jobLink: 'https://example.com/job2' }
      ])
    } catch (error) {
      console.error('Error loading jobs:', error)
    }
  }

  // Function to add a new job
  const handleAddJob = async (e) => {
    e.preventDefault()
    
    const newJob = {
      id: Date.now(), // temporary ID
      company,
      position,
      date,
      jobLink
    }
    
    try {
      // Here you would send the new job to your database
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newJob)
      // })
      // const savedJob = await response.json()
      
      // Update local state
      setJobs([...jobs, newJob])
      
      // Clear form
      setCompany('')
      setPosition('')
      setDate('')
      setJobLink('')
      
      // Hide the form after submission
      setShowForm(false)
    } catch (error) {
      console.error('Error saving job:', error)
    }
  }

  return (
    <div className="app-container">
      <h1>Job Application Tracker</h1>
      
      {/* Job Listing */}
      <div className="job-list-container">
        <div className="job-list-header">
          <h2>Your Job Applications</h2>
          <button className="add-job-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Job'}
          </button>
        </div>
        
        {/* Job Entry Form - Only visible when showForm is true */}
        {showForm && (
          <div className="job-form-container">
            <form onSubmit={handleAddJob}>
              <div className="form-group">
                <label>Company:</label>
                <input 
                  type="text" 
                  value={company} 
                  onChange={(e) => setCompany(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Position:</label>
                <input 
                  type="text" 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Date Applied:</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Job Link:</label>
                <input 
                  type="url" 
                  value={jobLink} 
                  onChange={(e) => setJobLink(e.target.value)} 
                />
              </div>
              
              <button type="submit">Save Job</button>
            </form>
          </div>
        )}
        
        {/* Job Table */}
        <table className="job-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Date Applied</th>
              <th>Job Link</th>
              <th>Response</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.company}</td>
                  <td>{job.position}</td>
                  <td>{job.date}</td>
                  <td>
                    <a href={job.jobLink} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </td>
                  <td>{job.response}
                    <select options = {['Pending', 'Accepted', 'Rejected']} value={response} onChange={(e) => setResponse(e.target.value)} required>
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => console.log('Edit job', job.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => {
                      setJobs(jobs.filter(j => j.id !== job.id))
                      // Here you would also delete from your database
                    }}>Delete</button>
                  </td>
                </tr>
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
    </div>
  )
}

export default App