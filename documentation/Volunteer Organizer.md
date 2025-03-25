# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/VolunteerHub/users

**Description:** Registers a new volunteer or organizer.  
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/VolunteerHub/users/{id}

**Description:** Retrieves a user profile.  
* **Required:** id  
* **Response:** 200 OK with user object

#### PUT /api/VolunteerHub/users/{id}

**Description:** Updates user profile information.  
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/VolunteerHub/users/{id}

**Description:** Deletes or deactivates the user account.  
* **Required:** userId  
* **Response:** 200 OK with confirmation

---

### 2️⃣ Volunteer Activity Management

* **Submit New Volunteer Activity** → POST /api/VolunteerHub/activities  
  + **Required:** title, description, location, date, organizerId  
  + **Response:** 201 Created with activity object

* **Get All Volunteer Activities** → GET /api/VolunteerHub/activities  
  + **Response:** 200 OK with list of activities

* **Get Activity by ID** → GET /api/VolunteerHub/activities/{id}  
  + **Required:** id  
  + **Response:** 200 OK with activity object

* **Update Activity Info** → PUT /api/VolunteerHub/activities/{id}  
  + **Required:** title, description, location, date  
  + **Response:** 200 OK with updated activity

* **Delete Activity (Admin Only)** → DELETE /api/VolunteerHub/activities/{id}  
  + **Required:** id  
  + **Response:** 200 OK with deletion confirmation

---

### 3️⃣ Volunteer Applications & Organizer Review

* **Apply to Volunteer** → POST /api/VolunteerHub/applications  
  + **Required:** userId, activityId, motivation  
  + **Response:** 201 Created with application object

* **Get All Applications for an Activity** → GET /api/VolunteerHub/activities/{activityId}/applications  
  + **Response:** 200 OK with list of applicants

* **Organizer Confirms/Rejects Application** → PUT /api/VolunteerHub/applications/{id}/status  
  + **Required:** status (confirmed/rejected)  
  + **Response:** 200 OK with updated application

---

### 4️⃣ Admin Confirmations

* **Confirm Volunteer Activity (Admin Only)** → POST /api/VolunteerHub/admin/activities/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with validation status
