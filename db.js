const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const mongoURI = "mongodb://localhost:27017/Daily-Dairy"; // Replace with your MongoDB URI
    await mongoose.connect(mongoURI, 
      
      console.log('Connected to MongoDB successfully!')
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the connectToDatabase function to establish the connection
module.exports= connectToDatabase;