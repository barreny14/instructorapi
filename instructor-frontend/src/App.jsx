import { useState } from 'react';
import './App.css';
import InstructorList from './components/InstructorList';

function App() {
  const [instructors, setInstructors] = useState([
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
  ]);

  return (
    <div className="container">
      <h1>Instructor Directory</h1>
      
      <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Total instructors: {instructors.length}
      </p>
      
      <InstructorList instructors={instructors} />
    </div>
  );
}

export default App;