const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: { 
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50
        },
        isGold: {
          type: Boolean,
          default: false
        },
        phone: {
          type: String,
          required: true,
          minlength: 8,
          maxlength: 50
        }      
      }),  
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true, 
          minlength: 2,
          maxlength: 255
        },
        dailyRentalRate: { 
          type: Number, 
          required: true,
          min: 0,
          max: 255
        }   
      }),
      required: true
    },
    dateOut: { 
      type: Date, 
      required: true,
      default: Date.now
    },
    dateReturned: { 
      type: Date
    },
    rentalFee: { 
      type: Number, 
      min: 0
    }
  }));
  
  
  function validateRental(rental) {
    const schema = Joi.object({
      customerId: Joi.objectId().required(),
      movieId: Joi.objectId().required(),
      // customerId: Joi.string().required(),
      // movieId: Joi.string().required(),
    });
    return schema.validate(rental);
  }



  exports.Rental = Rental; 
  exports.validate = validateRental;