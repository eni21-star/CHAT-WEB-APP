const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatapp")
    .then(() => {
        console.log("connected to user Database successfully..")
    })
    .catch(() => {
        console.log("error while connecting to datbase")
    })

const schema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    authToken: {
        type: String
    },
    password: {
        type: String,
        required: true
    }, timestamp: {
        type: Date,
        default: Date.now

    }
})

const user1 = new mongoose.model("user1", schema);

module.exports = user1;