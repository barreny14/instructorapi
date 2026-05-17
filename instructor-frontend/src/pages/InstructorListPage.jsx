import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInstructors, deleteInstructor, searchInstructors } from "../services/instructorApi";
import SearchBox from "../components/SearchBox";
import InstructorCard from "../components/InstructorCard";

function InstructorListPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true); 
        let data;

        if (searchTerm.trim() === "") {
          data = await getAllInstructors(currentPage);
        } 
        else {
          data = await searchInstructors(searchTerm);
        }

        const instructorList = data.content || data;
        setInstructors(instructorList);
        
        setTotalPages(data.totalPages || 1);

      } catch (err) {
        console.error(err);
        setError("Could not load instructors. Is Spring Boot running?");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm]); 

  async function handleDelete(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this instructor?");
    if (!isConfirmed) return;

    try {
      await deleteInstructor(id);
      setInstructors(instructors.filter((instructor) => instructor.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the instructor. Please try again.");
    }
  }

  if (loading) return <h2>Loading instructors...</h2>;
  if (error) return <h2 className="error-message">{error}</h2>;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Instructors</h1>
          <p>These instructors are loaded directly from your Spring Boot database!</p>
        </div>

        {isAdmin && (
          <Link to="/instructors/create">
            <button className="create-btn">Create Instructor</button>
          </Link>
        )}
      </div>

      <SearchBox 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        resultCount={instructors.length}
        totalCount={instructors.length}
      />

      {instructors.length === 0 ? (
        <p>No instructors match your search.</p>
      ) : (
        <div className="card-grid">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              isAdmin={isAdmin}
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 0}
          >
            &larr; Previous
          </button>

          <span className="page-info">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage >= totalPages - 1}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </section>
  );
}

export default InstructorListPage;