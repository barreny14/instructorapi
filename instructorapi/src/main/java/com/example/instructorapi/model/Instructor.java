package com.example.instructorapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "instructors")
public class Instructor {

    @Id
    private String id;
    
    private String email;
    private String specialization;
    
    @Indexed
    private String name;

    private String status; 
    
    private int yearsOfExperience; 

    public Instructor() {}

    public Instructor(String name, String email, String specialization, int yearsOfExperience, String status) {
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.yearsOfExperience = yearsOfExperience;
        this.status = status;
    }

    public String getId() { 
        return id; 
    }
    public void setId(String id) { 
        this.id = id; 
    }
    
    public String getName() { 
        return name; 
    }
    public void setName(String name) { 
        this.name = name; 
    }

    public String getEmail() { 
        return email; 
    }
    public void setEmail(String email) { 
        this.email = email; 
    }

    public String getSpecialization() { 
        return specialization; 
    }
    public void setSpecialization(String specialization) { 
        this.specialization = specialization; 
    }


    public int getYearsOfExperience() { 
        return yearsOfExperience; 
    }
    public void setYearsOfExperience(int yearsOfExperience) { 
        this.yearsOfExperience = yearsOfExperience; 
    }

    public String getStatus() { 
        return status; 
    }
    public void setStatus(String status) { 
        this.status = status; 
    }
}