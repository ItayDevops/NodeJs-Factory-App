const connectDB = require('./config/DB');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const jsonfile = require('jsonfile');
const app = express();
const PORT = 3000;

// jwt_secret
const configPath = './config.json';

// Load JWT Secret Key from file
let config = jsonfile.readFileSync(configPath);

// generate new token
if (!config.JWT_SECRET) {
    config.JWT_SECRET = crypto.randomBytes(32).toString('hex');
    jsonfile.writeFileSync(configPath, config, { spaces: 2 });
}

// Extract the JWT_SECRET from the loaded config
const JWT_SECRET = config.JWT_SECRET;

// Import Routes
const departmentRouter = require('./collector/departmentsController');
const employeeRouter = require('./collector/employeesController');
const shiftRouter = require('./collector/shiftsController');
const usersRouter = require('./collector/usersController');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/departments', departmentRouter);
app.use('/employees', employeeRouter);
app.use('/shifts', shiftRouter);
app.use('/users', usersRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`);
});
