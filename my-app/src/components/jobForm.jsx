import React, { useState, useEffect } from 'react';

function JobForm({ onAddJob, onCancel, initialData }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [date, setDate] = useState('');
  const [jobLink, setJobLink] = useState('');
  const  [location, setLocation] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || '');
      setLocation(initialData.location || '');
      setPosition(initialData.position || '');
      setDate(initialData.date || '');
      setJobLink(initialData.jobLink || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const jobData = {
      id: initialData ? initialData.id : Date.now(),
      company,
      location,
      position,
      date,
      jobLink,
    };
    
    onAddJob(jobData);
    
    setCompany('');
    setLocation('');
    setPosition('');
    setDate('');
    setJobLink('');
  };

  return (
    <div className="job-form-container">
      <h3>{initialData ? 'Edit Job Application' : 'Add New Job Application'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company:</label>
          <input 
            type="text" 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
            required 
          />
        </div>

       <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label>Location:</label>
            <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
            />
        </div>
        </form> 
        
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
            required 
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="save-btn">{initialData ? 'Update' : 'Save'} Job</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;