const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Handle all other routes by serving the corresponding HTML file
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'frontend', `${page}.html`);
    
    // Check if file exists
    if (require('fs').existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        // If file doesn't exist, serve index.html
        res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`🚀 CampusConnect server running on http://localhost:${PORT}`);
    console.log(`📱 Open your browser and navigate to: http://localhost:${PORT}`);
    console.log(`🎨 Your CampusConnect platform is ready!`);
});
