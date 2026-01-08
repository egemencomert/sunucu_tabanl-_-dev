const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const carRoutes = require('./src/routes/carRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);

app.get('/', (req, res) => {
    res.send('Car Rental API is running...');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

