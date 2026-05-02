package com.example.instructorapi.dto;

public class InstructorStatusSummary {

    private String status;
    private long totalInstructors;

    public InstructorStatusSummary() {
    }

    public InstructorStatusSummary(String status, long totalInstructors) {
        this.status = status;
        this.totalInstructors = totalInstructors;
    }

    public String getStatus() {
        return status;
    }

    public long getTotalInstructors() {
        return totalInstructors;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalInstructors(long totalInstructors) {
        this.totalInstructors = totalInstructors;
    }
}