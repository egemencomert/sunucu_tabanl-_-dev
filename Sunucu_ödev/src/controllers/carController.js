const cars = require('../models/carModel');

exports.getAllCars = (req, res) => {
    res.status(200).json(cars);
};

exports.createCar = (req, res) => {
    const { brand, model, year, isAvailable, dailyPrice } = req.body;

    if (!brand || !model || !year || !dailyPrice) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newId = cars.length > 0 ? cars[cars.length - 1].id + 1 : 1;

    const newCar = {
        id: newId,
        brand,
        model,
        year: parseInt(year),
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        dailyPrice: parseFloat(dailyPrice)
    };

    cars.push(newCar);
    res.status(201).json({ message: "Car added successfully", car: newCar });
};

exports.updateCar = (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ message: "Car not found" });
    }

    const originalCar = cars[carIndex];
    const updates = req.body;

   
    const checkYear = updates.year !== undefined ? parseInt(updates.year) : originalCar.year;
    const checkPrice = updates.dailyPrice !== undefined ? parseFloat(updates.dailyPrice) : originalCar.dailyPrice;

    if (checkYear < 2020 && checkPrice > 2000) {
        return res.status(400).json({
            message: "Business Rule Violation: Classic cars (older than 2020) cannot have daily price > 2000 TL."
        });
    }

    const updatedCar = { ...originalCar, ...updates };
    cars[carIndex] = updatedCar;

    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
};

exports.deleteCar = (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ message: "Car not found" });
    }

    cars.splice(carIndex, 1);
    res.status(200).json({ message: "Car deleted successfully" });
};

exports.rentCar = (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id === id);

    if (!car) {
        return res.status(404).json({ message: "Car not found" });
    }

    if (!car.isAvailable) {
        return res.status(400).json({ message: "Car is not available for rent." });
    }

    car.isAvailable = false;
    res.status(200).json({ message: "Car rented successfully.", car });
};

