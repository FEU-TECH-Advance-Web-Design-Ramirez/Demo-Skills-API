# REST API Tests Documentation

## API Endpoints and Requirements

### 1️⃣ User Authentication & Management

#### POST /api/FinanceManager/users

**Description:** Registers a new user for personal finance tracking.  
* **Required:** email, name, password  
* **Response:** 201 Created with user object

#### GET /api/FinanceManager/users/{id}

**Description:** Retrieves a specific user’s account.  
* **Required:** id  
* **Response:** 200 OK with user profile

#### PUT /api/FinanceManager/users/{id}

**Description:** Updates user profile details.  
* **Required:** name  
* **Response:** 200 OK with updated user object

#### DELETE /api/FinanceManager/users/{id}

**Description:** Deletes a user account.  
* **Required:** userId  
* **Response:** 200 OK with confirmation message

---

### 2️⃣ Income & Expense Tracking

* **Add Expense Entry** → POST /api/FinanceManager/transactions/expense  
  + **Required:** userId, amount, category, date, description  
  + **Response:** 201 Created with expense object

* **Add Income Entry** → POST /api/FinanceManager/transactions/income  
  + **Required:** userId, amount, source, date, description  
  + **Response:** 201 Created with income object

* **Get Transactions by User** → GET /api/FinanceManager/users/{userId}/transactions  
  + **Response:** 200 OK with all income and expenses

* **Update a Transaction** → PUT /api/FinanceManager/transactions/{id}  
  + **Required:** amount, category/source, date, description  
  + **Response:** 200 OK with updated transaction

* **Delete a Transaction** → DELETE /api/FinanceManager/transactions/{id}  
  + **Required:** transactionId  
  + **Response:** 200 OK with deletion confirmation

---

### 3️⃣ Financial Goals

* **Create Financial Goal** → POST /api/FinanceManager/goals  
  + **Required:** userId, title, targetAmount, deadline, description  
  + **Response:** 201 Created with goal object

* **Get All Goals for User** → GET /api/FinanceManager/users/{userId}/goals  
  + **Response:** 200 OK with list of goals

* **Update Goal** → PUT /api/FinanceManager/goals/{id}  
  + **Required:** title, targetAmount, deadline  
  + **Response:** 200 OK with updated goal object

* **Delete Goal** → DELETE /api/FinanceManager/goals/{id}  
  + **Required:** goalId  
  + **Response:** 200 OK with success message

---

### 4️⃣ Sorting & Analysis

* **Sort Transactions by Day/Month** → GET /api/FinanceManager/users/{userId}/transactions/sort  
  + **Query Params:** day, month  
  + **Response:** 200 OK with sorted transactions

* **Monthly Summary Report** → GET /api/FinanceManager/users/{userId}/summary  
  + **Response:** 200 OK with totals for income, expense, and net savings
