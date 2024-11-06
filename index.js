require('express-async-errors')
const error = require('./middleware/error');
//const config = require("config");
const config = require("dotenv").config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();




if (!process.env.vidly_jwtPrivateKey){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
} 

/* if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}  */


// Connect to MongoDB
mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

// Third-part middleware
app.use(express.json());
app.use(helmet());

// For any route that starts with /api/genres we use the genres router object)
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Passing a reference to the error handling middleware function
app.use (error);


//Read port Variable from environment or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));