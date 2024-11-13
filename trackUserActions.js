const jwt = require('jsonwebtoken');
const jsonfile = require('jsonfile');
const usersRepo = require('./repositories/usersRepo');
const logFilePath = './log.json';

// Middleware to track user actions with JWT authorization
const trackUserActions = async (req, res, next) => {
    //Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token 

    if (!token) {
        return res.status(403).json({ message: 'Authorization token is missing' });
    }

    try {
        // Use JWT secret 
        const secretKey = 'secret';  // Read from config.json
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        // Get the userName from the decoded token
        const userName = decoded.username;
    

        // Fetch the user's action limit from mongoDB
        const user = await usersRepo.findByUsername(userName);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const dailyActionLimit = user.actions; 

        // Read log
        let logs = await jsonfile.readFile(logFilePath);
        if (typeof logs !== 'object') {
            logs = {}; // Initialize if empty 
        }

        // Ensure the user's logs exist 
        if (!logs[userName]) {
            logs[userName] = [];
        }

        // Filter today's logs for this user
        const today = new Date().toISOString().split('T')[0];  // Today's date 
        const todayLogs = logs[userName].filter((log) => log.date === today);

        // Check if the action limit has been exceeded
        if (todayLogs.length >= dailyActionLimit) {
            return res.status(429).json({ message: 'Action limit exceeded' });
        }

        // Log the user action
        logs[userName].push({
            action: req.method,  // write the action type
            date: today,         
            timestamp: new Date().toISOString() // Log timestamp of the action
        });

        // Step 10: Save the updated logs back to the file
        await jsonfile.writeFile(logFilePath, logs);

        next();  
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token or user' });
    }
};

module.exports = { trackUserActions };
