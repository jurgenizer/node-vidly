// http://vidly.comn/api/users
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user')

// POST to create a user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User aleady registered.');
  
    //reset the user object

    /* user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) */
// or using lodash

        user = new User(_.pick(req.body, ['name', 'email', 'password']))

    await user.save();

    res.send(_.pick(user, ['name', 'email']));
});

module.exports = router;