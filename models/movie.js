const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre')

// Schema
const movieSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    genre: {
        genreSchema,
        required:true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

// Model
const Movie = mongoose.model('Movie', movieSchema);

//  Validate with Joi
function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        genreID: Joi.string().required(),
        numberInStock: Joi.number().min(2).max(255).required(),
        dailyRentalRate: Joi.number().min(2).max(255).required()
    })
    return schema.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;