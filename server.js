const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Define the base directory for serving static files
// This assumes all your static files (index.html, style.css, image)
// are in the same directory as server.js in the deployed environment.
// On Render, if your GitHub repo root is deployed, then all files are in /opt/render/project/
// and __dirname will correctly point to /opt/render/project/
const staticFilesDirectory = path.join(__dirname); 

app.use(express.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(staticFilesDirectory));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(staticFilesDirectory, 'index.html'));
});

// For POST requests to /api/facebook-action
app.post('/api/facebook-action', (req, res) => {
    console.log('Received data for Facebook action:', req.body);
    res.json({ message: 'Facebook action received!', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
