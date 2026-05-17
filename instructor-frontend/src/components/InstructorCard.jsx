import { Link } from "react-router-dom";

function InstructorCard({ instructor, isAdmin, onDelete }) {
  return (
    <div className="card">
      <h2>{instructor.name}</h2>
      
      <p><strong>Email:</strong> {instructor.email}</p>
      <p><strong>Specialization:</strong> {instructor.specialization}</p>
      <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={instructor.active ? "status-active" : "status-inactive"}>
          {instructor.active ? "Active" : "Inactive"}
        </span>
      </p>
      
      <div className="card-actions">
        <Link to={`/instructors/${instructor.id}`}>View Details</Link>

        {isAdmin && (
          <>
            <Link to={`/instructors/${instructor.id}/edit`} className="edit-btn">
              Edit
            </Link>
            <button onClick={() => onDelete(instructor.id)} className="delete-btn">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default InstructorCard;