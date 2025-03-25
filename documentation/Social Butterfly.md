# 📘 SocialButterfly API Test Documentation

This document summarizes tested API behavior, input/output expectations, and validation logic for the **SocialButterfly platform**, covering:

* **Users**
* **Events**
* **Reviews**
* **Admin Operations**

---

## 👤 Users

### 📌 1. **Create a New User**

* **Endpoint:** `POST /api/SocialButterfly/users`
* **Purpose:** Registers a new platform user.
* **Request Body:**

```json
{
  "email": "socialbutterfly_test@example.com",
  "name": "Test User",
  "password": "supersecure"
}
```

* **Response:** `201 Created`

```json
{
  "id": "uuid",
  "email": "socialbutterfly_test@example.com",
  "name": "Test User",
  "password": "supersecure",
  "createdAt": "timestamp"
}
```

### 📌 2. **Get All Users**

* **Endpoint:** `GET /api/SocialButterfly/users`
* **Response:** `200 OK`

```json
[
  { "id": "uuid", "email": "...", "name": "..." },
  ...
]
```

### 📌 3. **Get User by ID**

* **Endpoint:** `GET /api/SocialButterfly/users/{id}`
* **Response:** `200 OK`

### 📌 4. **Update User**

* **Endpoint:** `PUT /api/SocialButterfly/users/{id}`
* **Request Body:**

```json
{ "name": "Updated Test User" }
```

* **Response:** `200 OK`

### 📌 5. **Delete User**

* **Endpoint:** `DELETE /api/SocialButterfly/users/{id}`

* **Response:** `200 OK`

```json
{ "message": "User deleted successfully" }
```

---

## 📅 Events

### 📌 1. **Create Event**

* **Endpoint:** `POST /api/SocialButterfly/events`
* **Request Body:**

```json
{
  "title": "Test Event Valid",
  "description": "Event that will be validated",
  "date": "ISODate",
  "location": "City",
  "category": "Music",
  "submittedBy": "creator-user-id"
}
```

* **Response:** `201 Created`

### 📌 2. **Validate Event (Admin Only)**

* **Endpoint:** `POST /api/SocialButterfly/admin/events/{id}/validate`

* **Headers:** `{ adminId: "uuid" }`

* **Response:** `200 OK`

```json
{
  "event": {
    "id": "...",
    "validated": true
  }
}
```

### 📌 3. **Get All Validated Events**

* **Endpoint:** `GET /api/SocialButterfly/events`
* **Behavior:** Only returns events with `validated = true`

### 📌 4. **Get Event by ID**

* **Endpoint:** `GET /api/SocialButterfly/events/{id}`

### 📌 5. **Update Event**

* **Endpoint:** `PUT /api/SocialButterfly/events/{id}`
* **Request Body:**

```json
{ "title": "Updated", "description": "...", "date": "...", "location": "..." }
```

* **Response:** `200 OK`
* **Note:** Only creator allowed to update

### 📌 6. **Delete Event**

* **Endpoint:** `DELETE /api/SocialButterfly/events/{id}`
* **Behavior:**
  + ✅ Creator can delete
  + ✅ Admin can delete
  + ❌ Others get `403 Forbidden`

---

## ✍️ Reviews

### 📌 1. **Create Review**

* **Endpoint:** `POST /api/SocialButterfly/reviews`
* **Request Body:**

```json
{
  "event_id": "uuid",
  "userId": "uuid",
  "rating": 5,
  "comment": "Excellent event!"
}
```

* **Response:** `201 Created`

### 📌 2. **Validate Review (Admin Only)**

* **Endpoint:** `POST /api/SocialButterfly/admin/reviews/{id}/validate`

* **Headers:** `{ adminId: "uuid" }`

* **Response:** `200 OK`

```json
{
  "review": {
    "id": "...",
    "validated": true
  }
}
```

### 📌 3. **Get Reviews for an Event**

* **Endpoint:** `GET /api/SocialButterfly/events/{eventId}/reviews`

### 📌 4. **Update Review (Creator Only)**

* **Endpoint:** `PUT /api/SocialButterfly/reviews/{id}`
* **Request Body:**

```json
{
  "rating": 4,
  "comment": "Updated"
}
```

### 📌 5. **Delete Review**

* **Endpoint:** `DELETE /api/SocialButterfly/reviews/{id}`
* **Behavior:**
  + ✅ Creator or admin can delete
  + ❌ Others receive `403 Forbidden`

---

## 🛠️ Admin Operations

### 📌 1. **Validate Event**

* See Events section — Admin header required

### 📌 2. **Validate Review**

* See Reviews section — Admin header required

### 📌 3. **Delete Event (Admin Only)**

* **Endpoint:** `DELETE /api/SocialButterfly/admin/events/{id}`
* **Headers:** `{ adminId: "uuid" }`

### 📌 4. **Delete Review (Admin Only)**

* **Endpoint:** `DELETE /api/SocialButterfly/admin/reviews/{id}`
* **Headers:** `{ adminId: "uuid" }`
