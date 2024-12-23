// http://vidly.comn/api/users
const auth = require('../middleware/auth');
//const config = require("config");
const config = require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user')

// GET user
router.get('/me',auth, async (req, res) => {
    const user =  await User.findById(req.user._id).select(-password);
    res.send(user);
});

// POST to create a user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User aleady registered.');

    //reset the user object

    /* user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) */
    // or using lodash

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;