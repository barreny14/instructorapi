import { useEffect, useState } from "react";
import "./App.css";
import InstructorList from "./components/InstructorList";
import { getInstructors } from "./services/instructorService";

function App() {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Step 1: Load data from database when page opens
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getInstructors();
        // Check if data is an array or wrapped in a 'content' object (if using Pageable)
        setInstructors(Array.isArray(data) ? data : data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Step 2: Handle Frontend Filtering
  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Instructor Management System</h1>
        <p>Connected to Spring Boot API</p>
      </header>

      {/* Show loading message while fetching */}
      {loading && <p className="message">Connecting to database...</p>}

      {/* Show error if backend is down */}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by instructor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="clear-btn" onClick={() => setSearchTerm("")}>Clear</button>
          </div>

          <p className="summary">
            Showing {filteredInstructors.length} of {instructors.length} instructors
          </p>

          <InstructorList instructors={filteredInstructors} />
        </>
      )}
    </div>
  );
}

export default App;