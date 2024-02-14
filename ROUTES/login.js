const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const user = require('../DATABASE/userDB');
const authMiddleware = require('./authuser');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {


    try {
        const finduser = await user.findOne({ username: req.body.username });

        if (finduser) {
            const passwcompare = await bcrypt.compare(req.body.password, finduser.password);

            if (passwcompare) {


                req.session.username = req.body.username;
                req.session.password = req.body.password;
                res.redirect('/home');
            
            } else {
                res.json({
                    "message": "Password is incorrect"
                });
            }
        } else {
            res.json({
                "message": "user does not exist."
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            "message": "Internal Server Error"
        });
    }



});

module.exports = router;
