package com.example.instructorapi.dto;

public class CreateInstructorRequest {
    private String name;
    private String email;
    private String specialization;
    private int yearsExperience;

    public CreateInstructorRequest() {}

    public CreateInstructorRequest(String name, String email, String specialization, int yearsExperience) {
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.yearsExperience = yearsExperience;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getSpecialization() { return specialization; }
    public int getYearsExperience() { return yearsExperience; }

    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public void setYearsExperience(int yearsExperience) { this.yearsExperience = yearsExperience; }
}

