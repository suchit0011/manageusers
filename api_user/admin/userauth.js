const Joi = require('joi');
// JOI validation for update data

function updateUser(user) {

    schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        roles: Joi.string(),
        password: Joi.string().min(8),
        id: Joi.string().required()
    }

    return Joi.validate(user, schema)
}


exports.validation = updateUser;
