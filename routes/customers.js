// http://vidly.comn/api/customers
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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

// GET all the customers
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

// GET a single customer
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).send('The customer with the requested ID was not found');

    res.send(customer);
});

// POST a new customer (create a new customer and return the customer object)
router.post('/', async (req, res) => {
    // validateCustomer() with object destructuring to get error property
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    
    });
    customer = await customer.save();
    res.send(customer);
});

// PUT a single customer (update the customer)
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, 
    {
        new: true
    });

    if (!customer) return res.status(404).send('The customer with the requested ID was not found');

    //Return the updated customer
    res.send(customer);
})


// DELETE a single customer
router.delete('/:id', async (req, res) => {
    const customer= await Customer.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).send('The customer with the requested ID was not found');

    // Return deleted customer
    res.send(customer);
});

//  Validate with Joi
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(8).max(50).required(),
    })
    return schema.validate(customer);
}

module.exports = router;