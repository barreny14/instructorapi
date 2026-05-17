function SearchBox({ searchTerm, onSearchChange, resultCount, totalCount }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, email, specialization, or status..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {searchTerm && (
        <button className="clear-btn" onClick={() => onSearchChange("")}>
          Clear
        </button>
      )}

      <div className="search-stats">
        Showing {resultCount} of {totalCount} instructors
      </div>
    </div>
  );
}

export default SearchBox;