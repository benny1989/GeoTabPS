const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: ['https://my.geotab.com', 'https://benny1989.github.io'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// Proxy endpoint for Predictive Safety API
app.post('/api/employee-status', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    const response = await fetch('https://staging.alert.predictivesafety.com/api/v1.0/Employee/Status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apiKey': '19841062-458c-4425-9e3b-b4600a9e7d3b'
      },
      body: JSON.stringify(req.body)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Success:', data);
      res.json(data);
    } else {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      res.status(response.status).json({ 
        error: 'API Error', 
        status: response.status, 
        message: errorText 
      });
    }
    
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ 
      error: 'Proxy Error', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proxy server is running' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

// Export for deployment platforms
module.exports = app; 