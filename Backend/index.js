const app = require('./app');
const dotenv = require('dotenv');
const connectToDB = require('./config/connectToDb');

dotenv.config();

const PORT = process.env.PORT;

// Connect DB
connectToDB();

// Start server
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server Running on http://localhost:${PORT}`);
  } else {
    console.error('Server Error:', error);
  }
});
