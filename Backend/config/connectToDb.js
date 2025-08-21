const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/swagstitch_db');
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports =  connectToDB;
