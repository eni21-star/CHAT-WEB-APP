const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io')
const app = express();
const server = http.createServer(app);
const io = socket(server);
const session = require('express-session');
const PORT = 5000;
const user = require('./DATABASE/userDB')
const message = require('./DATABASE/messageDB');
const register = require('./ROUTES/register');
const login = require('./ROUTES/login');
const home = require('./ROUTES/home');
const authMiddleware = require('./ROUTES/authuser');


app.use(express.static('PUBLIC'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

app.use(express.json());

app.use('/home', home);
app.use('/register', register);
app.use('/login', login);
// app.get('/', authMiddleware, (req,res)=>{

// })
app.get('/send/:id', async (req, res) => {

    const { id } = req.params;
    const data = {
        userMsg: id
    }
    const pushData = await message.create(data);


})

app.get('/retrieve', async (req, res) => {

    const pullData = await message.find({});
    //console.log(pullData);
    res.json(pullData)

})
app.get('/retrieve1',async (req,res)=>{


    const pullData = await message.find({}).sort({ _id : -1}).limit(1);
    res.json(pullData);

})
io.on('connection', socket => {
    // console.log("someone hit the server..")
    // socket.emit('user-join', "welcome to MANGO");
    //socket.broadcast.emit("user-join", "a user joined the chat");

    socket.on("user-chat", async (e) => {
        //console.log(e);
        const data = {
            userMsg: e
         }
        // console.log(data);
         const insertData = await message.create(data)
            .then(() => {
                console.log("data inserted into database successfully")
             })
             .catch(() => {
                 console.log('error inserting data..')
             })

        const pullData = await message.findOne({}).sort({ _id: -1 });
       //console.log(pullData.userMsg);

        socket.broadcast.emit('user-join', pullData.userMsg);



    })

})

server.listen(PORT, () => console.log('server running on port 5000'))