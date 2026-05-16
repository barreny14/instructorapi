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
    return <h2 style={{ color: "#dc2626" }}>{error}</h2>;
  }

  if (!Array.isArray(instructors)) {
    return (
      <div style={{ padding: "20px", background: "#f8d7da", color: "#721c24", borderRadius: "8px", marginTop: "20px" }}>
        <h2>Oops! Data Mismatch</h2>
        <p>Check your F12 Console. Spring Boot sent something unexpected!</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Instructors</h1>
          <p>These instructors are loaded directly from your Spring Boot database!</p>
        </div>

        {isAdmin && (
          <Link to="/instructors/create">
            <button style={{ padding: "10px 15px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
              Create Instructor
            </button>
          </Link>
        )}
      </div>

      {instructors.length === 0 ? (
        <p>No instructors found on this page.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {instructors.map((instructor) => (
            <div key={instructor.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: 'white', color: 'black' }}>
              <h2 style={{ marginTop: 0, color: '#0f172a' }}>{instructor.name}</h2>
              <p><strong>Specialization:</strong> {instructor.specialization}</p>
              <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
              
              <Link to={`/instructors/${instructor.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                View Details
              </Link>

              {isAdmin && (
                <>
                  <Link to={`/instructors/${instructor.id}/edit`} style={{ display: 'inline-block', marginTop: '10px', marginLeft: '10px', padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                    Edit
                  </Link>

                  <button 
                    onClick={() => handleDelete(instructor.id)}
                    style={{ display: 'inline-block', marginTop: '10px', marginLeft: '10px', padding: '8px 16px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "30px", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
          
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 0}
            style={{ padding: "10px 20px", backgroundColor: currentPage === 0 ? "#ccc" : "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: currentPage === 0 ? "not-allowed" : "pointer", fontWeight: "bold" }}
          >
            ← Previous
          </button>

          <span style={{ fontWeight: "bold" }}>
            Page {currentPage + 1} of {totalPages}
          </span>

          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={currentPage >= totalPages - 1}
            style={{ padding: "10px 20px", backgroundColor: currentPage >= totalPages - 1 ? "#ccc" : "#3b82f6", color: "white", border: "none", borderRadius: "5px", cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer", fontWeight: "bold" }}
          >
            Next →
          </button>
          
        </div>
      )}
    </div>
  );
}

export default InstructorListPage;