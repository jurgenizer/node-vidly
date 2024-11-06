// http://vidly.comn/api/genres
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre')


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
});

// POST a new genre (create a new genre and return the genre object)
// Note auth middleware
router.post('/', auth, async (req, res) => {
    // validate() with object destructuring to get error property
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

// PUT a single video genre (update the genre)
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    //Return the updated genre
    res.send(genre);
});

// DELETE a single video genre 
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    // console.log('The genre to be deleted is ', genre);
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    // Return deleted genre
    res.send(genre);
});


module.exports = router;