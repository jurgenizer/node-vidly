require("dotenv").config();
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

// http://vidly.comn/api/genres

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

//  Validate with Joi
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(genre);
}

// GET all the video genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});


// GET a single video genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');
    //console.log(genre);
    res.send(genre);
})


// POST a new genre (create a new genre and return the genre object)
app.post('/api/genres', (req, res) => {
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
app.put('/api/genres/:id', (req, res) => {
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
app.delete('/api/genres/:id', (req, res) => {
    // Lookup the genre
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    // console.log('The genre to be deleted is ', genre);
    if (!genre) return res.status(404).send('The video genre with the requested ID was not found');

    // Delete 
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return deleted genre
    res.send(genre);
})


//Read port Variable from environment or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));