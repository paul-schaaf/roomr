import React from 'react';
import './Room.css';

const Room = props => {

  const renderedTimeBlocks = [];
  for (let i = 0; i < 32; i++) {
    renderedTimeBlocks.push(<li className="room__timeblock-list__timeblock"key={i}><div className="room__timeblock-list__timeblock--block"></div></li>)
  }
  return (
    <div className="room">
      <div className="room__number-box">100</div>
      <ul className="room__timeblock-list">{renderedTimeBlocks}</ul>
    </div>
  )
}

export default Room;