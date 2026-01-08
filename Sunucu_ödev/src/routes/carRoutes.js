const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.getAllCars);

router.post('/', carController.createCar);

router.put('/:id', carController.updateCar);

router.delete('/:id', carController.deleteCar);

router.post('/:id/rent', carController.rentCar);

module.exports = router;

