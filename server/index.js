const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require("twilio");


const PORT = process.env.PORT || 5002;
const app = express();
const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];

//create route to check if room exists
app.get("/api/room-exists/:roomId", (req, res) => {
    const { roomId } = req.params;
    const room = rooms.find((room) => room.id === roomId);

    if (room) {
        //send res if room exists
        if (room.connectedUsers.length > 3) {
            return res.send({ roomExists: true, full: true });
        } else {
            return res.send({ roomExists: true, full: false })
        }
    } else {
        //room not exists
        return res.send({ roomExists: false })
    }
})

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on("create-new-room", (data) => {
        createNewRoomHandler(data);
    });

    socket.on("join-room", (data) => {
        joinRoomHandler(data, socket);
    })

    socket.on("disconnect", () => {
        disconnectHandler(socket);
    });
    socket.on("conn-signal",(data)=>{
        signalingHandler(data,socket);
    });
    socket.on("conn-init",(data)=>{
        initializeConnectionHandler(data),socket
;    })
});

const createNewRoomHandler = () => {
    console.log("host is creating new room");
    console.log(data);
    const { identity } = data;

    const roomId = uuidv4();

    //create new user

    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId
    };
    //push that user to connectedusers
    connectedUsers = [...connectedUsers, newUser];

    //create new room
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser],
    }
    //join socket.io room
    socket.join(roomId);
    rooms = [...rooms, newRoom]

    //emit to that client which created that room roomId
    socket.emit("room-id", { roomId });
    //emit an event to all users conneted

    //to that room about new users which are right in this room
    socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });

};


const joinRoomHandler = (data, socket) => {
    const { identity, roomId } = data;

    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId
    }
    //join room as user which just is trying to join room passing room id
    const room = rooms.find(room => room.id === roomId);
    room.connectedUsers = [...room.connectedUsers, newUser];

    //join socket.io room
    socket.join(roomId);

    //add new user to connected users array
    connectedUsers = [...connectedUsers.newUser];

    //emit to all users which are already in this room to prepare peer connection
    room.connectedUsers.forEach((user)=>{
        if(user.socketId !== socket.id){
            const data={
                connectedUsers:socket.id,
            }

            io.to(user.socketId.emit("conn-prepare",data));
        }
    })
        


    io.to(roomId.emit('room-update', { connectedUsers: room.connectedUsers }));

};

const disconnectHandler = (socket) => {
    //find if user has been regsietered- if yes remove him from room and connected user array
    const user = connectedUsers.find((user) => user.socketId === socket.id);
    if (user) {
        //remove user from room in server
        const room = rooms.find((room) => room.id === user.roomId);
        room.connectedUsers = room.connectedUsers.filter(
            (user => user.socketId !== socket.id)
        )

        //leave socket io room
        socket.leave(user.roomId);


        //TODO
        //close the room if amount of the users which will staty in the room will be 0
        if (room.connectedUsers.length > 0) {
            //emit an event to rest of the users which left in the room new connected users in room
            io.to(room.id).emit("room-update", {
                connectedUsers: room.connectedUsers,
            });
        } else {
            rooms = rooms.filter((r) => r.id !== room.Id);
        }
    }

};

const signalingHandler=(data,socket)=>{
    const {connUserSocketId,signal}=data;

    const signalingData={signal,connUserSocketId:socket.id};
    io.to(connUserSocketId).emit("conn-signal",signalingData)
}
//information for the client which are already in the room that they have prepared for incoming connection
const initializeConnectionHandler=()=>{
  const {connUserSocketId}=data;
  const initData={connUserSocketId:socket.id}
  io.to(connUserSocketId).emit("conn-init",initData);
}

server.listen(PORT, () => {
    console.log(`server run on ${PORT}`);
})