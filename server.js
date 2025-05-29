const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Render ya local environment se PORT lega

// Serve static files from the current directory (jahan index.html, style.css hain)
app.use(express.static(path.join(__dirname)));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Basic route to test the backend (ismein hum baad mein FB logic daalenge)
app.post('/api/facebook-action', (req, res) => {
    // Abhi ke liye, bas ek simple response bhej rahe hain
    console.log('Received a request for Facebook action!');
    res.json({ message: 'Facebook action received! (Not yet implemented)' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
