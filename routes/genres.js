// http://vidly.comn/api/genres
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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


/* const genres = [
    { id: 1, name: 'comedy' },
    { id: 2, name: 'romance' },
    { id: 3, name: 'thriller' },
    { id: 4, name: 'action' },
    { id: 5, name: 'documentary' },
    { id: 6, name: 'animation' },
    { id: 7, name: 'drama' },
    { id: 8, name: 'science fiction' },
    { id: 9, name: 'fantasy' },
    { id: 10, name: 'martial arts' },
    { id: 11, name: 'mystery' },
    { id: 12, name: 'musical' }
] */


// GET all the video genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});


// GET a single video genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');
    //console.log(genre);
    res.send(genre);
})

// POST a new genre (create a new genre and return the genre object)
router.post('/', async (req, res) => {
    // validateGenre() with object destructuring to get error property
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

// PUT a single video genre (update the genre)
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    //Return the updated genre
    res.send(genre);
})

// DELETE a single video genre 
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    // console.log('The genre to be deleted is ', genre);
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    // Return deleted genre
    res.send(genre);
});

//  Validate with Joi
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre);
}

module.exports = router;