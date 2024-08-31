import React from 'react'

const LeaveRoomButton = () => {
    const handleRoomDisconncetion=()=>{
        const siteUrl=window.location.origin;
        window.location.href=siteUrl;
    };
  return (
    <div className='video_button_container'>
      <button 
      className='video_button_end' 
      onClick={handleRoomDisconncetion}>Leave Room</button>
    </div>
  )
}

export default LeaveRoomButton
