const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatapp")
    .then(() => {
        console.log("connected to message database successfully..")
    })
    .catch(() => {
        console.log("error while connecting to datbase")
    })

const schema = new mongoose.Schema({

    // sender: {
    //     id: Number
    // },
    // receiver: {
    //     id: Number
    // },
    userMsg: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now

    }
})

const message = new mongoose.model("message", schema);

module.exports = message;

