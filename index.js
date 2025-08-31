
// index.js
const express = require('express'); // Step 1: Import Express
const app = express();             // Step 2: Create an Express app

// Step 3: Define Routes
app.get('/', (req, res) => {
  res.send('Welcome to Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Us Page');
});

// Step 4: Start the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
