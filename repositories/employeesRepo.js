const Employee = require('../models/employeesModel')

// Get all employees
const getAllEmployees = async () => {
    try {
        return await Employee.find();
    } catch (error) {
        return { message: "Error retrieving employees: " + error.message };
    }
}

// Get employee by ID
const getById = async (id) => {
    try {
        return await Employee.findById(id);
    } catch (error) {
        return { message: "Wrong ID: " + error.message };
    }
}

// Add new employee
const addEmployee = async (obj) => {
    try {
        const newEmployee = new Employee(obj);
        return await newEmployee.save();
    } catch (error) {
        return { message: "Error adding employee: " + error.message };
    }
}

// Update employee
const updateEmployee = async (id, obj) => {
    try {
        return await Employee.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
        return { message: "Error updating employee: " + error.message };
    }
}

// Delete employee
const deleteEmployee = async (id) => {
    try {
        return await Employee.findByIdAndDelete(id);
    } catch (error) {
        return { message: "Error deleting employee: " + error.message };
    }
}

module.exports = { getAllEmployees, getById, addEmployee, updateEmployee, deleteEmployee };
