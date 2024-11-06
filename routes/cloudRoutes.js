const express = require('express');
const router = express.Router();
const CloudInstance = require('../models/CloudInstance');

// Create a new cloud instance
router.post('/instances', async (req, res) => {
  const { name, type } = req.body;
  try {
    const newInstance = new CloudInstance({ name, type });
    await newInstance.save();
    res.status(201).json(newInstance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all cloud instances
router.get('/instances', async (req, res) => {
  try {
    const instances = await CloudInstance.find();
    res.status(200).json(instances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a cloud instance by ID
router.get('/instances/:id', async (req, res) => {
  try {
    const instance = await CloudInstance.findById(req.params.id);
    if (!instance) {
      return res.status(404).json({ message: 'Cloud instance not found' });
    }
    res.status(200).json(instance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a cloud instance's status
router.put('/instances/:id', async (req, res) => {
  try {
    const instance = await CloudInstance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!instance) {
      return res.status(404).json({ message: 'Cloud instance not found' });
    }
    res.status(200).json(instance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a cloud instance
router.delete('/instances/:id', async (req, res) => {
  try {
    const instance = await CloudInstance.findByIdAndDelete(req.params.id);
    if (!instance) {
      return res.status(404).json({ message: 'Cloud instance not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
