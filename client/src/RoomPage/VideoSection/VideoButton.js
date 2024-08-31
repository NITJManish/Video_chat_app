import React from 'react'
import MiCButton from './MiCButton'
import CameraButton from './CameraButton'
import LeaveRoomButton from './LeaveRoomButton'
import SwitchToScreenShare from './SwitchToScreenShare'

const VideoButton = (props) => {
  return (
    <div className='video_buttons_container'>
      <MiCButton/>
      <CameraButton/>
      <LeaveRoomButton/>
      <SwitchToScreenShare/>
    </div>
  )
}

export default VideoButton
