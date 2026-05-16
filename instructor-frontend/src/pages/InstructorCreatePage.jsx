import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorForm from "../components/InstructorForm";
import { createInstructor } from "../services/instructorApi";

function InstructorCreatePage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleCreateInstructor(instructorData) {
    setMessage("");
    setError("");

    try {
      await createInstructor(instructorData);
      
      setMessage("Instructor created successfully!");
      
      setTimeout(() => {
        navigate("/instructors");
      }, 1000);

    } catch (err) {
      console.error(err);
      setError("Could not create instructor. Please check the backend connection.");
    }
  }
  
  return (
    <section style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>Create Instructor</h1>
        <p>Add a new instructor to the database.</p>
      </div>

      {message && (
        <div style={{ backgroundColor: "#d4edda", color: "#155724", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontWeight: "bold" }}>
          {message}
        </div>
      )}
      
      {error && (
        <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontWeight: "bold" }}>
          {error}
        </div>
      )}

      <InstructorForm 
        initialData={null}
        onSubmit={handleCreateInstructor} 
        buttonText="Create Instructor" 
      />
    </section>
  );
}

export default InstructorCreatePage;