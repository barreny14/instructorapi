import { useEffect, useState } from "react";
import "./App.css";
import InstructorList from "./components/InstructorList";
import { getInstructors } from "./services/instructorService";

function App() {
  const [instructors, setInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/v1/instructors?size=20");
        const data = await response.json();
        setInstructors(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredInstructors = instructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    if (sortOption === "experience-asc") {
      return a.yearsOfExperience - b.yearsOfExperience;
    }
    if (sortOption === "experience-desc") {
      return b.yearsOfExperience - a.yearsOfExperience;
    }
    return 0;
  });

  return (
    <div className="container">
      <h1>Instructor Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="toolbar">
            <input
              type="text"
              placeholder="Search instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="sort-select"
            >
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="experience-asc">Experience Low to High</option>
              <option value="experience-desc">Experience High to Low</option>
            </select>

            <button className="clear-btn" onClick={() => setSearchTerm("")}>Clear</button>
          </div>

          <p className="summary">
            Showing {sortedInstructors.length} of {instructors.length} instructors
          </p>

          {/* 5. Pass the SORTED list to the component */}
          <InstructorList instructors={sortedInstructors} />
        </>
      )}
    </div>
  );
}

export default App;