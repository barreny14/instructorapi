import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    specialization: initialData?.specialization || "",
    yearsOfExperience: initialData?.yearsOfExperience || "",
    active: initialData?.status === "ACTIVE" || false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = "Years experience is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    setErrors({});
    onSubmit({
      name: formData.name,
      email: formData.email,
      specialization: formData.specialization,
      yearsOfExperience: Number(formData.yearsOfExperience), 
      status: formData.active ? "ACTIVE" : "INACTIVE", 
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="e.g. John Doe"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="e.g. john@example.com"
          type="text"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specialization">Specialization</label>
        <input
          id="specialization"
          name="specialization"
          placeholder="e.g. React & Spring Boot"
          type="text"
          value={formData.specialization}
          onChange={handleChange}
        />
        {errors.specialization && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.specialization}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="yearsOfExperience">Years Experience</label>
        <input
          id="yearsOfExperience"
          name="yearsOfExperience"
          placeholder="e.g. 5"
          type="number"
          value={formData.yearsOfExperience}
          onChange={handleChange}
        />
        {errors.yearsOfExperience && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.yearsOfExperience}</span>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            name="active"
            type="checkbox"
            checked={formData.active}
            onChange={handleChange}
          />
          Instructor is Active
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  );
}

export default InstructorForm;