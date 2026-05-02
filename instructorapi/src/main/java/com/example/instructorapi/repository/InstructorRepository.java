package com.example.instructorapi.repository;

import com.example.instructorapi.model.Instructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends MongoRepository<Instructor, String> {
    
    Page<Instructor> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

    Page<Instructor> findBySpecialization(String specialization, Pageable pageable);
}