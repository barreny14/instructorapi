import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInstructors, deleteInstructor, searchInstructors } from "../services/instructorApi";
import SearchBox from "../components/SearchBox";
import InstructorCard from "../components/InstructorCard";
import Pagination from "../components/Pagination";

function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1); 

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true); 
        setError(""); 
        let data;

        const apiPage = currentPage - 1; 

        if (searchTerm.trim() === "") {
          data = await getAllInstructors(apiPage, pageSize);
        } else {
          data = await searchInstructors(searchTerm, apiPage, pageSize);
        }

        const instructorList = data.content || data;
        setInstructors(instructorList);
        setTotalPages(data.totalPages || 1);

      } catch (err) {
        console.error(err);
        setError("Could not load instructors."); 
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, pageSize]); 

  async function handleDelete(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this instructor?");
    if (!isConfirmed) return;

    try {
      await deleteInstructor(id);
      setInstructors(instructors.filter((instructor) => instructor.id !== id));
      
      setSuccessMessage("Instructor deleted successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("Failed to delete the instructor. Please try again.");
    }
  }

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); 
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };


  const filteredInstructors = instructors.filter((instructor) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    const matchesName = instructor.name.toLowerCase().includes(term);
    const matchesEmail = instructor.email.toLowerCase().includes(term);
    const matchesSpec = instructor.specialization.toLowerCase().includes(term);

    const matchesStatus = instructor.status 
        ? instructor.status.toLowerCase().includes(term)
        : false;

    return matchesName || matchesEmail || matchesSpec || matchesStatus;
  });


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

      {successMessage && (
        <div className="success-banner">
          {successMessage}
        </div>
      )}

      <SearchBox 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        resultCount={filteredInstructors.length}
        totalCount={instructors.length}
      />

      {filteredInstructors.length === 0 ? (
        searchTerm ? (
          <p>No instructors match your search.</p>
        ) : (
          <p>No instructors found.</p>
        )
      ) : (
        <div className="card-grid">
          {filteredInstructors.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              isAdmin={isAdmin}
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </section>
  );
}

export default InstructorsPage;