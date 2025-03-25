# 📘 VolunteerOrg API Test Documentation

This document outlines the **input data**, **endpoints**, **expected outputs**, and **validation behavior** across the complete tested API:  
* **Users**
* **Activities**
* **Applications**
* **Admin Validation**

---

## 👤 User

### 📌 1. **Create a New User**

* **Endpoint:** `POST /api/VolunteerOrg/users`  
* **Purpose:** Registers a new volunteer or organizer.  
* **Request Body:**

```json
{
  "email": "volunteerorg_test@example.com",
  "name": "Volunteer User",
  "password": "password123"
}
```

* **Response:** `201 Created`  
* **Response Body:**

```json
{
  "id": "uuid-string",
  "email": "volunteerorg_test@example.com",
  "name": "Volunteer User",
  "password": "password123",
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 2. **Get All Users**

* **Endpoint:** `GET /api/VolunteerOrg/users`  
* **Response:** `200 OK`

```json
[
  {
    "id": "uuid-string",
    "email": "sample0@gmail.com",
    "name": "Sample User 0",
    "password": "password123",
    "createdAt": "2025-03-25T12:00:00.000Z"
  },
  ...
]
```

---

### 📌 3. **Get User by ID**

* **Endpoint:** `GET /api/VolunteerOrg/users/{id}`  
* **Response:** `200 OK`

```json
{
  "id": "uuid-string",
  "email": "volunteerorg_test@example.com",
  "name": "Volunteer User",
  "password": "password123",
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 6. **Update a User**

* **Endpoint:** `PUT /api/VolunteerOrg/users/{id}`  
* **Request Body:**

```json
{
  "name": "Updated Volunteer User"
}
```

* **Response:** `200 OK`

```json
{
  "id": "uuid-string",
  "email": "volunteerorg_test@example.com",
  "name": "Updated Volunteer User",
  "password": "password123",
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 7. **Delete a User**

* **Endpoint:** `DELETE /api/VolunteerOrg/users/{id}`

* **Response:** `200 OK`

```json
{
  "message": "User deleted successfully"
}
```

---

## 🗓️ Activities

### 📌 1. **Create Activity (Unvalidated by Default)**

* **Endpoint:** `POST /api/VolunteerOrg/activities`  
* **Request Body:**

```json
{
  "title": "Park Clean-up",
  "description": "Clean up the city park",
  "location": "Central Park",
  "date": "2025-03-25T10:00:00.000Z",
  "organizerId": "uuid-string"
}
```

* **Response:** `201 Created`  
* **Response Body:**

```json
{
  "id": "uuid-string",
  "validated": false,
  ...
}
```

---

### 📌 2. **Validate Activity (Admin Only)**

* **Endpoint:** `POST /api/VolunteerOrg/admin/activities/{id}/validate`  
* **Request Body:**

```json
{
  "adminId": "uuid-string"
}
```

* **Response:** `200 OK`

```json
{
  "message": "Activity validated",
  "activity": {
    "id": "uuid-string",
    "validated": true
  }
}
```

---

### 📌 3. **Get All Activities (Only Validated)**

* **Endpoint:** `GET /api/VolunteerOrg/activities`

* **Response:** `200 OK`  
* **Note:** Only returns activities where `validated = true`

```json
[
  {
    "id": "uuid-string",
    "title": "Park Clean-up",
    "validated": true
  }
]
```

---

### 📌 4. **Get Activity by ID (Any)**

* **Endpoint:** `GET /api/VolunteerOrg/activities/{id}`

* **Response:** `200 OK` — includes both validated and unvalidated

---

### 📌 5. **Update Activity (Owner Only)**

* **Endpoint:** `PUT /api/VolunteerOrg/activities/{id}`  
* **Request Body:**

```json
{
  "title": "Updated Title",
  "organizerId": "owner-id"
}
```

* **Response:** `200 OK`  
* **Error (Non-owner):** `403 Forbidden`

---

### 📌 6. **Delete Activity**

* **Endpoint:** `DELETE /api/VolunteerOrg/activities/{id}`  
* **Behavior:**  
  + ✅ Organizer can delete  
  + ✅ Admin can delete  
  + ❌ Others: `403 Forbidden`

* **Response:** `200 OK`

```json
{
  "message": "Activity deleted successfully"
}
```

---

## 🙋 Application

### 📌 1. **Apply to Validated Activity**

* **Endpoint:** `POST /api/VolunteerOrg/applications`  
* **Request Body:**

```json
{
  "userId": "uuid-string",
  "activityId": "uuid-string",
  "motivation": "I want to help!"
}
```

* **Response:** `201 Created`

---

### 📌 2. **Apply to Non-Validated Activity**

* **Response:** `404 Not Found`

```json
{
  "error": "Activity not yet validated"
}
```

---

### 📌 3. **Get Applications for Activity**

* **Endpoint:** `GET /api/VolunteerOrg/activities/{activityId}/applications`

* **Response:** `200 OK`

```json
[
  {
    "id": "uuid-string",
    "userId": "uuid-string",
    "activityId": "uuid-string",
    "status": "pending",
    "user": {
      "id": "uuid-string",
      "name": "Volunteer User",
      "email": "user@example.com"
    }
  }
]
```

---

### 📌 4. **Update Application Status**

* **Endpoint:** `PUT /api/VolunteerOrg/applications/{id}/status`  
* **Request Body:**

```json
{
  "status": "confirmed"
}
```

* **Response:** `200 OK`  
* **Error (invalid):** `400 Bad Request`

```json
{
  "error": "Invalid status"
}
```
