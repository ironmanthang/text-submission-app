const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Text', textSchema);
