package com.example.instructorapi.controller;

import com.example.instructorapi.dto.CreateInstructorRequest;
import com.example.instructorapi.model.Instructor;
import com.example.instructorapi.service.InstructorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public List<Instructor> getAll() {
        return instructorService.getAllInstructors();
    }

    @PostMapping
    public Instructor create(@RequestBody CreateInstructorRequest request) {
        return instructorService.createInstructor(request);
    }
}