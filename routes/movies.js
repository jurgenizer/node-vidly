// http://vidly.comn/api/movies
const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie')
const { Genre, validate } = require('../models/genre')

// GET all the movie movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});


// GET a single movie 
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) return res.status(404).send('The movie with the requested ID was not found');

    res.send(movie);
})

// POST a new movie (create a new movie and return the movie object)
router.post('/', async (req, res) => {
    // validate() with object destructuring to get error property
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');


    let movie = new Movie({ 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      });
      movie = await movie.save();

    res.send(movie);
});

// PUT a single movie (update the movie)
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }, { new: true });
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
})

// DELETE a single movie 
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    // console.log('The movie to be deleted is ', movie);
    if (!movie) return res.status(404).send('The video g with the requested ID was not found');

    // Return deleted movie
    res.send(movie);
});

module.exports = router;