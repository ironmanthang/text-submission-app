const express = require('express');
const jwt = require('jsonwebtoken');
const Text = require('../models/Text');
const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(403).send('Invalid token');
    }
};

// Submit text
router.post('/', authenticate, async (req, res) => {
    const { content } = req.body;
    try {
        const text = new Text({ userId: req.userId, content });
        await text.save();
        res.status(201).send('Text submitted');
    } catch (err) {
        res.status(400).send('Error submitting text');
    }
});

// Get user texts
router.get('/', authenticate, async (req, res) => {
    try {
        const texts = await Text.find({ userId: req.userId });
        res.json(texts);
    } catch (err) {
        res.status(400).send('Error fetching texts');
    }
});

module.exports = router;
