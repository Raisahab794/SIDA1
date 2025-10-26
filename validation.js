const { getUserByEmail, getUserById } = require('./dataStore');
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


const validateUserCreation = (userData) => {
    const errors = [];
    
    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim() === '') {
        errors.push('Name is required and must be a non-empty string');
    }
    
    if (!userData.email || typeof userData.email !== 'string' || userData.email.trim() === '') {
        errors.push('Email is required and must be a non-empty string');
    } else if (!isValidEmail(userData.email)) {
        errors.push('Email format is invalid');
    } else {
        const existingUser = getUserByEmail(userData.email);
        if (existingUser) {
            errors.push('Email already exists');
        }
    }
    
    if (userData.age === undefined || userData.age === null) {
        errors.push('Age is required');
    } else if (typeof userData.age !== 'number' || !Number.isInteger(userData.age)) {
        errors.push('Age must be an integer');
    } else if (userData.age < 0 || userData.age > 150) {
        errors.push('Age must be between 0 and 150');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};


const validateUserUpdate = (userId, userData) => {
    const errors = [];
    
    const existingUser = getUserById(userId);
    if (!existingUser) {
        errors.push('User not found');
        return {
            isValid: false,
            errors
        };
    }
    
    if (userData.name !== undefined) {
        if (typeof userData.name !== 'string' || userData.name.trim() === '') {
            errors.push('Name must be a non-empty string');
        }
    }
    
    if (userData.email !== undefined) {
        if (typeof userData.email !== 'string' || userData.email.trim() === '') {
            errors.push('Email must be a non-empty string');
        } else if (!isValidEmail(userData.email)) {
            errors.push('Email format is invalid');
        } else {
            const userWithEmail = getUserByEmail(userData.email);
            if (userWithEmail && userWithEmail.id !== userId) {
                errors.push('Email already exists');
            }
        }
    }
    
    if (userData.age !== undefined) {
        if (typeof userData.age !== 'number' || !Number.isInteger(userData.age)) {
            errors.push('Age must be an integer');
        } else if (userData.age < 0 || userData.age > 150) {
            errors.push('Age must be between 0 and 150');
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateUserCreation,
    validateUserUpdate
};
