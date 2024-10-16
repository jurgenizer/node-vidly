const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const customerSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
    }
});

// Model
const Customer = mongoose.model('Customer', customerSchema);

//  Validate with Joi
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(8).max(50).required(),
    })
    return schema.validate(customer);
}

exports.Customer = Customer; // short version of module.exports.Customer = Customer;
exports.validate = validateCustomer;