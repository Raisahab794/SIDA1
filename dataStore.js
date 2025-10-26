const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'users.json');

const readUsers = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};

const writeUsers = (users) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing users file:', error);
        return false;
    }
};

const getAllUsers = () => {
    return readUsers();
};

const getUserById = (id) => {
    const users = readUsers();
    return users.find(user => user.id === id);
};

const getUserByEmail = (email) => {
    const users = readUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

const addUser = (userData) => {
    const users = readUsers();
        const newId = users.length > 0 
        ? Math.max(...users.map(u => u.id)) + 1 
        : 1;
    
    const newUser = {
        id: newId,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    if (writeUsers(users)) {
        return newUser;
    }
    return null;
};


const updateUser = (id, userData) => {
    const users = readUsers();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
        return null;
    }
    
    users[index] = {
        ...users[index],
        ...userData,
        id: users[index].id, 
        createdAt: users[index].createdAt, 
        updatedAt: new Date().toISOString()
    };
    
    if (writeUsers(users)) {
        return users[index];
    }
    return null;
};


const deleteUser = (id) => {
    const users = readUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
        return false; 
    }
    
    return writeUsers(filteredUsers);
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};
