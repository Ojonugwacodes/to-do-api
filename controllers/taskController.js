const Task = require('../models/Task');
const mongoose = require('mongoose');

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 */
exports.createTask = async (req, res) => {
  try {
    const { title, priority, status, user } = req.body;

    // Basic validation
    if (!title || !user) {
      return res.status(400).json({
        message: 'Title and user ID are required'
      });
    }

    // Validate user ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    const task = await Task.create({
      title,
      priority,
      status,
      user
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/tasks
 */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('user', 'username email');

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/tasks/:id
 */
exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  try {
    const task = await Task.findById(id)
      .populate('user', 'username email');

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @desc    Update a task
 * @route   PUT /api/tasks/:id
 */
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 */
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: 'Invalid task ID'
    });
  }

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
