# API Testing Guide

This document provides test examples for all API endpoints using curl commands and expected responses.

## Prerequisites

Make sure the server is running:
```bash
npm start
```

The API will be available at `http://localhost:3000`

---

## Test 1: Check API Root

```bash
curl http://localhost:3000/
```

**Expected Response:**
```json
{
  "message": "User Management API",
  "version": "1.0.0",
  "endpoints": {
    "GET /api/users": "Get all users",
    "GET /api/users/:id": "Get a specific user by ID",
    "POST /api/users": "Create a new user",
    "PUT /api/users/:id": "Update a user by ID",
    "DELETE /api/users/:id": "Delete a user by ID"
  }
}
```

---

## Test 2: Create Users

### Create First User
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alice Johnson\",\"email\":\"alice@example.com\",\"age\":28}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "createdAt": "2025-10-26T...",
    "updatedAt": "2025-10-26T..."
  }
}
```

### Create Second User
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Bob Smith\",\"email\":\"bob@example.com\",\"age\":35}"
```

### Create Third User
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Carol White\",\"email\":\"carol@example.com\",\"age\":42}"
```

---

## Test 3: Get All Users

```bash
curl http://localhost:3000/api/users
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "age": 28,
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob@example.com",
      "age": 35,
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "id": 3,
      "name": "Carol White",
      "email": "carol@example.com",
      "age": 42,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## Test 4: Get User by ID

```bash
curl http://localhost:3000/api/users/1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Test 5: Update User

### Update User Name and Age
```bash
curl -X PUT http://localhost:3000/api/users/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Alice Johnson-Smith\",\"age\":29}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "Alice Johnson-Smith",
    "email": "alice@example.com",
    "age": 29,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## Test 6: Validation Tests

### Test Missing Required Field
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"age\":25}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required and must be a non-empty string"
  ]
}
```

### Test Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"invalid-email\",\"age\":25}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email format is invalid"
  ]
}
```

### Test Duplicate Email
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Another User\",\"email\":\"alice@example.com\",\"age\":30}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email already exists"
  ]
}
```

### Test Invalid Age
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"age\":200}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Age must be between 0 and 150"
  ]
}
```

### Test Non-Integer Age
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"age\":25.5}"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Age must be an integer"
  ]
}
```

---

## Test 7: Delete User

```bash
curl -X DELETE http://localhost:3000/api/users/2
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Verify Deletion
```bash
curl http://localhost:3000/api/users/2
```

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Test 8: Error Handling

### Test Invalid User ID (Non-existent)
```bash
curl http://localhost:3000/api/users/999
```

**Expected Response:**
```json
{
  "success": false,
  "message": "User not found"
}
```

### Test Invalid User ID (Non-numeric)
```bash
curl http://localhost:3000/api/users/abc
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid user ID"
}
```

### Test Non-existent Endpoint
```bash
curl http://localhost:3000/api/invalid
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Endpoint not found"
}
```

---

## Testing with Postman

If you prefer using Postman:

1. Import these endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. For POST and PUT requests:
   - Set `Content-Type` header to `application/json`
   - Use the JSON bodies provided in the curl examples

---

## Testing Checklist

- [x] API root responds with documentation
- [x] Create users with valid data
- [x] Get all users
- [x] Get user by ID
- [x] Update user information
- [x] Delete user
- [x] Validate required fields
- [x] Validate email format
- [x] Validate email uniqueness
- [x] Validate age range
- [x] Validate age type (integer)
- [x] Handle non-existent users (404)
- [x] Handle invalid IDs (400)
- [x] Handle non-existent endpoints (404)

---

## Notes for Windows PowerShell

If using PowerShell instead of Command Prompt, replace `^` with `` ` `` (backtick) for line continuation, or write the entire command on one line.

Example:
```powershell
curl -X POST http://localhost:3000/api/users `
  -H "Content-Type: application/json" `
  -d "{`"name`":`"Alice Johnson`",`"email`":`"alice@example.com`",`"age`":28}"
```
