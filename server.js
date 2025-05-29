const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Determine the correct path to serve static files
// Render typically puts code in /opt/render/project/src/ for Web Services
// So, we need to serve from that directory.
const staticFilesPath = path.join(__dirname); // Default to current directory

// Check if running on Render and adjust path if necessary
// This part is for local testing:
// If you run locally, __dirname might be your project root.
// If you run on Render, it might be /opt/render/project/src/

// Express JSON middleware to parse incoming request bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(staticFilesPath));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});

// For POST requests to /api/facebook-action
app.post('/api/facebook-action', (req, res) => {
    console.log('Received data for Facebook action:', req.body);
    // Yahan Facebook API ka logic aayega
    res.json({ message: 'Facebook action received!', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
