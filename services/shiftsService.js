const shiftsRepo = require('../repositories/shiftsRepo')

// getAll
const getAll = async () => {
    try {
        return await shiftsRepo.getShifts();
    } catch {
        return "Error getting shifts";
    }
}

// getByID
const getByID = async (id) => {
    try {
        return await shiftsRepo.getById(id);
    } catch {
        return "Wrong ID";
    }
}

// addShift
const addShift = async (obj) => {
    try {
        await shiftsRepo.addShift(obj);
        return 'Created!';
    } catch {
        return "Error creating shift";
    }
}

// updateShift
const updateShift = async (id, obj) => {
    try {
        const updatedShift = await shiftsRepo.updateShift(id, obj);
        if (updatedShift === "Shift not found") {
            return updatedShift; 
        }
        return updatedShift;
    } catch {
        return "Error updating shift";
    }
}

// deleteShift
const deleteShift = async (id) => {
    try {
        const result = await shiftsRepo.deleteShift(id);
        if (result === "Shift not found") {
            return result; 
        }
        return result;
    } catch {
        return "Error deleting shift";
    }
}

module.exports = { getAll, getByID, updateShift, deleteShift, addShift };
