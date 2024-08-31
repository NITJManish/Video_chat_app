import React, { useState } from 'react'
import MicButtonImgOff from '../../images/micOff.svg';
import MicButtonImg from '../../images/mic.svg'
const MiCButton = () => {
    const [isMicMuted,setIsMicMuted]=useState(false);

    const handleMicButtonPressed=()=>{
        setIsMicMuted(!isMicMuted);
    }


  return (
    <div className='video_button_container'>
      <img 
      src={isMicMuted? MicButtonImgOff:MicButtonImg} 
        onClick={handleMicButtonPressed}
        className='video_button_image'
      />
    </div>
  )
}

export default MiCButton
