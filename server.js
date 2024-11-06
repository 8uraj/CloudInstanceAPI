const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudRoutes = require('./routes/cloudRoutes');

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // to parse JSON request bodies

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/cloud-computing'; // replace with MongoDB Atlas URI if needed
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api', cloudRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
