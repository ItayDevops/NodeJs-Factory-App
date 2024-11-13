const express = require('express');
const router = express.Router();
const departmentsService = require('../services/departmentsService');
const { trackUserActions } = require('../trackUserActions'); 

// Get all departments
router.get('/', trackUserActions, async (req, res) => {
    try {
        const departments = await departmentsService.getAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching departments" });
    }
});

// Get department by ID
router.get('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    try {
        const department = await departmentsService.getById(id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: "Error fetching department by ID" });
    }
});

// Add a new department
router.post('/', trackUserActions, async (req, res) => {
    const obj = req.body;
    try {
        const result = await departmentsService.addDepartment(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding department" });
    }
});

// Update a department by ID
router.put('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    try {
        const result = await departmentsService.updateDepartment(id, obj);
        if (!result) {
            return res.status(404).json({ message: "Department not found for update" });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error updating department" });
    }
});

// Delete a department by ID
router.delete('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDepartment = await departmentsService.deleteDepartment(id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found for deletion" });
        }
        res.json(deletedDepartment);
    } catch (error) {
        res.status(500).json({ message: "Error deleting department" });
    }
});

module.exports = router;
