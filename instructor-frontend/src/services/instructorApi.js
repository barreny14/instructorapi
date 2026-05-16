const INSTRUCTOR_API_URL = "http://localhost:8080/api/v1/instructors";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  };
}

export async function getAllInstructors() {
  const response = await fetch(INSTRUCTOR_API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) throw new Error("Failed to load instructors");
  return response.json();
}

export async function getInstructorById(id) {
  const response = await fetch(`${INSTRUCTOR_API_URL}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to load instructor details");
  return response.json();
}

export async function createInstructor(instructorData) {
  const response = await fetch(INSTRUCTOR_API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(instructorData), 
  });

  if (!response.ok) throw new Error("Failed to create instructor");
  return response.json();
}

export async function updateInstructor(id, instructorData) {
  const response = await fetch(`${INSTRUCTOR_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(instructorData),
  });

  if (!response.ok) throw new Error("Failed to update instructor");
  return response.json();
}

export async function deleteInstructor(id) {
  const response = await fetch(`${INSTRUCTOR_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to delete instructor");
  
  return true; 
}