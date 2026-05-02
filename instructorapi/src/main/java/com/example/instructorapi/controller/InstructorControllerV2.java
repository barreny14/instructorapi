package com.example.instructorapi.controller;

import com.example.instructorapi.dto.InstructorResponseV2;
import com.example.instructorapi.model.Instructor;
import com.example.instructorapi.service.InstructorService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/instructors")
public class InstructorControllerV2 {

    private final InstructorService instructorService;

    public InstructorControllerV2(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping
    public Page<InstructorResponseV2> getInstructorsV2(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String specialization,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "name,asc") String sort) {

        String[] sortParts = sort.split(",");
        String sortField = sortParts[0];
        String sortDirection = (sortParts.length > 1) ? sortParts[1] : "asc";

        Page<Instructor> originalPage = instructorService.getInstructors(keyword, specialization, page, size, sortField, sortDirection);

        return originalPage.map(this::mapToResponseV2);
    }

    @GetMapping("/{id}")
    public InstructorResponseV2 getByIdV2(@PathVariable String id) {
        Instructor instructor = instructorService.getInstructorById(id)
                .orElseThrow(() -> new RuntimeException("Instructor not found with id: " + id));
        
        return mapToResponseV2(instructor);
    }

    private InstructorResponseV2 mapToResponseV2(Instructor instructor) {
        
        String availabilityStatus = "ACTIVE".equalsIgnoreCase(instructor.getStatus()) 
        ? "Available for Teaching" : "Unavailable";

        int years = instructor.getYearsOfExperience();
        String experienceLevel;
        if (years <= 2) {
            experienceLevel = "Junior";
        } else if (years <= 5) {
            experienceLevel = "Intermediate";
        } else {
            experienceLevel = "Senior";
        }

        String profileSummary = instructor.getName() + " specializes in " + instructor.getSpecialization() + 
        " and has " + years + " years of teaching experience.";
        
        return new InstructorResponseV2(
            instructor.getId(),
            instructor.getName(), 
            instructor.getSpecialization(), 
            availabilityStatus,
            experienceLevel,
            profileSummary
        );
    }
}