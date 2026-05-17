import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllInstructors, deleteInstructor, searchInstructors } from "../services/instructorApi";
import SearchBox from "../components/SearchBox";
import InstructorCard from "../components/InstructorCard";
import Pagination from "../components/Pagination";

function InstructorListPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. WE START AT PAGE 1 NOW!
  // Because your teacher's pagination starts at 1, we set the initial state to 1.
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true); 
        let data;

        // 2. THE SPRING BOOT MATH TRICK!
        // Spring Boot starts counting pages at 0. Since our React app starts at 1, 
        // we have to subtract 1 right before we send the request to the database.
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
        setError("Could not load instructors. Is Spring Boot running?");
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
    } catch (err) {
      console.error(err);
      alert("Failed to delete the instructor. Please try again.");
    }
  }

  // 3. RESET TO PAGE 1
  // If the user searches a new word, we send them back to Page 1 so they don't get lost.
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); 
  };

  // 4. RESET TO PAGE 1
  // If they change how many items to show, we also send them back to Page 1.
  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

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
        onSearchChange={handleSearchChange} 
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

      {/* 5. PASSING THE PROPS TO YOUR TEACHER'S PAGINATION */}
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

export default InstructorListPage;