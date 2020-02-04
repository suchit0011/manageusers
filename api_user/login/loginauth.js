const Joi = require('joi');
function loginUser(user) {

    schema = {
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(user, schema)
}


exports.validlogin = loginUser;