# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/EduSeeker/users

**Description:** Registers a new lifelong learner.
* **Required:** email, name, password
* **Response:** 201 Created with user object

#### GET /api/EduSeeker/users

**Description:** Retrieves all registered users.
* **Response:** 200 OK with an array of user objects

#### GET /api/EduSeeker/users/login/{email}

**Description:** Fetches a specific user by Email.
* **Required:** email (in URL path)
* **Response:** 200 OK with user object

#### PUT /api/EduSeeker/users/{id}

**Description:** Updates user profile details.
* **Required:** name
* **Response:** 200 OK with updated user object

#### DELETE /api/EduSeeker/users/{id}

**Description:** Deactivates a user account.
* **Required:** userId
* **Response:** 200 OK with confirmation message

---

### 2️⃣ Learning Platform Submission & Management

* **Submit New Platform** → POST /api/EduSeeker/platforms  
  + **Required:** name, description, category, url, submittedBy
  + **Response:** 201 Created with platform object

* **Get All Platforms** → GET /api/EduSeeker/platforms  
  + **Response:** 200 OK with an array of platforms

* **Get Platform by ID** → GET /api/EduSeeker/platforms/{id}  
  + **Required:** id
  + **Response:** 200 OK with platform object

* **Update Platform Info** → PUT /api/EduSeeker/platforms/{id}  
  + **Required:** name, description, category
  + **Response:** 200 OK with updated platform object

* **Delete Platform (Admin Only)** → DELETE /api/EduSeeker/platforms/{id}  
  + **Required:** id
  + **Response:** 200 OK with deletion confirmation

---

### 3️⃣ Platform & Review Validation

* **Validate Platform (Admin Only)** → POST /api/EduSeeker/admin/platforms/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with validation status

* **Submit Platform Review** → POST /api/EduSeeker/reviews  
  + **Required:** platform_id, userId, rating, comment  
  + **Response:** 201 Created with review object

* **Validate Review (Admin Only)** → POST /api/EduSeeker/admin/reviews/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with review status

* **Delete Review (Admin Only)** → DELETE /api/EduSeeker/admin/reviews/{id}  
  + **Required:** review_id  
  + **Response:** 200 OK with success message

---

### 4️⃣ Reviews & Ratings

* **Get Reviews for a Platform** → GET /api/EduSeeker/platforms/{platform_id}/reviews  
  + **Required:** platform_id  
  + **Response:** 200 OK with an array of reviews

* **Update a Review** → PUT /api/EduSeeker/reviews/{review_id}  
  + **Required:** rating, comment  
  + **Response:** 200 OK with updated review object

* **Delete a Review** → DELETE /api/EduSeeker/reviews/{review_id}  
  + **Required:** review_id  
  + **Response:** 200 OK with success message
