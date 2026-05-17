import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInstructors, deleteInstructor } from "../services/instructorApi";

function InstructorListPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1);

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    async function loadInstructors() {
      try {
        setLoading(true); 
        const data = await getAllInstructors(currentPage);
        setInstructors(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
        setError("Could not load instructors. Is Spring Boot running?");
      } finally {
        setLoading(false);
      }
    }
    loadInstructors();
  }, [currentPage]); 

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

  if (loading) {
    return <h2>Loading instructors...</h2>;
  }

  if (error) {
    return <h2 className="error-message">{error}</h2>;
  }

  if (!Array.isArray(instructors)) {
    return (
      <div className="error-box">
        <h2>Oops! Data Mismatch</h2>
        <p>Check your F12 Console. Spring Boot sent something unexpected!</p>
      </div>
    );
  }

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

      {instructors.length === 0 ? (
        <p>No instructors found on this page.</p>
      ) : (
        <div className="card-grid">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="card">
              <h2>{instructor.name}</h2>
              <p><strong>Specialization:</strong> {instructor.specialization}</p>
              <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
              
              <div className="card-actions">
                <Link to={`/instructors/${instructor.id}`}>View Details</Link>

                {isAdmin && (
                  <>
                    <Link to={`/instructors/${instructor.id}/edit`} className="edit-btn">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(instructor.id)} className="delete-btn">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
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