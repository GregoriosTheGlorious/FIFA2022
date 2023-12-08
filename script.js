// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();

// Connect to MongoDB (replace 'your-database-url' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/fifa_clips', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User schema and model (if not already defined)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(fileUpload());

// Registration endpoint
app.post('/api/register', async (req, res) => {
  // Existing registration logic
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  // Existing login logic
});

// Video upload endpoint
app.post('/api/upload', (req, res) => {
  const { videoTitle, videoDescription, videoTags } = req.body;
  const videoFile = req.files.videoFile;

  if (!videoFile) {
    return res.status(400).json({ error: 'No video file uploaded' });
  }

  const videoFileName = `${Date.now()}-${videoFile.name}`;
  const videoPath = path.join(__dirname, 'videos', videoFileName);

  videoFile.mv(videoPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // You can save additional details (title, description, tags, etc.) to a database if needed

    res.json({ message: 'Video uploaded successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
