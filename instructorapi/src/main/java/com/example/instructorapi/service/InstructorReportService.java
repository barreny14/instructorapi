package com.example.instructorapi.service;

import com.example.instructorapi.dto.InstructorSpecializationSummary;
import com.example.instructorapi.dto.InstructorStatusSummary;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class InstructorReportService {

    private final MongoTemplate mongoTemplate;

    public InstructorReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<InstructorStatusSummary> getInstructorCountByStatus() {
        Aggregation aggregation = newAggregation(
            group("status").count().as("totalInstructors"),
            project("totalInstructors").and("_id").as("status"),
            sort(Sort.Direction.ASC, "status")
        );
        AggregationResults<InstructorStatusSummary> results = mongoTemplate.aggregate(
            aggregation, "instructors", InstructorStatusSummary.class
        );
        return results.getMappedResults();
    }

    public List<InstructorSpecializationSummary> getInstructorCountBySpecialization() {
        Aggregation aggregation = newAggregation(
            group("specialization").count().as("totalInstructors"),
            project("totalInstructors").and("_id").as("specialization"),
            sort(Sort.Direction.ASC, "specialization")
        );
        return mongoTemplate.aggregate(
            aggregation, "instructors", InstructorSpecializationSummary.class
        ).getMappedResults();
    }

}