import React from 'react'
import checkImg from '../images/check.png'




const OnlyWithAudioCheckbox = ({setConnectOnlyWithAudio,connectOnlyWithAudio}) => {


    const handleConnectAudioCheckbox = () => {
        //change info in our store about connection type
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    };
    return (
        <div className='checkbox_container'>
            <div className='checkbox_connection' onClick={handleConnectAudioCheckbox}>
                {connectOnlyWithAudio && <img className='checkbox_image' src={checkImg} alt="" />}
            </div>
            <p className='checkbox_container_paragraph'>Only audio</p>
        </div>
    )
}

export default OnlyWithAudioCheckbox
