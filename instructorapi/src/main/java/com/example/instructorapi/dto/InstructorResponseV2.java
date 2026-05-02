package com.example.instructorapi.dto;

public class InstructorResponseV2 {
    private String id;
    private String fullName;
    private String primarySkill;
    private String availabilityStatus;
    private String experienceLevel;
    private String profileSummary;

    public InstructorResponseV2() {
    }

    public InstructorResponseV2(String id, String fullName, String primarySkill, String availabilityStatus, String experienceLevel, String profileSummary) {
        this.id = id;
        this.fullName = fullName;
        this.primarySkill = primarySkill;
        this.availabilityStatus = availabilityStatus;
        this.experienceLevel = experienceLevel;
        this.profileSummary = profileSummary;
    }

    public String getId() { 
        return id; 
    }
    public String getFullName() { 
        return fullName; 
    }
    public String getPrimarySkill() { 
        return primarySkill; 
    }
    public String getAvailabilityStatus() { 
        return availabilityStatus; 
    }
    public String getExperienceLevel() { 
        return experienceLevel; 
    }
    public String getProfileSummary() { 
        return profileSummary; 
    }

    public void setId(String id) { 
        this.id = id; 
    }
    public void setFullName(String fullName) { 
        this.fullName = fullName; 
    }
    public void setPrimarySkill(String primarySkill) { 
        this.primarySkill = primarySkill;
    }
    public void setAvailabilityStatus(String availabilityStatus) { 
        this.availabilityStatus = availabilityStatus; 
    }
    public void setExperienceLevel(String experienceLevel) { 
        this.experienceLevel = experienceLevel; 
    }
    public void setProfileSummary(String profileSummary) { 
        this.profileSummary = profileSummary; 
    }
}