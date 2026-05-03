import InstructorCard from './InstructorCard';

function InstructorList({ instructors }) {
  return (
    <div className="card-grid">
      {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))}
    </div>
  );
}

export default InstructorList;