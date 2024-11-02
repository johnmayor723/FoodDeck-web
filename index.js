const express = require('express');
const path = require('path');
const mongoose = require ("mongoose")
const session = require("express-session")
const expressLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts
const MongoStore = require('connect-mongo');


const app = express();


//const API_URL = "https://pantry-hub-server.onrender.co>


const mongoUrl = "mongodb+srv://Pantryhubadmin:pantryhub123@cluster0.qjbxk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Middleware setup for handling sessions
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl}),
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));


// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//layout  Middleware 
app.use(expressLayouts);
app.set('layout', 'layout'); // Define the default layout file

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
