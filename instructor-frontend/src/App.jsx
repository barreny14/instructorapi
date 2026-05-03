import './App.css'

function App() {
  const instructors = [
    {
      id: "1",
      name: "Alice Johnson",
      specialization: "Java",
      status: "ACTIVE",
      yearsOfExperience: 5
    },
    {
      id: "2",
      name: "Kumar K.",
      specialization: "MongoDB",
      status: "ACTIVE",
      yearsOfExperience: 8
    },
    {
      id: "3",
      name: "Michael Chew",
      specialization: "React",
      status: "INACTIVE",
      yearsOfExperience: 4
    }
  ];

  return (
    <div className="container">
      <h1>Instructor Directory</h1>
      
      {}
      <div className="card-grid">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="card">
            <h2>{instructor.name}</h2>
            <p><strong>Specialization:</strong> {instructor.specialization}</p>
            <p><strong>Experience:</strong> {instructor.yearsOfExperience} years</p>
            <p><strong>Status:</strong> {instructor.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App