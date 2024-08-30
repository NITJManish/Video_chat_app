import React from 'react'
import ConnectButton from './ConnectButton'
import { useNavigate } from 'react-router-dom'
const ConnectButtons = () => {
    let navigate=useNavigate();

    const pushToJoinRoom=()=>{
        navigate("/join-room");
    }
    const pushToJoinRoomAsHost=()=>{
        navigate("/join-room?host=true");
    }


  return (
    <div className='connecting_buttons_container'>
      <ConnectButton buttonText='Join a meeting' onClickHandler={pushToJoinRoom} />
      <ConnectButton createRoomButton={true} buttonText='Hosting a meeting' onClickHandler={pushToJoinRoomAsHost} />
    </div>
  )
}

export default ConnectButtons
