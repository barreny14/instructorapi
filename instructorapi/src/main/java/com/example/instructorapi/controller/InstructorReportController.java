package com.example.instructorapi.controller;

import com.example.instructorapi.dto.InstructorStatusSummary;
import com.example.instructorapi.service.InstructorReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports/instructors")
public class InstructorReportController {

    private final InstructorReportService reportService;

    public InstructorReportController(InstructorReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/by-status")
    public List<InstructorStatusSummary> getInstructorsByStatus() {
        return reportService.getInstructorCountByStatus();
    }
}