const departmentsRepo = require('../repositories/departmentsRepo')

// getAll
const getAll = async () => {
    try {
        return await departmentsRepo.getAllDepartments();
    } catch (error) {
        return "Error getting Departments: " + error.message; 
    }
}

// getByID
const getById = async (id) => {
    try {
        return await departmentsRepo.getById(id);
    } catch (error) {
        return "Error retrieving Department: " + error.message; 
    }
}

// addDepartment
const addDepartment = async (obj) => {
    try {
        await departmentsRepo.addDepartment(obj);
        return 'Department created successfully!'; 
    } catch (error) {
        return "Error creating Department: " + error.message; 
    }
}

// updateDepartment
const updateDepartment = async (id, obj) => {
    try {
        const updatedDepartment = await departmentsRepo.updateDepartment(id, obj);
        if (updatedDepartment === "Department not found") {
            return updatedDepartment; 
        }
        return updatedDepartment;
    } catch (error) {
        return "Error updating Department: " + error.message; 
    }
}

// deleteDepartment
const deleteDepartment = async (id) => {
    try {
        const result = await departmentsRepo.deleteDepartment(id);
        if (result === "Department not found") {
            return result; 
        }
        return result;
    } catch (error) {
        return "Error deleting Department: " + error.message; 
    }
}

module.exports = { getAll, getById, updateDepartment, deleteDepartment, addDepartment };
