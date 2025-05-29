const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Define the base directory for your project.
// On Render, the project root is usually '/opt/render/project'.
// If your files (index.html, style.css, image) are directly in the root of your GitHub repo,
// and Render puts them in '/opt/render/project', then we serve from there.
const projectRoot = path.join(__dirname, '..'); // Go up one directory from server.js's location
                                            // if server.js is inside a 'src' folder

// Handle cases where Render might place files directly at /opt/render/project
// or sometimes /opt/render/project/src.
// Let's try to be robust.
let staticFilesPath = path.join(__dirname); // Default assumption: files are in the same dir as server.js

// A common Render setup is that files are in /opt/render/project
// and server.js is in /opt/render/project/src (if Render creates a src folder)
// or server.js is directly in /opt/render/project

// Let's try to explicitly serve from the root of the project which is what you uploaded to GitHub.
// Render typically deploys the *contents* of your GitHub repo to /opt/render/project.
// So, if index.html is at the root of your GitHub repo, it will be at /opt/render/project/index.html
// And server.js will also be at /opt/render/project/server.js

// Let's assume server.js is at the root level of the deployed project.
// If it's still giving error, it means Render is putting files in src subfolder.
// In that case, we need to go up one level.

// For Render specifically, if your files are in the root of your GitHub repo:
// When Web Service deploys, your files are directly in /opt/render/project/
// and __dirname will also point to /opt/render/project/
// So, the original staticFilesPath = path.join(__dirname); should ideally work.
// The error '/opt/render/project/src/index.html' suggests Render is creating a /src/ folder.

// Let's try to explicitly point to the *parent directory* of where server.js runs IF Render puts server.js in /src
// This is a common workaround for this specific Render behavior.
const actualRootPath = path.resolve(__dirname, '..'); // Go one directory up from where server.js is running

app.use(express.json());

// Serve static files (HTML, CSS, JS, Images) from the computed root path
app.use(express.static(actualRootPath));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(actualRootPath, 'index.html'));
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
