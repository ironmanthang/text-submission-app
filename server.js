require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

// Add a route to handle the root URL ("/") and serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Your API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/texts', require('./routes/textRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
