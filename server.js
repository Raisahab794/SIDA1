const express = require('express');
const bodyParser = require('body-parser');
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require('./dataStore');
const {
    validateUserCreation,
    validateUserUpdate
} = require('./validation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'User Management API',
        version: '1.0.0',
        endpoints: {
            'GET /api/users': 'Get all users',
            'GET /api/users/:id': 'Get a specific user by ID',
            'POST /api/users': 'Create a new user',
            'PUT /api/users/:id': 'Update a user by ID',
            'DELETE /api/users/:id': 'Delete a user by ID'
        }
    });
});

// GET /api/users - Get all users
app.get('/api/users', (req, res) => {
    try {
        const users = getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
});

// GET /api/users/:id - Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        
        const user = getUserById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving user',
            error: error.message
        });
    }
});

app.post('/api/users', (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        const validation = validateUserCreation({ name, email, age });
        
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }
        
        const newUser = addUser({ name, email, age });
        
        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: 'Failed to create user'
            });
        }
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

app.put('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        
        const { name, email, age } = req.body;
        const updateData = {};
        
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (age !== undefined) updateData.age = age;
        
        const validation = validateUserUpdate(userId, updateData);
        
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validation.errors
            });
        }
        
        const updatedUser = updateUser(userId, updateData);
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found or update failed'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

app.delete('/api/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        
        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        
        const deleted = deleteUser(userId);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}`);
});
