const mongoose = require('mongoose');

const cloudInstanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 't2.micro', 'm5.large'
  status: { type: String, default: 'stopped' }, // e.g., 'running', 'stopped'
  createdAt: { type: Date, default: Date.now },
});

const CloudInstance = mongoose.model('CloudInstance', cloudInstanceSchema);

module.exports = CloudInstance;
