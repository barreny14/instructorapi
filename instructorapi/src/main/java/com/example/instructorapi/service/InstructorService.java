package com.example.instructorapi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class InstructorService {

    private List<Instructor> instructors = new ArrayList<>();

    public Instructor addInstructor(Instructor instructor) {
        instructors.add(instructor);
        return instructor;
    }
    
}
