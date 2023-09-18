const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Serve the frontend (HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter); 


// Update a task's completion status
app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { completed } = req.body;

    // Update the task in the database
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true } 
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});








app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
