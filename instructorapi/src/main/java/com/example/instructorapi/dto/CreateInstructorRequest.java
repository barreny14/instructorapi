package com.example.instructorapi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CreateInstructorRequest {

    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Specialization is required")
    private String specialization;
    @NotBlank(message = "Years of experience is required")
    @Min(value = 0, message = "Years of experience must be at least 0")
    private int yearsExperience;

    public CreateInstructorRequest() {}

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getSpecialization() { return specialization; }
    public int getYearsExperience() { return yearsExperience; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public void setYearsExperience(int yearsExperience) { this.yearsExperience = yearsExperience; }
}

