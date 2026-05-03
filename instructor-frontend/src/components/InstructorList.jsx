import InstructorCard from "./InstructorCard";

function InstructorList({ instructors }) {
  if (instructors.length === 0) {
    return <p className="message">No instructors match your search.</p>;
  }

  return (
    <div className="card-grid">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))}
    </div>
  );
}

export default InstructorList;