const usersRepo = require('../repositories/usersRepo');
const usersWS = require('../repositories/usersWS')

// Get all users
const getAll = async () => {
    try {
        return await usersRepo.getAllUsers();
    } catch {
        return "Error fetching all users";
    }
}

// Get user by ID
const getByID = async (id) => {
    try {
        return await usersRepo.getById(id);
    } catch {
        return "Wrong ID";
    }
}

// Find user by email
const findByEmail = async (email) => {
    try {
        return await usersRepo.findByEmail(email);
    } catch {
        return "Error finding user by email";
    }
}

// Find user by username
const findByUsername = async (username) => {
    try {
        return await usersRepo.findByUsername(username);
    } catch {
        return "Error finding user by username";
    }
}

const findUserInWS = async (username, email) => {
    try {
        const users = await usersWS.getAllUsers(); 
        console.log('username:', username);
console.log('email:', email);

        return users.find(user => user.name == username && user.email == email);
        
    } catch (error) {
        console.error("Error finding user in WS:", error.message);
        throw error;
    }
};

const isUserRegistered = async (name) => {
    try {
        const users = await usersRepo.getAllUsers();
        console.log(users)
        console.log(name)
        return users.find(user => user.fullname == name);
    } catch (error) {
        console.error("Error checking registration status:", error.message);
        throw error;
    }
};



module.exports = { getAll, getByID, findByEmail, findByUsername ,findUserInWS,isUserRegistered};
