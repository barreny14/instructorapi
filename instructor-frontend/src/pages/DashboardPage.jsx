import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    navigate("/login");
  };

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>Welcome! You are logged in and can see this secret page.</p>
      
      <button 
        onClick={handleLogout} 
        style={{ padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}
      >
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;