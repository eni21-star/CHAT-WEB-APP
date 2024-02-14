const express = require('express');
const router = express.Router();
const authMiddleware = require('./authuser');

router.get('/', (req,res)=>{
    
    const { username, password } = req.session;

    // Check if the user is authenticated
    if (username && password) {
        // Render home page with user information
        res.render('home');
    } else {
        // Redirect to login page if not authenticated
        res.redirect('/login');
    }
})
// router.post('/', (req,res)=>{
//     //let userName= req.body.username;  //name from signup form
//     res.json({
//         message: "user landed on home page"
//     })
    
// })
module.exports = router;