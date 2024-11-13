const Department = require('../models/departmentsModel');

// Get all departments
const getAllDepartments = async () => {
    try {
        return await Department.find();
    } catch {
        return "Error getting departments";
    }
};

// Get department by ID
const getById = async (id) => {
    try {
        const department = await Department.findById(id);
        if (!department) {
            return "Department not found";
        }
        return department;
    } catch {
        return "Wrong ID";
    }
};

// Add department
const addDepartment = async (obj) => {
    try {
        const newDepartment = new Department(obj);
        return await newDepartment.save();
    } catch {
        return "Error creating department";
    }
};

// Update department
const updateDepartment = async (id, obj) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(id, obj, { new: true });
        if (!updatedDepartment) {
            return "Department not found";
        }
        return updatedDepartment;
    } catch {
        return "Error updating department";
    }
};

// Delete department
const deleteDepartment = async (id) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(id);
        if (!deletedDepartment) {
            return "Department not found";
        }
        return deletedDepartment;
    } catch {
        return "Error deleting department";
    }
};

module.exports = { getAllDepartments, getById, addDepartment, updateDepartment, deleteDepartment };
