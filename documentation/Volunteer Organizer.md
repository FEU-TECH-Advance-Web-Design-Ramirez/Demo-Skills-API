# 📘 VolunteerOrg - Users API Test Documentation

This doc outlines the **required input data**, **HTTP methods**, **endpoints**, and the **expected response structure** based on the full CRUD test suite.

---

## User

### 📌 1. **Create a New User**

* **Endpoint:** `POST /api/VolunteerOrg/users`
* **Purpose:** Registers a new volunteer or organizer.
* **Request Body (JSON):**
  

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

### 📌 2. **Create Multiple Dummy Users**

* **Endpoint:** `POST /api/VolunteerOrg/users`
* **Purpose:** Adds a batch of sample users (for testing or demo).
* **Request Body Example:**
  

```json
  {
    "email": "sample0@gmail.com",
    "name": "Sample User 0",
    "password": "password123"
  }
  ```

* **Expected Status:**  
  + `201 Created` for new entries  
  + `409 Conflict` if user already exists

---

### 📌 3. **Get a List of All Users**

* **Endpoint:** `GET /api/VolunteerOrg/users`
* **Purpose:** Retrieves all registered users.
* **Request:** No body required.
* **Response:** `200 OK`
* **Expected Body:**
  

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

### 📌 4. **Get User by ID**

* **Endpoint:** `GET /api/VolunteerOrg/users/{id}`
* **Purpose:** Retrieves a single user's profile.
* **URL Param:** `id` (User UUID)
* **Response:** `200 OK`
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

### 📌 5. **Update a User**

* **Endpoint:** `PUT /api/VolunteerOrg/users/{id}`
* **Purpose:** Updates a user's name.
* **Request Body:**
  

```json
  {
    "name": "Updated Volunteer User"
  }
  ```

* **Response:** `200 OK`
* **Response Body:**
  

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

### 📌 6. **Delete a User**

* **Endpoint:** `DELETE /api/VolunteerOrg/users/{id}`

* **Purpose:** Permanently deletes a user.
* **Response:** `200 OK`
* **Response Body:**
  

```json
  {
    "message": "User deleted successfully"
  }
  ```

## Activities

### 📌 1. **Create a New Activity**

* **Endpoint:** `POST /api/VolunteerOrg/activities`  
* **Purpose:** Organizer creates a new volunteer activity.  
* **Request Body (JSON):**

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
  "title": "Park Clean-up",
  "description": "Clean up the city park",
  "location": "Central Park",
  "date": "2025-03-25T10:00:00.000Z",
  "organizerId": "uuid-string",
  "validated": false,
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 2. **Get a List of All Activities**

* **Endpoint:** `GET /api/VolunteerOrg/activities`  
* **Purpose:** Retrieves all volunteer activities.  
* **Request:** No body required.  
* **Response:** `200 OK`  
* **Expected Body:**

```json
[
  {
    "id": "uuid-string",
    "title": "Park Clean-up",
    "description": "Clean up the city park",
    "location": "Central Park",
    "date": "2025-03-25T10:00:00.000Z",
    "organizerId": "uuid-string",
    "validated": false,
    "createdAt": "2025-03-25T12:00:00.000Z"
  },
  ...
]
```

---

### 📌 3. **Get Activity by ID**

* **Endpoint:** `GET /api/VolunteerOrg/activities/{id}`  
* **Purpose:** Fetches one activity by its ID.  
* **URL Param:** `id` (Activity UUID)  
* **Response:** `200 OK`  
* **Response Body:**

```json
{
  "id": "uuid-string",
  "title": "Park Clean-up",
  "description": "Clean up the city park",
  "location": "Central Park",
  "date": "2025-03-25T10:00:00.000Z",
  "organizerId": "uuid-string",
  "validated": false,
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 4. **Update an Activity (Owner Only)**

* **Endpoint:** `PUT /api/VolunteerOrg/activities/{id}`  
* **Purpose:** Allows the organizer to update their activity.  
* **Request Body:**

```json
{
  "title": "Updated Park Clean-up",
  "description": "Now includes tree planting",
  "location": "Updated Park",
  "date": "2025-03-27T14:00:00.000Z",
  "organizerId": "uuid-string"
}
```

* **Response:** `200 OK`  
* **Response Body:**

```json
{
  "id": "uuid-string",
  "title": "Updated Park Clean-up",
  "description": "Now includes tree planting",
  "location": "Updated Park",
  "date": "2025-03-27T14:00:00.000Z",
  "organizerId": "uuid-string",
  "validated": false,
  "createdAt": "2025-03-25T12:00:00.000Z"
}
```

---

### 📌 5. **Update Activity (Non-owner)**

* **Endpoint:** `PUT /api/VolunteerOrg/activities/{id}`  
* **Purpose:** Attempts to update by a non-owner user.  
* **Response:** `403 Forbidden`  
* **Response Body:**

```json
{
  "error": "Forbidden"
}
```

---

### 📌 6. **Delete Activity (Non-owner)**

* **Endpoint:** `DELETE /api/VolunteerOrg/activities/{id}`  
* **Purpose:** Attempts to delete an activity by a user who is not the creator.  
* **Response:** `403 Forbidden`  
* **Response Body:**

```json
{
  "error": "Forbidden"
}
```

---

### 📌 7. **Delete Activity by Admin**

* **Endpoint:** `DELETE /api/VolunteerOrg/activities/{id}`

* **Purpose:** Allows an admin (user with email starting with `a-` ) to delete any activity.  
* **Response:** `200 OK`  
* **Response Body:**

```json
{
  "message": "Activity deleted successfully"
}
```

---

### 📌 8. **Delete Activity by Creator**

* **Endpoint:** `DELETE /api/VolunteerOrg/activities/{id}`

* **Purpose:** Deletes the activity by its original organizer.  
* **Response:** `200 OK`  
* **Response Body:**

```json
{
  "message": "Activity deleted successfully"
}
```

##

##
