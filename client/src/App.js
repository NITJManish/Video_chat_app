import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IntroPage from './IntroPage/IntroPage'
import RoomPage from './RoomPage/RoomPage'
import JoinRoomPage from './JoinRoomPage/JoinRoomPage';
import './App.css';

function App() {
  return (
     <Router>
      <Routes>
      <Route path="/" element={<IntroPage/>} />
      <Route path="/join-room" element={<JoinRoomPage/>} />
      <Route path="/room" element={<RoomPage/>} />

      </Routes>
     </Router>
  );
}

export default App;
