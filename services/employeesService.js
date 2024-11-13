const employeesRepo = require('../repositories/employeesRepo')

// getAll
const getAll = async () => {
    try {
        return await employeesRepo.getAllEmployees();
    } catch (error) {
        return "Error getting employees: " + error.message; 
    }
}

// getByID
const getByID = async (id) => {
    try {
        return await employeesRepo.getById(id);
    } catch (error) {
        return "Error retrieving employee: " + error.message; 
    }
}

// addEmployee
const addEmployee = async (obj) => {
    try {
        await employeesRepo.addEmployee(obj);
        return 'Employee created successfully!'; 
    } catch (error) {
        return "Error creating employee: " + error.message; 
    }
}

// updateEmployee
const updateEmployee = async (id, obj) => {
    try {
        const updatedEmployee = await employeesRepo.updateEmployee(id, obj);
        if (updatedEmployee === "Employee not found") {
            return updatedEmployee; 
        }
        return updatedEmployee;
    } catch (error) {
        return "Error updating employee: " + error.message; 
    }
}

// deleteEmployee
const deleteEmployee = async (id) => {
    try {
        const result = await employeesRepo.deleteEmployee(id);
        if (result === "Employee not found") {
            return result; 
        }
        return result;
    } catch (error) {
        return "Error deleting employee: " + error.message; 
    }
}

module.exports = { getAll, getByID, updateEmployee, deleteEmployee, addEmployee };
