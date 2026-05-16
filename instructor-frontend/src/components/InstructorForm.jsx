import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorForm({ initialData, onSubmit, buttonText }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    specialization: initialData?.specialization || "",
    yearsOfExperience: initialData?.yearsOfExperience || "",
    active: initialData?.active || false,
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Email must contain an @ symbol.";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = "Specialization is required.";
    }

    if (formData.yearsOfExperience === "" || formData.yearsOfExperience === null) {
      newErrors.yearsOfExperience = "Years of experience is required.";
    } else if (Number(formData.yearsOfExperience) < 0) {
      newErrors.yearsOfExperience = "Years of experience cannot be negative.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const instructorToSubmit = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      specialization: formData.specialization.trim(),
      yearsExperience: Number(formData.yearsOfExperience),
      active: formData.active,
    };

    onSubmit(instructorToSubmit);
  }

  return (
    <form className="form" onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", background: "white", borderRadius: "10px", border: "1px solid #ddd" }}>
      
      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        {errors.name && <p style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px", margin: "5px 0 0" }}>{errors.name}</p>}
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Email</label>
        <input
          name="email"
          type="text" 
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. john@example.com"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        {errors.email && <p style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px", margin: "5px 0 0" }}>{errors.email}</p>}
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Specialization</label>
        <input
          name="specialization"
          type="text"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="e.g. React & Spring Boot"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        {errors.specialization && <p style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px", margin: "5px 0 0" }}>{errors.specialization}</p>}
      </div>

      <div className="form-group" style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Years Experience</label>
        <input
          name="yearsOfExperience"
          type="number"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          placeholder="e.g. 5"
          style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        {errors.yearsOfExperience && <p style={{ color: "#dc2626", fontWeight: "bold", fontSize: "14px", margin: "5px 0 0" }}>{errors.yearsOfExperience}</p>}
      </div>

      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label style={{ display: "flex", alignItems: "center", fontWeight: "bold", cursor: "pointer" }}>
          <input
            name="active"
            type="checkbox"
            checked={formData.active}
            onChange={handleChange}
            style={{ marginRight: "10px", width: "18px", height: "18px" }}
          />
          Instructor is Active
        </label>
      </div>

      <div className="form-actions" style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#16a34a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          {buttonText}
        </button>
        <button type="button" onClick={() => navigate("/dashboard")} style={{ padding: "10px 15px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default InstructorForm;