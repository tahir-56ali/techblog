const Joi = require('joi');

module.exports.postsValidationSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().min(3).max(255).required(),
        post: Joi.string().required()
    }).required()
});