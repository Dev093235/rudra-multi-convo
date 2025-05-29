const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root of the project
// Ye line batati hai ki Render aapki index.html, style.css aur image files ko kahan dhunde
app.use(express.static(path.join(__dirname)));

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For POST requests to /api/facebook-action
app.post('/api/facebook-action', express.json(), (req, res) => {
    // Ye line body se JSON data ko parse karne ke liye hai
    // Abhi ke liye, hum sirf data ko log kar rahe hain
    console.log('Received data for Facebook action:', req.body);

    // Yahan Facebook API ka logic aayega
    // Temporary response
    res.json({ message: 'Facebook action received!', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
