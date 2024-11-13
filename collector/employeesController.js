const express = require('express');
const router = express.Router();
const employeesService = require('../services/employeesService');
const { trackUserActions } = require('../trackUserActions'); 

// Get all employees
router.get('/', trackUserActions, async (req, res) => {
    try {
        const employees = await employeesService.getAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees" });
    }
});

// Get employee by ID
router.get('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await employeesService.getByID(id);
        if (!employee) {
            return res.status(404).json({ message: "employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee by ID" });
    }
});

// Add a new employee
router.post('/', trackUserActions, async (req, res) => {
    const obj = req.body;
    try {
        const result = await employeesService.addEmployee(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding employee" });
    }
});

// Update a employee by ID
router.put('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    try {
        const result = await employeesService.updateEmployee(id, obj);
        if (!result) {
            return res.status(404).json({ message: "employee not found for update" });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error updating employee" });
    }
});

// Delete a employee by ID
router.delete('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedemployee = await employeesService.deleteEmployee(id);
        if (!deletedemployee) {
            return res.status(404).json({ message: "employee not found for deletion" });
        }
        res.json(deletedemployee);
    } catch (error) {
        res.status(500).json({ message: "Error deleting employee" });
    }
});

module.exports = router;
