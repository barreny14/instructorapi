function InstructorCard({ instructor }) {
  return (
    <div className="card">
      <h2>{instructor.name}</h2>
      <p><strong>Specialization:</strong> {instructor.specialization}</p>
      <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
      <div className={`status-badge ${instructor.status.toLowerCase()}`}>
        {instructor.status}
      </div>
    </div>
  );
}

export default InstructorCard;