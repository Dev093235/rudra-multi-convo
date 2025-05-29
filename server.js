const express = require('express');
const path = require('path');
const multer = require('multer'); // Multer ko import karein
const app = express();
const port = process.env.PORT || 3000;

// Multer storage setup (for file uploads)
// Abhi ke liye, hum file ko memory mein store karenge
// ya aap use 'uploads' folder mein save kar sakte hain.
// MemoryStorage files ko server ki memory mein rakhta hai, jo testing ke liye theek hai.
// Production mein aap diskStorage ka use kar sakte hain.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname))); 

// `express.json()` middleware for JSON data (if any other endpoints need it)
// Note: This is NOT for multipart/form-data. Multer will handle that.
app.use(express.json()); 

// Root route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For POST requests to /api/facebook-action
// 'upload.single('npFile')' middleware ko yahan use karein
// 'npFile' aapke form field ka 'name' attribute hai (input type="file" id="npFile" ka name)
app.post('/api/facebook-action', upload.single('npFile'), (req, res) => {
    console.log('Received form fields:', req.body); // Text fields (password, token, etc.)
    if (req.file) {
        console.log('Received file:', req.file); // File details (if file was uploaded)
        console.log('File content (first 100 chars):', req.file.buffer.toString('utf8').substring(0, 100));
    } else {
        console.log('No file was uploaded.');
    }

    // Yahan Facebook API ka logic aayega
    // Aap req.body se apne form ke text fields ko access kar sakte hain:
    const password = req.body.password;
    const token = req.body.token;
    // etc.

    // Agar file upload hui hai, to uska content req.file.buffer mein hoga.
    // const npFileContent = req.file ? req.file.buffer.toString('utf8') : null;

    res.json({ message: 'Facebook action received!', data: req.body });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
