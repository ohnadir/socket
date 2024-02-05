const express =require("express");
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const app = express();
const DB = require('./src/config/index')
DB()

const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
});

app.use(express.json());

const userRoute = require("./src/routes/user");
// user route 
app.use("/user", userRoute);  



app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Socket.io
let users = [];
io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
        }
    });
});


server.listen(8080, ()=>{
    console.log("Server running on http://localhost:8080");
})