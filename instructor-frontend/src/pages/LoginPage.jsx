import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

function LoginPage() {
  const navigate = useNavigate();

  // Pre-filled for easy testing during development
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      console.log("Login response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      // More generic, user-friendly error message
      setError("Login failed. Please check your email and password.");
    } finally {
      // Ensure loading is set back to false whether it succeeds or fails
      setLoading(false); 
    }
  }

  return (
    <section className="login-page">
      <h1>Login</h1>

      <p>
        Login to access the protected dashboard. For this demo, protected means
        the user has a valid token.
      </p>

      {error && <p className="error-message">{error}</p>}

      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;