require("dotenv").config();
const Joi = require('joi');
const express  = require('express');
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
// GET all the video genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});


// POST a new genre (create a new genre and return the genre object)
app.post('/api/genres', (req, res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
})




//Read port Variable from environment or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on Port ${port}...`));