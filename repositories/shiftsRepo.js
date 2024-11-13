const Shift = require('../models/shiftsModel');

// getShifts
const getShifts = async () => {
    try {
        return await Shift.find();
    } catch {
        return "Error getting shifts";
    }
};

// getById
const getById = async (id) => {
    try {
        const shift = await Shift.findById(id);
        if (!shift) {
            return "Shift not found";
        }
        return shift;
    } catch {
        return "Wrong ID";
    }
};

// AddShift
const addShift = async (obj) => {
    try {
        const newShift = new Shift(obj);
        return await newShift.save();
    } catch {
        return "Error adding shift";
    }
};

// updateShift
const updateShift = async (id, obj) => {
    try {
        const updatedShift = await Shift.findByIdAndUpdate(id, obj, { new: true });
        if (!updatedShift) {
            return "Shift not found";
        }
        return updatedShift;
    } catch {
        return "Error updating shift";
    }
};

// deleteShift
const deleteShift = async (id) => {
    try {
        const deletedShift = await Shift.findByIdAndDelete(id);
        if (!deletedShift) {
            return "Shift not found";
        }
        return deletedShift;
    } catch {
        return "Error deleting shift";
    }
};

module.exports = { getShifts, getById, addShift, updateShift, deleteShift };
