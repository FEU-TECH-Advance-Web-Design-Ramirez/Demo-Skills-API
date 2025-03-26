### **REST API Tests Documentation - Language Learner (Ursaluna TB22) (TW291 Druddigon)**  

## **API Endpoints and Requirements**  

---

### **1. User Account Management**  

#### `POST /api/LanguageLearner/users`

**Description:** Creates a new user.
* **Required:** `email`,      `name`,      `password`
* **Response:** `201 Created` with user object

#### `GET /api/LanguageLearner/users`

**Description:** Fetches all users.
* **Response:** `200 OK` with an array of users

#### `GET /api/LanguageLearner/users/login/{email}`

**Description:** Fetches a single user by Email.
* **Required:** `email` (in URL path)
* **Response:** `200 OK` with user object

#### `PUT /api/LanguageLearner/users/{id}`

**Description:** Updates user details.
* **Required:** `name`
* **Response:** `200 OK` with updated user object

#### `DELETE /api/LanguageLearner/users/{id}`

**Description:** Bans a user.
* **Required:** `userId`
* **Response:** `200 OK` with success message

---

### **2. Language Learning Platform Submission & Management**  

#### `POST /api/LanguageLearner/platforms`

**Description:** Submits a new language learning platform for review.  
* **Required:** `name`,      `website`,      `languagesOffered`,      `description`,  `submittedBy`  
* **Response:** `201 Created` with platform object  

#### `GET /api/LanguageLearner/platforms`

**Description:** Fetches all submitted language learning platforms.  
* **Response:** `200 OK` with an array of platforms  

#### `GET /api/LanguageLearner/platforms/{id}`

**Description:** Fetches a single language learning platform by ID.  
* **Required:** `id` (in URL path)  
* **Response:** `200 OK` with platform object  

#### `PUT /api/LanguageLearner/admin/platforms/{id}`

**Description:** Updates platform information (Admin Only).  
* **Required:** `name`,      `website`,      `languagesOffered`,  `description`  
* **Response:** `200 OK` with updated platform object  

#### `DELETE /api/LanguageLearner/admin/platforms/{id}`

**Description:** Deletes a language learning platform (Admin Only).  
* **Required:** `id`  
* **Response:** `200 OK` with success message  

---

### **3. Reviews & Ratings**  

#### `POST /api/LanguageLearner/reviews`

**Description:** Submits a personal review and rating for a language learning platform.  
* **Required:** `platformId`,  `userId`,      `rating`,  `comment`  
* **Response:** `201 Created` with review object  

#### `GET /api/LanguageLearner/reviews`

**Description:** Fetches reviews for a specific language learning platform.  
* **Required:** `platformId`  
* **Response:** `200 OK` with an array of reviews  

#### `PUT /api/LanguageLearner/reviews/{reviewId}`

**Description:** Updates a submitted review.  
* **Required:** `reviewId`,      `rating`,  `comment`  
* **Response:** `200 OK` with updated review object  

#### `DELETE /api/LanguageLearner/reviews/{reviewId}`

**Description:** Deletes a review.  
* **Required:** `reviewId`  
* **Response:** `200 OK` with success message  

---

### **4. Ranking & Sorting**  

#### `GET /api/LanguageLearner/platforms/leaderboard`

**Description:** Retrieves the ranking of top-rated language learning platforms.  
* **Response:** `200 OK` with a list of ranked platforms  

#### `GET /api/LanguageLearner/platforms/sort?order={orderBy}`

**Description:** Retrieves language learning platforms sorted by criteria ( `rating` , `popularity` , etc.).  
* **Required Query Params:** `orderBy` (e.g.,      `rating`,      `popularity`)  
* **Response:** `200 OK` with sorted platform list  

---

### **5. Admin Validation**  

#### `POST /api/LanguageLearner/admin/platforms/{id}/validate`

**Description:** Confirms and validates a submitted language learning platform (Admin Only).  
* **Required:** `id`  
* **Response:** `200 OK` with validation status  

#### `POST /api/LanguageLearner/admin/reviews/{id}/validate`

**Description:** Confirms and validates a submitted review (Admin Only).  
* **Required:** `id`  
* **Response:** `200 OK` with validation status  
