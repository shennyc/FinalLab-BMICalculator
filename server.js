require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Include if you handle CORS issues
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(express.json());

// Access environment variables
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
const API_KEY = process.env.API_KEY;

console.log(process.env.EXTERNAL_API_URL); // Should print your API URL
console.log(process.env.API_KEY); // Should print your API key


// BMI Calculation Route
app.get('/calculate-bmi', async (req, res) => {
    const { weight, height } = req.query;

    if (!weight || !height || height <= 0) {
        return res.status(400).json({ error: 'Weight and height are required and height must be greater than zero' });
    }

    try {
        const response = await axios.get(EXTERNAL_API_URL, {
            headers: {
                'Authorization': `Bearer ${API_KEY}` // Adjust the header key based on the API documentation
            },
            params: {
                weight: weight,
                height: height
            }
        });

        const bmi = response.data.bmi; // Assuming the API returns BMI in `bmi`
        res.json({ bmi });
    } catch (error) {
        console.error('External API Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
