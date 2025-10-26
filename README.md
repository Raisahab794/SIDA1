# User Management REST API

A simple RESTful API for managing user records with basic CRUD operations. User data is stored in a local JSON file.

## Features

- ✅ Create new users
- ✅ View all users or a specific user
- ✅ Update user information
- ✅ Delete users
- ✅ Email validation (format and uniqueness)
- ✅ Age validation
- ✅ Proper error handling and messages
- ✅ JSON file-based storage

## User Schema

Each user has the following fields:
- `id` (integer): Auto-generated unique identifier
- `name` (string): User's name (required)
- `email` (string): User's email (required, must be unique and valid format)
- `age` (integer): User's age (required, must be between 0-150)
- `createdAt` (timestamp): Automatically added when user is created
- `updatedAt` (timestamp): Automatically updated when user is modified

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get All Users
**GET** `/api/users`

Returns a list of all users.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "abc",
      "email": "abc@example.com",
      "age": 30,
      "createdAt": "2025-10-26T10:00:00.000Z",
      "updatedAt": "2025-10-26T10:00:00.000Z"
    }
  ]
}
```

### 2. Get User by ID
**GET** `/api/users/:id`

Returns a specific user by ID.

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "abc",
    "email": "abc@example.com",
    "age": 30,
    "createdAt": "2025-10-26T10:00:00.000Z",
    "updatedAt": "2025-10-26T10:00:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User not found"
}
```

### 3. Create New User
**POST** `/api/users`

Creates a new user.

**Request Body:**
```json
{
  "name": "abc",
  "email": "abc@example.com",
  "age": 30
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "abc",
    "email": "abc@example.com",
    "age": 30,
    "createdAt": "2025-10-26T10:00:00.000Z",
    "updatedAt": "2025-10-26T10:00:00.000Z"
  }
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email already exists"
  ]
}
```

### 4. Update User
**PUT** `/api/users/:id`

Updates an existing user. You can update one or more fields.

**Request Body:**
```json
{
  "name": "abc Smith",
  "age": 31
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "abc Smith",
    "email": "abc@example.com",
    "age": 31,
    "createdAt": "2025-10-26T10:00:00.000Z",
    "updatedAt": "2025-10-26T11:00:00.000Z"
  }
}
```

### 5. Delete User
**DELETE** `/api/users/:id`

Deletes a user by ID.

**Response (Success):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User not found"
}
```

## Validation Rules

### Name
- Required
- Must be a non-empty string

### Email
- Required
- Must be a valid email format (e.g., user@example.com)
- Must be unique (no duplicate emails allowed)
- Case-insensitive comparison

### Age
- Required
- Must be an integer
- Must be between 0 and 150

## Testing the API

You can test the API using curl, Postman, or any HTTP client. See `API_TESTS.md` for detailed test examples.

## Project Structure

```
SIDA1/
├── server.js          # Main server file with API endpoints
├── dataStore.js       # Data storage operations (JSON file)
├── validation.js      # User data validation logic
├── users.json         # JSON file storing user data
├── package.json       # Project dependencies
└── README.md          # This file
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

All error responses include:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["List of specific errors (if applicable)"]
}
```

## Data Persistence

User data is stored in `users.json` file. The file is automatically created and updated as you add, modify, or delete users.

## License

ISC
