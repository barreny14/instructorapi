import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Changed class name to match the teacher's exact CSS */}
      <div className="nav-brand">Instructor Management System</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/instructors">Instructors</Link>
        <Link to="/dashboard">Dashboard</Link>
        
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;