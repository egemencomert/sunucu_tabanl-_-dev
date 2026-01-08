// Fake Database (In-Memory)
let cars = [
    {
        id: 1,
        brand: "Toyota",
        model: "Corolla",
        year: 2022,
        isAvailable: true,
        dailyPrice: 1500
    },
    {
        id: 2,
        brand: "Renault",
        model: "Clio",
        year: 2019,
        isAvailable: true,
        dailyPrice: 1200
    },
    {
        id: 3,
        brand: "BMW",
        model: "520i",
        year: 2023,
        isAvailable: false, // Currently rented
        dailyPrice: 5000
    }
];

module.exports = cars;
