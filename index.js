//const config = require('config');
const debug = require('debug')('app:startup');
const config = require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const express = require('express');
const app = express();
app.use(express.json());

// Third-part middleware
app.use(helmet());

// For any route that starts with /api/genres we use the genres router object)
app.use('/api/genres', genres);


// Middleware 
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    //console.log('Morgan enabled...');
    debug('Morgan enabled...');
}

// Custom third-part middleware by me :)
app.use(logger);


//Read port Variable from environment or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));