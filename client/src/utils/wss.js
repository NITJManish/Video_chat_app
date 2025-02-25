import io from "socket.io-client"
import store from'../store/store';
import { setRoomId,setParticipants } from "../store/actions";
import * as webRTCHandler from './webRTCHandler';
const SERVER="http://localhost:5002";

let socket=null;

export const connectWithSocketIOServer=()=>{
    socket=io(SERVER);

    socket.on("connect",()=>{
        console.log("successfully connected with socket io server");
        console.log(socket.id);
    })

    socket.on("room-id",(data)=>{
        const {roomId}=data;
        store.dispatch(setRoomId(roomId));
    })

    socket .on("room-update",(data)=>{
        const {connectedUsers}=data;
        store.dispatch(setParticipants(connectedUsers));
    })

    socket.on("conn-prepare",(data)=>{
        const {connectedUsers}=data;
        store.dispatch(setParticipants(connectedUsers));
    });

    socket.on("conn-signal",(data)=>{
        const {connUserSocketId}=data;
        webRTCHandler.handleSignalingData(connUserSocketId,false);
        //inform the user which just join the room that we have prepare for incoming connection
        socket.emit("conn-init",{connUserSocketId:connUserSocketId})
    });

    socket.on("conn-init",(data)=>{
        const {connUserSocketId}=data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId,true);
    })


};

export const createNewRoom=(identity)=>{
  //emit an event to server that we would like to create new room
  const data={
      identity,
  };
  socket.emit("create-new-room",data);
}

export const joinRoom=(roomId,identity)=>{
    //emit an event to the server that we would like to join room
    const data={
        roomId,
        identity,
    };
    socket.emit("join-room",data);
}

export const signalPeerData=(data)=>{
    socket.emit("conn-signal",data);
}