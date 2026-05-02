package com.example.instructorapi.service;

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
            // 1. GROUP by the 'status' field and COUNT the occurrences
            group("status").count().as("totalInstructors"),
            project("totalInstructors").and("_id").as("status"),
            sort(Sort.Direction.ASC, "status")
        );
        AggregationResults<InstructorStatusSummary> results = mongoTemplate.aggregate(
            aggregation, "instructors", InstructorStatusSummary.class
        );
        return results.getMappedResults();
    }
}