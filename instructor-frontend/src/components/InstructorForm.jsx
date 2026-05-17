import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorForm({ initialData, onSubmit, buttonText }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        specialization: initialData?.specialization || "",
        yearsOfExperience: initialData?.yearsExperience || "", 
        active: initialData?.active === "ACTIVE",
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
        <form className="form" onSubmit={handleSubmit}>
            
            <div className="form-group">
                <label>Name</label>
                <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    type="text" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label>Specialization</label>
                <input
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. React & Spring Boot"
                />
                {errors.specialization && <p className="error-message">{errors.specialization}</p>}
            </div>

            <div className="form-group">
                <label>Years Experience</label>
                <input
                    name="yearsOfExperience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                />
                {errors.yearsOfExperience && <p className="error-message">{errors.yearsOfExperience}</p>}
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
                <button type="submit">{buttonText}</button>

                <button type="button" onClick={() => navigate("/instructors")}>
                    Cancel
                </button>
            </div>
            
        </form>
    );
}

export default InstructorForm;