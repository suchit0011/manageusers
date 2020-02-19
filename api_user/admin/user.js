const { Allmember } = require('../signup/signupauth');
const { validation } = require('./userauth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();



//user fetch
router.get('/admin/userdata', async (req, res) => {
    let user = await Allmember.find();

    if (user) { res.send(user) }
    else { res.send({ data: { body: { status: 400, message: 'user not available' } } }) }
})

// user update
router.put('/admin/update', async (req, res) => {

    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {


        if (req && req.body && req.body.password) {

            let user = await Allmember.findById({ _id: req.body.id });
            var genSalt = await bcrypt.genSalt(10);
            var password_hash = await bcrypt.hash(req.body.password, genSalt);

            const result = await Allmember.updateMany({ _id: req.body.id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    roles: req.body.roles,
                    password: password_hash
                }
            });

            return res.send({ data: { body: { status: 200, message: 'successfully update' } } });
        } else {

            const result = await Allmember.updateMany({ _id: req.body.id }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    roles: req.body.roles
                }
            });

            return res.send({ data: { body: { status: 200, message: 'successfully update' } } });
        }

    
    }
    catch (error) {
        return res.send({ data: { body: { status: 400, message: 'user id not available' } } });
    }

})

//user delete
router.post('/admin/delete', async (req, res) => {

    let user_detail = await Allmember.findById({ _id: req.body.id });
    if (!user_detail) { return res.send({ data: { body: { status: 400, message: 'user id not available' } } }) }

    const result = await Allmember.deleteOne({ _id: req.body.id });

    if (result.deletedCount == 1) {
        res.send({ data: { body: { status: 200, message: 'user deleted' } } })
    }

})
module.exports = router;


