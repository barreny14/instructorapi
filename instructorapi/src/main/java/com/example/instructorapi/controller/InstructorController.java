package com.example.instructorapi.controller;

import com.example.instructorapi.dto.CreateInstructorRequest;
import com.example.instructorapi.model.Instructor;
import com.example.instructorapi.service.InstructorService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public Page<Instructor> getAll(
            @RequestParam(required = false) String specialization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        
        if (specialization != null && !specialization.isEmpty()) {}
        return instructorService.getAllInstructorsPaged(page, size);
    }

    @GetMapping("/{id}")
    public Instructor getById(@PathVariable String id) {
        return instructorService.getInstructorById(id).orElseThrow(() -> new RuntimeException("Instructor not found with id: " + id));
    }

    @PostMapping
    public Instructor create(@Valid @RequestBody CreateInstructorRequest request) {
        return instructorService.createInstructor(request);
    }

    @PutMapping("/{id}")
    public Instructor update(@PathVariable String id, @Valid @RequestBody CreateInstructorRequest request) {
        return instructorService.updateInstructor(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        instructorService.deleteInstructor(id);
    }
}