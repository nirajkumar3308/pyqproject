const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Upload storage config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Admin credentials (simplified)
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

// Routes
app.post('/admin-login', (req, res) => {
  const { userid, password } = req.body;
  if (userid === ADMIN_USER && password === ADMIN_PASS) {
    res.redirect('/admin-upload.html');
  } else {
    res.send('<h2>Invalid credentials. <a href="/admin.html">Try again</a></h2>');
  }
});

app.post('/upload-question', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.send('No file uploaded!');
  }
  res.send(`<h2>File Uploaded: ${req.file.originalname}</h2><a href="/admin-upload.html">Upload Another</a>`);
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
