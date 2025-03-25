# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/SocialButterfly/users

**Description:** Registers a new community member.
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/SocialButterfly/users

**Description:** Lists all users.
* **Response:** 200 OK with user list

#### GET /api/SocialButterfly/users/{id}

**Description:** Retrieves a user by ID.
* **Required:** id  
* **Response:** 200 OK with user object

#### PUT /api/SocialButterfly/users/{id}

**Description:** Updates user information.
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/SocialButterfly/users/{id}

**Description:** Removes or deactivates a user.
* **Required:** userId  
* **Response:** 200 OK with confirmation message

---

### 2️⃣ Event Submission & Management

* **Submit New Event** → POST /api/SocialButterfly/events  
  + **Required:** title, description, date, location, category, submittedBy  
  + **Response:** 201 Created with event object

* **Get All Events** → GET /api/SocialButterfly/events  
  + **Response:** 200 OK with an array of events

* **Get Event by ID** → GET /api/SocialButterfly/events/{id}  
  + **Required:** id  
  + **Response:** 200 OK with event object

* **Update Event** → PUT /api/SocialButterfly/events/{id}  
  + **Required:** title, description, date, location  
  + **Response:** 200 OK with updated event object

* **Delete Event (Admin Only)** → DELETE /api/SocialButterfly/events/{id}  
  + **Required:** id  
  + **Response:** 200 OK with deletion confirmation

---

### 3️⃣ Event & Review Validation

* **Validate Event (Admin Only)** → POST /api/SocialButterfly/admin/events/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with validation status

* **Submit Event Review** → POST /api/SocialButterfly/reviews  
  + **Required:** event_id, userId, rating, comment  
  + **Response:** 201 Created with review object

* **Validate Review (Admin Only)** → POST /api/SocialButterfly/admin/reviews/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with review status

* **Delete Review (Admin Only)** → DELETE /api/SocialButterfly/admin/reviews/{id}  
  + **Required:** review_id  
  + **Response:** 200 OK with success message

---

### 4️⃣ Reviews & Ratings

* **Get Reviews for an Event** → GET /api/SocialButterfly/events/{event_id}/reviews  
  + **Required:** event_id  
  + **Response:** 200 OK with an array of reviews

* **Update a Review** → PUT /api/SocialButterfly/reviews/{review_id}  
  + **Required:** rating, comment  
  + **Response:** 200 OK with updated review object

* **Delete a Review** → DELETE /api/SocialButterfly/reviews/{review_id}  
  + **Required:** review_id  
  + **Response:** 200 OK with success message

---

### 5️⃣ Event Discovery & Filtering

* **Filter Events by Category, Date, or Location** → GET /api/SocialButterfly/events/filter  
  + **Query Params:** category, date, location  
  + **Response:** 200 OK with filtered event list

* **Get Upcoming Featured Events** → GET /api/SocialButterfly/events/featured  
  + **Response:** 200 OK with highlighted events
