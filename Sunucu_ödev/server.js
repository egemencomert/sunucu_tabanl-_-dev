const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const carRoutes = require('./src/routes/carRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Built-in body parser

// Routes
app.use('/api/cars', carRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Car Rental API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
