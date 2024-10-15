// http://vidly.comn/api/genres
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Schema
const genreSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    }
});

// Model
const Genre = new mongoose.model('Genre', genreSchema);


const genres = [
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
]


// GET all the video genres
router.get('/', (req, res) => {
    res.send(genres);
});


// GET a single video genre
router.get('/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');
    //console.log(genre);
    res.send(genre);
})

// POST a new genre (create a new genre and return the genre object)
router.post('/', (req, res) => {
    // validateGenre() with object destructuring to get error property
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})

// PUT a single video genre (update the genre)
router.put('/:id', (req, res) => {
    // Lookup the genre
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if (error) {
        // 400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    // Update the genre
    genre.name = req.body.name;

    //Return the updated genre
    res.send(genre);
})

// DELETE a single video genre 
router.delete('/:id', (req, res) => {
    // Lookup the genre
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    // console.log('The genre to be deleted is ', genre);
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    // Delete 
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

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