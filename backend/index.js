const express =require("express");
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const app = express();
const DB = require('./src/config/index')
DB()
const cors = require('cors');
const  User = require("./src/Models/user");
const server = createServer(app);
const cookieParser = require('cookie-parser');
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    }
});

app.use(express.json());
app.use(cookieParser());  
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
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();
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

    // join room
    socket.on("join-room", (data)=>{
        const { roomId, emailId } = data;
        console.log('User', emailId, "Joined Room", roomId);
        emailToSocketMapping.set(emailId, socket.id);
        socketToEmailMapping.set(socket.id, emailId);
        socket.join(roomId)
        socket.emit("join-room", { roomId })
        socket.broadcast.to(roomId).emit("user-joined", {emailId})
    })

    /* socket.on("call-user", data=>{
        const { emailId, offer } = data;
        console.log("call-user", emailId, offer)
        const fromEmail = socketToEmailMapping.get(socket.id); 
        const socketId = emailToSocketMapping.get(emailId);
        console.log("incomming-call", fromEmail, offer)
        socket.to(socketId).emit('incomming-call', { from : fromEmail, offer})
    }) */

    // send message
    socket.on('sendMessage',  async ({ receiverId, message, userId }) => {
        if (receiverId) {
            socket.to(receiverId).emit("receive-message", {
                message,
                userId: userId
            });
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