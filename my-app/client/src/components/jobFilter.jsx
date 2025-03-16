import React, { useState } from 'react';

function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    searchTerm: '',
    filterBy: 'all'
  });

  const handleSearchChange = (e) => {
    const updatedFilters = {
      ...filters,
      searchTerm: e.target.value
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleFilterByChange = (e) => {
    const updatedFilters = {
      ...filters,
      filterBy: e.target.value
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="job-filter">
      <input
        type="text"
        placeholder="Search jobs..."
        value={filters.searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <select 
        value={filters.filterBy} 
        onChange={handleFilterByChange}
        className="filter-select"
      >
        <option value="all">All Fields</option>
        <option value="company">Company</option>
        <option value="location">Location</option>
        <option value="position">Position</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default JobFilter;