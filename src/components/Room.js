import React from 'react';
import './Room.css';

const Room = props => {

  const renderedTimeBlocks = [];
  for (let i = 0; i < 32; i++) {
    renderedTimeBlocks.push(<li className="room__timeblock"key={i}><div className="room__timeblock--block"></div></li>)
  }
  console.log(renderedTimeBlocks)

  return <ul className="room">{renderedTimeBlocks}</ul>
}

export default Room;