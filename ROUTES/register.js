const express = require('express')
const bcrypt = require('bcrypt');
const router = express.Router();
const user = require('../DATABASE/userDB');
const { model } = require('mongoose');

router.get('/', (req, res) => {
    res.render('register')


})
router.post('/', async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }
    try {

        const findUser = await user.findOne({ username: data.username });
        if (!findUser) {
            const hashedPass = await bcrypt.hash(data.password, 10);
            data.password = hashedPass;

            await user.create(data).then(() => {
                console.log("user created successfully")

                // res.redirect('/login')
            }).catch(() => {
                res.status(404).send("user error")
            })
            setTimeout(() => {
                res.redirect('/login')
            }, 1500);
        }
        else {
            res.json({
                "message": "user already exist"
            })
        }
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }



})

module.exports = router;