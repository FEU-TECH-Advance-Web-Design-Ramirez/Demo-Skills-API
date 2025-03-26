# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/HealthTracker/users

**Description:** Registers a new user managing a chronic illness.  
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/HealthTracker/users

**Description:** Retrieves a all user’s profile.  
* **Response:** 200 OK with user object

#### GET /api/HealthTracker/users/login/{email}

**Description:** Retrieves a user’s profile.  
* **Required:** email  
* **Response:** 200 OK with user object

#### PUT /api/HealthTracker/users/{id}

**Description:** Updates user profile details.  
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/HealthTracker/users/{id}

**Description:** Deletes the user account.  
* **Required:** userId  
* **Response:** 200 OK with confirmation message

---

### 2️⃣ Appointment & Medication Reminder Scheduling

* **Create New Schedule** → POST /api/HealthTracker/schedules  
  + **Required:** userId, type (appointment/medication), dateTime, title, notes  
  + **Response:** 201 Created with schedule object

* **Get All Schedules for User** → GET /api/HealthTracker/users/{userId}/schedules  
  + **Response:** 200 OK with array of schedules

* **Update a Schedule** → PUT /api/HealthTracker/schedules/{id}  
  + **Required:** title, dateTime, notes  
  + **Response:** 200 OK with updated schedule

* **Delete a Schedule** → DELETE /api/HealthTracker/schedules/{id}  
  + **Required:** scheduleId  
  + **Response:** 200 OK with success message

---

### 3️⃣ Personal Health Records

* **Create Health Record Entry** → POST /api/HealthTracker/records  
  + **Required:** userId, type (symptom/log), description, date  
  + **Response:** 201 Created with record object

* **Get Health Records by User** → GET /api/HealthTracker/users/{userId}/records  
  + **Response:** 200 OK with array of records

* **Update Health Record** → PUT /api/HealthTracker/records/{id}  
  + **Required:** description  
  + **Response:** 200 OK with updated record

* **Delete Health Record** → DELETE /api/HealthTracker/records/{id}  
  + **Required:** recordId  
  + **Response:** 200 OK with success message

---

### 4️⃣ Clinic & Hospital Listings

* **Add Clinic or Hospital Schedule** → POST /api/HealthTracker/clinics  
  + **Required:** name, location, availableSlots, contact  
  + **Response:** 201 Created with clinic object

* **Get All Clinics/Hospitals** → GET /api/HealthTracker/clinics  
  + **Response:** 200 OK with array of clinics

* **Search Clinics by Location or Availability** → GET /api/HealthTracker/clinics/search  
  + **Query Params:** location, date  
  + **Response:** 200 OK with matching results
