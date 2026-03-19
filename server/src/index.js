const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { validateInput } = require('./validate');
const { getSummary } = require('./llm');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/summarize', async (req, res) => {
  try {
    // 1. Validate input
    const text = validateInput(req.body.text);

    // 2. Call LLM Service
    const structuredData = await getSummary(text);

    // 3. Return JSON response
    return res.status(200).json(structuredData);

  } catch (error) {
    console.error('Error in /api/summarize:', error.message);
    
    // Determine if it's a validation error
    if (error.message.includes('must be a non-empty string')) {
      return res.status(400).json({ error: 'Bad Request', message: error.message });
    }
    
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message || 'Failed to process the requested text.'
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
