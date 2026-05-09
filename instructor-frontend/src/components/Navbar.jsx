import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Instructor Management System</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/instructors">Instructors</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;