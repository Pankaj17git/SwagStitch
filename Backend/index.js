const app = require('./app');
const connectToDB = require('./config/connectToDb');

const PORT = process.env.PORT || 4000;

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
