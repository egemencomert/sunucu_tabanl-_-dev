const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// GET /api/cars - List all cars
router.get('/', carController.getAllCars);

// POST /api/cars - Add a new car
router.post('/', carController.createCar);

// PUT /api/cars/:id - Update car details
router.put('/:id', carController.updateCar);

// DELETE /api/cars/:id - Delete a car
router.delete('/:id', carController.deleteCar);

// POST /api/cars/:id/rent - Rent a car (Special Action)
router.post('/:id/rent', carController.rentCar);

module.exports = router;
