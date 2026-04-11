package com.example.instructorapi.service;

import com.example.instructorapi.dto.CreateInstructorRequest;
import com.example.instructorapi.model.Instructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorService {

    private final List<Instructor> instructors = new ArrayList<>();

    public InstructorService() {
        instructors.add(new Instructor("Ali", "ali@email.com", "Java", 5));
        instructors.add(new Instructor("Sara", "sara@email.com", "Spring Boot", 3));
    }

    public List<Instructor> getAllInstructors() {
        return instructors;
    }

    public Instructor createInstructor(CreateInstructorRequest request) {

        Instructor instructor = new Instructor(
                request.getName(),
                request.getEmail(),
                request.getSpecialization(),
                request.getYearsExperience()
        );

        instructors.add(instructor);
        return instructor;
    }
}