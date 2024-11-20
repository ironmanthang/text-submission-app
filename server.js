require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/texts', require('./routes/textRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
