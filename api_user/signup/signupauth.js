const mongoose = require('mongoose')
const Joi = require('joi');
const url = 'mongodb+srv://suchit:director1613@userdata-n9oyo.mongodb.net/management?retryWrites=true&w=majority';
const local_url = 'mongodb://localhost/management';

// connection 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connected') })
    .catch(err => { console.log('rejected', err) })


const Member = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        maxlength: 50
        // unique:true
    },
    password: {
        type: String,
        maxlength: 300,

    },
    
    roles: {
        type: String
        
    },
    googleid: { type: String }
    })

Allmember = mongoose.model('newusers', Member);


function validateUser(user) {

    schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        roles: Joi.string().required(),
        password: Joi.string().min(8).required()

    }

    return Joi.validate(user, schema)
}

exports.Allmember = Allmember;
exports.validate = validateUser;

