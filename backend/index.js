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

let allid=[];


io.on('connection', (socket) => {
    allid.push(socket.id);
    socket.emit("socket-ids", allid);
    console.log('a user connected', socket.id);

    socket.on('chat-message', (msg) => {
        console.log(msg)
        socket.emit('receive-message', msg);
    });
});


server.listen(8080, ()=>{
    console.log("Server running on http://localhost:8080");
})