
# 💊 Medicine/Event Management Backend

This is a **Node.js + Express.js backend application** designed for managing users, medicines, and events. It includes features like user authentication, admin roles, form validations, file uploads, and modular API design.

---

## 🚀 Features

- User signup/login with authentication
- Admin dashboard support (via separate controllers)
- RESTful API design (versioned as `v1/`)
- Middleware-based validation using `Joi`
- File uploads using `multer`
- Configurable via `.env` file
- Structured folder hierarchy for scaling
- Role-based access control
- JWT authentication
- File upload support
- Error handling middleware
- Environment variables configuration
- Sequelize ORM for database interactions
- MySQL database
- Migrations for database schema
- Models for database entities
- Controllers for business logic
- Routes for API endpoints
- Middlewares for request processing
- Utilities for common tasks

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MySQL (expected based on structure)
- dotenv for environment variables
- Joi for validation
- Multer for file uploads
- Sequelize for ORM
- bcrypt for password hashing
- jsonwebtoken for authentication
- winston for logging
- express-async-errors for async error handling
- express-useragent for user agent information
- helmet for security
- cors for cross-origin resource sharing
- nodemon for development

---

## 📂 Project Structure

```
medicine/
├── index.js                  # Main entry point
├── .env                      # Environment variables
├── package.json              # Dependencies and scripts
├── config/
│   └── config.js             # DB and server config
├── controllers/
│   ├── admin/                # Admin-specific controllers
│   └── v1/                   # API v1 controllers
├── middlewares/
│   ├── auth.js               # JWT auth checks
│   ├── check_role.js         # Role-based access
│   ├── multer.js             # File upload
│   └── validations/v1/       # Input validations
├── migrations/               # Database migrations
├── models/                   # Database models
├── routes/                   # API routes
├── utils/                    # Utility functions
```

---

## ⚙️ Setup Instructions

1. **Install Node.js** if not already installed.

2. **Clone or extract the project** into your workspace.

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure environment variables**:  
   Create a `.env` file in the root folder and add your variables like DB URL, JWT secret, etc.  
   Example:
   ```env
   PORT=5000
   SQL_DB_HOST=localhost
   SQL_DB_USER=root
   SQL_DB_PASSWORD=
   SQL_DB_NAME=medicine
   ```

5. **Run the server**:
   ```bash
   npm start
   ```

   Or with nodemon (if installed):
   ```bash
   nodemon index.js
   ```

6. Visit:
   ```bash
   http://localhost:5000/api/v1/...
   ```

---

## 📌 Important Notes

- Make sure MySQL is running if you're connecting to a local DB.
- Use Postman or cURL to test APIs.
- You can modify or extend the `controllers/v1/` and `middlewares/validations/` for custom routes.

---

## 👨‍💻 Author & License

This project is meant for learning and extension. License information and contributors can be added here.

---
