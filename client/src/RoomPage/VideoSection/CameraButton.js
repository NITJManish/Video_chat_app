import React, { useState } from 'react'
import cameraButtonImg from '../../images/camera.svg'
import cameraButtonOff from '../../images/cameraOff.svg'
const CameraButton = () => {
    const [isLocalVideoDisable,setIsLocalVideoDisable]=useState(false);

    const handleVideoButtonPressed=()=>{
        setIsLocalVideoDisable(!isLocalVideoDisable);
    }


  return (
    <div className='video_button_container'>
      <img
        src={isLocalVideoDisable?cameraButtonOff:cameraButtonImg}
        onClick={handleVideoButtonPressed}
        className='video_button_image'
      />
    </div>
  )
}

export default CameraButton
