import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getInstructorById } from "../services/instructorApi";

function InstructorDetailPage() {
  const { id } = useParams();

  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInstructor() {
      try {
        const data = await getInstructorById(id);
        setInstructor(data);
      } catch (error) {
        console.error(error);
        setError("Instructor not found or could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    loadInstructor();
  }, [id]);

  if (loading) {
    return <p>Loading instructor details...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Instructor Not Found</h1>
        <p className="error-message">{error}</p>
        <Link to="/instructors">Back to Instructors</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{instructor.name}</h1>

      <div className="card">
        <p>
          <strong>ID:</strong> {instructor.id}
        </p>

        <p>
          <strong>Email:</strong> {instructor.email}
        </p>

        <p>
          <strong>Specialization:</strong> {instructor.specialization}
        </p>

        <p>
          <strong>Experience:</strong> {instructor.yearsOfExperience} years
        </p>

        <p>
          <strong>Status:</strong> {instructor.active ? "Active" : "Inactive"}
        </p>
      </div>

      <div className="page-actions">
        <Link to="/instructors">Back to Instructors</Link>
      </div>
    </section>
  );
}

export default InstructorDetailPage;