package com.example.instructorapi.service;

import com.example.instructorapi.dto.CreateInstructorRequest;
import com.example.instructorapi.model.Instructor;
import com.example.instructorapi.repository.InstructorRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {

    private static final Logger logger = LoggerFactory.getLogger(InstructorService.class);

    private final InstructorRepository instructorRepository;

    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    public Page<Instructor> getInstructors(String keyword, String specialization, int page, int size, String sortField, String direction) {
        logger.info("Fetching instructors with parameters - Keyword: {}, Specialization: {}, Page: {}, Size: {}, Sort: {}, Direction: {}", 
                     keyword, specialization, page, size, sortField, direction);

        Sort sort = direction.equalsIgnoreCase("desc") ? 
                    Sort.by(sortField).descending() : 
                    Sort.by(sortField).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.isEmpty()) {
            logger.debug("Executing search by name containing: {}", keyword);
            return instructorRepository.findByNameContainingIgnoreCase(keyword, pageable);
        } else if (specialization != null && !specialization.isEmpty()) {
            logger.debug("Executing filter by specialization: {}", specialization);
            return instructorRepository.findBySpecialization(specialization, pageable);
        } else {
            logger.debug("Executing fetch all with pagination");
            return instructorRepository.findAll(pageable);
        }
    }

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
                request.getYearsExperience(),
                "ACTIVE" 
        );
        return instructorRepository.save(instructor);
    }

    public Instructor updateInstructor(String id, CreateInstructorRequest request) {
        return instructorRepository.findById(id).map(existing -> {
            existing.setName(request.getName());
            existing.setEmail(request.getEmail());
            existing.setSpecialization(request.getSpecialization());
            
            // FIXED: Updated to use the newly named setter
            existing.setYearsOfExperience(request.getYearsExperience()); 
            
            return instructorRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Instructor not found with id: " + id));
    }

    public void deleteInstructor(String id) {
        instructorRepository.deleteById(id);
    }

    public List<Instructor> getAllInstructors() {
        return instructorRepository.findAll();
    }
    
    public List<Instructor> findAll() {
        return instructorRepository.findAll(); 
    }
}