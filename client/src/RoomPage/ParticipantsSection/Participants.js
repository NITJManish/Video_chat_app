import React from 'react'
import { connect } from 'react-redux';

// const dummyParticipants=[
//     {
//         identity:'Man'
//     },
//     {
//         identity:'Mani'
//     },
//     {
//         identity:'tan'
//     },
//     {
//         identity:'tani'
//     },
//     {
//         identity:'tanu'
//     },
// ]

const SingleParticipant=(props)=>{
    const {identity,lastItem,participant}=props;

    return <>
        <p className='participants_paragraph'>{identity}</p>
        {!lastItem && <span className='participants_separator_line'></span>}
    </>
}

const Participants = ({Participants}) => {
  return (
    <div className='participants_container'>
      {Participants.map((participant,index)=>{
        return(
            <SingleParticipant 
            key={participant.identity}
            lastItem={Participants.length===index+1}
            participant={participant}
            identity={participant.identity}
            />
        )
      })}
    </div>
  )
}

const mapStoreStateToProps =(state)=>{
    return {
        ...state
    }
}

export default connect(mapStoreStateToProps)(Participants);
