const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports =  connectToDB;
