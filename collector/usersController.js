const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jsonfile = require('jsonfile');
const { trackUserActions } = require('../trackUserActions');
const usersService = require('../services/usersService');
// Path to the config file
const configFilePath = './config.json';
let JWT_SECRET;


try {
    const config = jsonfile.readFile(configFilePath);
    if (config.JWT_SECRET) {
        JWT_SECRET = 'secret';
    } else {
        // If the secret doesn't exist, generate and save a new one
        JWT_SECRET = 'secret' //crypto.randomBytes(32).toString('hex');
        jsonfile.writeFile(configFilePath, { ...config, JWT_SECRET }, { spaces: 2 });
    }
} catch (err) {
    console.error('Error reading config file:', err);
    process.exit(1); // Exit if the config file can't be read
}





router.post('/login', async (req, res) => {
    const { username, email } = req.body;

    try {
        const userFromWS = await usersService.findUserInWS(username, email);
        if (userFromWS) {
            const isUserRegistered = await usersService.isUserRegistered(userFromWS.name);

            if (isUserRegistered) {
                // Create the token with the username and email as payload
                const tokenPayload = { username, email };
                const token = jwt.sign(tokenPayload, 'secret', { expiresIn: '1h' });
                res.json({ message: 'Login Successful', token });
            } else {
                res.status(401).json({ message: 'User needs to register' });
            }
        } else {
            res.status(401).json({ message: 'Invalid username or email' });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Get all users
router.get('/', trackUserActions,  async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a user by ID
router.get('/:id', trackUserActions,  async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersService.getByID(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Find user by email
router.get('/findByEmail/:email', trackUserActions,  async (req, res) => {
    const { email } = req.params;
    try {
        const user = await usersService.findByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by email:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Find user by username
router.get('/findByUsername/:username', trackUserActions,  async (req, res) => {
    const { username } = req.params;
    try {
        const user = await usersService.findByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user by username:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;
