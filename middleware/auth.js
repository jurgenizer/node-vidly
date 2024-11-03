const jwt = require('jsonwebtoken');

const config = require("config");
//const config = require("dotenv").config();
module.exports = function (req, res, next) {
    const token  = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    try {
     const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      // const decoded = jwt.verify(token, process.env.jwtPrivateKey);
       // console.log(decoded);
       req.user  = decoded; // req.user._id
   
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

//module.exports = auth;