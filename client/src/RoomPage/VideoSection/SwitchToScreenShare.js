import React, { useState } from 'react'
import SwitchImg from '../../images/switchToScreenSharing.svg'

const SwitchToScreenShare = () => {
    const [isScreenSharingActive,setScreenSharingActive]=useState(false);

    const handleScreenShareImg=()=>{
        setScreenSharingActive(!isScreenSharingActive);
    }
  return (
    <div className='video_button_container'>
      <img 
      src={SwitchImg}
      onClick={handleScreenShareImg}
      className='video_button_image'
      />
    </div>
  )
}

export default SwitchToScreenShare
