const { postsValidationSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const path = require('path');

module.exports.validatePost = (req, res, next) => {
    const { error } = postsValidationSchema.validate(req.body);
    if (error) {
        const msg = error.details.map( el =>  el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}