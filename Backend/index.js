const PORT = 4000;
const express = require('express');
const app = express()
const connectToDB = require('./config/connectToDb')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { error, log } = require('console');

app.use(express.json());
app.use(cors());

//conect to our database
connectToDB();


app.get("/", (req, res) => {
  res.send("Express app is running!")
})

//api creation 
app.listen(PORT, (error) => {
  if(!error) {
    console.log("Server Running on Port",PORT); 
  } else {
    console.log('Error', error);
    
  }
})