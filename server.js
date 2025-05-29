const express = require('express');
const path = require('path');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs').promises; // fs.promises को import करें
const app = express();
const port = process.env.PORT || 3000;

// Multer storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// For POST requests to /api/facebook-action
app.post('/api/facebook-action', upload.single('npFile'), async (req, res) => {
    console.log('Received form fields:', req.body);
    if (req.file) {
        console.log('Received file:', req.file);
        console.log('File content (first 100 chars):', req.file.buffer.toString('utf8').substring(0, 100));
    } else {
        console.log('No file was uploaded.');
    }

    const { password, token, inboxUid, haterName, timeSeconds, tokenOption } = req.body;

    // TODO: Password verification (मजबूत सुरक्षा के लिए)
    if (password !== 'test123') { // यहाँ अपना चुना हुआ पासवर्ड सेट करें
        return res.status(401).json({ message: 'Invalid Password' });
    }

    let responseMessageFromFile = "Default message if file not found or read error.";

    try {
        // bot_response.txt फ़ाइल को पढ़ें
        const filePath = path.join(__dirname, 'bot_response.txt');
        responseMessageFromFile = await fs.readFile(filePath, 'utf8');
        console.log('Read message from file:', responseMessageFromFile.substring(0, 50) + '...');
    } catch (fileError) {
        console.error('Error reading bot_response.txt:', fileError.message);
        // अगर फ़ाइल नहीं मिली, तो भी हम आगे बढ़ेंगे, लेकिन एक डिफ़ॉल्ट मैसेज के साथ
    }

    // यहाँ Facebook API का लॉजिक आएगा (जैसा हमने पहले चर्चा की थी)
    // अभी के लिए, हम इसे कमेंट कर रहे हैं ताकि फ़ाइल रीडिंग का टेस्ट कर सकें।
    // आप इसे वापस अनकमेंट कर सकते हैं और TARGET_GROUP_POST_ID सेट कर सकते हैं।

    /*
    const TARGET_GROUP_POST_ID = 'YOUR_FACEBOOK_GROUP_POST_ID_HERE'; // या कोई और Facebook ID
    const messageToPost = `Rudra Bot says: Hello ${haterName}! This is an automated message for ${inboxUid}. Time interval: ${timeSeconds}s.`;

    try {
        const facebookApiUrl = `https://graph.facebook.com/v19.0/${TARGET_GROUP_POST_ID}/comments`;
        const apiResponse = await axios.post(facebookApiUrl, {
            message: messageToPost,
            access_token: token
        });
        console.log('Facebook API Response:', apiResponse.data);
    } catch (apiError) {
        console.error('Error during Facebook API call:', apiError.response ? apiError.response.data : apiError.message);
        // यहाँ आप API एरर को कैसे हैंडल करते हैं, उस पर निर्भर करता है।
    }
    */

    // बॉट को जवाब भेजें जिसमें फ़ाइल का मैसेज भी शामिल हो
    res.json({
        message: 'Action received and processed!',
        status: 'success',
        bot_response_text: responseMessageFromFile, // फाइल का कंटेंट यहाँ है
        received_data: req.body // बॉट को प्राप्त डेटा भी भेज सकते हैं
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log('This server will handle Facebook API calls.');
});
