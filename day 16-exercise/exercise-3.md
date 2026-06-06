## Exercise 3: Backend Test Improvement

**AI-generated test case:** `createInstructor_shouldReturnSavedInstructorWhenValid`

**Problem with AI-generated test:** The AI generated a "lazy" assertion. It only checked if the name and email matched, but it completely failed to verify if the hardcoded "ACTIVE" status was applied. It also failed to verify if the repository's `.save()` method was actually triggered to save the data to the database.

**My improvement:**
```java
    @Test
    void createInstructor_shouldReturnSavedInstructorWhenValid() {
        CreateInstructorRequest request = new CreateInstructorRequest();
        request.setName("John Doe");
        request.setEmail("john@test.com");
        request.setSpecialization("Java");
        request.setYearsExperience(5);

        Instructor savedInstructor = new Instructor("John Doe", "john@test.com", "Java", 5, "ACTIVE");
        
        when(instructorRepository.save(any(Instructor.class))).thenReturn(savedInstructor);

        Instructor result = instructorService.createInstructor(request);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@test.com", result.getEmail());
        assertEquals("ACTIVE", result.getStatus()); 
        verify(instructorRepository, times(1)).save(any(Instructor.class));
    }

**Test results:** Pass