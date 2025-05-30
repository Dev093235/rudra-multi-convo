const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

let interval = null;
let token = "";
let uid = "";
let name = "";
let time = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/start", upload.none(), (req, res) => {
  token = req.body.token;
  uid = req.body.uid;
  name = req.body.name;
  time = parseInt(req.body.time) * 1000;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    sendMessage();
  }, time);

  res.send("✅ Rudra Started Successfully!");
});

app.get("/stop", (req, res) => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    res.send("🛑 Rudra Stopped.");
  } else {
    res.send("⚠️ No active conversation to stop.");
  }
});

async function sendMessage() {
  try {
    const response = await axios.post(`https://graph.facebook.com/v19.0/${uid}/messages`, {
      messaging_type: "RESPONSE",
      recipient: { id: uid },
      message: { text: `🔥 Rudra is back! Bhakk ${name} 😂` },
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Message sent:", response.data);
  } catch (err) {
    console.error("❌ Error sending message:", err.response?.data || err.message);
  }
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
