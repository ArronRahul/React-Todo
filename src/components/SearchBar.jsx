import './Search-bar.css';

const SearchBar = ({ updateSearchQuery, updateSortCriteria, updateSortDirection }) => {
  const handleInputChange = (event) => {
    updateSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value.includes('date')) {
      updateSortCriteria('date');
      updateSortDirection(value.includes('asc') ? 'asc' : 'desc');
    }
  };

  return (
    <div className="main-search">
      <form className="search-bar" role="search">
        <input
          onChange={handleInputChange}
          className="form-control me-2"
          type="text"
          placeholder="Search by task name"
          id="search-bar"
          aria-label="Search"
        />
      </form>
      <div className="dropdown-area">
        <p className="sort-by">Sort by :</p>
        <select id="sort-tasks" onChange={handleSortChange}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
