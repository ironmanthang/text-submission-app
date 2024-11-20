require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
// Serve static files (like your HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

// Add a route to handle the root URL ("/")
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Your API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/texts', require('./routes/textRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
