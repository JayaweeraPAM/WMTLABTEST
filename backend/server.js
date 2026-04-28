require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});
// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {

  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
   
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
