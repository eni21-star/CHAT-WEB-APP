// authMiddleware.js
const bcrypt = require('bcrypt');
const user = require('../DATABASE/userDB');
const session = require('express-session');

module.exports = async function authMiddleware(req, res, next) {

    try {
        const finduser = await user.findOne({ username: req.body.username });
        let userAuth;

        if (finduser) {
            const passwcompare = await bcrypt.compare(req.body.password, finduser.password);

            if (passwcompare) {
                next();
                userAuth = true;
            } else {

                res.json({
                    "message": "Password is incorrect"
                });
            }
        } else {
            userAuth = false;
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
}

