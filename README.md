Full-Stack User Management & Authentication API
This repository contains a robust full-stack API application for user management, authentication, and access control. Built using Node.js, Express, MongoDB, and JWT authentication, this project features secure endpoints for login, registration, and protected user operations, along with efficient logging and tracking of user actions.

Features
User Authentication: Secure login and registration using JSON Web Tokens (JWT).
Protected Routes: Routes secured with JWT middleware to ensure only authenticated users can access sensitive data.
User Management: CRUD operations on user data, with routes to retrieve users by username or email.
Action Tracking: Logs each user action (GET, POST, etc.) with timestamps for better tracking and analysis.
Error Handling: Structured error handling for both server errors and invalid requests.
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: JWT (JSON Web Token)
Logging: JSON File-based logging for tracking user activities
Utilities: JSON file for storing configuration, crypto for generating secure tokens
Project Structure
plaintext
Copy code
├── controllers
│   └── usersController.js    # Controller for user-related routes and logic
├── middleware
│   └── authenticateToken.js  # Middleware for JWT authentication
├── services
│   └── usersService.js       # Service for user data handling and database queries
├── trackUserActions.js       # Utility for tracking and logging user actions
├── config.json               # Configuration file for storing JWT secrets and other constants
└── app.js                    # Main application file
Getting Started
Prerequisites
Node.js and npm installed
MongoDB instance running (local or cloud)
Installation
Clone the repository:

git clone https://github.com/ItayDevops/NodeJs-Factory-App.git

Navigate to the project directory:

cd NodeJs-Factory-App
Install dependencies:

npm install

Configuration
Set up your JWT_SECRET in the config.json file for secure token generation.
Configure your MongoDB connection string in app.js (or in an environment variable).
Running the Application
Start the server:

npm start
The API will be running on http://localhost:3000.
API Endpoints
User Authentication

POST /users/login - Logs in a user and provides a JWT token.
POST /users/register - Registers a new user.
Protected Routes

GET /users - Retrieves all users (requires JWT).
GET /users/:id - Retrieves a user by ID.
GET /users/findByEmail/:email - Finds a user by email.
GET /users/findByUsername/:username - Finds a user by username.
Usage
Use a tool like Postman to test the endpoints.
Attach the JWT token to headers as Authorization: Bearer <token> when accessing protected routes.
Logs
User actions (like GET, POST, etc.) are logged in JSON format with timestamps.
Logs are structured to provide line-by-line tracking for easy review and analysis.
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is licensed under the MIT License.
