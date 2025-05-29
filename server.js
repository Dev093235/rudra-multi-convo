const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Determine the correct base directory for static files
// Render Web Services often deploy into '/opt/render/project/src/'
// This line tries to find the correct path dynamically.
let basePath = __dirname;
if (process.env.NODE_ENV === 'production' && process.env.RENDER) {
    // On Render, the working directory might be the 'src' folder
    // but the actual project root (where index.html is) is one level up.
    // Or it might be the src itself if Render moves content.
    // Let's try to assume current dir as base for content serving.
    // We already use path.join(__dirname) below, which should ideally work.
    // Let's ensure the path is correct even if Render sets specific working directory.
}

// Serve static files from the project root (where index.html, style.css are)
// We are explicitly telling Express to serve from the directory where server.js is located.
app.use(express.static(basePath));

// Express JSON middleware to parse incoming request bodies
app.use(express.json());

// Root route to serve index.html
app.get('/', (req, res) => {
    // Ensure index.html is served from the correct base path
    res.sendFile(path.join(basePath, 'index.html'));
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
