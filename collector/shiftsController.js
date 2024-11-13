const express = require('express');
const router = express.Router();
const shiftsService = require('../services/shiftsService');
const { trackUserActions } = require('../trackUserActions'); 

// Get all shifts
router.get('/', trackUserActions, async (req, res) => {
    try {
        const shifts = await shiftsService.getAll();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shifts" });
    }
});

// Get shift by ID
router.get('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    try {
        const shift = await shiftsService.getByID(id);
        if (!shift) {
            return res.status(404).json({ message: "shift not found" });
        }
        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shift by ID" });
    }
});

// Add a new shift
router.post('/', trackUserActions, async (req, res) => {
    const obj = req.body;
    try {
        const result = await shiftsService.addShift(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding shift" });
    }
});

// Update a shift by ID
router.put('/:id', trackUserActions, async (req, res) => {
    const { id } = req.params;
    const obj = req.body;
    try {
        const result = await shiftsService.updateShift(id, obj);
        if (!result) {
            return res.status(404).json({ message: "shift not found for update" });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error updating shift" });
    }
});


module.exports = router;
