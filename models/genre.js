const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const genreSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    }
});

// Model
const Genre = mongoose.model('Genre', genreSchema);

//  Validate with Joi
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required()
    })
    return schema.validate(genre);
}

exports.Genre = Genre; // short version of module.exports.Customer = Customer;
exports.validate = validateGenre;