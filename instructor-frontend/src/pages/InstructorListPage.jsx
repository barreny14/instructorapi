import { Link } from "react-router-dom";

function InstructorListPage() {
  const instructors = [
    { id: 1, name: "Alice Johnson", specialization: "Java", yearsOfExperience: 5 },
    { id: 2, name: "Bob Smith", specialization: "Spring Boot", yearsOfExperience: 8 },
    { id: 3, name: "Charlie Davis", specialization: "React", yearsOfExperience: 3 }
  ];

  return (
    <div>
      <h1>Instructors</h1>
      <p>Select an instructor to view their full profile.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {instructors.map((instructor) => (
          <div 
            key={instructor.id} 
            style={{ border: '1px solid #1b1a1a', padding: '15px', borderRadius: '8px', backgroundColor: '#154177' }}
          >
            <h2>{instructor.name}</h2>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
            
            <Link 
              to={`/instructors/${instructor.id}`}
              style={{ 
                display: 'inline-block', 
                marginTop: '10px', 
                padding: '8px 16px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '5px' 
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorListPage;