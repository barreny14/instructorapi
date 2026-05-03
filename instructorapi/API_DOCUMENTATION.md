# Instructor API Documentation

## Base URL
`http://localhost:8080/api/v1`

---

# Authentication

## Register
**POST** `/api/auth/register`  

**Security:** Public endpoint.

### Request Body
```json
{
  "username": "admin",
  "password": "password123",
  "role": "ADMIN"
}
```

---

## Login
**POST** `/api/auth/login`

**Security:** Public endpoint.

### Request Body
```json
{
  "username": "admin",
  "password": "password123"
}
```

### Response Body
```json
{
  "token": "jwt-token-here"
}
```

---

# Instructors

## Get All Instructors (with Search & Pagination)
**GET** `/instructors`

**Security:** Public endpoint.

### Query Parameters (Optional)

| Parameter | Description |
|---|---|
| `keyword` | Search by instructor name |
| `specialization` | Filter by exact specialization |
| `page` | Page number (default: 0) |
| `size` | Number of records per page (default: 5) |
| `sort` | Sort field and direction (example: `name,asc`) |

### Example Request
```http
GET /instructors?specialization=Java&page=0&size=2
```

### Example Response
```json
{
  "content": [
    {
      "id": "69f55cdbc775",
      "name": "Alice Chan",
      "email": "alice@example.com",
      "specialization": "Java",
      "yearsOfExperience": 5,
      "status": "ACTIVE"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 2
  },
  "totalElements": 1,
  "totalPages": 1
}
```

---

## Get Instructor By ID
**GET** `/instructors/{id}`

**Security:** Public endpoint.

### Example Response
```json
{
  "id": "69f55cdbc775",
  "name": "Alice Chan",
  "email": "alice@example.com",
  "specialization": "Java",
  "yearsOfExperience": 5,
  "status": "ACTIVE"
}
```

---

## Create Instructor
**POST** `/instructors`

**Security:** Requires authentication (Bearer Token).

### Request Body
```json
{
  "name": "Alice Chan",
  "email": "alice@example.com",
  "specialization": "Java",
  "yearsExperience": 5
}
```

### Example Response
```json
{
  "id": "69f55cdbc775",
  "name": "Alice Chan",
  "email": "alice@example.com",
  "specialization": "Java",
  "yearsOfExperience": 5,
  "status": "ACTIVE"
}
```

---

## Update Instructor
**PUT** `/instructors/{id}`

**Security:** Requires authentication (Bearer Token).

### Request Body
```json
{
  "name": "Alice Chan",
  "email": "alice.updated@example.com",
  "specialization": "Java Spring Boot",
  "yearsExperience": 6
}
```

### Example Response
```json
{
  "id": "69f55cdbc775",
  "name": "Alice Chan",
  "email": "alice.updated@example.com",
  "specialization": "Java Spring Boot",
  "yearsOfExperience": 6,
  "status": "ACTIVE"
}
```

---

## Delete Instructor
**DELETE** `/instructors/{id}`

**Security:** Requires authentication AND ADMIN role.

### Response
```text
200 OK (Instructor deleted successfully)
```

---

# Reporting Endpoints

## Report by Status
**GET** `/reports/instructors/by-status`

**Security:** Public endpoint.

### Example Response
```json
[
  {
    "status": "ACTIVE",
    "totalInstructors": 5
  },
  {
    "status": "INACTIVE",
    "totalInstructors": 2
  }
]
```

---

## Report by Specialization
**GET** `/reports/instructors/by-specialization`

**Security:** Public endpoint.

### Example Response
```json
[
  {
    "specialization": "Java",
    "totalInstructors": 3
  },
  {
    "specialization": "React",
    "totalInstructors": 2
  },
  {
    "specialization": "MongoDB",
    "totalInstructors": 1
  }
]
```