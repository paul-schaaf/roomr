import React from 'react';
import Room from './Room';

const RoomList = ({ data }) => {
  const renderedRooms = data.map((room) => {
    return <Room key={room.roomName} roomData={room}/>
  })
  return (
    <React.Fragment>
      {renderedRooms}
    </React.Fragment>
  )
}

export default RoomList;