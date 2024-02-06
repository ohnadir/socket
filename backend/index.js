const express =require("express");
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const app = express();
const DB = require('./src/config/index')
DB()
const cors = require('cors');
const  User = require("./src/Models/user");
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
});

app.use(express.json());
app.use("*", cors({
    origin:true,
    credentials : true
}));

const userRoute = require("./src/routes/user");

// route 
app.use("/user", userRoute);  
app.get("/", (req, res) => {
    res.send("Hello World!");
});


// Socket.io
let users = [];
io.on('connection', async (socket) => {
    console.log('User connected', socket.id);
    socket.on('addUser', async (userId) => {
        const isUserExist = users.find(user => user.userId === userId);
        if (!isUserExist) {
            if(userId){
                const user = { userId, socketId: socket.id, user: await User.findById({_id: userId}) };
                users.push(user);
            }
            io.emit('getUsers', users);
        }

    });

    socket.on('sendMessage',  async ({ receiverId, message }) => {
        if (receiverId) {
            socket.to(receiverId).emit("receive-message", message);
        }
    });


    socket.on('joinRoom', (room) => {
        socket.join(room);
    });
    
      // Handle leaving a room
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
    });
    
      // Handle receiving and broadcasting messages
    socket.on('groupMessage', ({room, message, userId}) => {
        io.to(room).emit('message', {
            message: message,
            userId : userId
        });
    });
});


server.listen(8080, ()=>{
    console.log("Server running on http://localhost:8080");
})