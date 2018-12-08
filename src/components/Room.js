import React from 'react';

const Room = props => {

  const renderedTimeBlocks = [];
  for (let i = 0; i < 32; i++) {
    renderedTimeBlocks.push(<li key={i}>vacant</li>)
  }
  console.log(renderedTimeBlocks)

  return <ul className="room">{renderedTimeBlocks}</ul>
}

export default Room;