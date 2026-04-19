package com.example.instructorapi.repository;

import com.example.instructorapi.model.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InstructorRepository extends MongoRepository<Instructor, String> {
    
    List<Instructor> findByNameContainingIgnoreCase(String keyword);

    List<Instructor> findBySpecialization(String specialization);
}