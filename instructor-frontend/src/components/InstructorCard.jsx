function InstructorCard({ instructor }) {
  return (
    <div className="card">
      <h2>{instructor.name}</h2>
      <p><strong>Specialization:</strong> {instructor.specialization}</p>
      <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
      <p><strong>Status:</strong> {instructor.status}</p>
    </div>
  );
}

export default InstructorCard;