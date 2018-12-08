import React from 'react';
import './Room.css';

const Room = ({ roomData }) => {
  const config = {
    "true": "green",
    "false": "red"
  }
  
  const renderedTimeBlocks = roomData.times.map(timeSpanObject => {
    const timespan = Object.keys(timeSpanObject)[0];
    const availability = Object.values(timeSpanObject)[0];
    return (
      <li className="room__timeblock-list__timeblock" key={timespan}>
        <div className={`room__timeblock-list__timeblock--block ${config[availability]}`}></div>
      </li>
    )
  })

  return (
    <div className="room">
      <div className="room__number-box">{roomData.name}</div>
      <ul className="room__timeblock-list">{renderedTimeBlocks}</ul>
    </div>
  )
}

export default Room;