package com.example.instructorapi.model;

public class InstructorModel {
    private String name;
    private String email;
    private String specialization;
    private int yearsExperience;

    public Instructor(String name, String email, String specialization, int yearsExperience) {
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.yearsExperience = yearsExperience;
    }
 
}