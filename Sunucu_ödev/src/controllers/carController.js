const cars = require('../models/carModel');

// 1. Get All Cars
exports.getAllCars = (req, res) => {
    res.status(200).json(cars);
};

// 2. Create New Car
exports.createCar = (req, res) => {
    const { brand, model, year, isAvailable, dailyPrice } = req.body;

    // Simple validation
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

// 3. Update Car Details
exports.updateCar = (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ message: "Car not found" });
    }

    const originalCar = cars[carIndex];
    const updates = req.body;

    // Business Logic: If car year < 2020, dailyPrice cannot be > 2000
    // We check either the new year (if updated) or the existing year
    const checkYear = updates.year !== undefined ? parseInt(updates.year) : originalCar.year;
    const checkPrice = updates.dailyPrice !== undefined ? parseFloat(updates.dailyPrice) : originalCar.dailyPrice;

    if (checkYear < 2020 && checkPrice > 2000) {
        return res.status(400).json({
            message: "Business Rule Violation: Classic cars (older than 2020) cannot have daily price > 2000 TL."
        });
    }

    // Apply updates
    const updatedCar = { ...originalCar, ...updates };
    cars[carIndex] = updatedCar;

    res.status(200).json({ message: "Car updated successfully", car: updatedCar });
};

// 4. Delete Car
exports.deleteCar = (req, res) => {
    const id = parseInt(req.params.id);
    const carIndex = cars.findIndex(c => c.id === id);

    if (carIndex === -1) {
        return res.status(404).json({ message: "Car not found" });
    }

    cars.splice(carIndex, 1);
    res.status(200).json({ message: "Car deleted successfully" });
};

// 5. Rent Car (Special Action)
exports.rentCar = (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id === id);

    if (!car) {
        return res.status(404).json({ message: "Car not found" });
    }

    // Business Logic: If not available, cannot rent
    if (!car.isAvailable) {
        return res.status(400).json({ message: "Car is not available for rent." });
    }

    // Perform Rent
    car.isAvailable = false;
    res.status(200).json({ message: "Car rented successfully.", car });
};
