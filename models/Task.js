// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean, // New field to track completion status
});

module.exports = mongoose.model('Task', taskSchema);
