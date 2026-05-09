import { useParams, Link } from "react-router-dom";

function InstructorDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Instructor Profile</h1>
      
      <div style={{ padding: '20px', backgroundColor: '#f0f4f8', borderRadius: '4px', marginTop: '20px' }}>
        <p style={{ fontSize: '18px' }}>
          Course ID from URL: <strong style={{ color: '#ef233c', fontSize: '24px' }}>{id}</strong>
        </p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/instructors" style={{ textDecoration: 'none', color: '#007bff' }}>
          ← Back to Instructor List
        </Link>
      </div>
    </div>
  );
}

export default InstructorDetailPage;