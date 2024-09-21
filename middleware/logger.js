function log(req, res, next) {
    console.log('Logging...');
    next() // to pass control to the next middleware
}

module.exports = log;