const express = require ('express');

const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();
// Using Mongoose to connect to MongoDB
// After creation of our cluster in MongoDB atlas, we connect the user name and password to our app 
mongoose.connect('mongodb+srv://Chris:lMSdOTtAY8UNzDs6@cluster0-azgjy.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully Connected to MongoDB Atlas');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB atlas!');
    console.error(error);
});
// using the catch error to log any error that doesnt allow the connection to our database

// code to handle CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
        // body parser to recieve the post data from the front end
  app.use(bodyParser.json())

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes); 

module.exports = app;






