const PORT = 4000;
const express = require('express');
const app = express()
const connectToDB = require('./config/connectToDb')
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { error, log } = require('console');
const { default: mongoose } = require('mongoose');
const { type } = require('os');
const { deflate } = require('zlib');
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js')

app.use(express.json());
app.use(cors());

//conect to our database
connectToDB();

//Api creation 

app.get('/', (req, res) => {
  res.send('Express app is running!')
})


// Routes-------------

//Product routes
app.use('/products', productRoute);

// User SingUp
app.use('/user', userRoute)

//Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});
const upload = multer({ storage: storage });

// Creating Image Upload EndPoint
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {

  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`
  })
});


app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server Running on Port", PORT);
  } else {
    console.log('Error', error);
  }
})