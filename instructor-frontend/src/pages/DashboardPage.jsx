import { useEffect, useState } from "react";
import { getAllInstructors } from "../services/instructorApi";

function DashboardPage() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await getAllInstructors(0); 
        
        const instructorList = data.content || data;
        setInstructors(instructorList);
      } catch (error) {
        console.error(error);
        setError("Could not load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  const totalInstructors = instructors.length;
  const activeInstructors = instructors.filter((instructor) => instructor.status === "ACTIVE").length;
  const inactiveInstructors = instructors.filter((instructor) => !instructor.status === "ACTIVE").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            This is a protected page. You can only see this page after logging in.
          </p>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2>Total Instructors</h2>
          <p className="metric">{totalInstructors}</p>
        </div>

        <div className="card">
          <h2>Active Instructors</h2>
          <p className="metric">{activeInstructors}</p>
        </div>

        <div className="card">
          <h2>Inactive Instructors</h2>
          <p className="metric">{inactiveInstructors}</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;