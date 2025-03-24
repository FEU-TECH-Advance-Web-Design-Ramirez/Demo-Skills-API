# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/GameHub/users

**Description:** Registers a new gamer or organizer.  
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/GameHub/users/{id}

**Description:** Retrieves a specific user profile.  
* **Required:** id  
* **Response:** 200 OK with user object

#### PUT /api/GameHub/users/{id}

**Description:** Updates user profile information.  
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/GameHub/users/{id}

**Description:** Deactivates or deletes a user account.  
* **Required:** userId  
* **Response:** 200 OK with confirmation message

---

### 2️⃣ Player Management

* **Create Player Profile** → POST /api/GameHub/players  
  + **Required:** name, userId, rank, mainGame  
  + **Response:** 201 Created with player object

* **Get All Players** → GET /api/GameHub/players  
  + **Response:** 200 OK with array of players

* **Get Player by ID** → GET /api/GameHub/players/{id}  
  + **Required:** id  
  + **Response:** 200 OK with player object

* **Update Player Profile** → PUT /api/GameHub/players/{id}  
  + **Required:** name, rank, mainGame  
  + **Response:** 200 OK with updated player info

* **Delete Player** → DELETE /api/GameHub/players/{id}  
  + **Required:** id  
  + **Response:** 200 OK with deletion confirmation

---

### 3️⃣ Tournament Management

* **Create Tournament** → POST /api/GameHub/tournaments  
  + **Required:** title, game, date, organizerId, rules  
  + **Response:** 201 Created with tournament object

* **Get All Tournaments** → GET /api/GameHub/tournaments  
  + **Response:** 200 OK with list of tournaments

* **Get Tournament by ID** → GET /api/GameHub/tournaments/{id}  
  + **Required:** id  
  + **Response:** 200 OK with tournament object

* **Update Tournament Info** → PUT /api/GameHub/tournaments/{id}  
  + **Required:** title, game, date, rules  
  + **Response:** 200 OK with updated tournament

* **Delete Tournament** → DELETE /api/GameHub/tournaments/{id}  
  + **Required:** id  
  + **Response:** 200 OK with success message

---

### 4️⃣ Admin Validations

* **Validate Player Profile (Admin Only)** → POST /api/GameHub/admin/players/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with validation status

* **Validate Organizer (Admin Only)** → POST /api/GameHub/admin/users/{id}/validate  
  + **Required:** id  
  + **Response:** 200 OK with organizer validation status
