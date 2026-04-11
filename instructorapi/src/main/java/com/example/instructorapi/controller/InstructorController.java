package com.example.instructorapi.controller;

import com.example.instructorapi.model.InstructorModel;
import com.example.instructorapi.service.InstructorService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/instructor")
public class InstructorController {
    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    
}
