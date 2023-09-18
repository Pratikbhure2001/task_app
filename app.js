// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3200;

// Connect to MongoDB (replace 'your-database-name' with your actual database name)
mongoose.connect('mongodb://127.0.0.1:27017/task', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use('/tasks', require('./routs/tasks'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
