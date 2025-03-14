import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for job form
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [date, setDate] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [response, setResponse] = useState('')

  const [jobs, setJobs] = useState([])
  
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    
    loadJobsFromDatabase()
  }, [])

  
  const loadJobsFromDatabase = async () => {
    try {
      
      setJobs([
        { id: 1, company: 'Altice Labs', position: 'Frontend Developer', date: '2025-03-10', jobLink: 'https://alticeLabs.com' }
      ])
    } catch (error) {
      console.error('Error loading jobs:', error)
    }
  }

  const handleAddJob = async (e) => {
    e.preventDefault()
    
    const newJob = {
      id: Date.now(), 
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
      
      setCompany('')
      setPosition('')
      setDate('')
      setJobLink('')
      
      setShowForm(false)
    } catch (error) {
      console.error('Error saving job:', error)
    }
  }

  return (
    <div className="app-container">
      <h1>Job Application Tracker</h1>
      
      <div className="job-list-container">
        <div className="job-list-header">
          <h2>Your Job Applications</h2>
          <button className="add-job-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Job'}
          </button>
        </div>
        
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
                      view 
                    </a>
                  </td>
                  <td>{job.response}
                    <select value = {job.response} onChange={(e) => updateJobResponse(job.id,e.target.value)}>
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