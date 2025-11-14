#  Car Rental API

This is a RESTful API for a car rental service, built with Node.js, Express, and MongoDB.

The API provides a full backend for a rental service. It allows users to create accounts, log in, get a list of cars, rent a car, and return it.

---

##  Tech Stack

* **Node.js** & **Express.js** for the main server and all the API routes.
* **MongoDB** as the database.
* **Mongoose** to create the data models (`User`, `Car`, `Rental`) and interact with the database.
* **`bcryptjs`** to securely hash user passwords.
* **`jsonwebtoken` (JWT)** to handle authentication and protect sensitive routes.
* **`dotenv`** to manage environment variables.

---

##  Features

* **User System:** Users can register (`/api/users`) and log in (`/api/auth/login`). Passwords are securely hashed.
* **Car Listings:** Endpoints to add new cars (`POST /api/cars`) and get a list of all available cars (`GET /api/cars`).
* **Filtering & Pagination:** The `GET /cars` route supports filtering by availability (e.g., `?available=true`) and pagination (e.g., `?page=1&limit=5`).
* **"Rent & Return" Logic:**
    * When a car is rented (`POST /api/rentals`), the system checks its availability. If available, it's marked as `available: false` and a rental record is created.
    * When a car is returned (`PUT /api/rentals/:id/return`), it's marked as `available: true`.
    * **Cost Calculation:** The total cost of the rental is automatically calculated upon return, based on the car's `dailyRate` and the duration of the rental.
* **Protected Routes:** All critical endpoints (renting, returning, viewing rental history) are protected. A valid JWT Bearer Token must be included in the authorization header.

---

##  Getting Started

### 1. Prerequisites
* Node.js (v16+)
* A MongoDB connection string (e.g., from a free MongoDB Atlas cluster)

### 2. Setup
1.  **Clone the project:**
    ```bash
    git clone https://github.com/nikhilbhaskar-dev/Car-Rental-Services.git
    cd Car-Rental-Services
    cd car-rental-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create your `.env` file:**
    Create a new file in the root of the project named `.env`.

4.  **Add environment variables to `.env`:**
    ```
    # Port to run the server on
    PORT=3000
    
    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://...your_connection_string...
    
    # A strong, random string for signing tokens
    JWT_SECRET=your_strong_secret_key_here
    ```

### 3. Run the Server
Run the development server script:
```bash
npm run dev