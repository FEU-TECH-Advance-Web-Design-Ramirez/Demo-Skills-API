# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/MentalWellness/users

**Description:** Registers a new user focused on mental wellness.  
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/MentalWellness/users

**Description:** Fetches a list of all users.  
* **Response:** 200 OK with user list

#### GET /api/MentalWellness/users/{id}

**Description:** Gets details for a specific user.  
* **Required:** id  
* **Response:** 200 OK with user object

#### PUT /api/MentalWellness/users/{id}

**Description:** Updates user profile information.  
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/MentalWellness/users/{id}

**Description:** Deactivates a user account.  
* **Required:** userId  
* **Response:** 200 OK with confirmation

---

### 2️⃣ Journal Entry Management

* **Create Journal Entry** → POST /api/MentalWellness/journals  
  + **Required:** userId, mood, entryText, tags  
  + **Response:** 201 Created with journal object

* **Get Journal Entries by User** → GET /api/MentalWellness/users/{userId}/journals  
  + **Response:** 200 OK with array of journal entries

* **Update Journal Entry** → PUT /api/MentalWellness/journals/{id}  
  + **Required:** entryText, mood  
  + **Response:** 200 OK with updated journal entry

* **Delete Journal Entry** → DELETE /api/MentalWellness/journals/{id}  
  + **Required:** journalId  
  + **Response:** 200 OK with confirmation message

---

### 3️⃣ Personality & Self-Assessment

* **Take Personality Exam** → POST /api/MentalWellness/assessments  
  + **Required:** userId, responses  
  + **Response:** 201 Created with assessment results

* **Get User Assessment** → GET /api/MentalWellness/users/{userId}/assessments  
  + **Response:** 200 OK with assessment result

---

### 4️⃣ Guided Meditations & Support

* **Get Guided Meditations** → GET /api/MentalWellness/meditations  
  + **Response:** 200 OK with array of meditation objects

* **Submit Meditation Feedback** → POST /api/MentalWellness/meditations/{id}/feedback  
  + **Required:** userId, rating, comment  
  + **Response:** 201 Created with feedback object

---

### 5️⃣ Mental Health Facilities

* **Register Hospital or Clinic** → POST /api/MentalWellness/hospitals  
  + **Required:** name, location, contactInfo, type  
  + **Response:** 201 Created with hospital object

* **Get All Registered Facilities** → GET /api/MentalWellness/hospitals  
  + **Response:** 200 OK with array of hospitals

* **Search Facility by Location or Type** → GET /api/MentalWellness/hospitals/search  
  + **Query Params:** location, type  
  + **Response:** 200 OK with filtered list
