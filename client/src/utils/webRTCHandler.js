import { setShowOverylay } from '../store/actions';
import store from '../store/store';
import * as wss from '../utils/wss';
import peer from 'simple-peer';
const defaultConstraints={
    audio:true,
    video:{
        width:"480",
        height:"360",
    },
};

let localStream;

export const getLocalPreviewAndInitRoomConnection=async (
    isRoomHost,
    identity,
    roomId=null
)=>{
     navigator.mediaDevices
     .getUserMedia(defaultConstraints)
     .then((stream)=>{
        console.log("successfull receive local stream");
      localStream=stream;
      showLocalVideoPrebiew(localStream);

      //dispatch an action to hide overlay
      store.dispatch(setShowOverylay(false));
     isRoomHost 
     ? wss.createNewRoom(identity) 
     : wss.joinRoom(roomId,identity)
    })
    .catch((err)=>{
        console.log("err occured when trying to get an access to local stream",err)
    })
}



let peers={};
let stream=[];

const getConfiguration=()=>{
    return {
        iceServers:[
            {
                urls:'stun:stun.l.google.com:19302'
            }
        ]
    }
};
export const prepareNewPeerConnection=(connUserSocketId,isInitiator)=>{
   const configuration=getConfiguration();

   peers[connUserSocketId]=new peer({
    initiator:isInitiator,
    config:configuration,
    stream:localStream,
   });

   peers[connUserSocketId].on("single",(data)=>{

    //webRTC offer webRTC Answer (SDP) information, ice condidate



    const signalData={
        signal:data,
        connUserSocketId:connUserSocketId
    };
    wss.signalPeerData(signalData);
   })

   peers[connUserSocketId].on("stream",(stream)=>{
    console.log("new stream came");

    addStream(stream,connUserSocketId);
   });
};

export const handleSignalingData=(data)=>{
    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
}

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPrebiew = (stream) => {
    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
  
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  
    videoContainer.appendChild(videoElement);
  
    // if (store.getState().connectOnlyWithAudio) {
    //   videoContainer.appendChild(getAudioOnlyLabel());
    // }
  
    videosContainer.appendChild(videoContainer);
  };
  

const addStream = (stream, connUserSocketId) => {
    //display incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");
    videoContainer.id = connUserSocketId;
  
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;
  
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
    videoElement.addEventListener("click", () => {
        if (videoElement.classList.contains("full_screen")) {
          videoElement.classList.remove("full_screen");
        } else {
          videoElement.classList.add("full_screen");
        }
      });
    
      videoContainer.appendChild(videoElement);
    
      // check if other user connected only with audio
      const participants = store.getState().participants;
    
      const participant = participants.find((p) => p.socketId === connUserSocketId);
      console.log(participant);
    //   if (participant?.onlyAudio) {
    //     videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    //   } else {
    //     videoContainer.style.position = "static";
    //   }
    
      videosContainer.appendChild(videoContainer);
    };