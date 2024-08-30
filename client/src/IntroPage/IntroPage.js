import React, { useEffect } from 'react'
import './introPage.css'
import logo from '../images/logo.png'
import ConnectButtons from './ConnectButtons'
import {connect} from 'react-redux'
import {setIsRoomHost} from '../store/actions'
const IntroPage = (props) => {
  const {setIsRoomHostAction}=props;

  useEffect(()=>{
    setIsRoomHostAction(false);
  },[]);
  return (
    <div className='introduction_page_container'>
      <div className='introduction_page_panel'>
        <img src={logo} className='introduction_page_image' alt="" />
        <ConnectButtons/>
      </div>
    </div>
  )
}

const mapActionsToprops=(dispatch)=>{
  return {
    setIsRoomHostAction:(isRoomHost)=>dispatch(setIsRoomHost(isRoomHost)),
  }
}

export default connect(null,mapActionsToprops)(IntroPage)
