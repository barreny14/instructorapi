package com.example.instructorapi.service;

import com.example.instructorapi.dto.CreateInstructorRequest;
import com.example.instructorapi.model.Instructor;
import com.example.instructorapi.repository.InstructorRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {

    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    // Fix: Updated to return Page if you want to support pagination here too
    public Page<Instructor> getInstructorsBySpecialization(String specialization, Pageable pageable) {
        return instructorRepository.findBySpecialization(specialization, pageable);
    }

    public Optional<Instructor> getInstructorById(String id) {
        return instructorRepository.findById(id);
    }

    public Instructor createInstructor(CreateInstructorRequest request) {
        Instructor instructor = new Instructor(
                request.getName(),
                request.getEmail(),
                request.getSpecialization(),
                request.getYearsExperience()
        );
        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(String id, CreateInstructorRequest request) {
        return instructorRepository.findById(id).map(existing -> {
            existing.setName(request.getName());
            existing.setEmail(request.getEmail());
            existing.setSpecialization(request.getSpecialization());
            existing.setYearsExperience(request.getYearsExperience());
            return instructorRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Instructor not found with id: " + id));
    }

    public void deleteInstructor(String id) {
        instructorRepository.deleteById(id);
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }

    public Page<Instructor> getInstructors(String keyword, String specialization, int page, int size, String sortField, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? 
                    Sort.by(sortField).descending() : 
                    Sort.by(sortField).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.isEmpty()) {
            return instructorRepository.findByNameContainingIgnoreCase(keyword, pageable);
        } else if (specialization != null && !specialization.isEmpty()) {
            return instructorRepository.findBySpecialization(specialization, pageable);
        } else {
            return instructorRepository.findAll(pageable);
        }
    }
}