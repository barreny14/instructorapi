const API_BASE_URL = "http://localhost:8080/api/v1/instructors";

export async function getInstructors() {
    const response = await fetch(`${API_BASE_URL}?size=20`);
    if (!response.ok) throw new Error("Failed to fetch");
    
    const data = await response.json();
    return data.content; 
}